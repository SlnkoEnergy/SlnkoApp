import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Button from '../../components/Button/Button';
import { COLORS, FONTS } from '../../constants/theme';
import CustomInput from '../../components/Input/CustomInput';
import { TouchableOpacity } from 'react-native';

type ChangePasswordScreenProps = StackScreenProps<RootStackParamList, 'ChangePassword'>;

const ChangePassword = ({ navigation } : ChangePasswordScreenProps)  => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [Show, setShow] = useState(false)

    return (
        <SafeAreaView style={{backgroundColor:colors.card,flex:1}}>
            <Header
                title={'Password'}
                leftIcon={'back'}
                titleLeft
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[GlobalStyleSheet.container]}>
                    <View style={{marginBottom:25}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title,marginBottom:5 }}>Current Password<Text style={{ color: '#FF0000' }}>*</Text></Text>
                        <CustomInput
                            onChangeText={(value: any) => console.log(value)}
                        />
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                bottom: -25,
                                right: 0
                            }}
                            onPress={() => setShow(!Show)}
                        >
                            <Text style={{
                                ...FONTS.fontMedium,
                                fontSize: 14,
                                color:COLORS.primary,
                            }}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {Show && 
                        <View>
                            <View style={{marginBottom:15}}>
                                <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title,marginBottom:5 }}>Password<Text style={{ color: '#FF0000' }}>*</Text></Text>
                                <CustomInput
                                    onChangeText={(value: any) => console.log(value)}
                                />
                            </View>
                            <View>
                                <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title,marginBottom:5 }}>Confirm Password<Text style={{ color: '#FF0000' }}>*</Text></Text>
                                <CustomInput
                                    onChangeText={(value: any) => console.log(value)}
                                />
                            </View>
                        </View>
                    } 
                </View>
            </ScrollView>
            <View style={{ height: 88, width: '100%', backgroundColor: colors.card, }}>
                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 10, marginTop: 20, paddingTop: 0 }]}>
                    <Button
                        title={"Update Password"}
                        color={theme.dark ? COLORS.white :COLORS.primary}
                        text={colors.card}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ChangePassword