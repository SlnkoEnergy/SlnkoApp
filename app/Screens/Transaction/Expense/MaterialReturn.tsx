import { View, Text, ScrollView, Platform, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Navigations/RootStackParamList';
import { SafeAreaView } from 'react-native';
import Header from '../../../layout/Header';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import { COLORS, FONTS } from '../../../constants/theme';
import { TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FeatherIcon from "react-native-vector-icons/Feather";
import CustomInput from '../../../components/Input/CustomInput';
import Button from '../../../components/Button/Button';

type MaterialReturnScreenProps = StackScreenProps<RootStackParamList, 'MaterialReturn'>;

const MaterialReturn = ({navigation} : MaterialReturnScreenProps) => {

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
                        style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:20}]}
                    >
                        <View style={[styles.row,{marginBottom:20}]}>
                            <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.text}]}>Add Material Return</Text>
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
                        <View style={{marginBottom:10}}>
                            <Text style={[FONTS.font,FONTS.fontMedium,{ color: colors.text,marginBottom:10 }]}>Party Name*</Text>
                            <CustomInput
                                inputBorder
                                lefticon={<FeatherIcon name='users' size={20} color={colors.text}/>}
                                style={{paddingLeft:50,}}
                            />
                        </View>
                        <View
                            style={{marginBottom:20}}
                        >
                            <Button
                                title='Add Material'
                                outline
                                onPress={() => navigation.navigate('AddMaterialReturn')}
                            />
                        </View>
                        <View style={[styles.row,{marginBottom:20}]}>
                            <Text style={[FONTS.fontMedium,{fontSize:16,color:colors.title,flex:1}]}>Total Amount</Text>
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
                        <View style={{marginBottom:30}}>
                            <TouchableOpacity
                                activeOpacity={0.5} 
                                style={[styles.DateButton,{gap:5,right:-10}]}
                            >
                                <FeatherIcon name='plus' size={14} color={COLORS.primary}/>
                                <Text style={[FONTS.font,FONTS.fontMedium,{color:COLORS.primary}]}>Add Notes</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom:40}}>
                            <TouchableOpacity
                                activeOpacity={0.5} 
                                style={[styles.DateButton,{gap:5,right:-10}]}
                            >
                                <FeatherIcon name='plus' size={14} color={COLORS.primary}/>
                                <Text style={[FONTS.font,FONTS.fontMedium,{color:COLORS.primary}]}>Reference No</Text>
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
})

export default MaterialReturn