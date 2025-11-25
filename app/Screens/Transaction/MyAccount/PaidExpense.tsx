import { View, Text, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Navigations/RootStackParamList';
import { SafeAreaView } from 'react-native';
import Header from '../../../layout/Header';
import { useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import { COLORS, FONTS } from '../../../constants/theme';
import { TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FeatherIcon from "react-native-vector-icons/Feather";
import CustomInput from '../../../components/Input/CustomInput';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FlatList } from 'react-native';
import Button from '../../../components/Button/Button';

type PaidExpenseScreenProps = StackScreenProps<RootStackParamList, 'PaidExpense'>;

const PaidExpense = ({navigation} : PaidExpenseScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event:any, selectedDate:any) => {
        setShowPicker(Platform.OS === 'ios'); // iOS needs modal behavior
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const formatDate = (date : any) => {
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
        });
    };

    const [selectedOption, setSelectedOption] = useState('Site Expense');

    const options = ['Site Expense', 'Party Payment'];

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
                title={"I Paid"}
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
                        <View style={[styles.row,{marginBottom:20}]}>
                            <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.text}]}>I Paid</Text>
                            <TouchableOpacity
                                onPress={() => setShowPicker(true)}
                                activeOpacity={0.5}
                                style={[styles.DateButton]}
                            >
                                <Text style={[FONTS.fontMedium,FONTS.font,{color:colors.title}]}>{formatDate(date)}</Text>
                                <FeatherIcon name="calendar" size={18} color={COLORS.primary} />
                            </TouchableOpacity>
                            {showPicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={onChange}
                                    maximumDate={new Date()}
                                />
                            )}
                        </View>
                        <View style={[styles.row,{marginBottom:20}]}>
                            {options.map((option, index) => {
                                const isSelected = selectedOption === option;
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => setSelectedOption(option)}
                                        style={styles.optionContainer}
                                        activeOpacity={0.8}
                                    >
                                        <View
                                            style={[
                                                styles.radioOuter,
                                                { borderColor: isSelected ? COLORS.primary : colors.text }
                                            ]}
                                        >
                                            {isSelected && <View style={[styles.radioInner, { backgroundColor: COLORS.primary }]} />}
                                        </View>
                                        <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.text}]}>{option}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        {selectedOption === 'Site Expense' ? 
                            <View>
                                <View style={{marginBottom:20}}>
                                    <Text style={[FONTS.font,FONTS.fontMedium,{ color: colors.text,marginBottom:10 }]}>Amount Given</Text>
                                    <CustomInput
                                        inputBorder
                                    />
                                </View>
                                <View style={{marginBottom:20}}>
                                    <Text style={[FONTS.font,FONTS.fontMedium,{ color: colors.text,marginBottom:10 }]}>Description</Text>
                                    <CustomInput
                                        inputBorder
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
                            </View>
                        :
                            <View>
                                <View style={{marginBottom:20}}>
                                    <Text style={[FONTS.font,FONTS.fontMedium,{ color: colors.text,marginBottom:10 }]}>To Party</Text>
                                    <CustomInput
                                        inputBorder
                                        lefticon={<FeatherIcon name='users' size={20} color={colors.text}/>}
                                        style={{paddingLeft:50,}}
                                    />
                                </View>
                                <View style={{marginBottom:20}}>
                                    <Text style={[FONTS.font,FONTS.fontMedium,{ color: colors.text,marginBottom:10 }]}>Amount Given</Text>
                                    <CustomInput
                                        inputBorder
                                    />
                                </View>
                                <View style={{marginBottom:20}}>
                                    <Text style={[FONTS.font,FONTS.fontMedium,{ color: colors.text,marginBottom:10 }]}>Description</Text>
                                    <CustomInput
                                        inputBorder
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
                                <View
                                    style={[styles.row]}
                                >
                                    <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.text,flex:1}]}>Add more detai</Text>
                                    <TouchableOpacity
                                        style={[styles.DateButton,{right:-10,top:-5}]}
                                    >
                                        <FeatherIcon name='plus' size={14} color={colors.text}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
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
    DateButton:{
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
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:10
    },
    radioOuter: {
        width: 14,
        height: 14,
        borderRadius: 9,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
})

export default PaidExpense