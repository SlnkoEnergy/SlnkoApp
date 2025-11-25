import { View, Text, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import Header from '../../layout/Header';
import { ScrollView } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CustomInput from '../../components/Input/CustomInput';
import { COLORS, FONTS } from '../../constants/theme';
import { Dropdown } from 'react-native-element-dropdown';
import FeatherIcon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { IMAGES } from '../../constants/Images';
import Button from '../../components/Button/Button';


const areaUnits = [
  { label: 'Sqft', value: 'sqft' },
  { label: 'Sqm', value: 'sqm' },
  { label: 'Acre', value: 'acre' },
  { label: 'Hectare', value: 'hectare' },
  { label: 'Sq Yard', value: 'sqyard' },
  { label: 'Sq Inch', value: 'sqinch' },
  { label: 'Sq Meter', value: 'sqmeter' },
  { label: 'Sq Kilometer', value: 'sqkm' },
  { label: 'Sq Mile', value: 'sqmile' },
];

const gstRates = [
  { label: '0% GST', value: '0' },
  { label: '5.0% GST', value: '5' },
  { label: '12.0% GST', value: '12' },
  { label: '18.0% GST', value: '18' },
  { label: '28.0% GST', value: '28' },
];

type AddItemScreenProps = StackScreenProps<RootStackParamList, 'AddItem'>;

const AddItem = ({ navigation } : AddItemScreenProps)  => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [selectedUnit, setSelectedUnit] = useState(areaUnits[0]); // Default is 'Sqft'
    
    const [selectedGST, setSelectedGST] = useState(gstRates[3]);

    const UnitRef = useRef<any>(null);
    const GSTRef = useRef<any>(null);

    const [isChecked, setisChecked] = useState(false);

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                leftIcon={'back'}
                title={'Add Item'}
                titleLeft
            />
            <View style={{flex:1,backgroundColor:colors.card,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={[GlobalStyleSheet.container, { paddingHorizontal: 20, paddingTop: 23,flex:1 }]}>
                        <View style={{marginBottom:20}}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Item name</Text>
                            <CustomInput
                                inputBorder
                            />
                        </View>
                        <View style={{marginBottom:20}}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Item Code</Text>
                            <CustomInput
                                inputBorder
                            />
                        </View>
                        <View style={[{flexDirection:'row',alignItems:'center',gap:10,marginBottom:10}]}>
                            <View style={{flex:1}}>
                                <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.text,marginBottom:8}]}>UNIT</Text>
                                <Dropdown
                                    style={[styles.dropdown,{backgroundColor:colors.card,borderColor:colors.border}]}
                                    selectedTextStyle={{
                                        ...FONTS.fontMedium,
                                        fontSize: 16,
                                        color: colors.title,
                                    }}
                                    data={areaUnits}
                                    maxHeight={500}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Unit"
                                    value={selectedUnit}
                                    onChange={item => setSelectedUnit(item)}
                                    ref={UnitRef}
                                />
                                <TouchableOpacity
                                    style={{
                                        width:'100%',
                                        height: 48,
                                        paddingHorizontal:10,
                                        paddingVertical:15,
                                        borderRadius:6,
                                        position:'absolute',
                                        bottom:0,
                                        left:0,
                                        right:0
                                    }}
                                    onPress={() => {
                                        if (UnitRef.current) {
                                            UnitRef.current.open(); // Open the dropdown programmatically
                                        }
                                    }}
                                />
                            </View>
                            <View style={{flex:1}}>
                                <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.text,marginBottom:8}]}>GST</Text>
                                <Dropdown
                                    style={[styles.dropdown,{backgroundColor:colors.card,borderColor:colors.border}]}
                                    selectedTextStyle={{
                                        ...FONTS.fontMedium,
                                        fontSize: 16,
                                        color: colors.title,
                                    }}
                                    data={gstRates}
                                    maxHeight={500}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select GST"
                                    value={selectedGST}
                                    onChange={item => setSelectedGST(item)}
                                    ref={GSTRef}
                                />
                                <TouchableOpacity
                                    style={{
                                        width:'100%',
                                        height: 48,
                                        paddingHorizontal:10,
                                        paddingVertical:15,
                                        borderRadius:6,
                                        position:'absolute',
                                        bottom:0,
                                        left:0,
                                        right:0
                                    }}
                                    onPress={() => {
                                        if (GSTRef.current) {
                                            GSTRef.current.open(); // Open the dropdown programmatically
                                        }
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{marginBottom:10}}>
                            <TouchableOpacity
                                onPress={() => setisChecked(!isChecked)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap:10,
                                    paddingVertical: 10,
                                    paddingLeft:5,
                                    flex:1
                                }}
                            >
                                <View
                                    style={{
                                        height:20,
                                        width:20,
                                        borderRadius:4,
                                        borderWidth:1.5,
                                        borderColor:isChecked ? COLORS.primary : colors.text,
                                        backgroundColor:isChecked ? COLORS.primary: 'transparent',
                                        alignItems:'center',
                                        justifyContent:'center',
                                    }}
                                >
                                    {isChecked &&
                                        <FeatherIcon size={14} color={COLORS.card} name={'check'} />
                                    }
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center',flex:1,gap:5}}>
                                    <Text
                                        style={[FONTS.font,{...FONTS.fontMedium, color:colors.text}]}
                                    >
                                        Add Measurements
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom:20}}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Estimated Quantity</Text>
                            <CustomInput
                                inputBorder
                                keyboardType={'number-pad'}
                            />
                        </View>
                        <View style={[GlobalStyleSheet.flexcenter,{marginBottom:10}]}>
                            <View style={{width:'50%'}}>
                                <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.title,lineHeight:22}}>Unit Sales Price</Text>
                            </View>
                            <View
                                style={{flexDirection:'row',alignItems:'center',gap:10,width:'50%'}}
                            >
                                <Text style={{...FONTS.fontMedium,fontSize:18,color:colors.text,lineHeight:20}}>₹</Text>
                                <View style={{flex:1}}>
                                    <CustomInput
                                        inputBorder
                                        keyboardType={'number-pad'}
                                        style={{
                                            backgroundColor: '#F0F3F8',
                                            textAlign:'center',
                                        }}
                                        value={'0'}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{marginBottom:20}}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Cost Code</Text>
                            <CustomInput
                                inputBorder
                                keyboardType={'number-pad'}
                            />
                        </View>
                        <View style={{marginBottom:20}}>
                            <TouchableOpacity
                                // onPress={() => refRBSheet.current.open()} 
                                activeOpacity={0.5}
                                style={{flexDirection:'row',alignItems:'center',gap:3}}
                            >
                                <FeatherIcon color={COLORS.primary} size={18} name='plus'/>
                                <Text style={{...FONTS.fontMedium,fontSize:14,color:COLORS.primary,lineHeight:16}}>Description</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={() => refRBSheet.current.open()} 
                                activeOpacity={0.5}
                                style={{flexDirection:'row',alignItems:'center',gap:3,marginTop:5}}
                            >
                                <FeatherIcon color={COLORS.primary} size={18} name='plus'/>
                                <Text style={{...FONTS.fontMedium,fontSize:14,color:COLORS.primary,lineHeight:16}}>HSN / SAC Code</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom:15}}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Attachments</Text>
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
                    </View>
                </ScrollView>
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:20}]}>
                    <Button
                        title='Save'
                        color={theme.dark ? COLORS.white :COLORS.primary}
                        text={colors.card}
                        onPress={() => {navigation.goBack()}}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        backgroundColor:COLORS.card,
        paddingHorizontal:10,
        borderRadius:6,
        borderWidth:1.5,
    },
    placeholderStyle: {
        color:COLORS.text,
        fontSize: 14,
    },
    selectedTextStyle: {
      fontSize: 16,
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

export default AddItem