import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import Header from '../../layout/Header';
import { ScrollView } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { FONTS } from '../../constants/theme';
import QuestionsAccordion from '../../components/Accordion/QuestionsAccordion';

const HelpCenter = () => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title={'Help'}
                leftIcon={'back'}
                rightIcon={'whatsapp'}
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
                        <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.text,marginBottom:20}]}>Other Questions</Text>
                        <QuestionsAccordion/>
                    </View>
                </ScrollView>         
            </View>
        </SafeAreaView>
    )
}

export default HelpCenter