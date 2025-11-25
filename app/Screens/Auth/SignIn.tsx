import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView,TextInput } from 'react-native';
import { FONTS, COLORS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Button from '../../components/Button/Button';
import FeatherIcon from "react-native-vector-icons/Feather";
import { ScrollView } from 'react-native-gesture-handler';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import Header from '../../layout/Header';
import { CountryPicker } from 'react-native-country-codes-picker';
import { StyleSheet } from 'react-native';

type SignInScreenProps = StackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({ navigation } : SignInScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+1');
    const [countryflag, setCountryflag] = useState('https://flagcdn.com/w40/ca.png');

    const [isChecked, setisChecked] = useState(false);


    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                leftIcon={'back-2'}
                rightIcon={'Language'}
                onPress={() => navigation.navigate('ChooseLanguage')}
            />
            <View style={{flex:1,backgroundColor:colors.card,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={[GlobalStyleSheet.container, { paddingHorizontal: 20, paddingTop: 48,flex:1 }]}>
                        <View style={{flex:1}}>
                            <View style={{alignItems:'flex-start'}}>
                                <View style={[GlobalStyleSheet.row,{gap:10,alignItems:'center',marginBottom:15}]}>
                                    <Image
                                        style={{height:30,width:30}}   
                                        source={IMAGES.wave}
                                    />
                                    <Text style={{ ...FONTS.fontMedium, fontSize: 28, color: colors.title,}}>Welcome Back!</Text>
                                </View>
                                <Text style={[FONTS.fontLg,{ color: colors.text,fontSize:15,paddingRight:80 }]}>We will send you a 6 digit confirmation code to verify phone number </Text>
                            </View>
                            <View style={{marginTop: 30 }}>
                                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Mobile Number</Text>
                                <CountryPicker
                                    show={show}
                                    pickerButtonOnPress={(item) => {
                                        setCountryCode(item.dial_code);
                                        setCountryflag(`https://flagcdn.com/w40/${item.code.toLowerCase()}.png`);
                                        setShow(false);
                                    } }
                                    onBackdropPress={() => setShow(false)}
                                    style={{
                                        modal: {
                                            height: '60%',
                                            backgroundColor: colors.card,
                                        },
                                        textInput: {
                                            paddingHorizontal: 12,
                                            height: 48,
                                            color: colors.title,
                                            backgroundColor: colors.bgLight
                                        },
                                        dialCode: {
                                            ...FONTS.fontLg,
                                            ...FONTS.fontSemiBold,
                                            color: colors.title,
                                        },
                                        countryName: {
                                            ...FONTS.font,
                                            ...FONTS.fontSemiBold,
                                            color: colors.text,
                                        },
                                        countryButtonStyles: {
                                            height: 50,
                                            backgroundColor: colors.cardBg,
                                            borderRadius: 0,
                                            borderBottomWidth: 1,
                                            borderBottomColor: colors.borderColor,
                                            marginBottom: 0,
                                        },
                                    }} 
                                    lang={''}                                
                                />
                                <View style={[styles.inputStyle,{borderColor:colors.border}]}>
                                    <TouchableOpacity
                                        onPress={() => setShow(true)}
                                        style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                            paddingRight:10,
                                        }}
                                    >
                                        <View
                                            style={{
                                                overflow:'hidden',
                                                height:18,
                                                width:18,
                                                borderRadius:25,
                                                marginRight: 6,
                                                alignItems:'center',
                                                justifyContent:'center'
                                            }}
                                        >
                                            <Image
                                                source={{ uri: countryflag }}
                                                style={{ width: 25, height: 30 }}
                                                resizeMode="contain"
                                            />
                                        </View>
                                        <Text style={{
                                            ...FONTS.fontRegular,
                                            fontSize:15,
                                            color:colors.title,
                                        }}>{countryCode}</Text>
                                        <FeatherIcon style={{marginLeft:5}} color={colors.text} size={18} name="chevron-down"/>
                                    </TouchableOpacity>

                                    <TextInput
                                        style={{
                                            ...FONTS.fontRegular,
                                            fontSize:18,
                                            color:colors.title,
                                            flex:1,
                                            top:0,
                                            borderLeftWidth:1,
                                            borderLeftColor:colors.border,
                                            paddingVertical:0,
                                            paddingLeft:20,
                                        }}
                                        autoFocus
                                        keyboardType='number-pad'
                                        placeholder='Enter Phone number'
                                        placeholderTextColor={colors.textLight}
                                        maxLength={15}
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={() => setisChecked(!isChecked)}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems:'flex-start',
                                        gap:10,
                                        paddingVertical: 10,
                                        paddingLeft:5
                                    }}
                                >
                                    <View
                                        style={{
                                            height:20,
                                            width:20,
                                            borderRadius:4,
                                            borderWidth:1.5,
                                            borderColor:isChecked ? COLORS.primary : colors.checkBoxborder,
                                            backgroundColor:isChecked ? COLORS.primary: 'transparent',
                                            alignItems:'center',
                                            justifyContent:'center',
                                        }}
                                    >
                                        {isChecked &&
                                            <FeatherIcon size={14} color={COLORS.card} name={'check'} />
                                        }
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center',flex:1,gap:5,flexWrap:'wrap',paddingRight:10}}>
                                        <Text
                                            style={{
                                                ...FONTS.fontRegular,
                                                fontSize: 13,
                                                color: colors.title,
                                                lineHeight:20
                                            }}
                                        >
                                            I agree to sitemaster user agreements &
                                        </Text>
                                        <TouchableOpacity
                                            activeOpacity={0.6}
                                        >
                                            <Text
                                                style={{
                                                    ...FONTS.fontRegular,
                                                    fontSize: 13,
                                                    color: COLORS.primary,
                                                    textDecorationLine:'underline',
                                                    lineHeight:20
                                                }}
                                            >
                                                privacy policy
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Button
                            title={'Request OTP'}
                            onPress={() => navigation.navigate('UserDetails')}
                            color={theme.dark ? COLORS.white :COLORS.primary}
                            text={colors.card}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

    inputStyle:{
        height:50,
        paddingHorizontal:15,
        borderWidth : 1.5,
        borderRadius: 8,
        flexDirection:'row',
        alignItems:'center'
    },
    
})

export default SignIn;