import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../constants/Images';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomInput from '../components/Input/CustomInput';
import Button from '../components/Button/Button';

const navItem = [
    {
        icon: IMAGES.home,
        name: "Home",
        navigate: "Estimates",
    },
    {
        icon: IMAGES.RoleAccess,
        name: "Roles &Access",
        navigate: "RolesAccess",
    },
    {
        icon: IMAGES.PayrollPeople,
        name: "Payroll People",
        navigate: "PayrollPeople",
    },
    {
        icon: IMAGES.Matergrid,
        name: "Mater Library",
        navigate: "LibraryManagement",
    },
    {
        icon: IMAGES.settings,
        name: "Company Setting",
        navigate: "Settings",
    },
    {
        icon: IMAGES.BusinessCard,
        name: "Business Card",
        navigate: 'BusinessCards',
    },
    {
        icon: IMAGES.invite,
        name: "Invite Friends",
        navigate: 'Invite',
    },
    {
        icon: IMAGES.backup,
        name: "Backup (5:40 AM, 25 Jun)",
        navigate: "Estimates",
    },
    {
        icon: IMAGES.Feedback,
        name: "Give Feedback",
        navigate: 'GiveFeedback',
    },
]

const Sidebar = ({navigation} : any) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const refRBSheet = useRef<any>(null);

    return (
        <>
            <View style={{ flex: 1, backgroundColor: colors.card,borderTopRightRadius:30,borderBottomRightRadius:30 }}>
                <RBSheet
                    ref={refRBSheet}
                    height={250}
                    openDuration={250}
                    customStyles={{
                        container: {
                            backgroundColor:colors.background,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        },
                        draggableIcon: {
                            backgroundColor: '#ccc', // make sure it's visible
                            width: 60,
                            height: 6,
                            borderRadius: 3,
                            alignSelf: 'center',
                            marginVertical: 10
                        }
                    }}
                >
                    <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={[GlobalStyleSheet.container,{paddingTop:25,padding:20,flex:1}]}>
                        <Text style={[FONTS.fontMedium,{fontSize:18,color:colors.title}]}>Tell us How Can We improve</Text>
                        <View style={{marginBottom:20,marginTop:10 }}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Description</Text>
                            <CustomInput
                                inputBorder
                                lefticon={<FeatherIcon name='user-plus' size={20} color={colors.text}/>}
                                style={{paddingLeft:50}}
                            />
                        </View>
                        <Button
                            title='Next'
                            onPress={() => (refRBSheet.current.close())} 
                        />
                    </View>
                    </ScrollView>
                </RBSheet>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1}}>
                        <View
                            style={[GlobalStyleSheet.flexcenter,{
                                borderBottomWidth: 1,
                                borderColor: 'rgba(0,0,0,0.05)',
                                marginBottom: 15,
                                padding:25
                            }]}
                        >
                            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                <View
                                    style={{
                                        height:50,
                                        width:50,
                                        borderRadius:50,
                                        backgroundColor:COLORS.primary,
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}
                                >
                                    <Text style={{...FONTS.fontMedium,fontSize:30,color:COLORS.card}}>D</Text>
                                </View>
                                <View>
                                    <Text style={{...FONTS.fontMedium,fontSize:18,color:colors.title}}>Deepesh Gour</Text>
                                    <Text numberOfLines={1} style={{...FONTS.fontMedium,fontSize:12,color:COLORS.primary,lineHeight:20,marginRight:100}}>Deepesh.w3itexperts@gmail.com</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => {navigation.closeDrawer(), navigation.navigate('EditProfile')}}
                                style={{
                                    height:40,
                                    width:40,
                                    borderRadius:50,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    position:'absolute',
                                    right:10
                                }}
                                activeOpacity={0.5}
                            >
                                <FeatherIcon name='edit' color={colors.title} size={20}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1,paddingLeft:10 }}>
                            {navItem.map((data, index) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => {
                                            if (data.navigate === 'Estimates') {
                                                navigation.navigate('DrawerNavigation', {
                                                    screen: 'BottomNavigation',
                                                    params: { screen: 'Estimates' },
                                                });
                                            }if(data.navigate === 'GiveFeedback'){
                                                (navigation.closeDrawer(), refRBSheet.current.open())
                                            } else if (data.navigate) {
                                                navigation.navigate(data.navigate);
                                            }
                                        }}
                                        key={index}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 20,
                                            paddingVertical: 14,
                                        }}
                                    >
                                        <View style={{ marginRight: 15 }}>
                                            <Image
                                                style={{ height: 24, width: 24}}
                                                resizeMode='contain'
                                                source={data.icon}
                                            />
                                        </View>
                                        <Text style={[FONTS.fontLg,{ color:data.name === "Home" ? COLORS.primary : colors.title }]}>{data.name}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        <View
                            style={{
                                borderWidth:1,
                                borderColor:colors.border,
                                padding:15,
                                paddingBottom:25,
                                borderRadius:10,
                                flex:1,
                                marginHorizontal:25,
                                marginBottom:25,
                                alignItems:'center'
                            }}
                        >
                            <View style={{flexDirection:'row',alignItems:'center',gap:10,marginBottom:12}}>
                                <Image
                                    style={{
                                        height:20,
                                        width:20,
                                        tintColor:'#F2C34E'
                                    }}
                                    resizeMode='contain'
                                    source={IMAGES.crown}
                                />
                                <Text style={[FONTS.h5,{color:colors.title}]}>Upgrade to Pro</Text>
                            </View>
                            <Text
                                style={{...FONTS.fontMedium,fontSize:14,color:colors.text,lineHeight:20,textAlign:'center'}}
                            >
                                Get 1  Month free and unlock all the features of the pro plan.
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={{
                                    padding:20,
                                    borderRadius:50,
                                    position:'absolute',
                                    bottom:-40

                                }}
                            >
                                <View
                                    style={{
                                        height:38,
                                        backgroundColor:COLORS.primary,
                                        borderRadius:38,
                                        paddingHorizontal:25,
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}
                                >
                                    <Text style={[FONTS.h6,{fontSize:15,color:colors.card}]}>Upgrade</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1,paddingLeft:10}}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('HelpCenter')}
                                activeOpacity={0.7}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingHorizontal: 20,
                                    paddingVertical: 14,
                                }}
                            >
                                <View style={{ marginRight: 15 }}>
                                    <Image
                                        style={{ height: 24, width: 24}}
                                        resizeMode='contain'
                                        source={IMAGES.CustomerSupport}
                                    />
                                </View>
                                <Text style={[FONTS.fontLg,{ color: colors.title }]}>Customer Support</Text>
                            </TouchableOpacity>      
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SignIn')}
                                activeOpacity={0.7}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingHorizontal: 20,
                                    paddingVertical: 14,
                                    paddingTop:6,
                                }}
                            >
                                <View style={{ marginRight: 15 }}>
                                    <Image
                                        style={{ height: 24, width: 24}}
                                        resizeMode='contain'
                                        source={IMAGES.logout}
                                    />
                                </View>
                                <Text style={[FONTS.fontLg,{ color: COLORS.danger }]}>Logout</Text>
                            </TouchableOpacity>      
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

export default Sidebar;