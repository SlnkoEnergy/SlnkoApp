import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Navigations/RootStackParamList';
import Header from '../../../layout/Header';
import { ScrollView } from 'react-native';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import { COLORS, FONTS } from '../../../constants/theme';
import { TouchableOpacity } from 'react-native';
import FeatherIcon from "react-native-vector-icons/Feather";
import CustomInput from '../../../components/Input/CustomInput';
import Button from '../../../components/Button/Button';

type AddBillAddressScreenProps = StackScreenProps<RootStackParamList, 'AddBillAddress'>;

const AddBillAddress = ({navigation} : AddBillAddressScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [isCheckedAssign, setisCheckedAssign] = useState(false);

    const [isCheckedAssign1, setisCheckedAssign1] = useState(false);

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title={"Bill To / Ship To"}
                leftIcon={'back'}
                titleLeft
            />
            <View style={{flex:1,backgroundColor:colors.card,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow:1}}
                >
                    <View
                        style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:10}]}
                    >
                        <View style={[GlobalStyleSheet.flexcenter,{marginBottom:15}]}>
                            <Text style={[FONTS.fontMedium,FONTS.font,{color:colors.text}]}>Ship Form</Text>
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
                                        borderColor:isCheckedAssign ? COLORS.primary : '#DADADA',
                                        backgroundColor:isCheckedAssign ? COLORS.primary: 'transparent',
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
                                    Same As Bill To
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom:20}}>
                            <CustomInput
                                inputBorder
                                placeholder={'Address'}
                                // icon={<FeatherIcon name='chevron-down' size={20} color={colors.text}/>}
                            />
                        </View>
                        <View style={{marginBottom:20}}>
                            <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.text,marginBottom:15}]}>Bill Form</Text>
                            <CustomInput
                                inputBorder
                                placeholder={'Address'}
                                // icon={<FeatherIcon name='chevron-down' size={20} color={colors.text}/>}
                            />
                        </View>
                        <View style={[GlobalStyleSheet.flexcenter,{marginBottom:15}]}>
                            <Text style={[FONTS.fontMedium,FONTS.font,{color:colors.text}]}>Ship To</Text>
                            <TouchableOpacity
                                onPress={() => setisCheckedAssign1(!isCheckedAssign1)}
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
                                        borderColor:isCheckedAssign1 ? COLORS.primary : '#DADADA',
                                        backgroundColor:isCheckedAssign1 ? COLORS.primary: 'transparent',
                                        alignItems:'center',
                                        justifyContent:'center',
                                    }}
                                >
                                    {isCheckedAssign1 &&
                                        <FeatherIcon size={14} color={COLORS.card} name={'check'} />
                                    }
                                </View>
                                <Text
                                    style={[{...FONTS.fontMedium,fontSize:15,color:colors.text}]}
                                >
                                    Same As Bill Form
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom:20}}>
                            <CustomInput
                                inputBorder
                                placeholder={'Address'}
                                // icon={<FeatherIcon name='chevron-down' size={20} color={colors.text}/>}
                            />
                        </View>
                        <View style={{marginBottom:20}}>
                            <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.text,marginBottom:15}]}>Bill To</Text>
                            <CustomInput
                                inputBorder
                                placeholder={'Address'}
                                // icon={<FeatherIcon name='chevron-down' size={20} color={colors.text}/>}
                            />
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

export default AddBillAddress