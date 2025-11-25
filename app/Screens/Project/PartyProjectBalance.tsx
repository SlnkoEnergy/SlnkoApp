import { View, Text, Platform, Animated, ScrollView, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { SafeAreaView } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IconButton } from 'react-native-paper';
import { COLORS, FONTS } from '../../constants/theme';
import { TouchableOpacity } from 'react-native';
import FeatherIcon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropShadow from 'react-native-drop-shadow';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button/Button';
import RBSheet from 'react-native-raw-bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';

const PARTY_BALANCE_ENTRIES = [
  {
    id: '1',
    date: '28 Jun',
    project: 'Prem 2nd House',
    status: '1 Present',
    amount: '₹50',
  },
  {
    id: '2',
    date: '27 Jun',
    project: 'Prem 2nd House',
    status: '1 Present',
    amount: '₹50',
  },
  {
    id: '3',
    date: '26 Jun',
    project: 'Prem 2nd House',
    status: '1 Present',
    amount: '₹50',
  },
];

const filterOptions = [
  { id: '0', label: 'All' },
  { id: '1', label: 'Last Week' },
  { id: '2', label: 'This Week' },
  { id: '3', label: 'Today' },
  { id: '4', label: 'This Month' },
  { id: '5', label: 'Last Month' },
];

type PartyProjectBalanceScreenProps = StackScreenProps<RootStackParamList, 'PartyProjectBalance'>;

const PartyProjectBalance =  ({route, navigation} : PartyProjectBalanceScreenProps) => {
    
    const {data,title} = route.params;

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [activeTab, setActiveTab] = useState<'received' | 'salary'>('received');

    const fadeAnim = useRef(new Animated.Value(1)).current;  
    const translateY = useRef(new Animated.Value(0)).current;

    const handleTabChange = (tab: 'received' | 'salary') => {
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
            setActiveTab(tab);

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

    const refRBSheet = useRef<any>(null);
    
    const [selectedId, setSelectedId] = useState('0');

    const [showPicker, setShowPicker] = useState(false);
    const [currentField, setCurrentField] = useState<'start' | 'end' | null>(null);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const onChange = (event: any, selectedDate: Date | undefined) => {
        setShowPicker(false);
        if (selectedDate && currentField) {
            const formatted = selectedDate.toLocaleDateString();
        if (currentField === 'start') setStartDate(formatted);
            else setEndDate(formatted);
        }
    };

    const openPicker = (field: 'start' | 'end') => {
        setCurrentField(field);
        setShowPicker(true);
    };

    const DateInput = ({ label, value, onPress } : any) => (
        <View style={{ flex: 1,marginBottom:15 }}>
            <Text style={[styles.label,{...FONTS.fontMedium, fontSize: 14, color: colors.text,}]}>{label}</Text>
            <TouchableOpacity onPress={onPress} style={[styles.dateBox,{backgroundColor:colors.card}]}>
                <Text style={[{...FONTS.fontMedium, fontSize: 14, color: colors.text,}]}>{value ? value : 'dd-mm-yyyy'}</Text>
                <FeatherIcon name="calendar" size={16} color={COLORS.primary} />
            </TouchableOpacity>
        </View>
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
                        <Text style={{...FONTS.fontMedium,fontSize:16,color:COLORS.card,marginLeft:-12,lineHeight:22}}>Party Project Balance</Text>
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
            <RBSheet
                ref={refRBSheet}
                height={520}
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
                <View
                    style={[GlobalStyleSheet.container,{padding:20}]}
                >
                    <Text style={[FONTS.fontMedium,{fontSize:18,color:colors.title}]}>Data Filter</Text>
                </View>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={[GlobalStyleSheet.container,{padding:20,paddingTop:0,flex:1}]}>
                        <View style={{marginBottom:0}}>
                            <View style={[styles.row,{gap:12}]}>
                                <DateInput label="Start Date" value={startDate} onPress={() => openPicker('start')} />
                                <DateInput label="End Date" value={endDate} onPress={() => openPicker('end')} />
                            </View>

                            {showPicker && (
                                <DateTimePicker
                                    value={new Date()}
                                    mode="date"
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={onChange}
                                />
                            )}
                        </View>
                        <View>
                            {filterOptions.map((item,index) => {
                                return(
                                    <TouchableOpacity
                                        onPress={() => setSelectedId(item.id)}
                                        activeOpacity={0.5}
                                        key={index}
                                        style={[GlobalStyleSheet.flexcenter,{
                                            height:50,
                                            paddingHorizontal:20,
                                            borderRadius:8,
                                            borderWidth:1,
                                            borderColor:'#EFEFEF',
                                            backgroundColor:colors.card,
                                            marginBottom:10
                                        }]}
                                    >
                                        <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.title}]}>{item.label}</Text>
                                        <View
                                            style={{
                                                height:20,
                                                width:20,
                                                borderRadius:25,
                                                borderWidth:1,
                                                borderColor:item.id === selectedId ? COLORS.primary : colors.border,
                                                backgroundColor:colors.background,
                                                alignItems:'center',
                                                justifyContent:'center'
                                            }}
                                        >
                                            {item.id === selectedId &&
                                                <View
                                                    style={{
                                                        height:13,
                                                        width:13,
                                                        borderRadius:25,
                                                        backgroundColor:COLORS.primary
                                                    }}
                                                />
                                            }
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                </ScrollView>
                <View
                    style={[GlobalStyleSheet.container,{paddingHorizontal:20}]}
                >
                    <Button
                        title='Apply'
                        onPress={() => refRBSheet.current.close()}
                    />
                </View>
            </RBSheet>
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
                        <View
                            style={[GlobalStyleSheet.flexcenter,{
                                padding:15,
                                backgroundColor:colors.card,
                                borderWidth:1,
                                borderRadius:8,
                                borderColor:'#EFEFEF',
                                marginVertical:15,
                                marginHorizontal:20,
                                marginTop:25
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
                                        backgroundColor:'rgba(65,154,144,0.2)'
                                    }]}
                                >
                                    <Text style={{...FONTS.fontMedium,fontSize:18,color:colors.title}}>{data.initial}</Text>
                                </View>
                                <View>
                                    <Text style={[FONTS.font,{color:colors.text,opacity:0.8,lineHeight:22}]}>{title}</Text>
                                    <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.title,}]}>{data.name}</Text>
                                </View>
                            </View>
                            <View style={{alignItems:'flex-end',position:'absolute',right:10,}}>
                                <Text style={[FONTS.font,{color:COLORS.danger}]}>To Pay</Text>
                                <Text style={{...FONTS.fontMedium,fontSize:26,color:COLORS.danger}}>{data.amount}</Text>
                            </View>
                        </View>
                        <View style={[GlobalStyleSheet.flexcenter,{paddingHorizontal:10,marginRight:-10}]}>
                            <TouchableOpacity
                                onPress={() => refRBSheet.current.open()}
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
                <View
                    style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:20,flex:1}]}
                >
                    <View
                        style={[GlobalStyleSheet.row,{
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'flex-start',
                            gap:30,
                            paddingLeft:10
                        }]}
                    >
                        <TouchableOpacity
                            onPress={() => handleTabChange('received')}
                            style={{
                                padding:5,
                                alignItems:'center',
                                justifyContent:'center',
                                gap:2,
                            }}
                        >
                            <Text numberOfLines={1} style={[FONTS.font,{fontSize:14,color:colors.title}]}>Party Received</Text>
                            <Text style={[FONTS.font,{fontSize:12,color:colors.title}]}>₹ 10,000</Text>
                            {activeTab === 'received' && <View style={{
                                marginTop:5,
                                height: 1,
                                width: '100%',
                                backgroundColor: COLORS.primary,
                                borderRadius: 2,
                            }} />}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleTabChange('salary')}
                            style={{
                                padding:5,
                                alignItems:'center',
                                justifyContent:'center',
                                gap:2,
                            }}
                        >
                            <Text style={[FONTS.font,{fontSize:14,color:colors.title}]}>Salary</Text>
                            <Text style={[FONTS.font,{fontSize:12,color:colors.title}]}>₹ 100</Text>
                            {activeTab === 'salary' && <View style={{
                                marginTop:5,
                                height: 1,
                                width: '100%',
                                backgroundColor: COLORS.primary,
                                borderRadius: 2,
                            }} />}
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            alignItems:'flex-end',
                            marginBottom:10
                        }}
                    >
                        <Text style={[FONTS.font,{color:colors.text}]}>Amount</Text>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{flexGrow:1}}
                    >
                        {activeTab === 'received' &&
                            <Animated.View style={{
                                opacity: fadeAnim,
                                transform: [{ translateY }],
                            }}>
                                {PARTY_BALANCE_ENTRIES.map((data,index) => {
                                    return(
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('PartyProjectPayment')}
                                            activeOpacity={0.5}
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
                                                <View>
                                                    <Text style={[FONTS.font,{color:colors.text,opacity:0.8}]}>{data.project}</Text>
                                                    <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.title,}]}>{data.status}</Text>
                                                </View>
                                            </View>
                                            <View style={{alignItems:'center',}}>
                                                <Text style={{...FONTS.fontMedium,fontSize:18,color:colors.text}}>{data.amount}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                            </Animated.View>
                        }
                        {activeTab === 'salary' &&
                            <Animated.View style={{
                                opacity: fadeAnim,
                                transform: [{ translateY }],
                            }}>
                                {PARTY_BALANCE_ENTRIES.map((data,index) => {
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
                                                <View>
                                                    <Text style={[FONTS.font,{color:colors.text,opacity:0.8}]}>{data.project}</Text>
                                                    <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.title,}]}>{data.status}</Text>
                                                </View>
                                            </View>
                                            <View style={{alignItems:'center',}}>
                                                <Text style={{...FONTS.fontMedium,fontSize:18,color:colors.text}}>{data.amount}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </Animated.View>
                        }
                    </ScrollView>
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
                                    title='I Paid'
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
                                    title='I Received'
                                    color={COLORS.success}
                                    style={{
                                        height:40,
                                         paddingHorizontal: 15,
                                    }}
                                    onPress={() => navigation.navigate('ReceivedExpense')}
                                />
                            </View>
                        </View>
                    </LinearGradient>
                </DropShadow>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    Button:{
        height:40,
        width:40,
        borderRadius:40,
        alignItems:'center',
        justifyContent:'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        marginBottom: 10,
    },
    dateBox: {
        height:50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-around',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderWidth: 1.5,
        borderColor: '#E8E8E8', 
        borderRadius: 8,
        backgroundColor:COLORS.card
    },
});

export default PartyProjectBalance