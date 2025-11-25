import { View, Text, TouchableOpacity, ScrollView, useWindowDimensions, Animated, Platform, Image, StyleSheet, Easing, TouchableWithoutFeedback } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { SafeAreaView } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IconButton } from 'react-native-paper';
import { COLORS, FONTS } from '../../constants/theme';
import FeatherIcon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import DropShadow from 'react-native-drop-shadow';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGES } from '../../constants/Images';
import Button from '../../components/Button/Button';
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckoutItems from '../../components/CheckoutItems';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomInput from '../../components/Input/CustomInput';
import { TextInput } from 'react-native';
import FilterSheet from '../../components/BottomSheet/FilterSheet';
import { FlatList } from 'react-native';
import { Modal } from 'react-native';


const clients = [
  {
    name: "Kuldeep",
    role: "Client",
    amount: "₹ 7,1264282",
    status: "Received",
    initial: "K",
    bgColor: "#D1E4C1", 
  },
  {
    name: "W3 Chandan",
    role: "Client",
    amount: "₹ 10000",
    status: "Paid",
    initial: "W",
    bgColor: "#E4D2C4", 
  },
  {
    name: "Lakhan Gaur",
    role: "Client",
    amount: "₹ 5000",
    status: "Paid",
    initial: "L",
    bgColor: "#D4D5F8", 
  },
  {
    name: "Bharat Gaur",
    role: "Client",
    amount: "₹ 2500",
    status: "Received",
    initial: "B",
    bgColor: "#D8C4E4", 
  },
];

const summaryCards = [
    {
        title: 'Balance',
        amount: '₹ 5000',
        backgroundColor: '#2648E7', 
    },
    {
        title: 'Total In',
        amount: '₹ 0',
        backgroundColor: '#27A196',
    },
    {
        title: 'Total Out',
        amount: '₹ 0',
        backgroundColor: '#DD1951',
    },
];

const taskStatusCards = [
    {
        title: 'Not Started',
        amount: '0',
        backgroundColor: '#2648E7', 
    },
    {
        title: 'Onging',
        amount: '0',
        backgroundColor: '#27A196',
    },
    {
        title: 'Progress',
        amount: '0%',
        backgroundColor: '#DD1951',
    },
];

const transactions = [
    {
        id: 0,
        date: '27 Jun',
        type: 'Payment',
        name: 'W3 Chandan > W3 Bharat Gour',
        amount: '₹ 10000',
        paymentType:'Sent & Received',
    },
    {
        id: 1,
        date: '27 Jun',
        type: 'Payment',
        name: 'Kuldeep Gaur',
        amount: '₹ 10000',
        paymentType:'Sent',
    },
    {
        id: 2,
        date: '27 Jun',
        type: 'Payment',
        name: 'Bittu Gaur',
        amount: '₹ 10000',
        paymentType:'Received',
    },
];

const taskSchedules = [
    {
        id: 0,
        number: 1,
        dateRange: '27 Jun – 30 Jun',
        siteName: 'W3 Chandan',
        lastUpdated: '27 Jun',
        progress: '0/100%',
        status: {
            label: 'Start',
        },
        backgroundColor: 'rgba(65,154,144,0.2)',
    },
    {
        id: 1,
        number: 2,
        dateRange: '10 Jun – 26 Jun',
        siteName: 'W3 Kuldeep',
        lastUpdated: '27 Jun',
        progress: '0/100%',
        status: {
            label: 'OnGoing',
            sublabel:"Delayed by 2 day",
        },
        backgroundColor: 'rgba(221,25,81,0.2)',
    },
    {
        id: 2,
        number: 3,
        dateRange: '28 Jun – 31 Jun',
        siteName: 'W3 Chandan',
        lastUpdated: '27 Jun',
        progress: '0/100%',
        status: {
            label: 'Start',
        },
        backgroundColor:COLORS.primaryLight,
    },
];

const siteCards = [
    {
        id: 1,
        title: 'Site Staff',
        subtitle: 'Present',
        value: 0,
        icon: IMAGES.useradd,
    },
    {
        id: 2,
        title: 'Material',
        subtitle: 'Received',
        value: 0,
        icon: IMAGES.handreceivepackage,
    },
    {
        id: 3,
        title: 'Material',
        subtitle: 'Used',
        value: 0,
        icon: IMAGES.ticketcheck,
    }
];

const filterOptions = [
    {
        id: 'all',
        title: 'All',
    },
    {
        id: 'siteStaff',
        title: 'Site Staff',
    },
    {
        id: 'labourContracter',
        title: 'Labour Contracter',
    },
];

const ATTENDANCE_STATS = [
    {
        id: 'present',
        label: 'Present',
        count: 2,
    },
    {
        id: 'absent',
        label: 'Absent',
        count: 1,
    },
    {
        id: 'plwo',
        label: 'PL/Wo',
        count: 1,
    },
];

const ATTENDANCE_CARDS = [
    {
        user: "W3 Aayush",
        status: {
            label: "Absent",
        },
    },
    {
        user: "W3 Neha",
        status: {
            label: "Present",
        },
    },
    {
        user: "W3 Raj",
        status: {
            label: "PL/Wo"
        },
    },
    {
        user: "W3 Shruti",
        status: {
            label: "Present",
        },
    },
];

const MaterialOptions = [
    {
        id: 'inventory',
        title: 'Inventory',
    },
    {
        id: 'request',
        title: 'Request',
    },
    {
        id: 'received',
        title: 'Received',
    },
    {
        id: 'used',
        title: 'Used',
    },
];

const InventoryData = [
  { name: 'W3 Yatin', quantity: 58 },
  { name: 'W3 Chandan', quantity: 22 },
  { name: 'W3 Kuldeep', quantity: 90 },
  { name: 'W3 Lakhan', quantity: 60 },
];

const requestData = [
    {
        id: '0',
        date: '26 Jun',
        name: 'W3 Yatin',
        location: 'MR-1 Prem 2nd House',
        stock: 58,
        requestedQty: 80,
        status: 'REQUESTED',
    },
];

const receivedData = [
    {
        id: '1',
        date: '28 Jun 2025',
        name: 'W3 Chandan',
        party: 'Others',
        quantity: 22,
    },
    {
        id: '2',
        date: '28 Jun 2025',
        name: 'W3 Yatin',
        party: 'Others',
        quantity: 20,
    },
];

const usedData = [
    {
        id: '1',
        date: '28 Jun 2025',
        name: 'W3 Yatin',
        quantity: 79,
    },
];

const sortfilter = ['Alphbetically', 'Low to High', 'High to Low']

const dropdownData = [
    {
        id:"1",
        key:"SiteStaff",
        label:"Site Staff",
      },
      {
        id:"2",
        key:"OfficeStaff",
        label:"Office Staff",
    },
]

const statusStyles = {
    'Absent': {
      bgColor: '#FFEBF1',
      textColor: '#DD1951',
      dotColor: '#DD1951',
    },
    'Present': {
      bgColor: '#E7F5F4',
      textColor: '#419A90',
      dotColor: '#419A90',
    },
    'PL/Wo': {
      bgColor: '#DFE5FF',
      textColor: '#2648E7',
      dotColor: '#2648E7',
    },
};


type ProjectDetailsScreenProps = StackScreenProps<RootStackParamList, 'ProjectDetails'>;

const ProjectDetails = ({route,navigation} : ProjectDetailsScreenProps) => {

    const {data} = route.params;

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [open, setOpen] = useState<any>(false)
    
    const [date, setDate] = useState<any>(new Date())

    const [filterSelect, setfilterSelect] = useState('all')

    const [selectedDate, setSelectedDate] = useState(moment());
    const [showPicker, setShowPicker] = useState(false);
    
    const goPreviousDay = () => {
        setSelectedDate(prev => moment(prev).subtract(1, 'days'));
    };
    
    const goNextDay = () => {
        setSelectedDate(prev => moment(prev).add(1, 'days'));
    };
    
    const onDateChange = (event:any, date:any) => {
        setShowPicker(false);
        if (date) {
            setSelectedDate(moment(date));
        }
    };

    const [MaterialSelect, setMaterialSelect] = useState<string>('inventory');

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const translateY = useRef(new Animated.Value(0)).current;

    const handleTabChange = (tabId: string) => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 10,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start(() => {
        setMaterialSelect(tabId);

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
        });
    };

    const [images, setImages] = useState<any>([]);

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && response.assets) {
                setImages([...images, ...response.assets]);
            }
        });
    };

    const refRBSheet = useRef<any>(null);

    const SalesSheet = useRef<any>(null);

    const sheetRef = useRef<any>(null);

    const ContactsortRef = useRef<any>(null);

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
    
    // DROPDOWN_OPTIONS

    const DROPDOWN_OPTIONS_1 = ['Active', 'InActive'];
    const DROPDOWN_OPTIONS_2 = ['As schedule', 'Last Updated'];
    const DROPDOWN_OPTIONS_3 = ['All', 'Requested', 'Ordered', 'Rejected'];

    const [selected1, setSelected1] = useState('Active');
    const [selected2, setSelected2] = useState('As schedule');
    const [selected3, setSelected3] = useState('All');

    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);

    const [animation1] = useState(new Animated.Value(0));
    const [animation2] = useState(new Animated.Value(0));
    const [animation3] = useState(new Animated.Value(0));

    // Toggle logic
    const toggleDropdown1 = () => {
        setIsOpen1(!isOpen1);
        Animated.timing(animation1, {
            toValue: isOpen1 ? 0 : 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const toggleDropdown2 = () => {
        setIsOpen2(!isOpen2);
        Animated.timing(animation2, {
            toValue: isOpen2 ? 0 : 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const toggleDropdown3 = () => {
        setIsOpen3(!isOpen3);
        Animated.timing(animation3, {
            toValue: isOpen3 ? 0 : 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    // Select logic
    const handleSelect1 = (value: string) => {
        setSelected1(value);
        toggleDropdown1();
    };

    const handleSelect2 = (value: string) => {
        setSelected2(value);
        toggleDropdown2();
    };

    const handleSelect3 = (value: string) => {
        setSelected3(value);
        toggleDropdown3();
    };

    // Interpolated heights
    const heightInterpolate1 = animation1.interpolate({
        inputRange: [0, 1],
        outputRange: [0, DROPDOWN_OPTIONS_1.length * 33],
    });

    const heightInterpolate2 = animation2.interpolate({
        inputRange: [0, 1],
        outputRange: [0, DROPDOWN_OPTIONS_2.length * 33],
    });

    const heightInterpolate3 = animation3.interpolate({
        inputRange: [0, 1],
        outputRange: [0, DROPDOWN_OPTIONS_3.length * 35],
    });


    // Attendance_Add_Site_Staff

    const dropdownAnim = useRef(new Animated.Value(0)).current;
    const [visible, setVisible] = useState(false);
    const [animating, setAnimating] = useState(false);

    const toggleDropdown = () => {
        if (animating) return;

        setAnimating(true);
        if (!visible) {
        setVisible(true); // set first to mount
        Animated.timing(dropdownAnim, {
            toValue: 1,
            duration: 250,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start(() => setAnimating(false));
        } else {
        Animated.timing(dropdownAnim, {
            toValue: 0,
            duration: 200,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            setVisible(false);
            setAnimating(false);
        });
        }
    };

    const hideDropdown = () => {
        if (!visible || animating) return;
            setAnimating(true);
        Animated.timing(dropdownAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setVisible(false);
            setAnimating(false);
        });
    };

    const translateY2 = dropdownAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-10, 0],
    });

    const opacity = dropdownAnim;


    const ActionButton = ({ label, color, textColor,onPress } : any) => (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.5}
            style={[styles.button, { backgroundColor: color || 'rgba(38,72,231,0.10)' }]}
        >
            <Text style={[FONTS.fontMedium,{fontSize:15, color: textColor || '#2648E7',lineHeight:16 }]}>{label}</Text>
        </TouchableOpacity>
    );

    const ContactRoute = () => (
        <ScrollView 
            contentContainerStyle={{flexGrow:1}} 
            showsVerticalScrollIndicator={false}
        >
            <RBSheet
                ref={ContactsortRef}
                height={300}
                openDuration={250}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                }}
            >
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={[GlobalStyleSheet.container,{paddingTop:25,padding:20,flex:1}]}>
                        <View
                            style={{
                                marginBottom:20,
                            }}
                        >
                            <Text style={[FONTS.fontMedium,{fontSize:18,color:colors.title}]}>Sort</Text>
                        </View>
                        {sortfilter.map((data,index) => {
                            return(
                                <TouchableOpacity
                                    onPress={() => ContactsortRef.current.close()}
                                    key={index} 
                                    style={[GlobalStyleSheet.flexcenter,{paddingBottom:10,borderBottomWidth:1,borderColor:colors.border,gap:20,marginBottom:10}]}
                                >
                                    <Text style={{...FONTS.fontBold,fontSize:14,color:COLORS.primary}}>{data === 'Low to High' || data === 'High to Low' ? '₹': 'A - Z'}</Text>
                                    <Text style={{...FONTS.fontRegular,fontSize:14,color:colors.text,flex:1}}>{data}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
            </RBSheet>
            <View
                style={[GlobalStyleSheet.container,{flex:1,paddingHorizontal:0,padding:10,backgroundColor:colors.background,borderTopLeftRadius:15,borderTopRightRadius:15,zIndex:99}]}
            >
                <DropShadow
                    style={[{
                        shadowColor: '#000000',
                        shadowOffset: {
                            width: 4,
                            height: 4,
                        },
                        shadowOpacity: 0.01,
                        shadowRadius: 6,
                    },Platform.OS === 'ios' && {
                        backgroundColor:'transparent',
                    }]}
                >
                    <View
                        style={[GlobalStyleSheet.container,
                            {
                                padding:0,
                                borderBottomWidth:1,
                                borderColor:'#EEEEEE',
                                position:'relative'
                            }
                        ]}
                    >
                        <LinearGradient
                            colors={
                                theme.dark ?
                                ["rgba(12,16,28,.95)","rgba(12,16,28,1)"]
                                :
                                ["rgba(255,255,255,.0)","#FFFFFF"]
                            }
                            style={{
                                position:'absolute',
                                bottom:0,
                                top:0,
                                left:0,
                                right:0
                            }}
                        />
                        <View style={[GlobalStyleSheet.flexcenter,{paddingHorizontal:20,marginTop:10}]}>
                            <Text style={{...FONTS.fontSemiBold,fontSize:14,color:colors.title}}>1 Team Members</Text>
                            <TouchableOpacity
                                // onPress={() => setshow(!show)}
                                activeOpacity={0.5} 
                                style={{flexDirection:'row',alignItems:'center',gap:5}}
                            >
                                <Text style={[FONTS.fontMedium,{fontSize:15, color:COLORS.primary,lineHeight:16}]}>Manage Access</Text>
                                <FeatherIcon size={16} color={COLORS.primary} name="chevron-right"/>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{marginHorizontal:20}}
                        >
                            <View
                                style={{
                                    width:'100%',
                                    backgroundColor:'rgba(38,72,231,.05)',
                                    borderRadius:8,
                                    borderWidth:1,
                                    borderColor:'rgba(38,72,231,.10)',
                                    padding:20,
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'space-between',
                                    marginVertical:17,
                                }}
                            >
                                <View style={{width:'60%'}}>
                                    <Text style={[FONTS.font,{color:colors.title,opacity:.8}]}>Advance Paid</Text>
                                    <Text style={{...FONTS.fontMedium,fontSize:13,color:'#419A90'}}>₹ 5000 In</Text>
                                </View>
                                <View style={{width:'40%'}}>
                                    <Text style={[FONTS.font,{color:colors.title,opacity:.8}]}>Pending To Pay</Text>
                                    <Text style={{...FONTS.fontMedium,fontSize:13,color:'#DD1951'}}>₹ 27000 Out</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[GlobalStyleSheet.flexcenter,{paddingHorizontal:20,marginTop:10,marginBottom:15}]}>
                            <View style={{flexDirection:'row',alignItems:'center',gap:15}}>
                                <View>
                                    <TouchableOpacity
                                        onPress={toggleDropdown1}
                                        activeOpacity={0.5}
                                        style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                        <Text style={[FONTS.fontLg,{color:colors.title}]}>{selected1}</Text>
                                        <FeatherIcon size={16} color={colors.text} name={isOpen1 ? "chevron-up" : "chevron-down"}/>
                                    </TouchableOpacity>
                                    <Animated.View 
                                        style={[{ 
                                            width:110,
                                            height: heightInterpolate1,
                                            position:'absolute',
                                            top:40,
                                            zIndex:9999,
                                            overflow: 'hidden',
                                            backgroundColor: colors.card,
                                            borderRadius: 8,
                                            elevation: 5,
                                        }]}>
                                        <FlatList
                                            data={DROPDOWN_OPTIONS_1}
                                            keyExtractor={(item) => item}
                                            renderItem={({ item }) => (
                                            <TouchableOpacity 
                                                onPress={() => handleSelect1(item)}
                                                style={{
                                                    paddingVertical:6,
                                                    paddingHorizontal:20,
                                                    flexDirection:'row',
                                                    alignItems:'center',
                                                    gap:10
                                                }}>
                                                <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.text}]}>{item}</Text>
                                            </TouchableOpacity>
                                            )}
                                        />
                                    </Animated.View>
                                </View>
                                <TouchableOpacity
                                    onPress={() => ContactsortRef.current.open()}
                                    activeOpacity={0.5}
                                    style={{
                                        height:40,
                                        width:40,
                                        borderRadius:25,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        position:'absolute',
                                        right:-35
                                    }}
                                >
                                    <Image
                                        style={{height:12,width:12}}
                                        resizeMode='contain'
                                        source={IMAGES.ArrowUpDown}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={openSearchBar}
                                style={{
                                    height:40,
                                    width:40,
                                    borderRadius:25,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    position:'absolute',
                                    right:5
                                }}
                                activeOpacity={0.5}
                            >
                                <FeatherIcon color={COLORS.primary} size={16} name='search'/>
                            </TouchableOpacity>
                            {showSearch && (
                                <Animated.View style={[{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: colors.background,
                                    borderWidth:1,
                                    borderColor:colors.border,
                                    borderRadius: 8,
                                    paddingHorizontal: 10,
                                    height: 40,
                                    width: '65%',
                                    position: 'absolute',
                                    right: 15,
                                    transform: [{ translateX }] 
                                }]}>
                                    <TextInput
                                        placeholder="Search..."
                                        style={[FONTS.font,FONTS.fontMedium,{
                                            color:colors.title,
                                            flex: 1,
                                        }]}
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
                <View
                    style={{
                        paddingHorizontal:20,
                        paddingTop:20,
                        zIndex:-1
                    }}
                >
                    {/* Project Clients Card Start*/}
                    <View style={[GlobalStyleSheet.row]}>
                        {clients.map((item:any,index:any) => {
                            return(
                            <View
                                key={index} 
                                style={[GlobalStyleSheet.col50]}
                            >
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('PartyProjectBalance',{data : item,title:data.title})}
                                    activeOpacity={0.8}
                                    style={{
                                        borderWidth:1,
                                        borderColor:'#EFEFEF',
                                        backgroundColor:colors.card,
                                        borderRadius:8,
                                        marginBottom:10
                                    }}
                                >
                                    <View
                                        style={{
                                            padding:15,
                                            borderBottomWidth:1,
                                            borderBlockColor:'#EFEFEF',
                                            alignItems:'center'
                                        }}
                                    >
                                        <View
                                            style={{
                                                height:40,
                                                width:40,
                                                borderRadius:25,
                                                backgroundColor:item.bgColor,
                                                alignItems:'center',
                                                justifyContent:'center',
                                                marginBottom:8
                                            }}
                                        >
                                            <Text style={{...FONTS.fontMedium,fontSize:18,color:colors.title}}>{item.initial}</Text>
                                        </View>
                                        <Text style={{...FONTS.fontMedium,fontSize:15,color:colors.title,marginBottom:8}}>{item.name}</Text>
                                        <Text style={[FONTS.fontRegular,{fontSize:12,color:colors.text}]}>{item.role}</Text>
                                    </View>
                                    <View
                                        style={[GlobalStyleSheet.row,{padding:13,paddingHorizontal:15}]}
                                    >
                                        <Text numberOfLines={1} style={{...FONTS.fontSemiBold,fontSize:13,color:COLORS.success,flex:1}}>{item.amount}</Text>
                                        <Text style={{...FONTS.fontMedium,fontSize:13,color:colors.text}}>{item.status}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            )
                        })}
                    </View>
                    {/* Project Clients Card End */}
                </View>
            </View>
        </ScrollView>
    );

    const TransactionRoute  = () => (
        <ScrollView 
            contentContainerStyle={{flexGrow:1}} 
            showsVerticalScrollIndicator={false}
        >
            <RBSheet
                ref={refRBSheet}
                height={600}
                openDuration={250}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingHorizontal: 20,
                        paddingTop: 10,
                    },
                }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[GlobalStyleSheet.container,{padding:0}]}
                >
                    {/* Payment Section */}
                    <Text style={[FONTS.fontMedium, styles.sectionTitle]}>Payment</Text>
                    <View style={styles.row}>
                        <ActionButton
                            onPress={() => navigation.navigate('PaymentIn')} 
                            label="Payment In" 
                            color="rgba(39,161,150,.10)" 
                            textColor="#27A196" 
                        />
                        <ActionButton
                            onPress={() => navigation.navigate('PaymentOut')}  
                            label="Payment Out" 
                            color="rgba(221,25,81,.10)" 
                            textColor="#DD1951" 
                        />
                    </View>
                    <View style={styles.row}>
                        <ActionButton
                            onPress={() => navigation.navigate('CreateDebitNote')} 
                            label="Debit Note" 
                        />
                        <ActionButton
                            onPress={() => navigation.navigate('CreateCreditNote')}  
                            label="Credit Note" 
                        />
                    </View>
                    <ActionButton
                        onPress={() => navigation.navigate('Partytoparty')}  
                        label="Party To Party" 
                    />

                    {/* Sales Section */}
                    <Text style={[FONTS.fontMedium, styles.sectionTitle]}>Sales</Text>
                    <ActionButton 
                        label="Sales Invoice" 
                        onPress={() => (refRBSheet.current.close() , SalesSheet.current.open())}
                    />

                    {/* Expense Section */}
                    <Text style={[FONTS.fontMedium, styles.sectionTitle]}>Expense</Text>
                    <View style={styles.row}>
                        <ActionButton 
                            label="Material Purchase" 
                            onPress={() => navigation.navigate('MaterialPurchase')}
                        />
                        <ActionButton 
                            label="Material Return" 
                            onPress={() => navigation.navigate('MaterialReturn')}
                        />
                    </View>
                    <View style={styles.row}>
                        <ActionButton 
                            label="Material Transfer" 
                            onPress={() => navigation.navigate('MaterialTransfer')}
                        />
                        <ActionButton 
                            label="Other Expense" 
                            onPress={() => navigation.navigate('OtherMaterial')}
                        />
                    </View>

                    {/* My Account Section */}
                    <Text style={[FONTS.fontMedium, styles.sectionTitle]}>My Account</Text>
                    <View style={styles.row}>
                        <ActionButton 
                            label="＋ I Paid"  
                            color="rgba(221,25,81,.10)" 
                            textColor="#DD1951" 
                            onPress={() => navigation.navigate('PaidExpense')}
                        />
                        <ActionButton 
                            label="－ I Received" 
                            color="rgba(39,161,150,.10)" 
                            textColor="#27A196"
                            onPress={() => navigation.navigate('ReceivedExpense')} 
                        />
                    </View>
                </ScrollView>
            </RBSheet>
            <RBSheet
                ref={SalesSheet}
                height={250}
                openDuration={250}
                customStyles={{
                    container: {
                        backgroundColor:colors.background,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                    draggableIcon: {
                        backgroundColor: '#ccc', // make sure it's visible
                        width: 60,
                        height: 6,
                        borderRadius: 3,
                        alignSelf: 'center',
                        marginVertical: 10
                    }
                }}
            >
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={[GlobalStyleSheet.container,{paddingTop:25,padding:20,flex:1}]}>
                    <Text style={[FONTS.fontRegular,{fontSize:18,color:colors.title}]}>Clint Details</Text>
                    <View style={{marginBottom:20,marginTop:30 }}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Clint</Text>
                        <CustomInput
                            inputBorder
                            lefticon={<FeatherIcon name='user-plus' size={20} color={colors.text}/>}
                            style={{paddingLeft:50}}
                        />
                    </View>
                    <Button
                        title='Next'
                        onPress={() => navigation.navigate('Salesinvoice')} 
                    />
                </View>
                </ScrollView>
            </RBSheet>
            <View
                style={[GlobalStyleSheet.container,{flex:1,paddingHorizontal:0,padding:10,backgroundColor:colors.background,borderTopLeftRadius:15,borderTopRightRadius:15}]}
            >
                <DropShadow
                    style={[{
                        shadowColor: '#000000',
                        shadowOffset: {
                            width: 4,
                            height: 4,
                        },
                        shadowOpacity: 0.01,
                        shadowRadius: 6,
                    },Platform.OS === 'ios' && {
                        backgroundColor:'transparent',
                    }]}
                >
                    <LinearGradient
                        colors={
                            theme.dark ?
                            ["rgba(12,16,28,.95)","rgba(12,16,28,1)"]
                            :
                            ["rgba(255,255,255,.0)","#FFFFFF"]
                        }
                        style={[GlobalStyleSheet.container,
                            {
                                padding:0,
                                borderBottomWidth:1,
                                borderColor:'#EEEEEE',
                            }
                        ]}
                    >
                        <View style={[GlobalStyleSheet.flexcenter,{gap:10,marginBottom:10,paddingHorizontal:20,paddingTop:10}]}>
                            {summaryCards.map((item,index) => {
                                return(
                                    <View
                                        key={index}
                                        style={{
                                            padding:15,
                                            backgroundColor:item.backgroundColor,
                                            flex:1,
                                            borderRadius:8,
                                            alignItems:'center',
                                            justifyContent:'center',
                                            height:60
                                        }}
                                    >
                                        <Text style={{...FONTS.fontMedium,fontSize:14,color:COLORS.card,opacity:.8,lineHeight:20}}>{item.title}</Text>
                                        <Text style={{...FONTS.fontSemiBold,fontSize:14,color:COLORS.card,lineHeight:20}}>{item.amount}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        <View style={[GlobalStyleSheet.flexcenter,{gap:10,paddingHorizontal:20}]}>
                            <View
                                style={{
                                    padding:15,
                                    backgroundColor:colors.card,
                                    flex:1,
                                    borderWidth:1,
                                    borderColor:'#EFEFEF',
                                    borderRadius:8,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    height:60
                                }}
                            >
                                <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.text,opacity:.8,lineHeight:20}}>Invoice</Text>
                                <Text style={{...FONTS.fontSemiBold,fontSize:14,color:colors.title,lineHeight:20}}>₹ 0</Text>
                            </View>
                            <View
                                style={{
                                    padding:15,
                                    backgroundColor:colors.card,
                                    flex:1,
                                    borderWidth:1,
                                    borderColor:'#EFEFEF',
                                    borderRadius:8,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    height:60
                                }}
                            >
                                <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.text,opacity:.8,lineHeight:20}}>Total Expense</Text>
                                <Text style={{...FONTS.fontSemiBold,fontSize:14,color:colors.title,lineHeight:20}}>₹ 0</Text>
                            </View>
                        </View>
                        <View style={[GlobalStyleSheet.flexcenter,{marginTop:10,marginHorizontal:10,}]}>
                            <TouchableOpacity
                                onPress={() => sheetRef.current.openSheet()}
                                activeOpacity={0.5}
                                style={{
                                    height:40,
                                    width:40,
                                    borderRadius:25,
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <FeatherIcon color={colors.text} size={16} name='filter'/>
                            </TouchableOpacity>
                            <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                <Text style={{...FONTS.fontBold,fontSize:14,color:'#E8B73D',lineHeight:18}}>0</Text>
                                <Text style={{...FONTS.fontRegular,fontSize:14,color:colors.title,lineHeight:18}}>Pending Entries</Text>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    style={{
                                        height:40,
                                        width:40,
                                        borderRadius:25,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginLeft:-15,
                                    }}
                                >
                                    <Ionicons name='ellipsis-vertical' size={16} color={colors.text} style={{opacity:.5}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </DropShadow>
                <View style={{paddingHorizontal:20,paddingTop:15}}>
                    <View>
                        {transactions.map((data,index) => {
                            return(
                                <View
                                    key={index}
                                    style={[GlobalStyleSheet.flexcenter,{
                                        justifyContent:'center',
                                        borderWidth:1,
                                        borderColor:'#EFEFEF',
                                        backgroundColor:colors.card,
                                        padding:15,
                                        borderRadius:8,
                                        marginBottom:10
                                    }]}
                                >
                                    <View style={{flexDirection:'row',alignItems:'center',gap:10,flex:1}}>
                                        <View
                                            style={[{
                                                height:40,
                                                width:40,
                                                borderRadius:6,
                                                backgroundColor:colors.background,
                                                alignItems:'center',
                                                justifyContent:'center'
                                            },data.paymentType === 'Sent & Received' && {
                                                backgroundColor:COLORS.primaryLight
                                            },data.paymentType === 'Received' && {
                                                backgroundColor:'rgba(65,154,144,0.2)'
                                            },data.paymentType === 'Sent' && {
                                                backgroundColor:'rgba(221,25,81,0.2)'
                                            }]}
                                        >
                                            <Image
                                                style={{height:18,width:18,resizeMode:'contain'}}
                                                source={
                                                    data.paymentType === 'Sent & Received' ? 
                                                        IMAGES.ArrowUpDown
                                                    :data.paymentType === 'Received' ? 
                                                        IMAGES.ArrowDownReceived
                                                    :data.paymentType === 'Sent' ? 
                                                        IMAGES.ArrowUpSent
                                                    :
                                                    IMAGES.ArrowUpDown
                                                }
                                            />
                                        </View>
                                        <View>
                                            <Text style={[FONTS.font,{color:colors.text}]}>{data.date}, {data.type}</Text>
                                            <Text numberOfLines={1} style={[FONTS.font,{...FONTS.fontMedium,color:colors.title,flex:1,paddingRight:60}]}>{data.name}</Text>
                                        </View>
                                    </View>
                                    <Text 
                                        style={[{
                                            ...FONTS.fontSemiBold,
                                            fontSize:15,
                                            color:COLORS.success
                                        },data.paymentType === 'Sent' && {
                                            color:COLORS.danger
                                        }]}>{data.amount}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </View>
            <DropShadow
                style={[{
                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 4,
                        height: -4,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 6,
                },Platform.OS === 'ios' && {
                    backgroundColor:'transparent',
                }]}
            >
                <LinearGradient
                    colors={
                        theme.dark ?
                        ["rgba(12,16,28,.95)","rgba(12,16,28,1)"]
                        :
                        ["rgba(255,255,255,.0)","#FFFFFF"]
                    }
                    style={[GlobalStyleSheet.container,
                        {
                            borderTopWidth:1,
                            borderColor:'#EEEEEE',
                            height:70,
                            padding:0,
                            justifyContent:'center'
                        }
                    ]}
                >
                    <View style={[GlobalStyleSheet.flexcenter,{gap:10,paddingHorizontal:20}]}>
                        <View style={{flex:1}}>
                            <Button
                                title='Payment In'
                                color={COLORS.success}
                                style={{
                                    height:40
                                }}
                                onPress={() => navigation.navigate('PaymentIn')}
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => refRBSheet.current.open()}
                                activeOpacity={0.5}
                                style={{
                                    height:40,
                                    width:40,
                                    backgroundColor:'rgba(38,72,231,0.10)',
                                    borderRadius:6,
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}
                            >
                                <FeatherIcon name='plus' size={20} color={COLORS.primary}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1}}>
                            <Button
                                title='Payment Out'
                                color={COLORS.danger}
                                style={{
                                    height:40,
                                    paddingHorizontal: 15,
                                }}
                                onPress={() => navigation.navigate('PaymentOut')}
                            />
                        </View>
                    </View>
                </LinearGradient>
            </DropShadow>
        </ScrollView>
    );

    const SiteRoute  = () => (
        <ScrollView 
            contentContainerStyle={{flexGrow:1}} 
            showsVerticalScrollIndicator={false}
        >
            <View
                style={[
                    GlobalStyleSheet.container,
                    {
                        flex:1,
                        paddingHorizontal:0,
                        padding:10,
                        backgroundColor:colors.background,
                        borderTopLeftRadius:15,
                        borderTopRightRadius:15
                    }
                ]}
            >
                <DropShadow
                    style={[{
                        shadowColor: '#000000',
                        shadowOffset: {
                            width: 4,
                            height: 4,
                        },
                        shadowOpacity: 0.01,
                        shadowRadius: 6,
                    },Platform.OS === 'ios' && {
                        backgroundColor:'transparent',
                    }]}
                >
                    <LinearGradient
                        locations={[0,1]}
                        colors={
                            theme.dark ?
                            ["rgba(12,16,28,.95)","rgba(12,16,28,1)"]
                            :
                            ["rgba(255,255,255,0)","#FFFFFF"]
                        }
                        style={[GlobalStyleSheet.container,
                            {
                                borderBottomWidth:1,
                                borderColor:'#EEEEEE',
                                padding:0
                            }
                        ]}
                    >
                        <View style={[GlobalStyleSheet.flexcenter,{marginTop:10,paddingHorizontal:20,marginBottom:15}]}>
                            <Text style={{...FONTS.fontRegular,fontSize:14,color:colors.title,lineHeight:18}}>Porgress: 0%</Text>
                            <Text style={{...FONTS.fontRegular,fontSize:15,color:colors.title,lineHeight:18}}>Material Requests</Text>
                        </View>
                    </LinearGradient>
                </DropShadow>
                <View style={{paddingHorizontal:20,paddingTop:15}}>
                    <TouchableOpacity
                        onPress={() => setOpen(true)}
                        activeOpacity={0.8}
                        style={{
                            flex: 1,
                            borderRadius: 20,
                            height: 50,
                            paddingHorizontal: 15,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap:5,
                            position:'absolute',
                            left:10,
                            top:10
                        }}
                    >
                        <Text
                            numberOfLines={1}
                            style={{
                                ...FONTS.fontMedium,
                                fontSize: 14,
                                color: COLORS.primary,
                            }}
                        >
                            {format(date, 'dd MMM, EEE')} {/* ➤ like: 26 Jun, Thu */}
                        </Text>
                        <FeatherIcon name="calendar" size={16} color={COLORS.primary} />
                        <DatePicker
                            modal
                            open={open}
                            date={date}
                            onConfirm={(d) => {
                                setOpen(false);
                                setDate(d);
                            }}
                            onCancel={() => setOpen(false)}
                            theme={'light'}
                        />
                    </TouchableOpacity>
                    <View style={[GlobalStyleSheet.row,{marginTop:50,marginBottom:20}]}>
                        {siteCards.map((data,index) => {
                            return(
                                <View
                                    key={index} 
                                    style={[GlobalStyleSheet.col33]}
                                >
                                    <View
                                        style={[{
                                            paddingHorizontal:10,
                                            paddingVertical:15,
                                            paddingBottom:10,
                                            borderRadius:8,
                                            backgroundColor:COLORS.primaryLight,
                                            marginBottom:10
                                        },data.subtitle === 'Present' && {
                                            backgroundColor:'rgba(38,72,231,0.10)'
                                        },data.subtitle === 'Received' && {
                                            backgroundColor:'rgba(39,161,150,0.10)'
                                        },data.subtitle === 'Used' && {
                                            backgroundColor:'rgba(225,25,81,0.10)'
                                        }]}
                                    >
                                        <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.title,lineHeight:18}}>{data.title}</Text>
                                        <Text style={{...FONTS.fontRegular,fontSize:12,color:colors.text,lineHeight:18}}>{data.subtitle}</Text>
                                        <View style={[GlobalStyleSheet.flexcenter,{alignItems:'flex-start',marginTop:5}]}>
                                            <Text style={{...FONTS.fontSemiBold,fontSize:14,color:colors.title,lineHeight:22}}>{data.value}</Text>
                                            <Image
                                                resizeMode='contain'
                                                style={{height:16,width:16,opacity:.5}}
                                                source={data.icon}
                                            />
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                    <View style={[GlobalStyleSheet.flexcenter,{marginBottom:20}]}>
                        <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.title,flex:1}}>Site Photo</Text>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={{flexDirection:'row',alignItems:'center'}}
                        >
                            <Text style={[FONTS.font,{color:COLORS.primary}]}>View All</Text>
                            <FeatherIcon name='chevron-right' size={20} color={COLORS.primary}/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                    >
                        <View 
                            style={{
                                marginBottom:10,
                                flexDirection:'row',
                                alignItems:'center',
                                gap:10,
                            }}
                        >
                            <TouchableOpacity 
                                style={{
                                    height:60,
                                    width:60,
                                    borderRadius:6,
                                    backgroundColor:'rgba(38,72,231,0.10)',
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}
                                onPress={pickImage}
                            >
                                <Image
                                    resizeMode='contain'
                                    style={{
                                        height:34,
                                        width:34,
                                    }}
                                    source={IMAGES.camera2}
                                />
                            </TouchableOpacity>
                            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                {images.map((img: { uri: any; }, index: React.Key | null | undefined) => (
                                    <Image
                                        key={index}
                                        source={{ uri: img.uri }}
                                        style={{
                                            height:60,
                                            width:60,
                                            borderRadius:6,
                                        }}
                                    />
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                    <View style={[GlobalStyleSheet.flexcenter,{marginBottom:20,marginTop:10}]}>
                        <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.title,flex:1}}>Ongoing Tasks</Text>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={{flexDirection:'row',alignItems:'center'}}
                        >
                            <Text style={[FONTS.font,{color:COLORS.primary}]}>View All</Text>
                            <FeatherIcon name='chevron-right' size={20} color={COLORS.primary}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View
                style={[GlobalStyleSheet.container,{backgroundColor:colors.background}]}
            >
                <Button
                    title='Create DPR'
                />
            </View>
        </ScrollView>
    );

    const TaskRoute   = () => (
        <ScrollView 
            contentContainerStyle={{flexGrow:1}} 
            showsVerticalScrollIndicator={false}
        >
            <View
                style={[GlobalStyleSheet.container,{flex:1,paddingHorizontal:0,padding:10,backgroundColor:colors.background,borderTopLeftRadius:15,borderTopRightRadius:15,zIndex:999}]}
            >
                <DropShadow
                    style={[{
                        shadowColor: '#000000',
                        shadowOffset: {
                            width: 4,
                            height: 4,
                        },
                        shadowOpacity: 0.01,
                        shadowRadius: 6,
                    },Platform.OS === 'ios' && {
                        backgroundColor:'transparent',
                    }]}
                >
                    <View
                        style={[GlobalStyleSheet.container,
                            {
                                borderBottomWidth:1,
                                borderColor:'#EEEEEE',
                            }
                        ]}
                    >
                        <LinearGradient
                            colors={
                                theme.dark ?
                                ["rgba(12,16,28,.95)","rgba(12,16,28,1)"]
                                :
                                ["rgba(255,255,255,.0)","#FFFFFF"]
                            }
                            style={{
                                position:'absolute',
                                bottom:0,
                                left:0,
                                right:0
                            }}
                        />
                        <View style={[GlobalStyleSheet.flexcenter,{gap:10,marginBottom:10}]}>
                            {taskStatusCards.map((item,index) => {
                                return(
                                    <View
                                        key={index}
                                        style={{
                                            padding:15,
                                            backgroundColor:item.backgroundColor,
                                            flex:1,
                                            borderRadius:8,
                                            alignItems:'center',
                                            justifyContent:'center',
                                            height:60
                                        }}
                                    >
                                        <Text style={[FONTS.font,{color:COLORS.card,opacity:.8}]}>{item.title}</Text>
                                        <Text style={{...FONTS.fontSemiBold,fontSize:14,color:COLORS.card,lineHeight:20}}>{item.amount}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        <View style={[GlobalStyleSheet.flexcenter,{paddingHorizontal:5,marginTop:10}]}>
                            <View style={{flexDirection:'row',alignItems:'center',gap:20}}>
                                <View>
                                    <TouchableOpacity
                                        onPress={toggleDropdown2}
                                        activeOpacity={0.5}
                                        style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                        <Text style={[FONTS.fontLg,{color:colors.title}]}>{selected2}</Text>
                                        <FeatherIcon size={16} color={colors.text} name={isOpen2 ? "chevron-up" : "chevron-down"}/>
                                    </TouchableOpacity>
                                    <Animated.View 
                                        style={[{ 
                                            width:160,
                                            height: heightInterpolate2,
                                            position:'absolute',
                                            top:40,
                                            zIndex:99,
                                            overflow: 'hidden',
                                            backgroundColor: colors.card,
                                            borderRadius: 8,
                                            elevation: 5,
                                        }]}>
                                        <FlatList
                                            data={DROPDOWN_OPTIONS_2}
                                            keyExtractor={(item) => item}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity 
                                                    onPress={() => handleSelect2(item)}
                                                    style={{
                                                        paddingVertical:6,
                                                        paddingHorizontal:20,
                                                        flexDirection:'row',
                                                        alignItems:'center',
                                                        gap:10
                                                    }}>
                                                    <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.text}]}>{item}</Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </Animated.View>
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.5} 
                                    style={{flexDirection:'row',alignItems:'center',gap:3}}
                                >
                                    <Text style={[FONTS.font,{color:colors.title}]}>Statues</Text>
                                    <FeatherIcon size={16} color={colors.text} name="chevron-down"/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.5} 
                                    style={{flexDirection:'row',alignItems:'center',gap:3}}
                                >
                                    <Text style={[FONTS.font,{color:colors.title}]}>Member</Text>
                                    <FeatherIcon size={16} color={colors.text} name="chevron-down"/>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={openSearchBar}
                                style={{
                                    height:40,
                                    width:40,
                                    borderRadius:25,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    position:'absolute',
                                    right:-5
                                }}
                                activeOpacity={0.5}
                            >
                                <FeatherIcon color={COLORS.primary} size={16} name='search'/>
                            </TouchableOpacity>
                            {showSearch && (
                                <Animated.View style={[{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: colors.background,
                                    borderWidth:1,
                                    borderColor:colors.border,
                                    borderRadius: 8,
                                    paddingHorizontal: 10,
                                    height: 40,
                                    width: '90%',
                                    position: 'absolute',
                                    left: 0,
                                    transform: [{ translateX }] 
                                }]}>
                                    <TextInput
                                        placeholder="Search..."
                                        style={[FONTS.font,FONTS.fontMedium,{
                                            color:colors.title,
                                            flex: 1,
                                        }]}
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
                <View style={{paddingHorizontal:20,paddingTop:15,zIndex:-1}}>
                    <View>
                        {taskSchedules.map((data,index) => {
                            return(
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.8}
                                    style={[GlobalStyleSheet.flexcenter,{
                                        justifyContent:'center',
                                        borderWidth:1,
                                        borderColor:'#EFEFEF',
                                        backgroundColor:colors.card,
                                        padding:15,
                                        borderRadius:8,
                                        marginBottom:10
                                    }]}
                                    onPress={() => navigation.navigate('TaskDetails',{data : data })}
                                >
                                    <View style={{flexDirection:'row',alignItems:'center',gap:10,flex:1}}>
                                        <View
                                            style={[{
                                                height:40,
                                                width:40,
                                                borderRadius:6,
                                                backgroundColor:data.backgroundColor,
                                                alignItems:'center',
                                                justifyContent:'center'
                                            }]}
                                        >
                                            <Text style={{...FONTS.fontMedium,fontSize:18,color:COLORS.title}}>{data.number}</Text>
                                        </View>
                                        <View style={{flex:1}}>
                                            <Text style={[FONTS.font,{color:colors.text,fontSize:12}]}>{data.dateRange}</Text>
                                            <Text numberOfLines={1} style={[FONTS.font,{...FONTS.fontMedium,color:colors.title,flex:1,paddingRight:60}]}>{data.siteName}</Text>
                                        </View>
                                    </View>
                                    <View style={{alignItems:'flex-end',gap:3,position:'absolute',right:15}}>
                                        <Text style={[FONTS.font,{color:colors.text,fontSize:12}]}>Last Updated: {data.lastUpdated}</Text>
                                        <Text style={[FONTS.font,{color:colors.text}]}>{data.progress}</Text>
                                        {data.status.label === 'OnGoing' &&
                                            <Text style={{...FONTS.fontSemiBold,fontSize:12,color:COLORS.danger,opacity:.5}}>{data.status.sublabel}</Text>
                                        }
                                        {data.status.label === 'Start' &&
                                            <View style={{flexDirection:'row',alignItems:'center',gap:3}}>
                                                <View
                                                    style={{
                                                        height:8,
                                                        width:8,
                                                        borderRadius:15,
                                                        backgroundColor:COLORS.success
                                                    }}
                                                />
                                                <Text style={{...FONTS.fontSemiBold,fontSize:12,color:COLORS.success}}>{data.status.label}</Text>
                                            </View>
                                        }
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </View>
            <View
                style={[GlobalStyleSheet.container,{backgroundColor:colors.background}]}
            >
                <Button
                    title='Add New Task'
                    icon={<FeatherIcon name='plus' color={COLORS.card} size={18}/>}
                    onPress={() => navigation.navigate('AddTask')}
                />
            </View>
        </ScrollView>
    );

    const AttendanceRoute   = () => (
        <ScrollView 
            contentContainerStyle={{flexGrow:1}} 
            showsVerticalScrollIndicator={false}
        >
            <View
                style={[GlobalStyleSheet.container,{flex:1,paddingHorizontal:0,padding:10,backgroundColor:colors.background,borderTopLeftRadius:15,borderTopRightRadius:15,zIndex:999}]}
            >
                <DropShadow
                    style={[{
                        shadowColor: '#000000',
                        shadowOffset: {
                            width: 4,
                            height: 4,
                        },
                        shadowOpacity: 0.01,
                        shadowRadius: 6,
                    },Platform.OS === 'ios' && {
                        backgroundColor:'transparent',
                    }]}
                >
                    <View
                        style={[GlobalStyleSheet.container,
                            {
                                borderBottomWidth:1,
                                borderColor:'#EEEEEE',
                                paddingTop:0,
                                position:'relative'
                            }
                        ]}
                    >
                        <LinearGradient
                            colors={
                                theme.dark ?
                                ["rgba(12,16,28,.95)","rgba(12,16,28,1)"]
                                :
                                ["rgba(255,255,255,.0)","#FFFFFF"]
                            }
                            style={{
                                position:'absolute',
                                left:0,
                                right:0,
                                bottom:0
                            }}
                        />
                        <View style={[{paddingTop:5,marginHorizontal:-15,}]}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                <View style={{flexDirection:'row',alignItems:'center',gap:10,justifyContent:'center',paddingHorizontal:15}}>
                                    {filterOptions.map((data,index) => {
                                        return( 
                                            <TouchableOpacity
                                                onPress={() => setfilterSelect(data.id)}
                                                key={index}
                                                activeOpacity={0.5}
                                                style={[{
                                                    height:42,
                                                    borderRadius:8,
                                                    paddingHorizontal:33,
                                                    borderWidth:1,
                                                    borderColor:'rgba(80,88,109,0.5)',
                                                    alignItems:'center',
                                                    justifyContent:'center'
                                                },filterSelect === data.id && {
                                                    backgroundColor:'rgba(38,72,231,0.10)',
                                                    borderColor:COLORS.primary
                                                }]}
                                            >
                                                <Text 
                                                    style={[{
                                                        ...FONTS.fontMedium,
                                                        fontSize:12,
                                                        color:colors.text
                                                    },filterSelect === data.id && {
                                                        color:COLORS.title
                                                    }]}
                                                >{data.title}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                        <View
                            style={{
                                borderWidth:1,
                                borderColor:'#EFEFEF',
                                backgroundColor:colors.card,
                                borderRadius:8,
                                padding:10,
                                flexDirection:'row',
                                alignItems:'center',
                                marginVertical:35
                            }}
                        >
                            <View
                                style={[GlobalStyleSheet.col50,{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'center',
                                }]}
                            >   
                                <TouchableOpacity
                                    activeOpacity={0.5} 
                                    onPress={goPreviousDay} 
                                    style={{padding:8}}
                                >
                                    <ChevronLeft size={22} color="#4a4a4a" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setShowPicker(true)} 
                                    activeOpacity={0.5}
                                    style={{
                                        height:65,
                                        width:65,
                                        borderRadius:10,
                                        backgroundColor:COLORS.secondary,
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}
                                >
                                    <Text style={{...FONTS.fontMedium,fontSize:17,color:COLORS.card,lineHeight:22}}>{selectedDate.format('DD')}</Text>
                                    <Text style={{...FONTS.fontMedium,fontSize:17,color:COLORS.card,lineHeight:20}}>{selectedDate.format('MMM')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.5} 
                                    onPress={goNextDay} 
                                    style={{padding:8}}
                                >
                                    <ChevronRight size={22} color="#4a4a4a" />
                                </TouchableOpacity>
                                {/* Date Picker Modal */}
                                {showPicker && (
                                    <DateTimePicker
                                        value={selectedDate.toDate()}
                                        mode="date"
                                        display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                                        onChange={onDateChange}
                                        maximumDate={new Date()}
                                    />
                                )}
                            </View>
                            <View
                                style={[GlobalStyleSheet.col50,{
                                    paddingLeft:20
                                }]}
                            >
                                <View
                                    style={{
                                        flexDirection:'column',
                                        alignItems:'flex-start',
                                        justifyContent:'center',
                                        gap:10
                                    }}
                                >
                                    {ATTENDANCE_STATS.map((data,index) => {
                                        return(
                                            <View
                                                key={index}
                                                style={{
                                                    flexDirection:'row',
                                                    alignItems:'center',
                                                    gap:8
                                                }}
                                            >
                                                <View
                                                    style={[{
                                                        height:30,
                                                        width:30,
                                                        borderRadius:6,
                                                        alignItems:'center',
                                                        justifyContent:'center',
                                                        backgroundColor:colors.background
                                                    },data.id === 'present' && {
                                                        backgroundColor:'rgba(65,144,154,0.2)'
                                                    },data.id === 'absent' && {
                                                        backgroundColor:'rgba(221,25,81,0.2)'
                                                    },data.id === 'plwo' && {
                                                        backgroundColor:'rgba(38,72,231,0.2)'
                                                    }]}
                                                >
                                                    <Text style={{...FONTS.fontMedium,fontSize:16,color:colors.title}}>{data.count}</Text>
                                                </View>
                                                <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.title}}>{data.label}</Text>
                                            </View>
                                        )
                                    })}
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    style={{
                                        height:40,
                                        width:40,
                                        borderRadius:50,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        position:'absolute',
                                        right:-5,
                                        top:-5
                                    }}
                                >
                                    <FeatherIcon name='share-2' size={18} color={COLORS.primary}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[GlobalStyleSheet.flexcenter,{paddingHorizontal:5,marginTop:10}]}>
                            <View>
                                <TouchableOpacity
                                    onPress={toggleDropdown1}
                                    activeOpacity={0.5}
                                    style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                    <Text style={[FONTS.fontLg,{color:colors.title}]}>{selected1}</Text>
                                    <FeatherIcon size={16} color={colors.text} name={isOpen1 ? "chevron-up" : "chevron-down"}/>
                                </TouchableOpacity>
                                <Animated.View 
                                    style={[{ 
                                        width:110,
                                        height: heightInterpolate1,
                                        position:'absolute',
                                        top:40,
                                        zIndex:99,
                                        overflow: 'hidden',
                                        backgroundColor: colors.card,
                                        borderRadius: 8,
                                        elevation: 5,
                                    }]}>
                                    <FlatList
                                        data={DROPDOWN_OPTIONS_1}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }) => (
                                        <TouchableOpacity 
                                            onPress={() => handleSelect1(item)}
                                            style={{
                                                paddingVertical:6,
                                                paddingHorizontal:20,
                                                flexDirection:'row',
                                                alignItems:'center',
                                                gap:10
                                            }}>
                                            <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.text}]}>{item}</Text>
                                        </TouchableOpacity>
                                        )}
                                    />
                                </Animated.View>
                            </View>
                            <View style={{ zIndex: 99 }}>
                                {/* Trigger Button */}
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={toggleDropdown}
                                    style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
                                >
                                    <FeatherIcon color={COLORS.primary} size={18} name="plus" />
                                    <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: COLORS.primary }}>
                                        Add Site Staff
                                    </Text>
                                    <FeatherIcon
                                        size={16}
                                        color={COLORS.primary}
                                        style={{ opacity: 0.5 }}
                                        name={visible ? 'chevron-up' : 'chevron-down'}
                                    />
                                </TouchableOpacity>
    
                                {/* Overlay Click Dismiss */}
                                {visible && (
                                    <TouchableWithoutFeedback onPress={hideDropdown}>
                                        <View
                                            style={{
                                                ...StyleSheet.absoluteFillObject,
                                                backgroundColor: 'transparent',
                                                zIndex: 1,
                                            }}
                                        />
                                    </TouchableWithoutFeedback>
                                )}
    
                                {/* Dropdown */}
                                {visible && (
                                    <Animated.View
                                        style={{
                                                position: 'absolute',
                                                top: 40,
                                                right: 0,
                                                zIndex: 2,
                                                opacity,
                                                transform: [{ translateY: translateY2 }],
                                            }}
                                        >
                                        <DropShadow
                                            style={{
                                                shadowColor: 'rgb(18,9,46)',
                                                shadowOffset: { width: 0, height: 4 },
                                                shadowOpacity: 0.1,
                                                shadowRadius: 5,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    padding: 20,
                                                    paddingVertical:10,
                                                    borderRadius: 8,
                                                    backgroundColor: colors.card,
                                                    width: 150,
                                                }}
                                            >
                                                {dropdownData.map((item, index) => (
                                                    <TouchableOpacity
                                                        key={index}
                                                        activeOpacity={0.8}
                                                        onPress={() => {
                                                            navigation.navigate('SelectParty');
                                                            hideDropdown();
                                                        }}
                                                        style={{ paddingVertical: 10 }}
                                                    >
                                                        <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text }}>
                                                            {item.label}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </DropShadow>
                                    </Animated.View>
                                )}
                            </View>
                        </View>
                    </View>
                </DropShadow>
                <View
                    style={{
                        paddingHorizontal:20,
                        paddingTop:20,
                        zIndex:-1
                    }}
                >
                    {/* ATTENDANCE_CARDS Start*/}
                    <View style={[GlobalStyleSheet.row]}>
                        {ATTENDANCE_CARDS.map((data:any, index:any) => {

                            const [modalVisible, setModalVisible] = useState<any>(false);
                            const [selectedStatus, setSelectedStatus] = useState<any>(data.status.label);

                            return(
                                <View
                                    key={index}
                                    style={[GlobalStyleSheet.col50]}
                                > 
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('AttendanceDetails', {data :data})}
                                        activeOpacity={0.8}
                                        style={{
                                            backgroundColor:colors.card,
                                            borderRadius:6,
                                            borderWidth:1,
                                            borderColor:'#EFEFEF',
                                            marginBottom:10,
                                            overflow:'hidden'
                                        }}
                                    >
                                        <View
                                            style={[GlobalStyleSheet.flexcenter,{
                                                padding:15,
                                                borderBottomWidth:1,
                                                borderColor:'#EFEFEF',
                                                alignItems:'flex-start'
                                            }]}
                                        >
                                            <View>
                                                <View style={{flexDirection:'row',alignItems:'center',gap:5,}}>
                                                    <View
                                                        style={{
                                                            height:18,
                                                            width:18,
                                                            borderRadius:25,
                                                            backgroundColor:'#D1E4C1',
                                                            alignItems:'center',
                                                            justifyContent:'center'
                                                        }}
                                                    >
                                                        <Text style={{...FONTS.fontMedium,fontSize:8,color:colors.title}}>W</Text>
                                                    </View>
                                                    <Text style={[FONTS.font,{color:colors.text}]}>{data.user}</Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity
                                                activeOpacity={0.5}
                                                style={{
                                                    height:45,
                                                    width:45,
                                                    borderRadius:25,
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                    position:'absolute',
                                                    right:0,
                                                    top:0
                                                }}
                                            >
                                                <Ionicons name='ellipsis-vertical' size={16} color={colors.text}/>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={{
                                                padding:15,
                                                paddingBottom:10
                                            }}
                                        >
                                            <TouchableOpacity
                                                activeOpacity={0.7}
                                                onPress={() => setModalVisible(true)}
                                                style={[
                                                GlobalStyleSheet.flexcenter,
                                                {
                                                    height: 24,
                                                    borderRadius: 3,
                                                    paddingHorizontal: 10,
                                                    backgroundColor: statusStyles[selectedStatus]?.bgColor || colors.background,
                                                },
                                                ]}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                    <View
                                                        style={{
                                                        height: 8,
                                                        width: 8,
                                                        borderRadius: 5,
                                                        backgroundColor: statusStyles[selectedStatus]?.dotColor || colors.text,
                                                        }}
                                                    />
                                                    <Text
                                                        style={{
                                                        ...FONTS.fontSemiBold,
                                                        fontSize: 12,
                                                        color: statusStyles[selectedStatus]?.textColor || colors.text,
                                                        }}
                                                    >
                                                        {selectedStatus}
                                                    </Text>
                                                </View>
                                                <FeatherIcon size={16} color={'#50586D80'} name="chevron-down" />
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
                                                        width:250,
                                                        backgroundColor: colors.card,
                                                        borderRadius:6,
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                        padding:20,
                                                        borderBottomWidth:1,
                                                        borderColor:colors.border,
                                                        paddingHorizontal:20
                                                        }}
                                                    >
                                                        <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title}}>Select Status</Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            paddingHorizontal:25
                                                        }}
                                                    >
                                                        {Object.keys(statusStyles).map((status) => (
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
                                                                        backgroundColor: statusStyles[status].dotColor,
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
                            )
                        })}
                    </View>
                    {/* ATTENDANCE_CARDS End*/}
                </View>
            </View>
        </ScrollView>
    );

    const MaterialRoute   = () => (
        <ScrollView 
            contentContainerStyle={{flexGrow:1}} 
            showsVerticalScrollIndicator={false}
        >
            <View
                style={[GlobalStyleSheet.container,{
                    flex:1,
                    paddingHorizontal:0,
                    padding:10,
                    backgroundColor:colors.background,
                    borderTopLeftRadius:15,
                    borderTopRightRadius:15,
                    zIndex:999
                }]}
            >
                <DropShadow
                    style={[{
                        shadowColor: '#000000',
                        shadowOffset: {
                            width: 4,
                            height: 4,
                        },
                        shadowOpacity: 0.01,
                        shadowRadius: 6,
                    },Platform.OS === 'ios' && {
                        backgroundColor:'transparent',
                    }]}
                >
                    <View
                        style={[GlobalStyleSheet.container,
                            {
                                borderBottomWidth:1,
                                borderColor:'#EEEEEE',
                                paddingTop:0,
                                position:'relative'
                            }
                        ]}
                    >
                        <LinearGradient
                            colors={
                                theme.dark ?
                                ["rgba(12,16,28,.95)","rgba(12,16,28,1)"]
                                :
                                ["rgba(255,255,255,.0)","#FFFFFF"]
                            }
                            style={{
                                position:'absolute',
                                left:0,
                                right:0,
                                bottom:0
                            }}
                        />
                        <View style={[{paddingTop:5,marginHorizontal:-15,marginBottom:30}]}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                <View style={{flexDirection:'row',alignItems:'center',gap:10,justifyContent:'center',paddingHorizontal:15}}>
                                    {MaterialOptions.map((data,index) => {
                                        return( 
                                            <TouchableOpacity
                                                onPress={() => handleTabChange(data.id)}
                                                key={index}
                                                activeOpacity={0.5}
                                                style={[{
                                                    height:42,
                                                    borderRadius:8,
                                                    paddingHorizontal:17,
                                                    borderWidth:1,
                                                    borderColor:'rgba(80,88,109,0.5)',
                                                    alignItems:'center',
                                                    justifyContent:'center'
                                                },MaterialSelect === data.id && {
                                                    backgroundColor:'rgba(38,72,231,0.10)',
                                                    borderColor:COLORS.primary
                                                }]}
                                            >
                                                <Text 
                                                    style={[{
                                                        ...FONTS.fontMedium,
                                                        fontSize:14,
                                                        color:colors.text
                                                    },MaterialSelect === data.id && {
                                                        color:COLORS.title
                                                    }]}
                                                >{data.title}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                        <View style={[GlobalStyleSheet.flexcenter,{paddingHorizontal:5,marginTop:10}]}>
                            {(MaterialSelect === 'inventory' || MaterialSelect === 'received' || MaterialSelect === 'used') && (
                                <TouchableOpacity
                                    onPress={openSearchBar}
                                    activeOpacity={0.5} 
                                    style={{flexDirection:'row',alignItems:'center',gap:3}}
                                >
                                    <FeatherIcon size={16} color={COLORS.primary} name="search"/>
                                </TouchableOpacity>
                            )}
                            {MaterialSelect === 'request' &&
                                <View>
                                    <TouchableOpacity
                                        onPress={toggleDropdown3}
                                        activeOpacity={0.5}
                                        style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                        <Text style={[FONTS.fontLg,{color:colors.title}]}>{selected3}</Text>
                                        <FeatherIcon size={16} color={colors.text} name={isOpen3 ? "chevron-up" : "chevron-down"}/>
                                    </TouchableOpacity>
                                    <Animated.View 
                                        style={[{ 
                                            width:120,
                                            height: heightInterpolate3,
                                            position:'absolute',
                                            top:40,
                                            zIndex:99,
                                            overflow: 'hidden',
                                            backgroundColor: colors.card,
                                            borderRadius: 8,
                                            elevation: 5,
                                        }]}>
                                        <FlatList
                                            data={DROPDOWN_OPTIONS_3}
                                            keyExtractor={(item) => item}
                                            renderItem={({ item }) => (
                                            <TouchableOpacity 
                                                onPress={() => handleSelect3(item)}
                                                style={{
                                                    paddingVertical:6,
                                                    paddingHorizontal:20,
                                                    flexDirection:'row',
                                                    alignItems:'center',
                                                    gap:10
                                                }}>
                                                <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.text}]}>{item}</Text>
                                            </TouchableOpacity>
                                            )}
                                        />
                                    </Animated.View>
                                </View>
                            }
                            <View style={{flexDirection:'row',alignItems:'center',gap:20}}>
                                {MaterialSelect === 'request' &&
                                    <TouchableOpacity
                                        onPress={openSearchBar}
                                        activeOpacity={0.5} 
                                        style={{flexDirection:'row',alignItems:'center',gap:3}}
                                    >
                                        <FeatherIcon size={16} color={colors.text} name="search"/>
                                    </TouchableOpacity>
                                }
                                {MaterialSelect === 'inventory' &&
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('AddMaterialReturn')}
                                        activeOpacity={0.5} 
                                        style={{flexDirection:'row',alignItems:'center',gap:8}}
                                    >
                                        <FeatherIcon size={18} name='plus' color={COLORS.primary}/>
                                        <Text style={[FONTS.font,{...FONTS.fontMedium, color:COLORS.primary,}]}>Add Material</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            {showSearch && (
                                <Animated.View style={[{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: colors.background,
                                    borderWidth:1,
                                    borderColor:colors.border,
                                    borderRadius: 8,
                                    paddingHorizontal: 10,
                                    height: 40,
                                    width: '65%',
                                    position: 'absolute',
                                    left: 0,
                                    transform: [{ translateX }] 
                                }]}>
                                    <TextInput
                                        placeholder="Search..."
                                        style={[FONTS.font,FONTS.fontMedium,{
                                            color:colors.title,
                                            flex: 1,
                                        }]}
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
                <View
                    style={{paddingHorizontal:20,paddingTop:20,zIndex:-1}}
                >
                    <Animated.View style={{
                        opacity: fadeAnim,
                        transform: [{ translateY }],
                    }}>
                        {MaterialSelect === 'inventory' && (
                            <View
                                style={[GlobalStyleSheet.row]}
                            >   
                                {InventoryData.map((data,index) => {
                                    return(
                                        <View
                                            key={index}
                                            style={[GlobalStyleSheet.col50]}
                                        >
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                style={{
                                                    backgroundColor:colors.card,
                                                    borderRadius:6,
                                                    borderWidth:1,
                                                    borderColor:'#EFEFEF',
                                                    marginBottom:10,
                                                    overflow:'hidden'
                                                }}
                                            >
                                                <View
                                                    style={[{
                                                        padding:15,
                                                        borderBottomWidth:1,
                                                        borderColor:'#EFEFEF',
                                                        alignItems:'center'
                                                    }]}
                                                >
                                                    <View>
                                                        <View style={{flexDirection:'row',alignItems:'center',gap:5,}}>
                                                            <View
                                                                style={{
                                                                    height:18,
                                                                    width:18,
                                                                    borderRadius:25,
                                                                    backgroundColor:'#D1E4C1',
                                                                    alignItems:'center',
                                                                    justifyContent:'center'
                                                                }}
                                                            >
                                                                <Text style={{...FONTS.fontMedium,fontSize:8,color:colors.title}}>W</Text>
                                                            </View>
                                                            <Text style={[FONTS.font,{...FONTS.fontMedium, color:colors.title,opacity:.8}]}>{data.name}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View
                                                    style={{alignItems:'center',paddingVertical:15}}
                                                >
                                                    <CheckoutItems
                                                        quantity={data.quantity}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </View>
                        )}
                        {MaterialSelect === 'request' && (
                            <View>
                                {requestData.map((data,index) => {
                                    return(
                                        <View
                                            key={index}
                                            style={[GlobalStyleSheet.flexcenter,{
                                                padding:15,
                                                backgroundColor:colors.card,
                                                borderWidth:1,
                                                borderRadius:8,
                                                borderColor:'#EFEFEF',
                                                marginBottom:10
                                            }]}
                                        >
                                            <View
                                                style={{
                                                    flexDirection:'row',
                                                    alignItems:'center',
                                                    gap:10,
                                                    flex:1
                                                }}
                                            >
                                                <View
                                                    style={[{
                                                        height:40,
                                                        width:40,
                                                        borderRadius:6,
                                                        alignItems:'center',
                                                        justifyContent:'center',
                                                        backgroundColor:'rgba(65,154,144,0.2)',
                                                        paddingHorizontal:5
                                                    }]}
                                                >
                                                    <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.title,textAlign:'center',lineHeight:14}}>{data.date}</Text>
                                                </View>
                                                <View style={{position:'absolute',left:50}}>
                                                    <Text style={[FONTS.font,{...FONTS.fontMedium, color:colors.title,}]}>{data.name}</Text>
                                                    <Text style={[FONTS.font,{fontSize:12, color:colors.text,opacity:0.8}]}>{data.location}</Text>
                                                    <Text style={[FONTS.font,{fontSize:12,color:colors.text,opacity:0.8}]}>in Stock : {data.stock}</Text>
                                                </View>
                                            </View>
                                            <View style={{alignItems:'flex-end',}}>
                                                <Text style={[FONTS.font,{color:colors.text}]}>{data.requestedQty} <Text style={{fontSize:12}}>Numbers</Text></Text>
                                                <TouchableOpacity
                                                    activeOpacity={0.5} 
                                                    style={{flexDirection:'row',alignItems:'center',gap:3}}
                                                >
                                                    <Text style={[FONTS.font,{fontSize:12,color:COLORS.success,textTransform:'uppercase'}]}>{data.status}</Text>
                                                    <FeatherIcon name='chevron-down' size={15} color={COLORS.success}/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        )}
                        {MaterialSelect === 'received' && (
                            <View>
                                {receivedData.map((data,index) => {
                                    return(
                                        <View
                                            key={index}
                                            style={[GlobalStyleSheet.flexcenter,{
                                                padding:15,
                                                backgroundColor:colors.card,
                                                borderWidth:1,
                                                borderRadius:8,
                                                borderColor:'#EFEFEF',
                                                marginBottom:10
                                            }]}
                                        >
                                            <View
                                                style={{
                                                    flexDirection:'row',
                                                    alignItems:'center',
                                                    gap:10,
                                                    flex:1
                                                }}
                                            >
                                                <View
                                                    style={[{
                                                        height:40,
                                                        width:40,
                                                        borderRadius:6,
                                                        alignItems:'center',
                                                        justifyContent:'center',
                                                        backgroundColor:'rgba(65,154,144,0.2)',
                                                        paddingHorizontal:5
                                                    }]}
                                                >
                                                    <Text style={{...FONTS.fontMedium,fontSize:18,color:colors.title,textAlign:'center',lineHeight:14}}>W</Text>
                                                </View>
                                                <View style={{position:'absolute',left:50}}>
                                                    <Text style={[FONTS.font,{fontSize:12, color:colors.text,opacity:0.8}]}>{data.date}</Text>
                                                    <Text style={[FONTS.font,{...FONTS.fontMedium, color:colors.title,}]}>{data.name}</Text>
                                                    <Text style={[FONTS.font,{fontSize:12,color:colors.text,opacity:0.8}]}>Party : {data.party}</Text>
                                                </View>
                                            </View>
                                            <View style={{alignItems:'flex-end',}}>
                                                <Text style={[FONTS.h6,{color:COLORS.success}]}>+ {data.quantity}</Text>
                                                <Text style={[FONTS.font,{...FONTS.fontSemiBold,color:COLORS.success}]}>Numbers</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        )}
                        {MaterialSelect === 'used' && (
                            <View>
                                 {usedData.map((data,index) => {
                                    return(
                                        <View
                                            key={index}
                                            style={[GlobalStyleSheet.flexcenter,{
                                                padding:15,
                                                backgroundColor:colors.card,
                                                borderWidth:1,
                                                borderRadius:8,
                                                borderColor:'#EFEFEF',
                                                marginBottom:10
                                            }]}
                                        >
                                            <View
                                                style={{
                                                    flexDirection:'row',
                                                    alignItems:'center',
                                                    gap:10,
                                                    flex:1
                                                }}
                                            >
                                                <View
                                                    style={[{
                                                        height:40,
                                                        width:40,
                                                        borderRadius:6,
                                                        alignItems:'center',
                                                        justifyContent:'center',
                                                        backgroundColor:'rgba(65,154,144,0.2)',
                                                        paddingHorizontal:5
                                                    }]}
                                                >
                                                    <Text style={{...FONTS.fontMedium,fontSize:18,color:colors.title,textAlign:'center',lineHeight:14}}>W</Text>
                                                </View>
                                                <View>
                                                    <Text style={[FONTS.font,{fontSize:12, color:colors.text,opacity:0.8}]}>{data.date}</Text>
                                                    <Text style={[FONTS.font,{...FONTS.fontMedium, color:colors.title,}]}>{data.name}</Text>
                                                </View>
                                            </View>
                                            <View style={{alignItems:'flex-end',}}>
                                                <Text style={[FONTS.h6,{color:COLORS.danger}]}>- {data.quantity}</Text>
                                                <Text style={[FONTS.font,{...FONTS.fontSemiBold,color:COLORS.danger}]}>Numbers</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        )}
                    </Animated.View>
                </View>
            </View>
            <DropShadow
                style={[{
                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 4,
                        height: -4,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 6,
                },Platform.OS === 'ios' && {
                    backgroundColor:'transparent',
                }]}
            >
                <View
                    style={[GlobalStyleSheet.container,
                        {
                            borderTopWidth:1,
                            borderColor:'#EEEEEE',
                            height:70,
                            paddingHorizontal:20,
                            padding:0,
                            justifyContent:'center'
                        }
                    ]}
                >
                    <LinearGradient
                        colors={
                            theme.dark ?
                            ["rgba(12,16,28,.95)","rgba(12,16,28,1)"]
                            :
                            ["rgba(255,255,255,.0)","#FFFFFF"]
                        }
                        style={{
                            position:'absolute',
                            left:0,
                            right:0,
                            bottom:0
                        }}
                    />
                    <View style={[GlobalStyleSheet.flexcenter,{gap:10}]}>
                        <View style={{flex:1}}>
                            <Button
                                title='Request'
                                color={COLORS.danger}
                                style={{
                                    height:40
                                }}
                                onPress={() => navigation.navigate('PaidExpense')}
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('OtherMaterial')}
                                activeOpacity={0.5}
                                style={{
                                    height:40,
                                    width:40,
                                    backgroundColor:'rgba(38,72,231,0.10)',
                                    borderRadius:6,
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}
                            >
                                <FeatherIcon name='plus' size={20} color={COLORS.primary}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1}}>
                            <Button
                                title='Received'
                                color={COLORS.success}
                                style={{
                                    height:40,
                                    paddingHorizontal: 15,
                                }}
                                onPress={() => navigation.navigate('ReceivedExpense')}
                            />
                        </View>
                    </View>
                </View>
            </DropShadow>
        </ScrollView>
    );

    const FilesRoute   = () => (
        <ScrollView 
            contentContainerStyle={{flexGrow:1}} 
            showsVerticalScrollIndicator={false}
        >
            <View
                style={[GlobalStyleSheet.container,{
                    flex:1,
                    paddingHorizontal:0,
                    padding:10,
                    backgroundColor:colors.background,
                    borderTopLeftRadius:15,
                    borderTopRightRadius:15
                }]}
            >
                <DropShadow
                    style={[{
                        shadowColor: '#000000',
                        shadowOffset: {
                            width: 4,
                            height: 4,
                        },
                        shadowOpacity: 0.01,
                        shadowRadius: 6,
                    },Platform.OS === 'ios' && {
                        backgroundColor:'transparent',
                    }]}
                >
                    <LinearGradient
                        colors={
                            theme.dark ?
                            ["rgba(12,16,28,.95)","rgba(12,16,28,1)"]
                            :
                            ["rgba(255,255,255,.0)","#FFFFFF"]
                        }
                        style={[GlobalStyleSheet.container,
                            {
                                borderBottomWidth:1,
                                borderColor:'#EEEEEE',
                                zIndex:-1,
                                paddingTop:0,
                                padding:0
                            }
                        ]}
                    >
                        <View style={[GlobalStyleSheet.flexcenter,{marginBottom:20,marginTop:10,paddingHorizontal:15}]}>
                            <Text style={{...FONTS.fontMedium,fontSize:16,color:colors.title,flex:1}}>Site Photo</Text>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={{flexDirection:'row',alignItems:'center'}}
                            >
                                <Text style={[FONTS.font,{color:colors.text}]}>View All</Text>
                                <FeatherIcon name='chevron-right' size={20} color={colors.text}/>
                            </TouchableOpacity>
                        </View>
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{marginBottom:15}}
                        >
                            <View 
                                style={{
                                    marginBottom:10,
                                    flexDirection:'row',
                                    alignItems:'center',
                                    gap:10,
                                    paddingHorizontal:15
                                }}
                            >
                                <TouchableOpacity 
                                    style={{
                                        height:60,
                                        width:60,
                                        borderRadius:6,
                                        backgroundColor:'rgba(38,72,231,0.10)',
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}
                                    onPress={pickImage}
                                >
                                    <Icon name="camera-outline" size={34} color={colors.title} />
                                </TouchableOpacity>
                                <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                    {images.map((img: { uri: any; }, index: React.Key | null | undefined) => (
                                        <Image
                                            key={index}
                                            source={{ uri: img.uri }}
                                            style={{
                                                height:60,
                                                width:60,
                                                borderRadius:6,
                                            }}
                                        />
                                    ))}
                                </View>
                            </View>
                        </ScrollView>
                    </LinearGradient>
                </DropShadow>
                <View
                    style={{paddingHorizontal:20,paddingTop:25}}
                >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[GlobalStyleSheet.flexcenter,{
                            padding:15,
                            backgroundColor:colors.card,
                            borderWidth:1,
                            borderColor:'#EFEFEF',
                            borderRadius:8
                        }]}
                    >
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                gap:10
                            }}
                        >
                            <View
                                style={{
                                    height:40,
                                    width:40,
                                    borderRadius:6,
                                    borderWidth:1,
                                    borderColor:colors.border,
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}
                            >
                                <FeatherIcon name='folder' size={20} color={colors.title}/>
                            </View>
                            <View>
                                <Text style={[FONTS.fontMedium,{fontSize:14,color:colors.title}]}>Contraction</Text>
                                <Text style={[FONTS.font,{fontSize:12,color:colors.text}]}>10 Files</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={{
                                height:40,
                                width:40,
                                borderRadius:25,
                                alignItems:'center',
                                justifyContent:'center',
                                position:'absolute',
                                right:0,
                            }}
                        >
                            <Ionicons name='ellipsis-vertical' size={26} color={colors.text} style={{opacity:.5}} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
    

    const renderScene = SceneMap({
        contact: ContactRoute,
        transaction: TransactionRoute,
        site: SiteRoute,
        task: TaskRoute,
        attendance: AttendanceRoute,
        material: MaterialRoute,
        files: FilesRoute,
    });

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    
    const [routes] = useState([
        { key: 'contact', title: 'Contact' },
        { key: 'transaction', title: 'Transaction' },
        { key: 'site', title: 'Site' },
        { key: 'task', title: 'Task' },
        { key: 'attendance', title: 'Attendance' },
        { key: 'material', title: 'Material' },
        { key: 'files', title: 'Files' },
    ]);

    const renderLabel = ({ route, focused }: any) => (
        <Text 
            style={{ 
                fontFamily: focused ? 'DMSans-Medium':'DMSans-Regular', 
                color: focused ? COLORS.primary : colors.text,
                fontSize:15,
                paddingHorizontal:5,
            }}
        >
            {route.title}
        </Text>
    );

    return (
        <SafeAreaView style={{ backgroundColor:'#172879', flex: 1 }}>
            <View
              style={[GlobalStyleSheet.container,{
                height:60,
                padding:0,
                justifyContent:'center',
                paddingRight:15
              }]}
            >
              <View style={[GlobalStyleSheet.flexcenter]}>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                      <IconButton
                          onPress={() => navigation.goBack()}
                          icon={props => <FeatherIcon name="chevron-left" {...props} />}
                          iconColor={COLORS.card}
                          size={24}
                      />
                      <Text style={{...FONTS.fontMedium,fontSize:16,color:COLORS.card,marginLeft:-12,lineHeight:22}}>{data.title}</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Notification')}
                        style={{ 
                          padding: 5,
                          height:40,
                          width:40,
                          borderRadius:30,
                          backgroundColor:'transparent',
                          alignItems:'center',
                          justifyContent:'center',
                          marginRight:-5
                        }}
                    >
                        <FeatherIcon name='bell' color={COLORS.card} size={20}/>
                        <View
                          style={{
                            height:10,
                            width:10,
                            borderRadius:5,
                            backgroundColor:'#EA4230',
                            borderWidth:2,
                            borderColor:'#172879',
                            position:'absolute',
                            right:10,
                            top:10
                          }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            height:40,
                            width:40,
                            borderRadius:25,
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                    >
                        <Ionicons name='ellipsis-vertical' size={16} color={COLORS.card} />
                    </TouchableOpacity>
                  </View>
              </View>
            </View>
            <View style={{flex:1,borderTopLeftRadius:15,borderTopRightRadius:15,backgroundColor:colors.card}}>
                <View 
                    style={[
                        GlobalStyleSheet.container,
                        {
                            padding:0,
                            borderBottomWidth:1,
                            borderColor:colors.border,
                            flex:1,
                            height:53,
                            backgroundColor:colors.card,
                            // paddingHorizontal:15,
                            borderTopLeftRadius:15,borderTopRightRadius:15
                        }
                    ]}
                >
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}
                        renderTabBar={props => (
                            <View style={{ paddingHorizontal: 15 }}>
                                <TabBar
                                    {...props}
                                    scrollEnabled
                                    style={{
                                        backgroundColor:colors.card,
                                        elevation: 0,
                                    }}
                                    tabStyle={{
                                        width: 'auto',
                                        paddingHorizontal: 12,
                                    }}
                                    indicatorStyle={{
                                        height: 2,
                                        backgroundColor: COLORS.primary,
                                    }}
                                    activeColor={'#0A101F'}
                                    inactiveColor={'rgba(10,16,31,0.5)'}
                                    renderLabel={renderLabel}
                                />
                            </View>
                        )}
                    />
                </View>
                <FilterSheet
                    ref={sheetRef}
                    height={false}
                />
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    openButton: {
        backgroundColor: '#4169E1',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 40,
    },
    sectionTitle: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 20,
        color: COLORS.text,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    button: {
        flex: 1,
        height:40,
        borderRadius: 6,
        justifyContent:'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    sidebar: {
        width: 120,
        backgroundColor: '#F9FAFB',
        paddingVertical: 12,
    },
    tabItem: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    activeTab: {
        backgroundColor: '#2563EB',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    tabText: {
        color: '#374151',
        fontSize: 13,
    },
    activeTabText: {
        color: '#fff',
        fontWeight: '600',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    header: {
        alignItems: 'flex-end',
        marginBottom: 12,
    },
    clearText: {
        color: 'red',
        fontWeight: '600',
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
    optionText: {
        fontSize: 14,
        color: '#1F2937',
        marginLeft: 12,
    },
    radioOuter: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioSelected: {
        borderColor: '#2563EB',
    },
    radioInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#2563EB',
    },
    applyButton: {
        backgroundColor: '#2563EB',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    applyText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default ProjectDetails