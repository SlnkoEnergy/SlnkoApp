// Sidebar.tsx
import React, { useMemo, useRef } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS, FONTS } from '../constants/theme';
import { IMAGES } from '../constants/Images';
import { GlobalStyleSheet } from '../constants/StyleSheet';

import CustomInput from '../components/Input/CustomInput';
import Button from '../components/Button/Button';

import { useGetAllUsersItQuery } from '../store/slices/loginSlice';
import { useAuthUser } from '../utils/userHooks/getUser';

type NavItem = { icon: any; name: string; navigate?: string };

const primary = COLORS.primary;

const Sidebar = ({ navigation }: any) => {
  const { colors }: { colors: any } = useTheme();
  const refRBSheet = useRef<any>(null);


  const cached = useAuthUser();
  const { data: itUsers } = useGetAllUsersItQuery();

  const me = useMemo(() => {
    if (!cached?.userID || !Array.isArray(itUsers)) return null;
    return itUsers.find((u: any) => String(u?._id) === String(cached.userID)) || null;
  }, [cached?.userID, itUsers]);

  const displayName =
    (me?.name && String(me.name).trim()) ||
    (cached?.name && String(cached.name).trim()) ||
    (cached?.email && String(cached.email).trim()) ||
    'User';

  const displayEmail =
    (me?.email && String(me.email).trim()) ||
    (cached?.email && String(cached.email).trim()) ||
    '';

  const initial = (displayName || 'U').trim().charAt(0).toUpperCase();

  const attachmentUrl: string | undefined =
    (me?.attachment_url && String(me.attachment_url).trim()) ||
    (cached as any)?.attachment_url ||
    undefined;


  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        if (!me) return;
        try {
          const prevRaw = await AsyncStorage.getItem('userData');
          const prev = prevRaw ? JSON.parse(prevRaw) : {};
          await AsyncStorage.setItem(
            'userData',
            JSON.stringify({
              ...prev,
              userID: me._id,
              name: me.name,
              email: me.email,
              phone: me.phone,
              emp_id: me.emp_id,
              role: me.role,
              department: me.department,
              createdAt: me.createdAt,
              about: me.about ?? "",
    location: me.location ?? "",
    attachment_url: me.attachment_url ?? "",
            })
          );
        } catch {}
      })();
    }, [me])
  );

  // small reusable UI bits
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <Text
      style={{
        ...FONTS.fontMedium,
        fontSize: 13,
        color: colors.text,
        opacity: 0.7,
        paddingHorizontal: 20,
        marginTop: 18,
        marginBottom: 10,
        letterSpacing: 0.3,
      }}
    >
      {children}
    </Text>
  );

  const RowItem = ({
    icon,
    label,
    onPress,
    right,
  }: {
    icon: React.ReactNode;
    label: string;
    onPress?: () => void;
    right?: React.ReactNode;
  }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 14,
      }}
    >
      <View style={{ width: 26, alignItems: 'center', marginRight: 14 }}>{icon}</View>
      <Text style={{ ...FONTS.fontLg, color: colors.title, flex: 1 }}>{label}</Text>
      {right}
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.card,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
      }}
    >
      {/* Feedback sheet (kept) */}
      <RBSheet
        ref={refRBSheet}
        height={250}
        openDuration={250}
        customStyles={{
          container: {
            backgroundColor: colors.background,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: {
            backgroundColor: '#ccc',
            width: 60,
            height: 6,
            borderRadius: 3,
            alignSelf: 'center',
            marginVertical: 10,
          },
        }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[GlobalStyleSheet.container, { paddingTop: 25, padding: 20, flex: 1 }]}>
            <Text style={[FONTS.fontMedium, { fontSize: 18, color: colors.title }]}>
              Tell us How Can We improve
            </Text>
            <View style={{ marginBottom: 20, marginTop: 10 }}>
              <Text
                style={{
                  ...FONTS.fontMedium,
                  fontSize: 14,
                  color: colors.text,
                  marginBottom: 10,
                }}
              >
                Description
              </Text>
              <CustomInput
                inputBorder
                lefticon={<FeatherIcon name="user-plus" size={20} color={colors.text} />}
                style={{ paddingLeft: 50 }}
              />
            </View>
            <Button title="Next" onPress={() => refRBSheet.current?.close()} />
          </View>
        </ScrollView>
      </RBSheet>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Top “Profile & Settings” header */}
        <Text
          style={{
            ...FONTS.fontMedium,
            fontSize: 20,
            color: colors.title,
            textAlign: 'center',
            paddingTop: 16,
            paddingBottom: 6,
          }}
        >
          Profile & Settings
        </Text>

        {/* Large profile card */}
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 8,
            backgroundColor: colors.background,
            borderRadius: 16,
            paddingVertical: 18,
            alignItems: 'center',
          }}
        >
                   {/* Avatar with online dot (uses attachment_url if available) */}
          <View style={{ position: 'relative', marginBottom: 10 }}>
            <View
              style={{
                height: 84,
                width: 84,
                borderRadius: 42,
                backgroundColor: primary,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {attachmentUrl ? (
                <Image
                  source={{ uri: attachmentUrl }}
                  style={{ height: 84, width: 84, borderRadius: 42 }}
                  resizeMode="cover"
                />
              ) : (
                <Text
                  style={{
                    ...FONTS.fontMedium,
                    fontSize: 40,
                    color: colors.card,
                  }}
                >
                  {initial}
                </Text>
              )}
            </View>

            <View
              style={{
                height: 14,
                width: 14,
                borderRadius: 7,
                backgroundColor: '#22C55E',
                position: 'absolute',
                bottom: 4,
                right: 2,
                borderWidth: 2,
                borderColor: colors.background,
              }}
            />
          </View>


          {/* Name */}
          <Text style={{ ...FONTS.fontMedium, fontSize: 22, color: colors.title }}>{displayName}</Text>

          {/* Status pill (icon + text + time) */}
          <View
            style={{
              marginTop: 12,
              width: '90%',
              backgroundColor: colors.card,
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <FeatherIcon name="book" size={18} color={colors.title} />
            <View style={{ flex: 1 }}>
              <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: colors.title }}>Focusing</Text>
              <Text style={{ ...FONTS.font, fontSize: 12, color: colors.text, opacity: 0.7 }}>
                {new Date().toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Actions: Edit profile / AI StandUp */}
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              marginTop: 14,
              width: '90%',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.closeDrawer();
                navigation.navigate('EditProfile');
              }}
              style={{
                flex: 1,
                backgroundColor: colors.card,
                borderRadius: 12,
                paddingVertical: 12,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <FeatherIcon name="edit" size={16} color={colors.title} />
              <Text style={{ ...FONTS.fontMedium, color: colors.title }}>Edit profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {}}
              style={{
                flex: 1,
                backgroundColor: colors.card,
                borderRadius: 12,
                paddingVertical: 12,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <FeatherIcon name="aperture" size={16} color={colors.title} />
              <Text style={{ ...FONTS.fontMedium, color: colors.title }}>AI StandUp</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu group */}
      {/* Menu group */}
<View
  style={{
    marginTop: 18,
    backgroundColor: colors.background,
    marginHorizontal: 16,
    borderRadius: 16,
  }}
>
  <RowItem
    icon={<FeatherIcon name="home" size={20} color={colors.title} />}
    label="Home"
    onPress={() => navigation.navigate('Projects')}
  />
  <RowItem
    icon={<FeatherIcon name="users" size={20} color={colors.title} />}
    label="Payroll People"
    onPress={() => navigation.navigate('PayrollPeople')}
  />
  <RowItem
    icon={<FeatherIcon name="settings" size={20} color={colors.title} />}
    label="Company Setting"
    onPress={() => navigation.navigate('Settings')}
  />
  <RowItem
    icon={<FeatherIcon name="sliders" size={20} color={colors.title} />}
    label="Notification settings"
    onPress={() => navigation.navigate('NotificationSettings')}
  />
  <RowItem
    icon={<FeatherIcon name="user-plus" size={20} color={colors.title} />}
    label="Invite Friends"
    onPress={() => navigation.navigate('Invite')}
  />
  <RowItem
    icon={<FeatherIcon name="help-circle" size={20} color={colors.title} />}
    label="Help & resources"
    onPress={() => navigation.navigate('HelpCenter')}
  />
</View>


        {/* General info */}
        <SectionTitle>General info</SectionTitle>
        <View
          style={{
            backgroundColor: colors.background,
            marginHorizontal: 16,
            borderRadius: 16,
            marginTop: 4,
          }}
        >
          {/* <RowItem
            icon={<FeatherIcon name="book" size={18} color={colors.title} />}
            label="Focusing"
          />
          <RowItem
            icon={<FeatherIcon name="circle" size={18} color={'#22C55E'} />}
            label="Online"
          /> */}
          <RowItem
            icon={<FeatherIcon name="mail" size={18} color={colors.title} />}
            label={displayEmail || '—'}
            right={
              <TouchableOpacity onPress={() => {}}>
                <FeatherIcon name="copy" size={16} color={colors.text} />
              </TouchableOpacity>
            }
          />
          <RowItem
            icon={<FeatherIcon name="star" size={18} color={colors.title} />}
            label="Favorite"
            onPress={() => {}}
          />
        </View>

        {/* Teams header (static like screenshot) */}
        <SectionTitle>Teams</SectionTitle>

        {/* Optional: your legacy entries like Customer Support / Feedback / Logout */}
        <View
          style={{
            marginTop: 8,
            backgroundColor: colors.background,
            marginHorizontal: 16,
            borderRadius: 16,
            marginBottom: 18,
          }}
        >
          <RowItem
            icon={<Image style={{ height: 20, width: 20 }} resizeMode="contain" source={IMAGES.CustomerSupport} />}
            label="Customer Support"
            onPress={() => navigation.navigate('HelpCenter')}
          />
          <RowItem
            icon={<FeatherIcon name="message-circle" size={18} color={colors.title} />}
            label="Give Feedback"
            onPress={() => {
              navigation.closeDrawer();
              refRBSheet.current?.open();
            }}
          />
          <RowItem
            icon={<Image style={{ height: 18, width: 18 }} resizeMode="contain" source={IMAGES.logout} />}
            label="Logout"
            onPress={async () => {
              await AsyncStorage.multiRemove(['authToken', 'userId', 'userData']);
              navigation.navigate('Login'); // change if your route is "Login"
            }}
            right={<FeatherIcon name="chevron-right" size={18} color={colors.text} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Sidebar;
