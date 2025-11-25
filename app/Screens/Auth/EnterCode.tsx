import React from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Customotp from '../../components/Input/Customotp';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import FeatherIcon from "react-native-vector-icons/Feather";
import Header from '../../layout/Header';

type EnterCodeScreenProps = StackScreenProps<RootStackParamList, 'EnterCode'>;

const EnterCode = ({ navigation } : EnterCodeScreenProps) => {

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
                                <Text style={{ ...FONTS.fontMedium, fontSize: 28, color: colors.title,marginBottom:10}}>Confirm Your Number</Text>
                                <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                    <Text style={[FONTS.fontLg,{ color: colors.text,fontSize:15}]}>Enter the code we send to <Text style={{color:COLORS.primary}}>+01 8104821440</Text></Text>
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                    >
                                        <FeatherIcon name='edit' color={COLORS.primary} size={14}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{marginTop: 40 }}>
                                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Enter OTP</Text>
                                <Customotp />
                                <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.text,marginBottom:10 }}>Resend code in <Text style={{color:COLORS.primary}}>59 secs</Text></Text>
                            </View>
                        </View>
                        <Button
                            title={'Next'}
                            onPress={() => navigation.navigate('NewPassword')}
                            color={theme.dark ? COLORS.white :COLORS.primary}
                            text={colors.card}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default EnterCode;