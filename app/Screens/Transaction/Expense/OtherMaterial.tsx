import { View, Text, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Navigations/RootStackParamList';
import { SafeAreaView } from 'react-native';
import Header from '../../../layout/Header';
import { ScrollView } from 'react-native';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import { TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../../constants/theme';
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import FeatherIcon from "react-native-vector-icons/Feather";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import CustomInput from '../../../components/Input/CustomInput';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FlatList } from 'react-native';
import Button from '../../../components/Button/Button';

type OtherMaterialScreenProps = StackScreenProps<RootStackParamList, 'OtherMaterial'>;

const OtherMaterial = ({navigation} : OtherMaterialScreenProps) => {

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event: any, selectedDate?: Date) => {
        setShowPicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [isCheckedAssign, setisCheckedAssign] = useState(false);

    const costCodes = ['CC-101', 'CC-202', 'CC-303', 'CC-404'];
        
    const refRBSheet = useRef<any>(null);
    
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
                title={"Add Expense"}
                leftIcon={'back'}
                titleLeft
            />
            <View style={{flex:1,backgroundColor:colors.card,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow:1}}
                >
                    <View
                        style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:20}]}
                    >
                        <View style={{marginBottom:20}}>
                            <Text style={[FONTS.font,FONTS.fontMedium,{ color: colors.text,marginBottom:5 }]}>Other Expense</Text>
                            <TouchableOpacity
                                onPress={() => setShowPicker(true)}
                                activeOpacity={0.8}
                                style={{
                                    flex: 1,
                                    backgroundColor: colors.card,
                                    borderRadius: 6,
                                    height: 50,
                                    borderWidth: 1,
                                    borderColor: 'rgba(80,88,109,.2)',
                                    paddingHorizontal: 15,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        ...FONTS.fontMedium,
                                        fontSize: 15,
                                        color: colors.title,
                                    }}
                                >
                                    {format(date, 'dd MMM yyyy')}
                                </Text>
                                <FeatherIcon name="edit" size={18} color={colors.title} />
                            </TouchableOpacity>
                            {showPicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                                    onChange={onChange}
                                    themeVariant={Platform.OS === 'ios' ? 'light' : undefined}
                                />
                            )}
                        </View>
                        <View style={{marginBottom:20}}>
                            <Text style={[FONTS.font,FONTS.fontMedium,{ color: colors.text,marginBottom:5 }]}>Party Name*</Text>
                            <CustomInput
                                inputBorder
                                lefticon={<FeatherIcon name='users' size={20} color={colors.text}/>}
                                style={{paddingLeft:50,}}
                            />
                        </View>
                        <View style={{marginBottom:20}}>
                            <TouchableOpacity
                                onPress={() => setisCheckedAssign(!isCheckedAssign)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap:6,
                                }}
                            >
                                <View
                                    style={{
                                        height:20,
                                        width:20,
                                        borderRadius:4,
                                        borderWidth:1,
                                        borderColor:isCheckedAssign ? COLORS.primary : colors.text,
                                        backgroundColor:isCheckedAssign ? COLORS.primary: colors.background,
                                        alignItems:'center',
                                        justifyContent:'center',
                                    }}
                                >
                                    {isCheckedAssign &&
                                        <FeatherIcon size={14} color={COLORS.card} name={'check'} />
                                    }
                                </View>
                                <Text
                                    style={[{...FONTS.fontMedium,fontSize:15,color:colors.text}]}
                                >
                                    Add Quantality and Unit Rate
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.row,{marginBottom:20}]}>
                            <Text style={[FONTS.fontMedium,{fontSize:14,color:colors.text,flex:1}]}>Sub Total</Text>
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
                        <View style={{marginBottom:10}}>
                            <TouchableOpacity
                                activeOpacity={0.5} 
                                style={[styles.row,{gap:5,justifyContent:'flex-end'}]}
                            >
                                <Text style={[FONTS.font,FONTS.fontMedium,{color:COLORS.primary}]}>Additional Charges</Text>
                                <FeatherIcon name='plus' size={14} color={COLORS.primary}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom:10}}>
                            <TouchableOpacity
                                activeOpacity={0.5} 
                                style={[styles.row,{gap:5,justifyContent:'flex-end'}]}
                            >
                                <Text style={[FONTS.font,FONTS.fontMedium,{color:COLORS.primary}]}>Add Discount</Text>
                                <FeatherIcon name='plus' size={14} color={COLORS.primary}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom:20}}>
                            <TouchableOpacity
                                activeOpacity={0.5} 
                                style={[styles.row,{gap:5,justifyContent:'flex-end'}]}
                            >
                                <Text style={[FONTS.font,FONTS.fontMedium,{color:COLORS.primary}]}>Add GST</Text>
                                <FeatherIcon name='plus' size={14} color={COLORS.primary}/>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.row,{marginBottom:15}]}>
                            <Text style={[FONTS.fontMedium,{fontSize:14,color:colors.text,flex:1}]}>Total Amount</Text>
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
                                        height:50,
                                        borderWidth: 1.5,
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
                        <View style={{marginBottom:10}}>
                            <TouchableOpacity
                                activeOpacity={0.5} 
                                style={[styles.row,{gap:5,justifyContent:'flex-end'}]}
                            >
                                <Text style={[FONTS.font,FONTS.fontMedium,{color:COLORS.primary}]}>Paid Amount</Text>
                                <FeatherIcon name='plus' size={14} color={COLORS.primary}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom:20}}>
                            <TouchableOpacity
                                activeOpacity={0.5} 
                                style={[styles.row,{gap:5,justifyContent:'flex-end'}]}
                            >
                                <Text style={[FONTS.font,FONTS.fontMedium,{color:COLORS.primary}]}>Add Notes</Text>
                                <FeatherIcon name='plus' size={14} color={COLORS.primary}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom:30}}>
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

export default OtherMaterial