import React, { useRef, useState, useMemo, useEffect } from 'react';
import {
  View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Keyboard,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { launchImageLibrary, ImageLibraryOptions, Asset } from 'react-native-image-picker';

import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Header from '../../layout/Header';
import Button from '../../components/Button/Button';
import CustomInput from '../../components/Input/CustomInput';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEditUserMutation } from '../../store/slices/loginSlice';
import { useAuthUser } from '../../utils/userHooks/getUser';

type EditProfileScreenProps = StackScreenProps<RootStackParamList, 'EditProfile'>;

const EditProfile = ({ navigation }: EditProfileScreenProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const authUser = useAuthUser();
  const userId   = authUser?.userID || '';

  // --- local form state (empty initially) ---
  const [name,  setName]  = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [image, setImage] = useState<{ uri: string; name?: string; type?: string } | null>(null);

  const [hydrated, setHydrated] = useState(false);

  // 🔑 Hydrate inputs when authUser becomes available/changes
// after you get authUser
useEffect(() => {
  if (!authUser) {
    setHydrated(true);
    return;
  }
  const toStr = (v: any) => (v === null || v === undefined ? '' : String(v));

  setName(toStr(authUser.name));
  setEmail(toStr(authUser.email));
  setPhone(toStr(authUser.phone));   // <= IMPORTANT
  setAbout(toStr(authUser.about));
  setImage(authUser.attachment_url ? { uri: String(authUser.attachment_url) } : null);

  setHydrated(true);
}, [authUser]);


  const [editUser, { isLoading }] = useEditUserMutation();

  const pickImage = () => {
    const opts: ImageLibraryOptions = { mediaType: 'photo', selectionLimit: 1 };
    launchImageLibrary(opts, (res) => {
      if (res.didCancel) return;
      const asset: Asset | undefined = res.assets?.[0];
      if (!asset?.uri) return;

      const guessName =
        asset.fileName || `photo_${Date.now()}.${(asset.type || 'image/jpeg').split('/')[1] || 'jpg'}`;

      setImage({
        uri: asset.uri,
        name: guessName,
        type: asset.type || 'image/jpeg',
      });
    });
  };

  const canSubmit = useMemo(() => {
    return !!userId && (name.trim() || email.trim() || phone.trim() || about.trim() || image);
  }, [userId, name, email, phone, about, image]);

  const safeTrim = (v: any) => String(v ?? '').trim();

  const handleSubmit = async () => {
    if (!userId) return;
    Keyboard.dismiss();

      try {
    const fd = new FormData();

    const sName  = safeTrim(name);
    const sEmail = safeTrim(email);
    const sPhone = safeTrim(phone);
    const sAbout = safeTrim(about);

    if (sName)  fd.append('name',  sName);
    if (sEmail) fd.append('email', sEmail);
    if (sPhone) fd.append('phone', sPhone);
    if (sAbout) fd.append('about', sAbout);

    if (image?.uri && (image.uri.startsWith('file:') || image.uri.startsWith('content:'))) {
      fd.append('attachment', {
        uri: image.uri,
        name: image.name || 'avatar.jpg',
        type: image.type || 'image/jpeg',
      } as any);
    }

    const updated = await editUser({ userId, data: fd }).unwrap(); // returns UserDto

    const prevRaw = await AsyncStorage.getItem('userData');
    const prev    = prevRaw ? JSON.parse(prevRaw) : {};

    await AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        ...prev,
        userID:         updated?._id ?? userId,
        name:           updated?.name ?? sName,
        email:          updated?.email ?? sEmail,
        phone:          updated?.phone ?? sPhone,
        emp_id:         updated?.emp_id ?? prev?.emp_id,
        department:     updated?.department ?? prev?.department,
        about:          updated?.about ?? sAbout,
        location:       updated?.location ?? prev?.location,
        attachment_url: updated?.attachment_url ?? prev?.attachment_url ?? image?.uri,
        createdAt:      updated?.createdAt ?? prev?.createdAt,
      })
    );

    navigation.goBack();
} catch (e) {
      console.error('EditProfile: handleSubmit error', e);
    }
  };

  const avatarInitial = (name || email || 'U').trim().charAt(0).toUpperCase();

  // Optional skeleton / early return to avoid flicker
  if (!hydrated) {
    return <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} />;
  }

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <Header title="Edit Profile" leftIcon="back" titleLeft />

      <View style={{ flex: 1, backgroundColor: colors.card, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[GlobalStyleSheet.container, { paddingHorizontal: 20, paddingTop: 28, flex: 1 }]}>
            {/* Avatar */}
            <View style={{ alignItems: 'center', marginBottom: 22 }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={pickImage}
                style={{
                  height: 120, width: 120, borderRadius: 100, backgroundColor: '#ECECEE',
                  alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative',
                }}
              >
                {image?.uri ? (
                  <Image source={{ uri: image.uri }} style={{ height: 120, width: 120, borderRadius: 100 }} />
                ) : (
                  <View
                    style={{
                      height: 120, width: 120, borderRadius: 100, backgroundColor: COLORS.primary,
                      alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Text style={{ ...FONTS.fontMedium, fontSize: 42, color: colors.card }}>{avatarInitial}</Text>
                  </View>
                )}

                <View
                  style={{
                    position: 'absolute', bottom: 6, right: 6, height: 32, width: 32, borderRadius: 16,
                    backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <FeatherIcon name="camera" size={18} color={colors.title} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Name */}
            <View style={{ marginBottom: 14 }}>
              <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text, marginBottom: 8 }}>Name</Text>
              <CustomInput inputBorder value={name} onChangeText={setName} placeholder="Your name" />
            </View>

            {/* Phone */}
            <View style={{ marginBottom: 14 }}>
              <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text, marginBottom: 8 }}>Phone*</Text>
              <CustomInput
                inputBorder
                keyboardType="phone-pad"
                maxLength={15}
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone number"
              />
            </View>

            {/* Email */}
            <View style={{ marginBottom: 14 }}>
              <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text, marginBottom: 8 }}>Email*</Text>
              <CustomInput inputBorder value={email} onChangeText={setEmail} placeholder="Email address" />
            </View>

            {/* About */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text, marginBottom: 8 }}>About</Text>
              <CustomInput
                inputBorder
                multiline
                numberOfLines={4}
                style={{ height: 110, textAlignVertical: 'top' }}
                value={about}
                onChangeText={setAbout}
                placeholder="Tell something about yourself…"
              />
            </View>
          </View>
        </ScrollView>

        <View style={[GlobalStyleSheet.container, { paddingHorizontal: 20, paddingBottom: 14 }]}>
          <Button
            title={isLoading ? 'Updating…' : 'Update'}
            onPress={handleSubmit}
            disabled={!canSubmit || isLoading}
            color={theme.dark ? COLORS.white : COLORS.primary}
            text={colors.card}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
