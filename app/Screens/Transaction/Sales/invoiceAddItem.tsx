import { View, Text, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import Header from '../../../layout/Header';
import { ScrollView } from 'react-native';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import CustomInput from '../../../components/Input/CustomInput';
import { COLORS, FONTS } from '../../../constants/theme';
import { Dropdown } from 'react-native-element-dropdown';
import FeatherIcon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from '../../../components/Button/Button';
import { FlatList } from 'react-native';


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

type invoiceAddItemScreenProps = StackScreenProps<RootStackParamList, 'invoiceAddItem'>;

const invoiceAddItem = ({ navigation } : invoiceAddItemScreenProps)  => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [selectedUnit, setSelectedUnit] = useState(areaUnits[0]); // Default is 'Sqft'
    
    const [selectedGST, setSelectedGST] = useState(gstRates[3]);

    const UnitRef = useRef<any>(null);
    const GSTRef = useRef<any>(null);


    const costCodes = ['CC-101', 'CC-202', 'CC-303', 'CC-404'];
    
    const refRBSheet = useRef<any>();
    
    const [selectedValue, setSelectedValue] = useState('');

    const handleSelect = (code:any) => {
        setSelectedValue(code);
        refRBSheet.current.close();
    };

    const clearSelection = () => {
        setSelectedValue('');
    };

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
                        <View style={[{flexDirection:'row',alignItems:'center',gap:10,marginBottom:20}]}>
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
                        <View style={{marginBottom:20}}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Invoice Quantity</Text>
                            <CustomInput
                                inputBorder
                                keyboardType={'number-pad'}
                            />
                        </View>
                        <View style={[styles.row,{marginBottom:20}]}>
                            <Text style={[FONTS.fontMedium,{fontSize:16,color:colors.title,flex:1}]}>Unit Sales Price</Text>
                            <View>
                                <CustomInput
                                    inputBorder
                                    placeholder={'₹'}
                                    style={{
                                        height:30,
                                        paddingVertical:0,
                                        textAlign:'center',
                                        fontSize:15,
                                        paddingLeft:30,
                                        paddingRight:30,
                                    }}
                                    numberOfLines={1}
                                />
                            </View>
                        </View>
                        <View style={[styles.row,{marginBottom:20}]}>
                            <Text style={[FONTS.fontMedium,{fontSize:16,color:colors.title,flex:1}]}>Sales Price</Text>
                            <View>
                                <CustomInput
                                    inputBorder
                                    placeholder={'₹'}
                                    style={{
                                        height:30,
                                        paddingVertical:0,
                                        textAlign:'center',
                                        fontSize:15,
                                        paddingLeft:30,
                                        paddingRight:30,
                                    }}
                                    numberOfLines={1}
                                />
                            </View>
                        </View>
                        <View style={{marginBottom:15 }}>
                            <Text style={[FONTS.font,FONTS.fontMedium,{ color: colors.text,marginBottom:10 }]}>Cost Code</Text>
                            <View style={{position:'relative'}}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        if (!selectedValue) {
                                            refRBSheet.current.open();
                                        }
                                    }}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: colors.border,
                                        borderRadius: 8,
                                        padding: 12,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                        ...FONTS.fontRegular,
                                        color: selectedValue ? colors.text : colors.placeholder,
                                        }}
                                    >
                                        {selectedValue || 'Select'}
                                    </Text>

                                    {selectedValue ? (
                                        <TouchableOpacity onPress={clearSelection}>
                                            <FeatherIcon color={colors.text} size={18} name="x" />
                                        </TouchableOpacity>
                                    ) : (
                                        <FeatherIcon color={colors.text} size={18} name="chevron-down" />
                                    )}
                                </TouchableOpacity>
                                <RBSheet
                                    ref={refRBSheet}
                                    height={450}
                                    openDuration={250}
                                    customStyles={{
                                        container: {
                                            backgroundColor:colors.card,
                                            borderTopLeftRadius: 20,
                                            borderTopRightRadius: 20,
                                            paddingTop:10
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
                                    <View style={[GlobalStyleSheet.container,]}>
                                        <View style={[GlobalStyleSheet.flexcenter,{justifyContent:'flex-start',gap:10,marginBottom:20}]}>
                                            <TouchableOpacity
                                                onPress={() => refRBSheet.current.close()}
                                                style={[styles.backButton]}
                                            >
                                                <FeatherIcon name='chevron-left' size={24} color={colors.title}/>
                                            </TouchableOpacity>
                                            <Text style={[FONTS.h6,{color:colors.title,lineHeight:20,paddingLeft:30,flex:1}]}>Select Cost Code</Text>
                                            <View
                                                style={{flexDirection:'row',justifyContent:'flex-end'}}
                                            >
                                                <TouchableOpacity
                                                    activeOpacity={0.5}
                                                    style={{flexDirection:'row',alignItems:'center',gap:3}}
                                                >
                                                    <FeatherIcon color={COLORS.primary} size={18} name='plus'/>
                                                    <Text style={[FONTS.h6,{color:COLORS.primary,lineHeight:20}]}>Create New</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <FlatList
                                            data={costCodes}
                                            keyExtractor={(item) => item}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    style={styles.sheetItem}
                                                    onPress={() => handleSelect(item)}
                                                >
                                                    <Text style={{...FONTS.fontSemiBold,fontSize:14,color:colors.text}}>{item}</Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </View>
                                </RBSheet>
                            </View>
                        </View>
                        <View style={{marginBottom:20,alignItems:'flex-end'}}>
                            <TouchableOpacity
                                // onPress={() => refRBSheet.current.open()} 
                                activeOpacity={0.5}
                                style={{flexDirection:'row',alignItems:'center',gap:3,marginBottom:5}}
                            >
                                <FeatherIcon color={COLORS.primary} size={18} name='plus'/>
                                <Text style={{...FONTS.fontMedium,fontSize:15,color:COLORS.primary,lineHeight:16}}>Description</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={() => refRBSheet.current.open()} 
                                activeOpacity={0.5}
                                style={{flexDirection:'row',alignItems:'center',gap:3,marginTop:5}}
                            >
                                <FeatherIcon color={COLORS.primary} size={18} name='plus'/>
                                <Text style={{...FONTS.fontMedium,fontSize:15,color:COLORS.primary,lineHeight:16}}>HSN / SAC Code</Text>
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
    row: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        gap: 10,
    },
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
    },
    sheetItem: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    backButton:{
        height:40,
        width:40,
        backgroundColor:'transparent',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:30,
        position:'absolute',
        left:-10,
        zIndex:99
    }
  })

export default invoiceAddItem