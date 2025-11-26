import { View, Text } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { SafeAreaView } from 'react-native';
import Header from '../../layout/Header';
import { useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Button from '../../components/Button/Button';

type InviteScreenProps = StackScreenProps<RootStackParamList, 'Invite'>;

const Invite = ({ navigation } : InviteScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title={'Invite Friends'}
                leftIcon={'back'}
                titleLeft
            />
            <View style={{flex:1,backgroundColor:colors.card,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow:1}}
                >
                    <View
                        style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:40}]}
                    >
                        <View
                            style={{
                                alignItems:'center'
                            }}
                        >
                            <Text style={{...FONTS.fontMedium,fontSize:20,color:colors.title,marginBottom:20}}>Invite Your Friends To use Protrac</Text>
                            <Text
                                style={[FONTS.font,{color:colors.text,textAlign:'center',paddingHorizontal:35,lineHeight:20}]}
                            >
                                Your Construction Friends Deserve The Best! Help Them Save Time And Recover Money
                            </Text>
                            <View
                                style={{marginTop:50}}
                            >
                                <Button
                                    title='Invite Friends'
                                    color={theme.dark ? COLORS.white : '#DD1951'}
                                    text={colors.card}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Invite