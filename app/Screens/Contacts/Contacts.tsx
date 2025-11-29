import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Image, Platform, ImageBackground, Animated, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS } from '../../constants/theme';
import DropShadow from 'react-native-drop-shadow';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from "react-native-vector-icons/Feather";
import { TextInput } from 'react-native';
import { FlatList } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

const clients = [
  {
    name: "Kuldeep",
    role: "Client",
    amount: "₹ 0",
    status: "Settled",
    initial: "K",
    bgColor: "#D1E4C1",
  },
  {
    name: "W3 Chandan",
    role: "Client",
    amount: "₹ 0",
    status: "Settled",
    initial: "W",
    bgColor: "#E4D2C4",
  },
  {
    name: "Lakhan Gaur",
    role: "Client",
    amount: "₹ 0",
    status: "Settled",
    initial: "L",
    bgColor: "#D4D5F8",
  },
  {
    name: "Bharat Gaur",
    role: "Client",
    amount: "₹ 0",
    status: "Settled",
    initial: "B",
    bgColor: "#D8C4E4",
  },
];

const DROPDOWN_OPTIONS = ['All', 'Client', 'Worker', 'Material Supplier', 'Labour Contractor', 'Equipment Supplier', 'Sub Contractor'];

const days = [
  { id: 0, weekday: "W", date: "26" },
  { id: 1, weekday: "T", date: "27" },
  { id: 2, weekday: "F", date: "28" },
  { id: 3, weekday: "S", date: "29" },
  { id: 4, weekday: "S", date: "30" },
  { id: 5, weekday: "M", date: "1" },
  { id: 6, weekday: "T", date: "2" },
];

type ContactsScreenProps = StackScreenProps<RootStackParamList, 'Contacts'>;

const Contacts = ({ navigation }: ContactsScreenProps) => {

  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const [showSearch, setShowSearch] = useState(false);
  const translateX = useRef(new Animated.Value(-300)).current;

  const searchAnimRef = useRef<Animated.CompositeAnimation | null>(null);

  const openSearchBar = () => {
    setShowSearch(true);

    searchAnimRef.current?.stop();

    const anim = Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    })

    searchAnimRef.current = anim;

    anim.start();
  };

  const closeSearchBar = () => {

    searchAnimRef.current?.stop();

    const anim = Animated.timing(translateX, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    })

    searchAnimRef.current = anim;
    anim.start(({ finished }) => {
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

  useEffect(() => {
    return () => {
      searchAnimRef.current?.stop();
    };
  }, []);

  const handleSelect = (value: string) => {
    setSelected(value);
    toggleDropdown();
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, DROPDOWN_OPTIONS.length * 33], // height per item
  });
  const [selectedDay, setSelectedDay] = useState(2);
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Upcoming</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Day strip */}
        <View style={styles.dayStrip}>
          {days.map((d, index) => {
            const isActive = index === selectedDay;
            return (
              <TouchableOpacity
                key={d.id}
                style={styles.dayItem}
                onPress={() => setSelectedDay(index)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.dayWeek,
                    isActive && { color: COLORS.primary, fontWeight: "600" },
                  ]}
                >
                  {d.weekday}
                </Text>
                <View
                  style={[
                    styles.dayCircle,
                    isActive && {
                      backgroundColor: COLORS.primary,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayDate,
                      isActive && { color: "#fff", fontWeight: "700" },
                    ]}
                  >
                    {d.date}
                  </Text>
                </View>
                {isActive && <View style={styles.dayDot} />}
              </TouchableOpacity>
            );
          })}
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          {/* First day section */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeader}>Fri, Nov 28</Text>
            <TouchableOpacity>
              <Ionicons name="add" size={22} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* One scheduled task */}
          <View style={styles.cardRow}>
            <View style={styles.radioOuter} />
            <View style={{ flex: 1 }}>
              <Text style={styles.taskTitle}>Siddharth Singh</Text>
              <Text style={styles.taskSubtitle}>
                In Personal List ·{" "}
                <Ionicons name="time-outline" size={12} color="#999" /> Nov 28
              </Text>
            </View>
          </View>

          {/* New link */}
          <TouchableOpacity style={styles.newRow} activeOpacity={0.8}>
            <Ionicons name="add-circle" size={18} color={COLORS.primary} />
            <Text style={styles.newText}>New</Text>
          </TouchableOpacity>

          {/* Second day section */}
          <View style={[styles.sectionHeaderRow, { marginTop: 24 }]}>
            <Text style={styles.sectionHeader}>Sat, Nov 29</Text>
            <TouchableOpacity>
              <Ionicons name="add" size={22} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Empty state */}
          <View style={styles.emptyWrap}>
            <View style={styles.emptyIconBox}>
              <Ionicons name="checkmark" size={26} color="#B0B0B0" />
            </View>
            <Text style={styles.emptyTitle}>Nothing is scheduled</Text>
            <Text style={styles.emptySubtitle}>
              Tasks, events, reminders appear here
            </Text>

            <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.9}>
              <Text style={styles.primaryBtnLabel}>+ Create Task</Text>
            </TouchableOpacity>
          </View>

          {/* Next day label (optional, like “Sun, Nov 30”) */}
          <View style={[styles.sectionHeaderRow, { marginTop: 24 }]}>
            <Text style={styles.sectionHeader}>Sun, Nov 30</Text>
            <TouchableOpacity>
              <Ionicons name="add" size={22} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );


}

export default Contacts

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },

  dayStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
  },
  dayItem: {
    alignItems: "center",
    width: 40,
  },
  dayWeek: {
    fontSize: 11,
    color: "#AAA",
    marginBottom: 4,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  dayDate: {
    fontSize: 13,
    color: "#333",
  },
  dayDot: {
    marginTop: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },

  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
  },

  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: 12,
  },
  taskTitle: {
    fontSize: 15,
    color: "#111",
    marginBottom: 2,
  },
  taskSubtitle: {
    fontSize: 12,
    color: "#999",
  },

  newRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  newText: {
    marginLeft: 6,
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "500",
  },

  emptyWrap: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E4E4E4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#999",
    marginTop: 4,
    marginBottom: 20,
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});


// return (
//   <View>

//   </View>
//   // <SafeAreaView style={{ backgroundColor: colors.background, flex: 1, marginBottom: 0 }}>
//   //   <StatusBar backgroundColor={colors.background} />
//   //   <View style={[GlobalStyleSheet.container, { padding: 0 }]}>
//   //     <View
//   //       style={[GlobalStyleSheet.flexcenter, {
//   //         height: 60,
//   //         zIndex: 11,
//   //         backgroundColor: colors.background,
//   //         paddingHorizontal: 20
//   //       }]}
//   //     >
//   //       <TouchableOpacity
//   //         onPress={() => navigation.openDrawer()}
//   //         style={{ flex: 1 }}
//   //       >
//   //         <Image
//   //           style={{
//   //             height: 16,
//   //             width: 24,
//   //           }}
//   //           tintColor={colors.title}
//   //           resizeMode='contain'
//   //           source={IMAGES.menu}
//   //         />
//   //       </TouchableOpacity>
//   //       <TouchableOpacity
//   //         style={{
//   //           height: 30,
//   //           padding: 8,
//   //           borderRadius: 6,
//   //           backgroundColor: '#FFB743',
//   //           flexDirection: 'row',
//   //           alignItems: 'center',
//   //           gap: 5,
//   //           marginRight: 40
//   //         }}
//   //       >
//   //         <Image
//   //           style={{
//   //             height: 15,
//   //             width: 15
//   //           }}
//   //           resizeMode='contain'
//   //           source={IMAGES.crown}
//   //         />
//   //         <Text style={{ ...FONTS.fontMedium, fontSize: 12, color: colors.title, lineHeight: 14 }}>Upgrade</Text>
//   //       </TouchableOpacity>
//   //       <TouchableOpacity
//   //         activeOpacity={0.5}
//   //         onPress={() => navigation.navigate('Notification')}
//   //         style={{
//   //           padding: 5,
//   //           height: 40,
//   //           width: 40,
//   //           borderRadius: 30,
//   //           backgroundColor: 'transparent',
//   //           alignItems: 'center',
//   //           justifyContent: 'center',
//   //           position: 'absolute',
//   //           right: 15
//   //         }}
//   //       >
//   //         <FeatherIcon name='bell' color={colors.text} size={20} />
//   //         <View
//   //           style={{
//   //             height: 10,
//   //             width: 10,
//   //             borderRadius: 5,
//   //             backgroundColor: '#EA4230',
//   //             borderWidth: 2,
//   //             borderColor: colors.card,
//   //             position: 'absolute',
//   //             right: 10,
//   //             top: 10
//   //           }}
//   //         />
//   //       </TouchableOpacity>
//   //     </View>
//   //   </View>
//   //   <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
//   //     <View style={[GlobalStyleSheet.container, { padding: 0 }]}>
//   //       <DropShadow
//   //         style={[{
//   //           shadowColor: '#000',
//   //           shadowOffset: {
//   //             width: 0,
//   //             height: -4,
//   //           },
//   //           shadowOpacity: 0.1,
//   //           shadowRadius: 4,
//   //         }, Platform.OS === 'ios' && {
//   //           backgroundColor: 'transparent',
//   //         }]}
//   //       >
//   //         <View
//   //           style={[GlobalStyleSheet.container,
//   //           {
//   //             paddingTop: 10,
//   //             padding: 0,
//   //             backgroundColor: colors.background,
//   //             borderBottomWidth: 1,
//   //             borderColor: '#EEEEEE',
//   //             position: 'relative'
//   //           }
//   //           ]}
//   //         >
//   //           <LinearGradient
//   //             locations={[0.3, 0.40, 0.7]}
//   //             colors={
//   //               theme.dark ?
//   //                 ["rgba(12,16,28,0.3)", "rgba(12,16,28,.95)", "rgba(12,16,28,1)"]
//   //                 :
//   //                 ["#F9F9F9", "#F9F9F9", "#FFFFFF"]
//   //             }
//   //             style={{
//   //               position: 'absolute',
//   //               bottom: 0,
//   //               top: 0,
//   //               left: 0,
//   //               right: 0
//   //             }}
//   //           />
//   //           <TouchableOpacity
//   //             activeOpacity={0.8}
//   //             style={{
//   //               height: 88,
//   //               overflow: 'hidden',
//   //               borderRadius: 8,
//   //               marginBottom: 10,
//   //               marginHorizontal: 20
//   //             }}
//   //           >
//   //             <ImageBackground
//   //               style={{ flex: 1 }}
//   //               source={IMAGES.Shap1}
//   //             >
//   //               <View
//   //                 style={[{
//   //                   flex: 1,
//   //                   padding: 20,
//   //                   borderRadius: 8,
//   //                   overflow: 'hidden',
//   //                 }]}
//   //               >
//   //                 <Text style={{ ...FONTS.fontMedium, fontSize: 18, color: COLORS.card, marginBottom: 2 }}>Contacts Balances</Text>
//   //               </View>
//   //             </ImageBackground>
//   //           </TouchableOpacity>
//   //           <View style={[GlobalStyleSheet.flexcenter, { justifyContent: 'center', gap: 10, paddingHorizontal: 30, marginBottom: 30, marginTop: -40 }]}>
//   //             <View
//   //               style={{
//   //                 flex: 1,
//   //                 padding: 15,
//   //                 paddingVertical: 12,
//   //                 borderRadius: 6,
//   //                 backgroundColor: colors.card,
//   //                 shadowColor: 'rgba(8,29,125,0.5)',
//   //                 elevation: 20
//   //               }}
//   //             >
//   //               <Text style={{ ...FONTS.fontMedium, fontSize: 13, color: COLORS.primary, marginLeft: 2, marginBottom: 5 }}>To Pay</Text>
//   //               <Text style={{ ...FONTS.fontMedium, fontSize: 20, color: colors.title }}>5,000</Text>
//   //             </View>
//   //             <View
//   //               style={{
//   //                 flex: 1,
//   //                 padding: 15,
//   //                 paddingVertical: 12,
//   //                 borderRadius: 6,
//   //                 backgroundColor: colors.card,
//   //                 shadowColor: 'rgba(8,29,125,0.5)',
//   //                 elevation: 20
//   //               }}
//   //             >
//   //               <Text style={{ ...FONTS.fontMedium, fontSize: 13, color: COLORS.primary, marginLeft: 2, marginBottom: 5 }}>To Receive</Text>
//   //               <Text style={{ ...FONTS.fontMedium, fontSize: 20, color: colors.title }}>0</Text>
//   //             </View>
//   //           </View>
//   //           <View style={[GlobalStyleSheet.flexcenter, { paddingHorizontal: 20, marginBottom: 20, zIndex: 999 }]}>
//   //             <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
//   //               <View>
//   //                 <TouchableOpacity
//   //                   onPress={toggleDropdown}
//   //                   activeOpacity={0.5}
//   //                   style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
//   //                 >
//   //                   <Text style={[FONTS.fontLg, { color: colors.title }]}>{selected}</Text>
//   //                   <FeatherIcon size={16} color={colors.text} name={isOpen ? "chevron-up" : "chevron-down"} />
//   //                 </TouchableOpacity>
//   //                 <Animated.View
//   //                   style={[{
//   //                     width: 200,
//   //                     height: heightInterpolate,
//   //                     position: 'absolute',
//   //                     top: 40,
//   //                     zIndex: 99,
//   //                     overflow: 'hidden',
//   //                     backgroundColor: colors.card,
//   //                     borderRadius: 8,
//   //                     elevation: 5,
//   //                   }]}>
//   //                   <FlatList
//   //                     data={DROPDOWN_OPTIONS}
//   //                     keyExtractor={(item) => item}
//   //                     renderItem={({ item }: any) => (
//   //                       <TouchableOpacity
//   //                         onPress={() => handleSelect(item)}
//   //                         style={{
//   //                           paddingVertical: 6,
//   //                           paddingHorizontal: 20,
//   //                           flexDirection: 'row',
//   //                           alignItems: 'center',
//   //                           gap: 10
//   //                         }}
//   //                       >
//   //                         <View
//   //                           style={[{
//   //                             height: 14,
//   //                             width: 14,
//   //                             borderRadius: 15,
//   //                             borderWidth: 1.5,
//   //                             borderColor: colors.border
//   //                           }, item === selected && {
//   //                             backgroundColor: colors.text,
//   //                             borderColor: colors.text
//   //                           }]}
//   //                         />
//   //                         <Text
//   //                           style={[
//   //                             FONTS.font, FONTS.fontMedium,
//   //                             {
//   //                               color: colors.text
//   //                             }]}>{item}</Text>
//   //                       </TouchableOpacity>
//   //                     )}
//   //                   />
//   //                 </Animated.View>
//   //               </View>
//   //               <TouchableOpacity
//   //                 onPress={openSearchBar}
//   //                 activeOpacity={0.5}
//   //               >
//   //                 <FeatherIcon color={COLORS.primary} size={16} name='search' />
//   //               </TouchableOpacity>
//   //             </View>
//   //             <TouchableOpacity
//   //               onPress={() => navigation.navigate('NewContact')}
//   //               activeOpacity={0.5}
//   //               style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}
//   //             >
//   //               <FeatherIcon color={COLORS.primary} size={16} name='plus' />
//   //               <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: COLORS.primary, lineHeight: 16 }}>Project</Text>
//   //             </TouchableOpacity>
//   //             {showSearch && (
//   //               <Animated.View style={[{
//   //                 flexDirection: 'row',
//   //                 alignItems: 'center',
//   //                 backgroundColor: colors.background,
//   //                 borderWidth: 1,
//   //                 borderColor: colors.border,
//   //                 borderRadius: 8,
//   //                 paddingHorizontal: 10,
//   //                 height: 40,
//   //                 width: '65%',
//   //                 position: 'absolute',
//   //                 left: 20,
//   //                 transform: [{ translateX }]
//   //               }]}>
//   //                 <TextInput
//   //                   placeholder="Search..."
//   //                   style={[FONTS.font, FONTS.fontMedium, {
//   //                     color: colors.title,
//   //                     flex: 1,
//   //                   }]}
//   //                   placeholderTextColor={colors.placeholder}
//   //                   multiline
//   //                 />
//   //                 <TouchableOpacity onPress={closeSearchBar}>
//   //                   <FeatherIcon name="x" size={20} color={colors.text} />
//   //                 </TouchableOpacity>
//   //               </Animated.View>
//   //             )}
//   //           </View>
//   //         </View>
//   //       </DropShadow>
//   //     </View>
//   //     <View style={[GlobalStyleSheet.container, { flex: 1, padding: 20, zIndex: -1 }]}>
//   //       {/* Project Clients Card Start*/}
//   //       <View style={[GlobalStyleSheet.row]}>
//   //         {clients.map((data: any, index: any) => {
//   //           return (
//   //             <View
//   //               key={index}
//   //               style={[GlobalStyleSheet.col50]}
//   //             >
//   //               <TouchableOpacity
//   //                 activeOpacity={0.8}
//   //                 style={{
//   //                   borderWidth: 1,
//   //                   borderColor: '#EFEFEF',
//   //                   backgroundColor: colors.card,
//   //                   borderRadius: 8,
//   //                   marginBottom: 10
//   //                 }}
//   //               >
//   //                 <View
//   //                   style={{
//   //                     padding: 15,
//   //                     borderBottomWidth: 1,
//   //                     borderBlockColor: '#EFEFEF',
//   //                     alignItems: 'center'
//   //                   }}
//   //                 >
//   //                   <View
//   //                     style={{
//   //                       height: 40,
//   //                       width: 40,
//   //                       borderRadius: 25,
//   //                       backgroundColor: data.bgColor,
//   //                       alignItems: 'center',
//   //                       justifyContent: 'center',
//   //                       marginBottom: 8
//   //                     }}
//   //                   >
//   //                     <Text style={{ ...FONTS.fontMedium, fontSize: 18, color: colors.title }}>{data.initial}</Text>
//   //                   </View>
//   //                   <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 8 }}>{data.name}</Text>
//   //                   <Text style={[FONTS.fontRegular, { fontSize: 12, color: colors.text }]}>{data.role}</Text>
//   //                 </View>
//   //                 <View
//   //                   style={[GlobalStyleSheet.row, { padding: 13, paddingHorizontal: 15 }]}
//   //                 >
//   //                   <Text numberOfLines={1} style={{ ...FONTS.fontMedium, fontSize: 13, color: COLORS.success, flex: 1 }}>{data.amount}</Text>
//   //                   <Text style={{ ...FONTS.fontMedium, fontSize: 13, color: colors.text }}>{data.status}</Text>
//   //                 </View>
//   //               </TouchableOpacity>
//   //             </View>
//   //           )
//   //         })}
//   //       </View>
//   //       {/* Project Clients Card End */}
//   //     </View>
//   //   </ScrollView>
//   // </SafeAreaView>
// )