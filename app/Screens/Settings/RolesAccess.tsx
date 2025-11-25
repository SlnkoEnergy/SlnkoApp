import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { ScrollView } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CustomInput from '../../components/Input/CustomInput';
import { COLORS, FONTS } from '../../constants/theme';
import Button from '../../components/Button/Button';

const members = [
    { 
        id: '1', 
        name: 'Apex', 
        status: 'Joined', 
        project: 'Project-1', 
        role: 'Super Admin', 
        initial: 'K' 
    },
    { 
        id: '2', 
        name: 'Apex', 
        status: 'Joined', 
        project: 'Project-1', 
        role: 'Super Admin', 
        initial: 'K' 
    },
];

type RolesAccessScreenProps = StackScreenProps<RootStackParamList, 'RolesAccess'>;

const RolesAccess = ({ navigation } : RolesAccessScreenProps)  => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title={"Roles & Access"}
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
                        <View style={{marginBottom:10}}>
                            <CustomInput
                                inputBorder
                                placeholder={'Search...'}
                            />
                        </View>
                        <View style={{marginTop:10}}>
                            <View style={[GlobalStyleSheet.row]}>
                                {members.map((item,index) => {
                                    return(
                                        <View
                                            key={index} 
                                            style={[GlobalStyleSheet.col50,{marginBottom:15}]}
                                        >
                                            <View
                                                style={{
                                                    borderWidth:1,
                                                    borderRadius:8,
                                                    borderColor:'#EFEFEF',
                                                }}
                                            >
                                                <View 
                                                    style={{
                                                        padding:15,
                                                        alignItems:'center',
                                                        borderBottomWidth:1,
                                                        borderColor:'#EFEFEF'
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            height:40,
                                                            width:40,
                                                            borderRadius:50,
                                                            backgroundColor:'#D1E4C1',
                                                            alignItems:'center',
                                                            justifyContent:'center',
                                                            marginBottom:8
                                                        }}
                                                    >
                                                        <Text style={{...FONTS.fontMedium,fontSize:18,color:COLORS.title}}>{item.initial}</Text>
                                                    </View>
                                                    <Text style={{...FONTS.fontMedium,fontSize:15,color:colors.title,lineHeight:20}}>{item.name}</Text>
                                                    <Text style={[FONTS.font,{fontSize:12, color:colors.title,lineHeight:18}]}>{item.status}</Text>
                                                </View>
                                                <View
                                                    style={[GlobalStyleSheet.flexcenter,{padding:10,paddingVertical:8}]}
                                                >
                                                    <Text style={[FONTS.font,{fontSize:12,color:colors.text}]}>{item.project}</Text>
                                                    <View
                                                        style={{
                                                            padding:3,
                                                            paddingHorizontal:7,
                                                            borderRadius:4,
                                                            backgroundColor:'rgba(65,154,144,0.2)'
                                                        }}
                                                    >
                                                        <Text style={[FONTS.fontMedium,{fontSize:12,color:COLORS.success}]}>{item.role}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
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

export default RolesAccess