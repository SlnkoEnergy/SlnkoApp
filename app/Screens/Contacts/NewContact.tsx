import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, StyleSheet, TextInputFocusEvent } from 'react-native'
import React, { useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { ScrollView } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CustomInput from '../../components/Input/CustomInput';
import { COLORS, FONTS } from '../../constants/theme';
import { CountryPicker } from 'react-native-country-codes-picker';
import FeatherIcon from "react-native-vector-icons/Feather";
import Button from '../../components/Button/Button';
import { IMAGES } from '../../constants/Images';
import RBSheet from 'react-native-raw-bottom-sheet';

type NewContactScreenProps = StackScreenProps<RootStackParamList, 'NewContact'>;

const NewContact = ({ navigation } : NewContactScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+1');
    const [countryflag, setCountryflag] = useState('https://flagcdn.com/w40/ca.png');

    const refRBSheet = useRef<any>(null);

    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    
    const [selectedValue, setSelectedValue] = useState(null);

    const handleSelect = (value:any) => {
        setSelectedValue(value);
        refRBSheet.current.close();
    };

    const ContactType = [
        {
            group: "Contacts Type",
            items: [
                "Client", 
                "Staff", 
                "Worker", 
                "Investor"
            ]
        },
        {
            group: "Vendor",
            items: [
                "Material Supplier",
                "Labour Contractor",
                "Equipment Suplier",
                "Other Vender",
                "Sub Contractor"
            ]
        }
    ];


    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                leftIcon={'back'}
                title={'Create New Contact'}
                titleLeft
            />
            <View style={{flex:1,backgroundColor:colors.card,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={[GlobalStyleSheet.container, { paddingHorizontal: 20, paddingTop: 23,flex:1 }]}>
                        <View style={[GlobalStyleSheet.row,{gap:10,marginBottom:20}]}>
                            <View style={{flex:1}}>
                                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Contact Type</Text>
                                <View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setIsFocused(true);
                                            refRBSheet.current.open();
                                        }}
                                        activeOpacity={0.5}
                                        style={{
                                            flex:1,
                                            backgroundColor:colors.card,
                                            borderRadius:8,
                                            height:50,
                                            borderWidth:1.5,
                                            borderColor: isFocused ? COLORS.primary : colors.border,
                                            paddingHorizontal:15,
                                            flexDirection:'row',
                                            alignItems:'center',
                                            justifyContent:'space-between'
                                        }}
                                    >
                                        {selectedValue ?
                                            <Text numberOfLines={1} style={{...FONTS.fontMedium,fontSize:16,color:colors.title,paddingRight:25,flex:1}}>{selectedValue}</Text>
                                        :
                                            <Text style={{...FONTS.fontMedium,fontSize:16,color:colors.textLight}}>Select</Text>
                                        }
                                        <View style={{
                                            position:'absolute',
                                            right:10
                                        }}>
                                            <FeatherIcon color={colors.text} size={18} name="chevron-down"/>
                                        </View>
                                    </TouchableOpacity>
                                    <RBSheet
                                        ref={refRBSheet}
                                        height={450}
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
                                        <View style={[GlobalStyleSheet.container,{padding:20}]}>
                                            <Text style={[FONTS.h5,{...FONTS.fontMedium,color:colors.title,}]}>Contacts Type</Text>
                                            <ScrollView showsVerticalScrollIndicator={false}>
                                                <View style={{ flex: 1, marginBottom: 20, marginTop: 30 }}>
                                                    {ContactType.map((section, sectionIndex) => (
                                                        <View key={sectionIndex} style={{ marginBottom: 16 }}>
                                                            {sectionIndex !== 0 && (
                                                                <Text
                                                                    style={[
                                                                    FONTS.fontSm,
                                                                    { ...FONTS.fontMedium, color: colors.text, marginBottom: 12 }
                                                                    ]}
                                                                >
                                                                    {section.group}
                                                                </Text>
                                                            )}
                                                            <View style={GlobalStyleSheet.row}>
                                                            {section.items.map((item, index) => (
                                                                <View key={index} style={[GlobalStyleSheet.col50,{width:section.group === 'Vendor' ? '100%' : '50%'}]}>
                                                                    <TouchableOpacity
                                                                        onPress={() => handleSelect(item)}
                                                                        style={[
                                                                        GlobalStyleSheet.flexcenter,
                                                                        {
                                                                            borderWidth: 1.5,
                                                                            borderColor: colors.border,
                                                                            backgroundColor: colors.card,
                                                                            padding: 15,
                                                                            borderRadius: 8,
                                                                            marginBottom: 12
                                                                        }
                                                                        ]}
                                                                    >
                                                                        <Text
                                                                            numberOfLines={1}
                                                                            style={[
                                                                                FONTS.fontLg,
                                                                                {
                                                                                ...FONTS.fontMedium,
                                                                                color: colors.title,
                                                                                paddingRight: 20
                                                                                }
                                                                            ]}
                                                                        >
                                                                            {item}
                                                                        </Text>
                                                                        <View
                                                                            style={[
                                                                                {
                                                                                height: 18,
                                                                                width: 18,
                                                                                borderRadius: 18,
                                                                                backgroundColor: colors.card,
                                                                                borderWidth: 1,
                                                                                borderColor: colors.title,
                                                                                alignItems: "center",
                                                                                justifyContent: "center"
                                                                                },
                                                                                    selectedValue === item && {
                                                                                    backgroundColor: COLORS.primary,
                                                                                    borderColor: COLORS.primary
                                                                                }
                                                                            ]}
                                                                        >
                                                                            {selectedValue === item && (
                                                                                <FeatherIcon name="check" size={12} color={COLORS.card} />
                                                                            )}
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            ))}
                                                            </View>
                                                        </View>
                                                    ))}
                                                </View>
                                            </ScrollView>
                                        </View>
                                    </RBSheet>
                                </View>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Contact Id</Text>
                                <CustomInput
                                    inputBorder
                                    value={'PID -- 2'}
                                />
                            </View>
                        </View>
                        <View style={{marginBottom:20}}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Contact Name</Text>
                            <CustomInput
                                inputBorder
                            />
                        </View>
                        <View style={{marginBottom:20}}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Phone Number</Text>
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
                            <View style={[styles.inputStyle,{borderColor:isFocused2 ? COLORS.primary : colors.border}]}>
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
                                    // autoFocus
                                    keyboardType='number-pad'
                                    placeholder='Enter Phone number'
                                    placeholderTextColor={colors.textLight}
                                    maxLength={15}
                                    onFocus={() => {
                                        setIsFocused2(true);
                                    }}
                                    onBlur={() => {
                                        setIsFocused2(false);
                                    }}
                                    
                                />
                            </View>
                        </View>
                        <View style={{marginBottom:20}}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Email Address</Text>
                            <CustomInput
                                inputBorder
                            />
                        </View>
                        <View style={{marginBottom:20}}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Address</Text>
                            <CustomInput
                                inputBorder
                            />
                        </View>
                        <View style={{marginBottom:8}}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Aadhar Number</Text>
                            <CustomInput
                                inputBorder
                            />
                        </View>
                        <View style={{marginBottom:20}}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[styles.uploadButton,{borderColor:colors.border}]}
                            >
                                <Text style={[FONTS.fontMedium,{fontSize:14,color:COLORS.primary}]}>Upload</Text>
                                <Image
                                    style={{height:16,width:16}}
                                    source={IMAGES.cloudupload}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom:8}}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>PAN Number</Text>
                            <CustomInput
                                inputBorder
                            />
                        </View>
                        <View style={{marginBottom:15}}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[styles.uploadButton,{borderColor:colors.border}]}
                            >
                                <Text style={[FONTS.fontMedium,{fontSize:14,color:COLORS.primary}]}>Upload</Text>
                                <Image
                                    style={{height:16,width:16}}
                                    source={IMAGES.cloudupload}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{flexDirection:'row',justifyContent:'flex-end'}}
                        >
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={{flexDirection:'row',alignItems:'center',gap:3}}
                            >
                                <FeatherIcon color={COLORS.primary} size={16} name='plus'/>
                                <Text style={{...FONTS.fontMedium,fontSize:15,color:COLORS.primary,lineHeight:16}}>Opening Balancec</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:20}]}>
                    <Button
                        title='Save'
                        color={theme.dark ? COLORS.white :COLORS.primary}
                        text={colors.card}
                        onPress={() => navigation.goBack()}
                    />
                </View>
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
    uploadButton:{
        height:50,
        borderRadius:8,
        borderWidth:1.5,
        borderStyle:'dashed',
        borderColor:COLORS.borderColor,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:10
    }
    
})

export default NewContact