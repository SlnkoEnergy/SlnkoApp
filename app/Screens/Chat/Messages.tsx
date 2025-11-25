import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import {  FONTS, COLORS } from '../../constants/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import Button from '../../components/Button/Button';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomInput from '../../components/Input/CustomInput';
import FeatherIcon from "react-native-vector-icons/Feather";
import { launchImageLibrary } from 'react-native-image-picker';

const GroupsChat = [
  {
    name: "sitemaster Announcements",
    members: 5,
    type: "announcement", 
    icon: "volume-high",  
    iconColor: "#ffffff",
    iconBg: "#5D5FEF",  
  },
  {
    name: "W3 Chandan",
    members: 1,
    type: "user",        
    initial: "K",
    bgColor: "#D5BCEF",   
    textColor: "#4D2E6D", 
  }
];


type MessagesScreenProps = StackScreenProps<RootStackParamList, 'Messages'>;

const Messages = ({ navigation } : MessagesScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const refRBSheet = useRef<any>(null);

    const [imageUri, setImageUri] = useState<any>(null);
    
    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
        if (!response.didCancel && response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri);
        }
        });
    };

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title={"Group Chat"}
                leftIcon={'back'}
                rightIcon={'AddUser'}
                titleLeft
                onPress={() => refRBSheet.current.open()} 
            />
            <View style={{flex:1,backgroundColor:colors.card,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <RBSheet
                        ref={refRBSheet}
                        height={480}
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
                                <Text style={[FONTS.fontRegular,{fontSize:18,color:colors.title}]}>Create Chat Group</Text>
                                <View style={{alignItems:'center',marginVertical:20}}>
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={pickImage}
                                        style={{
                                            height: 120,
                                            width: 120,
                                            borderRadius: 100,
                                            backgroundColor: '#ECECEE',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {imageUri ? (
                                            <Image
                                                source={{ uri: imageUri }}
                                                style={{ height: 120, width: 120, borderRadius: 100 }}
                                            />
                                        ) : (
                                            <FeatherIcon name='camera' size={24} color={'#333'} />
                                        )}
                                    </TouchableOpacity>
                                </View>
                                <View style={{marginBottom:20 }}>
                                    <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Chat Group Name</Text>
                                    <CustomInput
                                        inputBorder
                                        maxLength={15}
                                    />
                                </View>
                                <View style={{marginBottom:25 }}>
                                    <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Description</Text>
                                    <CustomInput
                                        inputBorder
                                        maxLength={15}
                                    />
                                </View>
                                <Button
                                    title='Create Chat Group'
                                    onPress={() => refRBSheet.current.close()} 
                                />
                            </View>
                        </ScrollView>
                    </RBSheet>
                    <View style={[GlobalStyleSheet.container, { paddingHorizontal: 20,flex:1 }]}>
                        {GroupsChat.map((data:any, index:any) => {
                            return(
                                <View
                                    key={index}
                                    style={{
                                        padding:10,
                                        borderRadius:10,
                                        backgroundColor:colors.background,
                                        marginBottom:10
                                    }}
                                >
                                    {data.type === "announcement" ? 
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={{
                                                flexDirection:'row',
                                                alignItems:'center',
                                                gap:10
                                            }}
                                        >
                                            <View
                                                style={{
                                                    height:50,
                                                    width:50,
                                                    borderRadius:50,
                                                    overflow:'hidden',
                                                    alignItems:'center',
                                                    justifyContent:'center'
                                                }}
                                            >
                                                <Image
                                                    style={{height:'100%',width:'100%'}}
                                                    resizeMode='contain'
                                                    source={IMAGES.Announcements}
                                                />
                                            </View>
                                            <View>
                                                <Text style={{...FONTS.fontMedium,fontSize:15,color:colors.title,marginBottom:5}}>{data.name}</Text>
                                                <Text style={{...FONTS.fontLight,fontSize:13,color:colors.text}}>{data.members} Member</Text>
                                            </View>
                                        </TouchableOpacity>
                                    :
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('SingleChat',{data : data })}
                                            activeOpacity={0.8}
                                            style={{
                                                flexDirection:'row',
                                                alignItems:'center',
                                                gap:10
                                            }}
                                        >
                                            <View
                                                style={{
                                                    height:50,
                                                    width:50,
                                                    borderRadius:50,
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                    backgroundColor:data.bgColor
                                                }}
                                            >
                                                <Text style={{...FONTS.fontMedium,fontSize:30,color:data.co}}>{data.initial}</Text>
                                            </View>
                                            <View>
                                                <Text style={{...FONTS.fontMedium,fontSize:15,color:colors.title,lineHeight:18}}>{data.name}</Text>
                                                <Text style={{...FONTS.fontLight,fontSize:13,color:colors.textColor,lineHeight:18}}>{data.members} Member</Text>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Messages