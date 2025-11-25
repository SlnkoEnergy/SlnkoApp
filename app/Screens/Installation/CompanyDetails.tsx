import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { SafeAreaView } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import { ScrollView } from 'react-native';
import FeatherIcon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from 'react-native';
import CustomInput from '../../components/Input/CustomInput';
import Button from '../../components/Button/Button';
import * as Progress from 'react-native-progress';
import { StyleSheet } from 'react-native';

type CompanyDetailsScreenProps = StackScreenProps<RootStackParamList, 'CompanyDetails'>;

const CompanyDetails = ({ navigation } :CompanyDetailsScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const progress = 1;


    const [selectedMainId, setSelectedMainId] = useState(null);
    const [selectedSubItems, setSelectedSubItems] = useState({});

    const handleMainSelect = (id:any) => {
        setSelectedMainId(id === selectedMainId ? null : id);
    };

    const handleSubItemToggle = (parentId: string | number, subId: any) => {
        setSelectedSubItems((prev:any) => {
        const current = prev[parentId] || [];
        if (current.includes(subId)) {
            return {
            ...prev,
            [parentId]: current.filter((id:any) => id !== subId),
            };
        } else {
            return {
            ...prev,
            [parentId]: [...current, subId],
            };
        }
        });
    };

    const data = [
        { 
            id: '1', 
            title: 'Industrial Construction', 
            subItems: [] 
        },
        {
            id: '2',
            title: 'Developer',
            subItems: [
                { id: '2.1', label: 'Residential Real Estate' },
                { id: '2.2', label: 'Industrial Real Estate' },
                { id: '2.3', label: 'Commercial Real Estate' },
            ],
        },
        { 
            id: '3', 
            title: 'Infrastructure / Construction', 
            subItems: [] 
        },
        { 
            id: '4', 
            title: 'Interiors and Fit–Out', 
            subItems: [] 
        },
        { 
            id: '5', 
            title: 'Building Construction', 
            subItems: [] 
        },
        { 
            id: '6', 
            title: 'PWD', 
            subItems: [] 
        },
        { 
            id: '7', 
            title: 'Specialized / MEP Trades', 
            subItems: [] 
        },
    ];
    
    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <View
                style={{
                    height:60,
                    backgroundColor:'transparent',
                }}
            >
                <View
                    style={[GlobalStyleSheet.container,GlobalStyleSheet.flexcenter]}
                >
                    <Text style={{...FONTS.fontMedium,fontSize:18,color:colors.title,lineHeight:23}}>Company Details</Text>
                    <View style={[GlobalStyleSheet.flexcenter,{gap:8}]}>
                        <Text style={[FONTS.font,{color:colors.text}]}>Step</Text>
                        <View style={{position:'relative',alignItems:'center',justifyContent:'center'}}>
                            <View
                                style={{transform:[{rotate : '0deg'}]}}
                            >
                                    <Progress.Circle 
                                        borderWidth={0}
                                        unfilledColor={'#DDDDDD'}
                                        color={COLORS.primary}
                                        progress={progress} 
                                        size={28} 
                                        thickness={3}
                                        strokeCap={'round'}
                                    />
                            </View>
                            <Text style={[FONTS.fontLg,{color:colors.text,position:'absolute'}]}>{Math.round(progress * 2)}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{flex:1,backgroundColor:colors.card,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={[GlobalStyleSheet.container, { paddingHorizontal: 20, paddingTop: 35,flex:1 }]}>
                        <View style={{flex:1}}>
                            <View style={{marginBottom:15 }}>
                                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Company Name*</Text>
                                <CustomInput
                                    inputBorder
                                />
                            </View>
                            <View style={{marginBottom:15 }}>
                                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Company City*</Text>
                                <CustomInput
                                    inputBorder
                                />
                            </View>
                            <View style={{marginTop:20}}>
                                <Text style={[FONTS.h6]}>Company Segment</Text>
                                <View style={{marginTop:10}}>
                                    {data.map((item) => (
                                        <View 
                                            key={item.id}    
                                        >
                                            <TouchableOpacity
                                                onPress={() => handleMainSelect(item.id)}
                                                style={[styles.card,styles.row,selectedMainId === item.id && {
                                                    borderColor:COLORS.primary
                                                }]}
                                            >
                                                <View
                                                    style={[{
                                                        height:24,
                                                        width:24,
                                                        borderRadius:25,
                                                        backgroundColor:colors.card,
                                                        borderWidth:1,
                                                        borderColor:colors.checkBoxborder,
                                                        alignItems:'center',
                                                        justifyContent:'center'
                                                    },selectedMainId === item.id && {
                                                        backgroundColor:COLORS.primary,
                                                        borderColor:COLORS.primary
                                                    }]}
                                                >
                                                    {selectedMainId === item.id &&
                                                        <FeatherIcon name='check' size={16} color={COLORS.card}/>
                                                    }
                                                </View>
                                                <Text style={[FONTS.fontLg,styles.mainText,{color:colors.title}]}>{item.title}</Text>
                                                {item.subItems.length > 0 && (
                                                    <FeatherIcon
                                                        name={selectedMainId === item.id ? 'chevron-up' : 'chevron-down'}
                                                        size={18}
                                                        color={selectedMainId === item.id ? COLORS.primary : colors.text}
                                                        style={{ marginLeft: 'auto' }}
                                                    />
                                                )}
                                            </TouchableOpacity>

                                            {/* Sub Items */}
                                            {selectedMainId === item.id && item.subItems.length > 0 && (
                                                <View style={styles.subItemContainer}>
                                                    {item.subItems.map((sub) => (
                                                        <TouchableOpacity
                                                            key={sub.id}
                                                            onPress={() => handleSubItemToggle(item.id, sub.id)}
                                                            style={styles.subRow}
                                                        >
                                                            <View
                                                                style={[{
                                                                    height:20,
                                                                    width:20,
                                                                    borderRadius:4,
                                                                    backgroundColor:colors.card,
                                                                    borderWidth:1,
                                                                    borderColor:colors.border,
                                                                    alignItems:'center',
                                                                    justifyContent:'center',
                                                                },selectedSubItems[item.id]?.includes(sub.id) && {
                                                                    backgroundColor:COLORS.primary,
                                                                    borderColor:COLORS.primary
                                                                }]}
                                                            >
                                                                {selectedSubItems[item.id]?.includes(sub.id) &&
                                                                    <FeatherIcon name='check' size={16} color={COLORS.card}/>
                                                                }
                                                            </View>
                                                            <Text style={[FONTS.font, styles.subText,{color:colors.text},selectedSubItems[item.id]?.includes(sub.id) && {
                                                                color:COLORS.primary
                                                            }]}>{sub.label}</Text>
                                                        </TouchableOpacity>
                                                    ))}
                                                </View>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:20}]}>
                    <Button
                        title={'Save'}
                        onPress={() => navigation.navigate('DrawerNavigation',{screen : 'Home'})}
                        color={theme.dark ? COLORS.white :COLORS.primary}
                        text={colors.card}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
  card: {
    height:50,
    borderRadius: 6,
    backgroundColor: COLORS.background,
    justifyContent:'center',
    padding: 15,
    marginBottom: 6,
    borderWidth:2,
    borderColor:COLORS.background
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-start'
  },
  mainText: {
    fontSize: 16,
    marginLeft: 10,
  },
  subItemContainer: {
    padding:16,
    backgroundColor:COLORS.background,
    borderRadius:6,
    marginBottom:6
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  subText: {
    marginLeft: 8,
    fontSize: 15,
  },
  saveBtn: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
});

export default CompanyDetails