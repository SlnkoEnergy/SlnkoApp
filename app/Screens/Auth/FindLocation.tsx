import { View, Text, SafeAreaView, TextInput, Image,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import { useDispatch, useSelector } from 'react-redux';
// import { updateUser } from '../../redux/reducer/user';
// import Auth from '../../Service/Auth';
// import database from '@react-native-firebase/database';

const LocationData = [
    {
        title:"Baker Street Library",
        location:"221B Baker Street London, NW1 6XE United Kingdom"
    },
    {
        title:"The Greenfield Mall",
        location:"45 High Street Greenfield, Manchester, M1 2AB United Kingdom"
    },
    {
        title:"Riverbank Business Park",
        location:"Unit 12, Riverside Drive Bristol, BS1 5RT United Kingdom"
    },
    {
        title:"Elmwood Community Centre",
        location:"78 Elmwood Avenue Birmingham, B12 3DF United Kingdom"
    },
]

type FindLocationScreenProps = StackScreenProps<RootStackParamList, 'FindLocation'>;

const FindLocation = ({navigation} : FindLocationScreenProps) => {

    const dispatch = useDispatch();
    const { userData } = useSelector((state: any) => state.user);

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const [loading, setLoading] = useState(false);

    const [joblocation, setjoblocation] = useState(userData.joblocation)

    // const handlejoblocation = async () => {
    //     setLoading(true);
    //     try {
    //         let updateData = {
    //             joblocation: joblocation,
    //         }
    //         database()
    //             .ref(`/users/${userData.id}`)
    //             .update(updateData)
    //             .then(() => {
    //                 database()
    //                 .ref(`/users/${userData.id}`)
    //                 .once('value')
    //                 .then(snapshot => {
    //                     if (snapshot.exists()) {
    //                         let userData = snapshot;
    //                         console.log('snapshot',userData);
    //                         dispatch(updateUser(updateData));
    //                         Auth.setAccount(userData);
    //                         setLoading(false);
    //                         navigation.navigate('DrawerNavigation',{screen : 'Home'})

    //                     } else {
    //                         console.log('No user data found!');
    //                     }
    //                 })
    //                 .catch(error => {
    //                     console.error('Error fetching user data:', error);
    //                 });
                    
    //             });
    //     } catch (error) {
    //         console.error('Image upload failed:', error);
    //     }
    // }   

    return (
        <SafeAreaView style={[{flex:1,backgroundColor:colors.card}]}>
             {loading ?
                <View
                    style={{
                        position:'absolute',
                        zIndex:1,
                        height:'100%',
                        width:'100%',
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:'rgba(0,0,0,.3)',
                    }}
                >
                    <ActivityIndicator size={'large'} color={COLORS.white}/>
                </View>
                :
                null
            }
            <View style={[GlobalStyleSheet.container]}>
                <View
                    style={{height:40,flexDirection:'row',alignItems:'center',gap:15}}
                >
                    <TouchableOpacity
                        // onPress={handlejoblocation}
                        onPress={() => navigation.navigate('DrawerNavigation',{screen : 'Home'})}
                        style={{
                            height: 40,
                            width: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor:colors.background,
                            borderRadius:50
                        }}
                    >
                        <FeatherIcon color={COLORS.primary} size={22} name='arrow-left'/>
                    </TouchableOpacity>
                    <Text style={{...FONTS.fontBold,fontSize:20,color:colors.title,lineHeight:22}}>Your Location</Text>
                </View>
                <View style={{marginVertical:15,borderBottomWidth:1,marginHorizontal:-15,paddingHorizontal:15,paddingBottom:15,borderColor:colors.border}}>
                    <TextInput
                        style={{
                            ...FONTS.fontMedium,
                            fontSize:16,
                            color:colors.title,
                            height:48,
                            borderRadius:6,
                            borderWidth:2,
                            borderColor:colors.border,
                            paddingHorizontal:15,
                            paddingLeft:40
                        }}
                        placeholder={'Search Area'}
                        placeholderTextColor={colors.text}
                    />
                    <View style={{position:'absolute',left:25,top:14}}>
                        <FeatherIcon color={COLORS.primary} size={20} name='search'/>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                        borderBottomWidth:1,
                        borderBottomColor:colors.border,
                        paddingBottom:15
                    }}
                >
                    <Image
                        style={{height:20,width:20,resizeMode:'contain'}}
                        source={IMAGES.authlocation}
                    />
                    <Text style={{...FONTS.fontSemiBold,fontSize:16,color:COLORS.primary,flex:1,lineHeight:20,paddingLeft:10}}>Use current location</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            height:30,
                            width:80,
                            borderWidth:1,
                            borderColor:colors.border,
                            borderRadius:6,
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                    >
                        <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.text,lineHeight:18}}>Select</Text>
                    </TouchableOpacity>
                </View>
                <View style={{paddingVertical:10}}>
                    <Text style={{...FONTS.fontSemiBold,fontSize:16,color:COLORS.primary}}>Search Result</Text>
                </View>
                <View>
                    {LocationData.map((data,index) => {
                        return(
                            <TouchableOpacity
                                onPress={() => setjoblocation(data)}
                                key={index}
                                style={[{
                                    paddingVertical:10,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.border,
                                    marginHorizontal:-10,
                                    paddingHorizontal:10,
                                    borderRadius:4
                                },joblocation?.title === data.title && {
                                    backgroundColor:theme.dark ? colors.background: '#F3F7FC'
                                }]}
                            >
                                <View style={{flexDirection:'row',alignItems:'center',gap:10,marginBottom:10}}>
                                    <FontAwesome5 color={COLORS.text} size={18} name='map-marker-alt'/>
                                    <Text style={{...FONTS.fontSemiBold,fontSize:14,color:colors.title,lineHeight:16}}>{data.title}</Text>
                                </View>
                                <Text style={{...FONTS.fontMedium,fontSize:14,color:theme.dark ? colors.text : '#5F729D',paddingRight:100,lineHeight:21}}>{data.location}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default FindLocation