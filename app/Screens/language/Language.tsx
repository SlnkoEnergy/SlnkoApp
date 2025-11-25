import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import { COLORS ,FONTS,} from '../../constants/theme'
import { GlobalStyleSheet } from '../../constants/StyleSheet'
import { useTheme } from '@react-navigation/native'
import Button from '../../components/Button/Button'
import { IMAGES } from '../../constants/Images'
import { StackScreenProps } from '@react-navigation/stack'
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RootStackParamList } from '../../Navigations/RootStackParamList'

const selectData = [
  {
    iconText:"E",
    iconColor:"#D1E5DC",
    title:"English",
    LanguageText:"English",
  },
  {
    iconText:"हिं",
    iconColor:"#F2DBBC",
    title:"हिंदी",
    LanguageText:"Hindi",
  },
  {
    iconText:"த",
    iconColor:"#E5D1D9",
    title:"தமிழ்",
    LanguageText:"Tamil",
  },
  {
    iconText:"म",
    iconColor:"#E5D1D1",
    title:"मराठी",
    LanguageText:"Marathi",
  },
  {
    iconText:"తె",
    iconColor:"#D1DBE5",
    title:"తెలుగు",
    LanguageText:"Telugu",
  },
  {
    iconText:"മ",
    iconColor:"#DED1E5",
    title:"മലയാളം",
    LanguageText:"Malayalam",
  },
  {
    iconText:"ಕ",
    iconColor:"#EEE8C5",
    title:"ಕನ್ನಡ",
    LanguageText:"Kannada",
  },
  {
    iconText:"Ar",
    iconColor:"#D1E5DC",
    title:"Arabic",
    LanguageText:"Arabic",
  },
  {
    iconText:"In",
    iconColor:"#FBCCD4",
    title:"Indonesian",
    LanguageText:"Indonesian",
  }
]

type ChooseLanguageScreenProps = StackScreenProps<RootStackParamList, 'ChooseLanguage'>;

const ChooseLanguage = ({navigation} : ChooseLanguageScreenProps) => {

  const theme = useTheme();
  const { colors }: { colors : any} = theme;

  const [Select, setSelect] = useState(selectData[0]);

  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
        <View style={{justifyContent:'center',alignItems:'center', marginTop:30}}>
          <View
            style={{
              height:55,
              width:55,
              borderRadius:60,
              backgroundColor:COLORS.primary,
              alignItems:'center',
              justifyContent:'center',
              marginBottom:15
            }}
          >
            <Image
              style={{height:26,width:26}}
              source={IMAGES.global}
            />
          </View>
          <Text style={{...FONTS.fontMedium,fontSize:20,color:colors.title,marginBottom:10}}>Select Language</Text>
          <Text style={[FONTS.font,{color:colors.text,marginBottom:15}]}>Choose your preferred language to continue</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={[GlobalStyleSheet.container,{paddingHorizontal:20}]}>
                <View style={[GlobalStyleSheet.row]}>
                    {selectData.map((data:any,index:any) => {
                        return(
                        <View style={{marginBottom:6}} key={index}>
                            <TouchableOpacity
                                onPress={() => setSelect(data)}
                                activeOpacity={0.6} 
                                style={[{
                                  height:60,
                                  width:'100%',
                                  borderWidth:1,
                                  borderColor:colors.card,
                                  backgroundColor:colors.card,
                                  borderRadius:8,
                                  flexDirection:'row',
                                  alignItems:'center',
                                  justifyContent:'space-between',
                                  paddingHorizontal:10
                                }]}
                            >
                                <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                    <View
                                      style={{
                                        height:40,
                                        width:40,
                                        borderRadius:50,
                                        backgroundColor:data.iconColor,
                                        alignItems:'center',
                                        justifyContent:'center'
                                      }}
                                    > 
                                      <Text style={[FONTS.fontLg,{...FONTS.fontMedium,color:colors.title}]}>{data.iconText}</Text>
                                    </View>
                                    <Text style={[FONTS.fontLg,{color:colors.title}]}>{data.title}</Text>
                                </View>
                                <View style={[GlobalStyleSheet.row,{gap:12,paddingRight:7}]}>
                                  <Text style={[FONTS.font,{color:colors.text,opacity:.5}]}>{data.LanguageText}</Text>
                                  <View 
                                    style={{
                                      height:24,
                                      width:24,
                                      borderWidth:1,
                                      backgroundColor:Select === data ? COLORS.primary : colors.card,
                                      borderColor:Select === data ? COLORS.primary : colors.checkBoxborder,
                                      borderRadius:25,
                                      alignItems:'center',
                                      justifyContent:'center'
                                    }}
                                  >
                                      <FeatherIcon size={14} color={Select === data ? COLORS.card :theme.dark ? COLORS.title:COLORS.card} name={'check'} />
                                  </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        )
                    })}
                </View>
            </View>
        </ScrollView>
        <View style={{ height: 88, width: '100%'}}>
            <View 
              style={[
                GlobalStyleSheet.container, 
                  { 
                      marginTop: 20, 
                      paddingTop: 0,
                      paddingBottom:0 
                  }
              ]}>
                <Button
                    title={"Continue"}
                    color={theme.dark ? COLORS.white :COLORS.primary}
                    text={colors.card}
                    onPress={() => navigation.navigate('UserDetails')}
                />
            </View>
        </View>
    </SafeAreaView>
  )
}

export default ChooseLanguage;