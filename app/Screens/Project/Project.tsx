import React, { useRef, useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Animated,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useNavigation, useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS } from '../../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import { useGetAllDprQuery } from '../../store/slices/dprSlice';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../Navigations/DrawerParamList';
import RecentTasks, { RecentTask } from './RecentTask';

const DROPDOWN_OPTIONS = [
  'All',
  'Ongoing',
  'Completed',
  'Not Started',
  'On Hold',
];

type ProjectScreenProps = StackScreenProps<RootStackParamList, 'Project'>;

type DM = {
  id: string;
  name: string;
  lastMessage?: string;
  updatedAt?: string;
  badgeCount?: number;
  iconBg?: string;
};

const Project = ({ navigation }: ProjectScreenProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  const drawerNavigation =
    useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const directMessages: DM[] = useMemo(() => {
    const demo: DM[] = [
      {
        id: 'dm-1',
        name: 'Rahul',
        lastMessage: 'Let’s sync at 4pm',
        updatedAt: new Date().toISOString(),
        badgeCount: 2,
        iconBg: '#7C3AED22',
      },
      {
        id: 'dm-2',
        name: 'Gagan',
        lastMessage: 'PO approved ✅',
        updatedAt: '2025-11-24T10:20:00Z',
        badgeCount: 0,
        iconBg: '#0EA5E922',
      },
    ];
    return demo.sort(
      (a, b) =>
        new Date(b.updatedAt || 0).getTime() -
        new Date(a.updatedAt || 0).getTime(),
    );
  }, []);

  // 🔹 Search bar animation state
  const [showSearch, setShowSearch] = useState(false);
  const translateX = useRef(new Animated.Value(-300)).current;
  const searchAnimRef = useRef<Animated.CompositeAnimation | null>(null);

  const openSearchBar = () => {
    if (showSearch) return;

    setShowSearch(true);
    searchAnimRef.current?.stop();

    const anim = Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    });

    searchAnimRef.current = anim;
    anim.start();
  };

  const closeSearchBar = () => {
    if (!showSearch) return;

    searchAnimRef.current?.stop();

    const anim = Animated.timing(translateX, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    });

    searchAnimRef.current = anim;
    anim.start(({ finished }) => {
      if (finished) {
        setShowSearch(false);
        translateX.setValue(-300);
      }
    });
  };

  useEffect(() => {
    return () => {
      // cleanup on unmount
      searchAnimRef.current?.stop();
    };
  }, []);

  // 🔹 Status dropdown
  const [selected, setSelected] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: false, // height cannot use native driver
    }).start();
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    toggleDropdown();
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, DROPDOWN_OPTIONS.length * 33],
  });

  const { data: apiRes, isFetching } = useGetAllDprQuery({
    page: 1,
    limit: 20,
  });

  // 🔹 Scroll animation for chip row
  const scrollY = useRef(new Animated.Value(0)).current;

  const chipRowScaleY = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0.92],
    extrapolate: 'clamp',
  });

  const chipRowTranslateY = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, -6],
    extrapolate: 'clamp',
  });

  const chipScale = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0.93],
    extrapolate: 'clamp',
  });

  const chipOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0.85],
    extrapolate: 'clamp',
  });

  const IMAGE = IMAGES.projectpic7;

  const cards = useMemo(() => {
    const list = apiRes?.data ?? [];

    return list.map((item: any) => {
      let progress = 0;
      if (typeof item?.percent_complete === 'number') {
        progress = Math.max(0, Math.min(1, item.percent_complete / 100));
      } else if (item?.work_completion?.unit === 'percentage') {
        const v = Number(item?.work_completion?.value ?? 0);
        progress = Math.max(0, Math.min(1, v / 100));
      }

      const title = item?.activity_id?.name || item?.activity_id || '-';
      const code = item?.project_id?.code || '';

      return {
        title,
        code,
        progress,
        view: 'grid',
        images: [IMAGE],
        _raw: item,
      };
    });
  }, [apiRes]);

  const StatChip = ({
    icon,
    title,
    subtitle,
    colors,
  }: {
    icon: string;
    title: string;
    subtitle: string;
    colors: any;
  }) => (
    <View
      style={[
        GlobalStyleSheet.glassChip,
        {
          width: 110,
          minHeight: 68,
          paddingVertical: 12,
          paddingHorizontal: 14,
          justifyContent: 'center',
          backgroundColor: colors.card,
        },
      ]}
    >
      <FeatherIcon
        name={icon as any}
        size={18}
        color={COLORS.primary}
        style={{ opacity: 0.95, marginBottom: 8 }}
      />
      <Text
        numberOfLines={1}
        style={{ ...FONTS.fontMedium, fontSize: 13, color: colors.title }}
      >
        {title}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          ...FONTS.font,
          fontSize: 12,
          color: colors.text,
          opacity: 0.8,
          marginTop: 2,
        }}
      >
        {subtitle}
      </Text>
    </View>
  );

  const ImageProjectCard = ({
    data,
    colors,
    onPress,
  }: {
    data: any;
    colors: any;
    onPress: () => void;
  }) => {
    const cover = data?.images?.[0];

    const progressAnim = useRef(new Animated.Value(0)).current;
    const chipScaleInner = useRef(new Animated.Value(0.9)).current;
    const chipOpacityInner = useRef(new Animated.Value(0.0)).current;

    useEffect(() => {
      const to =
        typeof data?.progress === 'number'
          ? Math.max(0, Math.min(1, data.progress))
          : 0;

      Animated.parallel([
        Animated.timing(progressAnim, {
          toValue: to,
          duration: 600,
          useNativeDriver: false, // driving width -> layout
        }),
        Animated.sequence([
          Animated.parallel([
            Animated.timing(chipOpacityInner, {
              toValue: 1,
              duration: 180,
              useNativeDriver: true,
            }),
            Animated.timing(chipScaleInner, {
              toValue: 1.03,
              duration: 180,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(chipScaleInner, {
            toValue: 1,
            duration: 140,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }, [data?.progress, progressAnim, chipScaleInner, chipOpacityInner]);

    const barWidth = progressAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={{
          backgroundColor: 'transparent',
          borderRadius: 14,
          overflow: 'hidden',
          marginBottom: 14,
        }}
      >
        <View
          style={[
            {
              borderRadius: 14,
              overflow: 'hidden',
              position: 'relative',
            },
            GlobalStyleSheet.glassCard,
          ]}
        >
          <ImageBackground
            source={cover}
            resizeMode="cover"
            style={{ width: '100%', aspectRatio: 1 / 0.6 }}
          >
            <LinearGradient
              colors={[
                'rgba(0,0,0,0.12)',
                'rgba(0,0,0,0.10)',
                'rgba(0,0,0,0.35)',
              ]}
              style={StyleSheet.absoluteFill}
            />
            <View
              style={[
                GlobalStyleSheet.glassBadge,
                { position: 'absolute', top: 10, left: 10 },
              ]}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...FONTS.fontMedium,
                  fontSize: 12,
                  color: colors.title,
                  opacity: 0.95,
                }}
              >
                {data?.code}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                GlobalStyleSheet.glassFab,
                { position: 'absolute', top: 10, right: 10 },
              ]}
            >
              <FeatherIcon
                name="arrow-right"
                size={18}
                color={COLORS.primary}
              />
            </TouchableOpacity>

            <View
              style={{
                position: 'absolute',
                left: 12,
                bottom: 20,
                right: 92,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...FONTS.fontMedium,
                  fontSize: 15,
                  color: '#fff',
                }}
              >
                {data?.title}
              </Text>
            </View>

            <Animated.View
              style={[
                GlobalStyleSheet.glassBadge,
                {
                  position: 'absolute',
                  right: 12,
                  bottom: 20,
                  transform: [{ scale: chipScaleInner }],
                  opacity: chipOpacityInner,
                },
              ]}
            >
              <Text
                style={{
                  ...FONTS.fontMedium,
                  fontSize: 12,
                  color: COLORS.primary,
                }}
              >
                {Math.round((data?.progress ?? 0) * 100)}%
              </Text>
            </Animated.View>

            <View
              style={{
                position: 'absolute',
                left: 10,
                right: 10,
                bottom: 12,
                height: 5,
                borderRadius: 3,
                backgroundColor: 'rgba(255,255,255,0.30)',
                overflow: 'hidden',
              }}
            >
              <Animated.View
                style={{
                  height: '100%',
                  width: barWidth,
                  borderRadius: 3,
                  backgroundColor: COLORS.primary,
                }}
              />
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  // 🔹 Recent tasks helpers
  type StatusKey =
    | 'idle'
    | 'pending'
    | 'work stopped'
    | 'completed'
    | 'in progress';

  const normalizeStatusFromBackend = (raw?: string | null): StatusKey => {
    if (!raw) return 'idle';
    const s = raw.toLowerCase().trim();

    switch (s) {
      case 'pending':
        return 'pending';
      case 'idle':
      case 'ideal':
        return 'idle';
      case 'work stopped':
      case 'work_stopped':
        return 'work stopped';
      case 'completed':
      case 'complete':
        return 'completed';
      case 'in progress':
      case 'in-progress':
      case 'in_progress':
        return 'in progress';
      default:
        return 'in progress';
    }
  };

  const recentData: RecentTask[] = (apiRes?.data ?? []).map((t: any) => {
    let progress = 0;
    if (typeof t?.percent_complete === 'number') {
      progress = Math.max(0, Math.min(1, t.percent_complete / 100));
    } else if (t?.work_completion?.unit === 'percentage') {
      const v = Number(t?.work_completion?.value ?? 0);
      progress = Math.max(0, Math.min(1, v / 100));
    }

    const title = (t?.activity_id?.name || t?.activity_id) ?? 'Activity';
    const code = t?.project_id?.code || '';

    const cardData = {
      title,
      code,
      progress,
      view: 'grid',
      images: [IMAGE],
      _raw: t,
    };

    return {
      id: t._id,
      title,
      updatedAt: t.updatedAt,
      status: normalizeStatusFromBackend(t?.current_status?.status),
      companyPayload: cardData,
    };
  });

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background, flex: 1, marginBottom: 0 }}
    >
      <StatusBar backgroundColor={colors.background} />

      <View style={[GlobalStyleSheet.container, { padding: 0, flex: 1 }]}>
        {/* Top app bar */}
        <View
          style={[
            GlobalStyleSheet.flexcenter,
            {
              height: 60,
              zIndex: 11,
              backgroundColor: colors.background,
              paddingHorizontal: 20,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => drawerNavigation.openDrawer()}
            style={{ flex: 1 }}
          >
            <Image
              style={{ height: 16, width: 24 }}
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

        {/* Scrollable content */}
        <Animated.ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 140,
          }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}
        >
          {/* Filter row */}
          <View
            style={[
              GlobalStyleSheet.flexcenter,
              { paddingHorizontal: 20, marginBottom: 10 },
            ]}
          >
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
                  style={{
                    width: 200,
                    height: heightInterpolate,
                    position: 'absolute',
                    top: 40,
                    zIndex: 99,
                    overflow: 'hidden',
                    backgroundColor: colors.card,
                    borderRadius: 8,
                    elevation: 5,
                  }}
                >
                  <FlatList
                    data={DROPDOWN_OPTIONS}
                    keyExtractor={(item) => item}
                    renderItem={({ item }: any) => (
                      <TouchableOpacity
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
                            item === 'Ongoing' && {
                              backgroundColor: '#419A90',
                            },
                            item === 'Completed' && {
                              backgroundColor: '#6A38FF',
                            },
                            item === 'On Hold' && {
                              backgroundColor: '#E8B73D',
                            },
                            item === 'Not Started' && {
                              backgroundColor: '#DD1951',
                            },
                          ]}
                        />
                        <Text
                          style={[
                            FONTS.font,
                            FONTS.fontMedium,
                            { color: colors.text },
                            item === 'Ongoing' && { color: '#419A90' },
                            item === 'Completed' && { color: '#6A38FF' },
                            item === 'On Hold' && { color: '#E8B73D' },
                            item === 'Not Started' && { color: '#DD1951' },
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </Animated.View>
              </View>

              <TouchableOpacity onPress={openSearchBar} activeOpacity={0.5}>
                <FeatherIcon color={COLORS.primary} size={16} name="search" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('AddTask')}
              activeOpacity={0.5}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <FeatherIcon color={COLORS.primary} size={16} name="plus" />
              <Text
                style={{
                  ...FONTS.fontMedium,
                  fontSize: 15,
                  color: COLORS.primary,
                  lineHeight: 20,
                }}
              >
                Task
              </Text>
            </TouchableOpacity>

            {showSearch && (
              <Animated.View
                style={{
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
                  left: 15,
                  transform: [{ translateX }],
                }}
              >
                <TextInput
                  placeholder="Search..."
                  style={[
                    FONTS.font,
                    FONTS.fontMedium,
                    { color: colors.title, flex: 1 },
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

          {/* Chips row */}
          <Animated.View
            style={{
              paddingHorizontal: 20,
              marginBottom: 12,
              justifyContent: 'center',
              transform: [
                { translateY: chipRowTranslateY },
                { scaleY: chipRowScaleY },
              ],
            }}
          >
            <Animated.ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: 'center',
                paddingRight: 8,
              }}
            >
              {[
                { icon: 'send', title: 'Drafts & Sent', subtitle: '0 comments' },
                { icon: 'calendar', title: 'Today', subtitle: '0 items' },
                { icon: 'clock', title: 'Upcoming', subtitle: '1 item' },
                { icon: 'at-sign', title: 'Assigned', subtitle: '0 comments' },
                { icon: 'activity', title: 'Activity', subtitle: '0' },
              ].map((c, i) => (
                <Animated.View
                  key={c.title + i}
                  style={{
                    transform: [{ scale: chipScale }],
                    opacity: chipOpacity,
                    marginRight: 10,
                  }}
                >
                  <StatChip
                    icon={c.icon}
                    title={c.title}
                    subtitle={c.subtitle}
                    colors={colors}
                  />
                </Animated.View>
              ))}
            </Animated.ScrollView>
          </Animated.View>

          {/* Horizontal Project cards */}
          <View style={{ paddingTop: 4, paddingBottom: 8 }}>
            <FlatList
              horizontal
              data={isFetching ? [] : cards}
              keyExtractor={(_, i) => String(i)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15, paddingRight: 24 }}
              ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
              renderItem={({ item }) => (
                <View style={{ width: 260 }}>
                  <ImageProjectCard
                    data={item}
                    colors={colors}
                    onPress={() =>
                      navigation.navigate('Company', { data: item })
                    }
                  />
                </View>
              )}
            />
          </View>

          {/* Recents */}
          <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
            <RecentTasks
              tasks={recentData}
              onPressTask={(t) =>
                navigation.navigate('Company', { data: t.companyPayload })
              }
            />
          </View>

          {/* Direct messages */}
          <View
            style={{
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 8,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: colors.text,
                }}
              >
                Direct messages
              </Text>
              <FeatherIcon
                name="chevron-down"
                size={18}
                color={colors.text}
                style={{ opacity: 0.6 }}
              />
            </View>

            {directMessages.map((dm) => (
              <TouchableOpacity
                key={dm.id}
                activeOpacity={0.7}
                style={{
                  paddingVertical: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <View
                  style={{
                    height: 28,
                    width: 28,
                    borderRadius: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: dm.iconBg || '#7C3AED22',
                  }}
                >
                  <FeatherIcon name="user" size={16} color={colors.text} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: colors.text,
                      fontSize: 15,
                      fontWeight: '600',
                    }}
                  >
                    {dm.name}
                  </Text>
                  {!!dm.lastMessage && (
                    <Text
                      numberOfLines={1}
                      style={{
                        color: colors.text,
                        opacity: 0.6,
                        marginTop: 2,
                      }}
                    >
                      {dm.lastMessage}
                    </Text>
                  )}
                </View>

                {!!dm.badgeCount && dm.badgeCount > 0 && (
                  <View
                    style={{
                      minWidth: 18,
                      height: 18,
                      borderRadius: 9,
                      paddingHorizontal: 6,
                      backgroundColor: '#EA4230',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 6,
                    }}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 11,
                        fontWeight: '700',
                      }}
                    >
                      {dm.badgeCount}
                    </Text>
                  </View>
                )}

                <FeatherIcon
                  name="chevron-right"
                  size={18}
                  color={colors.text}
                  style={{ opacity: 0.35 }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Project;
