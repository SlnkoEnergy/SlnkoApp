import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StatusBar,
  ScrollView,
  Animated,
  StyleSheet,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useNavigation, useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { TouchableOpacity } from 'react-native';
import { IMAGES } from '../../constants/Images';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import DropShadow from 'react-native-drop-shadow';
import { Platform } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomInput from '../../components/Input/CustomInput';
import Button from '../../components/Button/Button';
import { Modal } from 'react-native';
import { FlatList } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../Navigations/DrawerParamList';

const Usercards = [
  {
    title: 'Interior Design',
    user: 'W3 Aayush',
    amount: '₹ 15,000',
    status: {
      label: 'Reject',
    },
  },
  {
    title: 'Villa Project',
    user: 'W3 Neha',
    amount: '₹ 1,25,000',
    status: {
      label: 'Client Confirmed',
    },
    subStatus: {
      label: 'Hold',
    },
  },
  {
    title: 'Shop Renovation',
    user: 'W3 Raj',
    amount: '₹ 48,000',
    status: {
      label: 'Darft',
    },
  },
  {
    title: 'Office Fitout',
    user: 'W3 Shruti',
    amount: '₹ 78,500',
    status: {
      label: 'In Discussion',
    },
    subStatus: {
      label: 'Hold',
    },
  },
  {
    title: 'Modular Kitchen',
    user: 'W3 Dev',
    amount: '₹ 25,000',
    status: {
      label: 'Sent',
    },
  },
  {
    title: 'Bungalow Exterior',
    user: 'W3 Tanya',
    amount: '₹ 2,60,000',
    status: {
      label: 'On Hold',
    },
    subStatus: {
      label: 'Hold',
    },
  },
];

const statusStyles = {
  Reject: {
    bgColor: '#FFEBF1',
    textColor: '#DD1951',
    dotColor: '#DD1951',
  },
  'Client Confirmed': {
    bgColor: '#E7F5F4',
    textColor: '#419A90',
    dotColor: '#419A90',
  },
  Darft: {
    bgColor: '#FFF8E5',
    textColor: '#E8B73D',
    dotColor: '#E8B73D',
  },
  'In Discussion': {
    bgColor: '#EEF1FF',
    textColor: '#2648E7',
    dotColor: '#2648E7',
  },
  Sent: {
    bgColor: '#E4DBFF',
    textColor: '#6A38FF',
    dotColor: '#6A38FF',
  },
  'On Hold': {
    bgColor: '#FFEDDE',
    textColor: '#DB965F',
    dotColor: '#DB965F',
  },
};

const DROPDOWN_OPTIONS = [
  'All',
  'Draft',
  'Sent',
  'Hold',
  'Reject',
  'In Discussion',
];

type EstimatesScreenProps = StackScreenProps<RootStackParamList, 'Estimates'>;

const Estimates = ({ navigation }: EstimatesScreenProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;
 const drawerNavigation =
    useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const refRBSheet = useRef<any>(null);

  const [showSearch, setShowSearch] = useState(false);
  const translateX = useRef(new Animated.Value(-300)).current;

  const openSearchBar = () => {
    setShowSearch(true);
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSearchBar = () => {
    Animated.timing(translateX, {
      toValue: 400, // Slide out to right
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowSearch(false);
      translateX.setValue(-300); // RESET to left (prepare for next open)
    });
  };

  const [selected, setSelected] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    toggleDropdown();
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, DROPDOWN_OPTIONS.length * 33], // height per item
  });

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background, flex: 1, marginBottom: 0 }}
    >
      <StatusBar backgroundColor={colors.card} />
      <View style={[GlobalStyleSheet.container, { padding: 0 }]}>
        <View
          style={[
            GlobalStyleSheet.flexcenter,
            {
              height: 60,
              zIndex: 11,
              backgroundColor: colors.card,
              paddingHorizontal: 20,
            },
          ]}
        >
          <TouchableOpacity
             onPress={() => drawerNavigation.openDrawer()}
            style={{ flex: 1 }}
          >
            <Image
              style={{
                height: 16,
                width: 24,
              }}
              tintColor={colors.title}
              resizeMode="contain"
              source={IMAGES.menu}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Notification')}
            style={{
              padding: 5,
              height: 40,
              width: 40,
              borderRadius: 30,
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              right: 15,
            }}
          >
            <FeatherIcon name="bell" color={colors.text} size={20} />
            <View
              style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: '#EA4230',
                borderWidth: 2,
                borderColor: colors.card,
                position: 'absolute',
                right: 10,
                top: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <RBSheet
          ref={refRBSheet}
          height={360}
          openDuration={250}
          customStyles={{
            container: {
              backgroundColor: colors.background,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            draggableIcon: {
              backgroundColor: '#ccc', // make sure it's visible
              width: 60,
              height: 6,
              borderRadius: 3,
              alignSelf: 'center',
              marginVertical: 10,
            },
          }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View
              style={[
                GlobalStyleSheet.container,
                { paddingTop: 25, padding: 20, flex: 1 },
              ]}
            >
              <Text
                style={[
                  FONTS.fontRegular,
                  { fontSize: 18, color: colors.title },
                ]}
              >
                Add New Payments
              </Text>
              <View style={{ marginBottom: 20, marginTop: 30 }}>
                <Text
                  style={{
                    ...FONTS.fontMedium,
                    fontSize: 14,
                    color: colors.text,
                    marginBottom: 10,
                  }}
                >
                  Projects Name
                </Text>
                <CustomInput
                  inputBorder
                  keyboardType={'number-pad'}
                  maxLength={15}
                />
              </View>
              <View style={{ marginBottom: 25 }}>
                <Text
                  style={{
                    ...FONTS.fontMedium,
                    fontSize: 14,
                    color: colors.text,
                    marginBottom: 10,
                  }}
                >
                  Client
                </Text>
                <CustomInput
                  inputBorder
                  keyboardType={'number-pad'}
                  maxLength={15}
                />
              </View>
              <Button
                title="Create Payments"
                onPress={() => refRBSheet.current.close()}
              />
            </View>
          </ScrollView>
        </RBSheet>
        <View style={[GlobalStyleSheet.container, { padding: 0 }]}>
          <DropShadow
            style={[
              {
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: -4,
                },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              },
              Platform.OS === 'ios' && {
                backgroundColor: colors.card,
              },
            ]}
          >
            <View
              style={[
                GlobalStyleSheet.container,
                {
                  paddingTop: 10,
                  backgroundColor: colors.card,
                  borderBottomWidth: 1,
                  borderColor: '#EEEEEE',
                },
              ]}
            >
              <View
                style={[
                  GlobalStyleSheet.flexcenter,
                  {
                    padding: 20,
                    borderRadius: 8,
                    backgroundColor: '#E8ECFF',
                    alignItems: 'flex-start',
                    overflow: 'hidden',
                    marginBottom: 28,
                  },
                ]}
              >
                <View style={[GlobalStyleSheet.col50, { width: '60%' }]}>
                  <Text
                    style={{
                      ...FONTS.fontMedium,
                      fontSize: 18,
                      color: colors.title,
                      marginBottom: 5,
                    }}
                  >
                    Payments
                  </Text>
                  <Text
                    style={{
                      ...FONTS.fontLight,
                      fontSize: 14,
                      color: colors.text,
                    }}
                  >
                    Generate and track payments records easily
                  </Text>
                </View>
                <View style={[GlobalStyleSheet.col33, { width: '40%' }]}>
                  <Image
                    style={{
                      width: 130,
                      height: 120,
                      position: 'absolute',
                      top: -25,
                      right: -15,
                    }}
                    resizeMode="contain"
                    source={IMAGES.userhouse}
                  />
                  <Image
                    style={{
                      width: 110,
                      height: 120,
                      position: 'absolute',
                      top: -15,
                      right: 15,
                    }}
                    resizeMode="contain"
                    source={IMAGES.banneruser}
                  />
                </View>
              </View>
              <View style={[GlobalStyleSheet.flexcenter]}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 15,
                  }}
                >
                  <View>
                    <TouchableOpacity
                      onPress={toggleDropdown}
                      activeOpacity={0.5}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      <Text style={[FONTS.fontLg, { color: colors.title }]}>
                        {selected}
                      </Text>
                      <FeatherIcon
                        size={16}
                        color={colors.text}
                        name={isOpen ? 'chevron-up' : 'chevron-down'}
                      />
                    </TouchableOpacity>
                    <Animated.View
                      style={[
                        {
                          width: 200,
                          height: heightInterpolate,
                          position: 'absolute',
                          top: 40,
                          zIndex: 99,
                          overflow: 'hidden',
                          backgroundColor: colors.card,
                          borderRadius: 8,
                          elevation: 5,
                        },
                      ]}
                    >
                      <View>
                        {DROPDOWN_OPTIONS.map(item => (
                          <TouchableOpacity
                            key={item}
                            onPress={() => handleSelect(item)}
                            style={{
                              paddingVertical: 6,
                              paddingHorizontal: 20,
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 10,
                            }}
                          >
                            <View
                              style={[
                                {
                                  height: 8,
                                  width: 8,
                                  borderRadius: 4,
                                  backgroundColor: colors.text,
                                },
                                item === 'Draft' && {
                                  backgroundColor: '#E8B73D',
                                },
                                item === 'Sent' && {
                                  backgroundColor: '#6A38FF',
                                },
                                item === 'Hold' && {
                                  backgroundColor: '#DB965F',
                                },
                                item === 'Reject' && {
                                  backgroundColor: '#DD1951',
                                },
                                item === 'In Discussion' && {
                                  backgroundColor: '#2648E7',
                                },
                              ]}
                            />
                            <Text
                              style={[
                                FONTS.font,
                                FONTS.fontMedium,
                                { color: colors.text },
                                item === 'Draft' && { color: '#E8B73D' },
                                item === 'Sent' && { color: '#6A38FF' },
                                item === 'Hold' && { color: '#DB965F' },
                                item === 'Reject' && { color: '#DD1951' },
                                item === 'In Discussion' && {
                                  color: '#2648E7',
                                },
                              ]}
                            >
                              {item}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </Animated.View>
                  </View>
                  <TouchableOpacity onPress={openSearchBar} activeOpacity={0.5}>
                    <FeatherIcon
                      color={COLORS.primary}
                      size={16}
                      name="search"
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => refRBSheet.current.open()}
                  activeOpacity={0.5}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}
                >
                  <FeatherIcon color={COLORS.primary} size={16} name="plus" />
                  <Text
                    style={{
                      ...FONTS.fontMedium,
                      fontSize: 15,
                      color: COLORS.primary,
                      lineHeight: 16,
                    }}
                  >
                    New Payments
                  </Text>
                </TouchableOpacity>
                {showSearch && (
                  <Animated.View
                    style={[
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: colors.background,
                        borderWidth: 1,
                        borderColor: colors.border,
                        borderRadius: 8,
                        paddingHorizontal: 10,
                        height: 40,
                        width: '65%',
                        position: 'absolute',
                        left: 0,
                        transform: [{ translateX }],
                      },
                    ]}
                  >
                    <TextInput
                      placeholder="Search..."
                      style={[
                        FONTS.font,
                        FONTS.fontMedium,
                        {
                          color: colors.title,
                          flex: 1,
                        },
                      ]}
                      placeholderTextColor={colors.placeholder}
                      multiline
                    />
                    <TouchableOpacity onPress={closeSearchBar}>
                      <FeatherIcon name="x" size={20} color={colors.text} />
                    </TouchableOpacity>
                  </Animated.View>
                )}
              </View>
            </View>
          </DropShadow>
        </View>
        <View
          style={[
            GlobalStyleSheet.container,
            { flex: 1, padding: 20, zIndex: -1 },
          ]}
        >
          {/* UsersCards Start*/}
          <View style={[GlobalStyleSheet.row]}>
            {Usercards.map((data: any, index: any) => {
              const [modalVisible, setModalVisible] = useState<any>(false);
              const [selectedStatus, setSelectedStatus] = useState<any>(
                data.status.label,
              );

              return (
                <View key={index} style={[GlobalStyleSheet.col50]}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Estimatesdetails', { data: data })
                    }
                    activeOpacity={0.8}
                    style={{
                      backgroundColor: colors.card,
                      borderRadius: 6,
                      borderWidth: 1,
                      borderColor: '#EFEFEF',
                      marginBottom: 10,
                      overflow: 'hidden',
                    }}
                  >
                    <View
                      style={[
                        GlobalStyleSheet.flexcenter,
                        {
                          padding: 15,
                          borderBottomWidth: 1,
                          borderColor: '#EFEFEF',
                          alignItems: 'flex-start',
                        },
                      ]}
                    >
                      <View>
                        <Text
                          style={{
                            ...FONTS.fontMedium,
                            fontSize: 15,
                            color: colors.title,
                          }}
                        >
                          {data.title}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                            marginTop: 5,
                          }}
                        >
                          <View
                            style={{
                              height: 18,
                              width: 18,
                              borderRadius: 25,
                              backgroundColor: '#D1E4C1',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Text
                              style={{
                                ...FONTS.fontMedium,
                                fontSize: 8,
                                color: colors.title,
                              }}
                            >
                              W
                            </Text>
                          </View>
                          <Text style={[FONTS.font, { color: colors.text }]}>
                            {data.user}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                          height: 45,
                          width: 45,
                          borderRadius: 25,
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'absolute',
                          right: 0,
                          top: 0,
                        }}
                      >
                        <Ionicons
                          name="ellipsis-vertical"
                          size={16}
                          color={colors.text}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        padding: 15,
                        paddingBottom: 10,
                      }}
                    >
                      <View
                        style={[
                          GlobalStyleSheet.flexcenter,
                          { marginBottom: 10 },
                        ]}
                      >
                        <Text
                          style={{
                            ...FONTS.fontMedium,
                            fontSize: 13,
                            color: colors.title,
                          }}
                        >
                          {data.amount}
                        </Text>
                        {data.subStatus && (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 3,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 3,
                              }}
                            >
                              <View
                                style={[
                                  {
                                    height: 8,
                                    width: 8,
                                    borderRadius: 5,
                                    backgroundColor: '#419A90',
                                  },
                                  data.subStatus.label === 'Hold' && {
                                    backgroundColor: '#419A90',
                                  },
                                ]}
                              />
                              <Text
                                style={[
                                  {
                                    ...FONTS.fontSemiBold,
                                    fontSize: 12,
                                    color: '#419A90',
                                  },
                                  data.subStatus.label === 'Hold' && {
                                    color: '#419A90',
                                  },
                                ]}
                              >
                                {data.subStatus.label}
                              </Text>
                            </View>
                            <FeatherIcon
                              size={14}
                              color={'#50586D80'}
                              name="chevron-down"
                            />
                          </View>
                        )}
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setModalVisible(true)}
                        style={[
                          GlobalStyleSheet.flexcenter,
                          {
                            height: 24,
                            borderRadius: 3,
                            paddingHorizontal: 10,
                            backgroundColor:
                              statusStyles[selectedStatus]?.bgColor ||
                              colors.background,
                          },
                        ]}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                          }}
                        >
                          <View
                            style={{
                              height: 8,
                              width: 8,
                              borderRadius: 5,
                              backgroundColor:
                                statusStyles[selectedStatus]?.dotColor ||
                                colors.text,
                            }}
                          />
                          <Text
                            style={{
                              ...FONTS.fontSemiBold,
                              fontSize: 12,
                              color:
                                statusStyles[selectedStatus]?.textColor ||
                                colors.text,
                            }}
                          >
                            {selectedStatus}
                          </Text>
                        </View>
                        <FeatherIcon
                          size={16}
                          color={'#50586D80'}
                          name="chevron-down"
                        />
                      </TouchableOpacity>
                    </View>
                    <Modal
                      visible={modalVisible}
                      transparent
                      animationType="fade"
                      onRequestClose={() => setModalVisible(false)}
                    >
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          backgroundColor: 'rgba(0,0,0,0.3)',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        activeOpacity={1}
                        onPressOut={() => setModalVisible(false)}
                      >
                        <View
                          style={{
                            width: 250,
                            backgroundColor: colors.card,
                            borderRadius: 6,
                          }}
                        >
                          <View
                            style={{
                              padding: 20,
                              borderBottomWidth: 1,
                              borderColor: colors.border,
                              paddingHorizontal: 20,
                            }}
                          >
                            <Text
                              style={{
                                ...FONTS.fontSemiBold,
                                fontSize: 16,
                                color: colors.title,
                              }}
                            >
                              Select Status
                            </Text>
                          </View>
                          <View
                            style={{
                              paddingHorizontal: 25,
                            }}
                          >
                            {Object.keys(statusStyles).map(status => (
                              <TouchableOpacity
                                key={status}
                                onPress={() => {
                                  setSelectedStatus(status);
                                  setModalVisible(false);
                                }}
                                style={{
                                  paddingVertical: 10,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  gap: 10,
                                }}
                              >
                                <View
                                  style={{
                                    height: 8,
                                    width: 8,
                                    borderRadius: 4,
                                    backgroundColor:
                                      statusStyles[status].dotColor,
                                  }}
                                />
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: statusStyles[status].textColor,
                                    ...FONTS.fontMedium,
                                  }}
                                >
                                  {status}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Modal>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          {/* UsersCards End*/}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Estimates;
