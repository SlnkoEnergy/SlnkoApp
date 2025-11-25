import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import Button from '../../components/Button/Button';

const SettingData = [
    {
        image:IMAGES.BusinessCard,
        title:"Bank Accounts (0)",
        navigate:"Bank Accounts"
    },
    {
        image:IMAGES.map,
        title:"Addresses (0)",
        navigate:"Addresses"
    },
    {
        image:IMAGES.crown,
        title:"Lock back-Dated Edit",
        navigate:"LockbackDatedEdit"
    },
    {
        image:IMAGES.crown,
        title:"Lock back-Dated Entry",
        navigate:"LockbackDatedEntry"
    },
    {
        image:IMAGES.building,
        title:"Business Overview",
        navigate:"BusinessOverview"
    },
    {
        image:IMAGES.more,
        title:"Terms & Conditions",
        navigate:"Terms"
    },
]

type SettingsScreenProps = StackScreenProps<RootStackParamList, 'Settings'>;

const Settings = ({ navigation } : SettingsScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title={'Company Settings'}
                leftIcon={'back'}
                titleLeft
            />
            <View style={{flex:1,backgroundColor:colors.card,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow:1}}
                >
                    <View
                        style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:30}]}
                    >
                        <View
                            style={{
                                padding:14,
                                backgroundColor:colors.background,
                                borderRadius:8,
                                borderWidth:1.5,
                                borderColor:'#E8E8E8',
                                marginBottom:20
                            }}
                        >
                            <View
                                style={[GlobalStyleSheet.flexcenter,{marginBottom:10}]}
                            >
                                <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.text}]}>Company</Text>
                                <TouchableOpacity
                                    style={{
                                        height:40,
                                        width:40,
                                        borderRadius:25,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        position:'absolute',
                                        right:-10,
                                        top:-10
                                    }}
                                >
                                    <FeatherIcon name='edit' size={14} color={colors.title}/>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={[GlobalStyleSheet.flexcenter]}
                            >
                                <View
                                    style={{
                                        height:50,
                                        width:50,
                                        borderRadius:6,
                                        backgroundColor:COLORS.primary,
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}
                                >
                                    <Text style={{...FONTS.fontBold,fontSize:22,color:COLORS.card}}>W</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        gap:20
                                    }}
                                >
                                    <View
                                        style={{alignItems:'center'}}
                                    >
                                        <Text style={[FONTS.font,{color:colors.text}]}>Phone Number</Text>
                                        <Text style={[FONTS.font,{color:colors.text}]}>--</Text>
                                    </View>
                                    <View
                                        style={{alignItems:'center'}}
                                    >
                                        <Text style={[FONTS.font,{color:colors.text}]}>Pan Number</Text>
                                        <Text style={[FONTS.font,{color:colors.text}]}>--</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View>
                            {SettingData.map((data:any,index) => {
                                return(
                                    <TouchableOpacity
                                        // onPress={() => navigation.navigate(data.navigate)}
                                        activeOpacity={0.5} 
                                        key={index}
                                        style={[GlobalStyleSheet.flexcenter,{
                                            padding:15,
                                            paddingHorizontal:13,
                                            borderWidth:1.5,
                                            marginBottom:12,
                                            borderRadius:8,
                                            borderColor:'#E8E8E8',
                                            // backgroundColor:'red'
                                        }]}
                                    >
                                        <View style={{flexDirection:'row',alignItems:'center',gap:10,flex:1}}>
                                            <Image
                                                resizeMode='contain'
                                                style={{height:20,width:20,tintColor:data.title === 'Lock back-Dated Edit' || data.title === 'Lock back-Dated Entry' ? '#F2C34E': colors.text}}
                                                source={data.image}
                                            />
                                            <Text style={[FONTS.fontMedium,FONTS.font,{color:colors.text}]}>{data.title}</Text>
                                        </View>
                                        <FeatherIcon size={20} color={colors.title} name={'chevron-right'} />
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                </ScrollView>
                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 20,paddingBottom:20 }]}>
                    <Button
                        title={"Save"}
                        color={theme.dark ? COLORS.white :COLORS.primary}
                        text={colors.card}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Settings