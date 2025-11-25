import React from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import {  FONTS, COLORS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import Header from '../../layout/Header';
import CustomInput from '../../components/Input/CustomInput';

type NewPasswordScreenProps = StackScreenProps<RootStackParamList, 'NewPassword'>;

const NewPassword = ({ navigation } : NewPasswordScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                leftIcon={'back-2'}
            />
            <View style={{flex:1,backgroundColor:colors.card,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={[GlobalStyleSheet.container, { paddingHorizontal: 20, paddingTop: 48,flex:1 }]}>
                        <View style={{flex:1}}>
                            <View style={{alignItems:'flex-start'}}>
                                <Text style={{ ...FONTS.fontMedium, fontSize: 28, color: colors.title,marginBottom:10}}>Set Password</Text>
                                <Text style={[FONTS.fontLg,{ color: colors.text,fontSize:15,paddingRight:140 }]}>Please choose a strong password min 8 characters</Text>
                            </View>
                            <View style={{marginTop: 40 }}>
                                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Set Your Password</Text>
                                <CustomInput
                                    type="password"
                                    inputBorder
                                />
                            </View>
                        </View>
                        <Button
                            title={'Next'}
                            onPress={() => navigation.navigate('UserDetails')}
                            color={theme.dark ? COLORS.white :COLORS.primary}
                            text={colors.card}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default NewPassword;