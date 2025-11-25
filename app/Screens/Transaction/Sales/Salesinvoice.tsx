import { View, Text, StyleSheet, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Navigations/RootStackParamList';
import { SafeAreaView } from 'react-native';
import Header from '../../../layout/Header';
import { ScrollView } from 'react-native';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import { COLORS, FONTS } from '../../../constants/theme';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';
import FeatherIcon from "react-native-vector-icons/Feather";
import Button from '../../../components/Button/Button';
import { X } from 'lucide-react-native';
import CustomInput from '../../../components/Input/CustomInput';

type SalesinvoiceScreenProps = StackScreenProps<RootStackParamList, 'Salesinvoice'>;

const Salesinvoice = ({ navigation } : SalesinvoiceScreenProps) => {
    
    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [active , setActive] = useState(true);
    
    const offset = useSharedValue(0);
    const toggleStyle = useAnimatedStyle(() => { 
        return {
            transform: [
                { 
                    translateX:  offset.value
                }
            ],
        };
    });
    useEffect(() => {
        if(active){
            setActive(true);
            offset.value = withSpring(13)
        }
    },[active])

    const [isCheckedAssign, setisCheckedAssign] = useState(false);

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title={"Create invoice"}
                leftIcon={'back'}
                rightIcon={'settings'}
                titleLeft
            />
            <View style={{flex:1,backgroundColor:colors.card,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow:1}}
                >
                    <View
                        style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:10}]}
                    >
                        <View style={[styles.row,{marginBottom:20}]}>
                            <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.title}]}>Item leval Text</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setActive(!active);
                                    if(active){
                                        offset.value = withSpring(0)
                                    }else{
                                        offset.value = withSpring(13)
                                    }
                                }}
                                style={[{
                                    height:16,
                                    width:30,
                                    borderRadius:15,
                                    borderWidth:1.5,
                                    borderColor:active ? COLORS.primary : colors.border,
                                    // backgroundColor : active ? COLORS.primary : theme.dark ? 'rgba(255,255,255,.15)' : '#e8e9ea',
                                }]}
                            >
                                <Animated.View
                                    style={[toggleStyle,{
                                        height:9,
                                        width:9,
                                        borderRadius:5,
                                        backgroundColor:active ? COLORS.primary : colors.border,
                                        top:2,
                                        left:2,
                                    }]}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={[styles.row,{
                                padding:15,
                                borderRadius:8,
                                borderWidth:1,
                                backgroundColor:colors.background,
                                borderColor:'#EFEFEF',
                                marginBottom:15
                            }]}
                        >
                            <View
                                style={[styles.row]}
                            >
                                <View
                                    style={{
                                        height:40,
                                        width:40,
                                        borderRadius:6,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        backgroundColor:'rgba(65,154,144,0.20)'
                                    }}
                                >
                                    <Text style={[FONTS.h6,FONTS.fontMedium,{color:COLORS.title}]}>W</Text>
                                </View>
                                <View>
                                    <Text style={[FONTS.font,{fontSize:12,color:colors.text}]}>Client</Text>
                                    <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.title}]}>W3 Chandan</Text>
                                </View>
                            </View>
                            <View style={[styles.row]}>
                                <View style={{alignItems:'flex-end',marginRight:-5}}>
                                    <Text style={[FONTS.font,{fontSize:12,color:colors.text}]}>INV-2</Text>
                                    <Text style={[FONTS.font,FONTS.fontMedium,{color:COLORS.primary}]}>22-07-25</Text>
                                </View>
                                <TouchableOpacity
                                    style={[styles.Button,{marginRight:-10}]}
                                >
                                    <FeatherIcon name='edit' size={20} color={COLORS.primary}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.row,{marginBottom:15}]}>
                            <Text style={[FONTS.font,FONTS.fontMedium,{color:COLORS.primary}]}>Select BOQ Items (Q)</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('invoiceAddItem')}
                                activeOpacity={0.5} 
                                style={[styles.addButton,{gap:5,right:-10}]}
                            >
                                <FeatherIcon name='plus' size={14} color={COLORS.primary}/>
                                <Text style={[FONTS.font,FONTS.fontMedium,{color:COLORS.primary}]}>Add Notes</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                borderBottomWidth:1,
                                borderColor:'#EEEEEE',
                                marginHorizontal:-20,
                                paddingHorizontal:20
                            }}
                        >
                            <View
                                style={[GlobalStyleSheet.flexcenter,{marginBottom:10}]}
                            >
                                <View
                                    style={[styles.row,{gap:5}]}
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.2}
                                        style={{
                                            height:13,
                                            width:13,
                                            borderRadius:15,
                                            borderWidth:1,
                                            borderColor:colors.text,
                                            alignItems:'center',
                                            justifyContent:'center',
                                        }}
                                    >
                                        <X size={11} color={colors.text} />
                                    </TouchableOpacity>
                                    <Text style={[FONTS.fontMedium,FONTS.font,{color:colors.text}]}>Rebar</Text>
                                </View>
                                <Text style={[FONTS.fontLight,{fontSize:14,color:colors.text}]}>₹0</Text>
                            </View>
                            <View
                                style={[GlobalStyleSheet.flexcenter,{gap:10,marginBottom:30}]}
                            >
                                <View style={{flex:1}}>
                                    <CustomInput
                                        inputBorder
                                        placeholder={'Unit Rate (₹)'}
                                    />
                                </View>
                                <View style={{flex:1}}>
                                    <CustomInput
                                        inputBorder
                                        placeholder={'Quantity'}
                                    />
                                </View>
                            </View>
                            <View
                                style={[GlobalStyleSheet.flexcenter,{marginBottom:5}]}
                            >
                                <Text style={[FONTS.fontMedium,FONTS.font,{color:colors.title}]}>Item Subtotal</Text>
                                <Text style={[FONTS.fontLight,{fontSize:14,color:colors.title}]}>₹0</Text>
                            </View>
                            <View
                                style={[GlobalStyleSheet.flexcenter,{marginBottom:5}]}
                            >
                                <TouchableOpacity
                                    style={[styles.row,{gap:5}]}
                                >
                                    <FeatherIcon name='plus' size={15} color={COLORS.primary}/>
                                    <Text style={[FONTS.fontMedium,FONTS.font,{fontSize:15,color:COLORS.primary}]}>Pre Tex Deduction</Text>
                                </TouchableOpacity>
                                <Text style={[FONTS.fontLight,{fontSize:14,color:colors.text}]}>₹0</Text>
                            </View>
                            <View
                                style={[GlobalStyleSheet.flexcenter,{marginBottom:10}]}
                            >
                                <Text style={[FONTS.fontMedium,FONTS.font,{color:colors.title}]}>Item Subtotal</Text>
                                <Text style={[FONTS.fontLight,{fontSize:14,color:colors.title}]}>₹0</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                borderBottomWidth:1,
                                borderColor:'#EEEEEE',
                                marginHorizontal:-20,
                                paddingHorizontal:20,
                                paddingTop:15
                            }}
                        >
                            <View style={[GlobalStyleSheet.flexcenter,{marginBottom:10}]}>
                                <View style={[styles.row]}>
                                    <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.title}]}>GST</Text>
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={[styles.row,{
                                            padding:5,
                                            paddingHorizontal:6,
                                            backgroundColor:'#E3EAF2',
                                            borderRadius:4,
                                            gap:5
                                        }]}
                                    >
                                        <Text style={{...FONTS.fontRegular,fontSize:12,color:colors.title}}>0.0%</Text>
                                        <FeatherIcon name='chevron-down' size={15} color={colors.text}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View
                                style={[GlobalStyleSheet.flexcenter,{marginBottom:5}]}
                            >
                                <TouchableOpacity
                                    style={[styles.row,{gap:5}]}
                                >
                                    <FeatherIcon name='plus' size={15} color={COLORS.primary}/>
                                    <Text style={[FONTS.fontMedium,FONTS.font,{fontSize:15,color:COLORS.primary}]}>Additional Charges</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={[GlobalStyleSheet.flexcenter,{marginBottom:10}]}
                            >
                                <TouchableOpacity
                                    style={[styles.row,{gap:5}]}
                                >
                                    <FeatherIcon name='plus' size={15} color={COLORS.primary}/>
                                    <Text style={[FONTS.fontMedium,FONTS.font,{fontSize:15,color:COLORS.primary}]}>Discount</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View
                            style={{
                                borderBottomWidth:1,
                                borderColor:'#EEEEEE',
                                marginHorizontal:-20,
                                paddingHorizontal:20,
                                paddingTop:25
                            }}
                        >
                            <View
                                style={[GlobalStyleSheet.flexcenter,{marginBottom:5}]}
                            >
                                <Text style={[FONTS.fontMedium,FONTS.font,{color:colors.title}]}>Total</Text>
                                <Text style={[FONTS.fontLight,{fontSize:14,color:colors.title}]}>₹0</Text>
                            </View>
                            <View
                                style={[GlobalStyleSheet.flexcenter,{marginBottom:5}]}
                            >
                                <TouchableOpacity
                                    style={[styles.row,{gap:5}]}
                                >
                                    <FeatherIcon name='plus' size={15} color={COLORS.primary}/>
                                    <Text style={[FONTS.fontMedium,FONTS.font,{fontSize:15,color:COLORS.primary}]}>Deduction</Text>
                                </TouchableOpacity>
                                <Text style={[FONTS.fontLight,{fontSize:14,color:colors.text}]}>₹0</Text>
                            </View>
                            <View
                                style={[GlobalStyleSheet.flexcenter,{marginBottom:10}]}
                            >
                                <TouchableOpacity
                                    style={[styles.row,{gap:5}]}
                                >
                                    <FeatherIcon name='plus' size={15} color={COLORS.primary}/>
                                    <Text style={[FONTS.fontMedium,FONTS.font,{fontSize:15,color:COLORS.primary}]}>Retention</Text>
                                </TouchableOpacity>
                                <Text style={[FONTS.fontLight,{fontSize:14,color:colors.title}]}>₹0</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                borderBottomWidth:1,
                                borderColor:'#EEEEEE',
                                marginHorizontal:-20,
                                paddingHorizontal:20,
                                paddingTop:15
                            }}
                        >
                            <Text style={[FONTS.fontMedium,FONTS.font,{color:colors.title,marginBottom:12}]}>Net Amount</Text>
                            <TouchableOpacity
                                onPress={() => setisCheckedAssign(!isCheckedAssign)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap:6,
                                    marginBottom:15,
                                }}
                            >
                                <View
                                    style={{
                                        height:20,
                                        width:20,
                                        borderRadius:4,
                                        borderWidth:1,
                                        borderColor:isCheckedAssign ? COLORS.primary : '#DADADA',
                                        backgroundColor:isCheckedAssign ? COLORS.primary: 'transparent',
                                        alignItems:'center',
                                        justifyContent:'center',
                                    }}
                                >
                                    {isCheckedAssign &&
                                        <FeatherIcon size={14} color={COLORS.card} name={'check'} />
                                    }
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center',flex:1,gap:5}}>
                                    <Text
                                        style={[{...FONTS.fontMedium,fontSize:15,color:colors.text}]}
                                    >
                                        Round off
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:20,marginBottom:30}}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('AddBillAddress')}
                                activeOpacity={0.5}
                                style={[GlobalStyleSheet.flexcenter,{
                                    padding:14,
                                    backgroundColor:colors.background,
                                    borderRadius:6,
                                    borderWidth:1,
                                    borderColor:'#EFEFEF'
                                }]}
                            >
                                <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.text}]}>Bill To / Ship To </Text>
                                <View
                                    style={[styles.row,{gap:5}]}
                                >
                                    <FeatherIcon name='plus' size={15} color={COLORS.primary}/>
                                    <Text style={[FONTS.fontMedium,FONTS.font,{fontSize:15,color:COLORS.primary}]}>Add Address</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <View
                    style={[GlobalStyleSheet.container]}
                >
                    <Button
                        title='Save'
                        onPress={() => (navigation.goBack())}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
   row: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    Button:{
        height:40,
        width:40,
        backgroundColor:'transparent',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:30,
    },
    addButton:{
        // backgroundColor:'red',
        height:40,
        paddingHorizontal:12,
        borderRadius:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:10,
        position:'absolute',
        right:-15,
        top:-10
    },
})

export default Salesinvoice