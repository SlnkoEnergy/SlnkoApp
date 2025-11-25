import { View, Text, Platform } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IconButton } from 'react-native-paper';
import { COLORS, FONTS } from '../../constants/theme';
import { TouchableOpacity } from 'react-native';
import FeatherIcon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import DropShadow from 'react-native-drop-shadow';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ATTENDANCE_STATS = [
    {
        id: 'present',
        label: 'Present',
        count: 1,
    },
    {
        id: 'absent',
        label: 'Absent',
        count: 0,
    },
    {
        id: 'plwo',
        label: 'PL/Wo',
        count: 1,
    },
];

const ATTENDANCE_ENTRIES = [
    {
        id: 'present',
        code: 'p',
        date: '28 Jun',
        day: 'Sat',
        shifts: '1 Shift',
    },
    {
        id: 'absent',
        code: 'A',
        date: '27 Jun',
        day: 'Fri',
        shifts: '1 Shift',
    },
    {
        id: 'plwo',
        code: 'PL',
        date: '29 Jun',
        day: 'Sun',
        shifts: '1 Shift',
    },
];


type AttendanceDetailsScreenProps = StackScreenProps<RootStackParamList, 'AttendanceDetails'>;

const AttendanceDetails = ({route,navigation} : AttendanceDetailsScreenProps) => {

    const {data} = route.params;

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

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
                        <Text style={{...FONTS.fontMedium,fontSize:16,color:COLORS.card,marginLeft:-12,lineHeight:22}}>{data.user}</Text>
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
            <View 
                style={{
                    flex:1,
                    borderTopLeftRadius:15,
                    borderTopRightRadius:15,
                    backgroundColor:colors.background
                }}
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
                                left:0,
                                right:0,
                                bottom:0
                            }}
                        />
                        <View style={{alignItems:'center'}}>
                            <View
                                style={[{
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
                        </View>
                        <View style={{alignItems:'center',marginVertical:20}}>
                            <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.title}}>Total Salary : ₹99.99</Text>
                        </View>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'center',
                                marginBottom:20
                            }}
                        >
                            {ATTENDANCE_STATS.map((data,index) => {
                                return(
                                    <View
                                        key={index}
                                        style={[GlobalStyleSheet.col33]}
                                    >
                                        <View
                                            style={[{
                                                padding:15,
                                                borderRadius:8,
                                                alignItems:'center',
                                                justifyContent:'center',
                                                backgroundColor:colors.background
                                            },data.id === 'present' && {
                                                backgroundColor:'rgba(65,144,154,0.10)'
                                            },data.id === 'absent' && {
                                                backgroundColor:'rgba(221,25,81,0.10)'
                                            },data.id === 'plwo' && {
                                                backgroundColor:'rgba(38,72,231,0.10)'
                                            }]}
                                        >
                                            <Text style={[FONTS.font,{color:colors.title}]} >{data.label}</Text>
                                            <Text style={{...FONTS.fontSemiBold,fontSize:14,color:colors.title,marginTop:5}}>{data.count}</Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                        <View style={[GlobalStyleSheet.flexcenter,{paddingHorizontal:5,marginTop:10}]}>
                            <Text style={[FONTS.font,{color:colors.title}]}>Date</Text>
                            <Text style={[FONTS.font,{color:colors.title}]}>Attendance</Text>
                        </View>
                    </View>
                </DropShadow>
                <View
                    style={[
                        GlobalStyleSheet.container,
                        {
                            paddingHorizontal:20,
                            paddingTop:25
                        }
                    ]}
                >
                    {ATTENDANCE_ENTRIES.map((data,index) => {
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
                                            backgroundColor:colors.background
                                        },data.id === 'present' && {
                                            backgroundColor:'rgba(65,154,144,0.2)'
                                        },data.id === 'absent' && {
                                            backgroundColor:'rgba(221,25,81,0.2)'
                                        },data.id === 'plwo' && {
                                            backgroundColor:'rgba(221,25,81,0.2)'
                                        }]}
                                    >
                                        <Text style={{...FONTS.fontMedium,fontSize:18,color:colors.title}}>{data.code}</Text>
                                    </View>
                                    <View>
                                        <Text style={[FONTS.font,{color:colors.text,opacity:0.8}]}>Enter by</Text>
                                        <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.title,}]}>{data.date}, {data.day}</Text>
                                    </View>
                                </View>
                                <View style={{alignItems:'center',gap:5,position:'absolute',right:10,}}>
                                    <Text style={[FONTS.font,{color:colors.text}]}>{data.shifts}</Text>
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={{
                                            height:30,
                                            width:30,
                                            borderRadius:6,
                                            backgroundColor:'rgba(80,88,109,0.2)',
                                            alignItems:'center',
                                            justifyContent:'center'
                                        }}
                                    >
                                        <FeatherIcon size={16} color={colors.text} name="chevron-down"/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AttendanceDetails