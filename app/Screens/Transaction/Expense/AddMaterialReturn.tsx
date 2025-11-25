import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import Header from '../../../layout/Header';
import { ScrollView } from 'react-native';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import { COLORS, FONTS } from '../../../constants/theme';
import { TouchableOpacity } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomInput from '../../../components/Input/CustomInput';
import FeatherIcon from "react-native-vector-icons/Feather";
import Button from '../../../components/Button/Button';
import { Dropdown } from 'react-native-element-dropdown';

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

const users = [
    {
        id: '1',
        name: 'W3 Chandan',
        unit: 'Numbers',
        initial: 'W',
    },
    {
        id: '2',
        name: 'W3 Yatin',
        unit: 'Numbers',
        initial: 'W',
    },
];

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

const categoryNames = [
  "Client", 
  "Staff", 
  "Worker", 
  "Investor",
  "Material Supplier",
  "Labour Contractor",
  "Equipment Suplier",
  "Other Vender",
  "Sub Contractor"
];


type AddMaterialReturnScreenProps = StackScreenProps<RootStackParamList, 'AddMaterialReturn'>;

const AddMaterialReturn = ({navigation} : AddMaterialReturnScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const refRBSheet = useRef<any>(null);

    const MaterialSheet = useRef<any>(null);

    const CategorySheet = useRef<any>(null);
    
    const [isFocused, setIsFocused] = useState(false);
    
    const [selectedValue, setSelectedValue] = useState(null);

    const handleSelect = (value:any) => {
        setSelectedValue(value);
        refRBSheet.current.close();
    };

   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

   const [selectedUnit, setSelectedUnit] = useState(areaUnits[0]); // Default is 'Sqft'
       
    const [selectedGST, setSelectedGST] = useState(gstRates[3]);

    const UnitRef = useRef<any>(null);
    const GSTRef = useRef<any>(null);
    
    const [selectedCategoryValue, setSelectedCategoryValue] = useState('');

    const CategoryhandleSelect = (code:any) => {
        setSelectedCategoryValue(code);
        CategorySheet.current.close();
    };

    const clearSelection = () => {
        setSelectedCategoryValue('');
    };

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title={"Add Material Return"}
                leftIcon={'back'}
                titleLeft
            />
            <View style={{flex:1,backgroundColor:colors.card,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow:1}}
                >
                    <View
                        style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:20,flex:1}]}
                    >
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
                                    placeholder={'Search Material'}
                                    icon={<FeatherIcon name='search' size={16} color={colors.text}/>}
                                />
                            </View>
                        </View>
                        <View style={[styles.row,{marginBottom:20}]}>
                            <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.text}]}>Selected ({selectedUsers.length}/{users.length})</Text>
                            <TouchableOpacity
                                onPress={() => MaterialSheet.current.open()}
                                activeOpacity={0.5} 
                                style={[styles.addButton,{gap:5,right:-10}]}
                            >
                                <Text style={[FONTS.font,FONTS.fontMedium,{color:COLORS.primary}]}>New Material</Text>
                                <FeatherIcon name='plus' size={14} color={COLORS.primary}/>
                            </TouchableOpacity>
                            <RBSheet
                                ref={MaterialSheet}
                                height={550}
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
                                        <Text style={[FONTS.fontMedium,{fontSize:18,color:colors.title}]}>Create New Material</Text>
                                        <View style={{marginBottom:15,marginTop:20 }}>
                                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Material Name</Text>
                                            <CustomInput
                                                inputBorder
                                            />
                                        </View>
                                        <View style={[{flexDirection:'row',alignItems:'center',gap:10,marginBottom:15}]}>
                                            <View style={{flex:1}}>
                                                <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.text,marginBottom:5}]}>Unit*</Text>
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
                                                <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.text,marginBottom:5}]}>GST</Text>
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
                                        <View style={{marginBottom:15 }}>
                                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>+ HSN / SAC Code</Text>
                                            <CustomInput
                                                inputBorder
                                            />
                                        </View>
                                        <View style={{marginBottom:15 }}>
                                            <View style={{position:'relative'}}>
                                                <TouchableOpacity
                                                    activeOpacity={0.7}
                                                    onPress={() => {
                                                        if (!selectedCategoryValue) {
                                                            CategorySheet.current.open();
                                                        }
                                                    }}
                                                    style={{
                                                        height:50,
                                                        borderWidth: 1,
                                                        borderColor: colors.border,
                                                        borderRadius: 8,
                                                        padding: 12,
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        backgroundColor:colors.card
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                        ...FONTS.fontMedium,
                                                        fontSize:16,
                                                        color: selectedCategoryValue ? colors.text : colors.placeholder,
                                                        }}
                                                    >
                                                        {selectedCategoryValue || 'Category'}
                                                    </Text>

                                                    {selectedCategoryValue ? (
                                                        <TouchableOpacity onPress={clearSelection}>
                                                            <FeatherIcon color={colors.text} size={18} name="x" />
                                                        </TouchableOpacity>
                                                    ) : (
                                                        <FeatherIcon color={colors.text} size={18} name="chevron-down" />
                                                    )}
                                                </TouchableOpacity>
                                                <RBSheet
                                                    ref={CategorySheet}
                                                    height={600}
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
                                                                onPress={() => CategorySheet.current.close()}
                                                                style={[styles.backButton]}
                                                            >
                                                                <FeatherIcon name='chevron-left' size={24} color={colors.title}/>
                                                            </TouchableOpacity>
                                                            <Text style={[FONTS.h6,{color:colors.title,lineHeight:20,paddingLeft:30,flex:1}]}>Select Category</Text>
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
                                                            data={categoryNames}
                                                            keyExtractor={(item) => item}
                                                            renderItem={({ item }) => (
                                                                <TouchableOpacity
                                                                    style={styles.sheetItem}
                                                                    onPress={() => CategoryhandleSelect(item)}
                                                                >
                                                                    <Text style={{...FONTS.fontSemiBold,fontSize:14,color:colors.text}}>{item}</Text>
                                                                </TouchableOpacity>
                                                            )}
                                                        />
                                                    </View>
                                                </RBSheet>
                                            </View>
                                        </View>
                                        <View style={{marginBottom:15 }}>
                                            <CustomInput
                                                inputBorder
                                                value={'Specifications'}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>
                                <View
                                    style={[GlobalStyleSheet.container]}
                                >
                                    <Button
                                        title='Save'
                                        onPress={() => { 
                                            MaterialSheet.current.close();            
                                        }}
                                    />
                                </View>
                            </RBSheet>
                        </View>
                        <View>
                            {users.map((data:any,index:any) => {
                                return(
                                    <View
                                        key={index}
                                        style={[GlobalStyleSheet.flexcenter,{
                                            padding:15,
                                            backgroundColor:colors.background,
                                            borderRadius:8,
                                            borderWidth:1,
                                            borderColor:'#EEEEEE',
                                            marginBottom:12
                                        }]}
                                    >
                                        <View
                                            style={[styles.row]}
                                        >
                                            <View
                                                style={{
                                                    height:40,
                                                    width:40,
                                                    backgroundColor:'rgba(65,154,144,0.2)',
                                                    borderRadius:6,
                                                    alignItems:'center',
                                                    justifyContent:'center'
                                                }}
                                            >
                                                <Text style={{...FONTS.fontMedium,fontSize:18,color:colors.title}}>{data.initial}</Text>
                                            </View>
                                            <View>
                                                <Text style={{...FONTS.fontRegular,fontSize:12,color:colors.text}}>Unit: {data.unit}</Text>
                                                <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.title}]}>{data.name}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (selectedUsers.includes(data.id)) {
                                                    setSelectedUsers(selectedUsers.filter(id => id !== data.id));
                                                } else {
                                                    setSelectedUsers([...selectedUsers, data.id]);
                                                }
                                            }}
                                        >
                                            <View
                                                style={{
                                                    height:20,
                                                    width:20,
                                                    borderRadius:4,
                                                    borderWidth:1,
                                                    borderColor:selectedUsers.includes(data.id) ?  COLORS.primary : colors.text,
                                                    backgroundColor:selectedUsers.includes(data.id) ?  COLORS.primary: 'transparent',
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                }}
                                            >
                                                {selectedUsers.includes(data.id) && 
                                                    <FeatherIcon size={14} color={COLORS.card} name={'check'} />
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}                    
                        </View>
                    </View>
                </ScrollView>
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
    dropdown: {
        height: 50,
        backgroundColor:COLORS.card,
        paddingHorizontal:10,
        borderRadius:6,
        borderWidth:1.5,
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


export default AddMaterialReturn