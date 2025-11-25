import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IconButton } from 'react-native-paper';
import { COLORS, FONTS } from '../../constants/theme';
import { TouchableOpacity } from 'react-native';
import FeatherIcon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from '@react-navigation/native';

type PartyProjectPaymentScreenProps = StackScreenProps<RootStackParamList, 'PartyProjectPayment'>;

const PartyProjectPayment = ({navigation} : PartyProjectPaymentScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

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
                        <Text style={{...FONTS.fontMedium,fontSize:16,color:COLORS.card,marginLeft:-12,lineHeight:22}}>Payment</Text>
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
                <View
                    style={{
                        height:50,
                        width:50,
                        borderRadius:50,
                        backgroundColor:COLORS.primary,
                        alignItems:'center',
                        justifyContent:'center',
                        position:'absolute',
                        zIndex:999,
                        right:25,
                        top:20
                    }}
                >
                    <FeatherIcon name='thumbs-up' size={24} color={COLORS.card}/>
                </View>
                <View
                    style={[GlobalStyleSheet.container,
                        {
                            backgroundColor:colors.card, 
                            borderTopLeftRadius:15,
                            borderTopRightRadius:15,
                            paddingHorizontal:20,
                            paddingTop:20
                        }
                    ]}
                >
                    <View style={{marginBottom:30}}>
                        <Text style={[FONTS.font,{color:colors.text}]}>Amount</Text>
                        <Text style={[FONTS.fontSemiBold,{fontSize:18,color:colors.title}]}>₹400</Text>
                    </View>
                    <View style={{marginBottom:30}}>
                        <Text style={[FONTS.font,{fontSize:12,color:COLORS.primary}]}>To</Text>
                        <Text style={[FONTS.fontMedium,{fontSize:15,color:colors.title}]}>W3 Chandan</Text>
                    </View>
                    <View style={{marginBottom:15}}>
                        <Text style={[FONTS.font,{fontSize:12,color:COLORS.primary}]}>To</Text>
                        <Text style={[FONTS.fontMedium,{fontSize:15,color:colors.title}]}>W3 Chandan</Text>
                    </View>
                    <View style={{marginBottom:30}}>
                        <Text style={[FONTS.font,{color:colors.text}]}>Paid At : 05:15 PM, 28 Jun 2025</Text>
                        <Text style={[FONTS.font,{color:colors.text}]}>Project: Party Project Balance</Text>
                    </View>
                    <View style={{marginBottom:25}}>
                        <Text style={[FONTS.fontSemiBold,{fontSize:18,color:COLORS.success}]}>Approval <Text style={[FONTS.font,{fontSize:12,color:colors.text}]}>Auto Approved</Text></Text>
                    </View>
                </View>
                <View
                    style={[GlobalStyleSheet.container,
                        { 
                            paddingHorizontal:20,
                            paddingTop:20
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
                                <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.title,textAlign:'center',lineHeight:14}}>26 Jun</Text>
                            </View>
                            <View>
                                <Text style={[FONTS.font,{color:colors.text,opacity:0.8}]}>Prem 2nd House</Text>
                                <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.title,}]}>Salary Expense #2</Text>
                            </View>
                        </View>
                        <View style={{alignItems:'flex-end',}}>
                            <Text style={{...FONTS.fontMedium,fontSize:18,color:colors.text}}>₹50</Text>
                            <View>
                                <Text style={[FONTS.font,{fontSize:12,color:COLORS.success}]}>₹50 Settied</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PartyProjectPayment