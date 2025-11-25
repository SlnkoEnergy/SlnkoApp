import { View, Text,TouchableOpacity,Image, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import Header from '../../layout/Header';
import { ScrollView } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { launchImageLibrary } from 'react-native-image-picker';
import FeatherIcon from "react-native-vector-icons/Feather";
import { COLORS, FONTS } from '../../constants/theme';
import CustomInput from '../../components/Input/CustomInput';
import Button from '../../components/Button/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { IMAGES } from '../../constants/Images';


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

type AddTaskScreenProps = StackScreenProps<RootStackParamList, 'AddTask'>;

const AddTask = ({ navigation } : AddTaskScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [imageUri, setImageUri] = useState<any>(null);
    
    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
        if (!response.didCancel && response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri);
        }
        });
    };


    const [selectedUnit, setSelectedUnit] = useState(areaUnits[0]); // Default is 'Sqft'
        
    const UnitRef = useRef<any>(null);

    const [isChecked, setisChecked] = useState(false);
    

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
            <TouchableOpacity onPress={onPress} style={styles.dateBox}>
                <FeatherIcon name="calendar" size={16} color={COLORS.primary} />
                <Text style={[{...FONTS.fontMedium, fontSize: 14, color: colors.title,}]}>{value ? value : '--'}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title={"Add Task"}
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
                        {/* <View style={{ alignItems: 'center' }}>
                            <View
                                style={{
                                    height: 120,
                                    width: 120,
                                    borderRadius: 8,
                                    borderWidth:1.5,
                                    borderColor:'#E8E8E8',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {imageUri ? (
                                    <Image
                                        source={{ uri: imageUri }}
                                        style={{ height: 120, width: 120, borderRadius:4 }}
                                    />
                                ) : (
                                    <FeatherIcon name='camera' size={24} color={'#333'} />
                                )}
                                <TouchableOpacity
                                    onPress={pickImage}
                                    style={{
                                        height:40,
                                        width:40,
                                        borderRadius:40,
                                        backgroundColor:colors.card,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        position:'absolute',
                                        bottom:-12,
                                        right:-12,
                                        zIndex:99
                                    }}
                                >
                                    <FeatherIcon name='edit' size={16} color={colors.text}/>
                                </TouchableOpacity>
                            </View>
                        </View> */}
                        <View style={{marginBottom:15 }}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Description</Text>
                            <CustomInput
                                inputBorder
                            />
                        </View>
                        <View style={{marginBottom:15 }}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Duration (Days) *</Text>
                            <CustomInput
                                inputBorder
                            />
                        </View>
                        <View>
                            <View style={styles.row}>
                                <DateInput label="Start Date" value={startDate} onPress={() => openPicker('start')} />
                                <View style={{ width: 12 }} />
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
                                <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.text,marginBottom:8}]}>Ouantity *</Text>
                                <CustomInput
                                    inputBorder
                                    keyboardType={'number-pad'}
                                    value={'100'}
                                />
                            </View>
                        </View>
                        <View style={{marginBottom:20}}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={{flexDirection:'row',alignItems:'center',gap:5}}
                            >
                                <FeatherIcon color={COLORS.primary} size={18} name='user-plus'/>
                                <Text style={{...FONTS.fontMedium,fontSize:14,color:COLORS.primary,lineHeight:16}}>Assignee</Text>
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
                <View
                    style={[GlobalStyleSheet.container]}
                >
                    <Button
                        title='Save'
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
        gap:8,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderWidth: 1.5,
        borderColor: '#E8E8E8', 
        borderRadius: 8,
    },
    dropdown: {
        height: 50,
        backgroundColor:COLORS.card,
        paddingHorizontal:10,
        borderRadius:6,
        borderWidth:1.5,
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
});

export default AddTask