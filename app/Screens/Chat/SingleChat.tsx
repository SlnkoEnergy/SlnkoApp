import React, { useRef, useState } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, Platform } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { COLORS, FONTS, } from '../../constants/theme';
import Ionicons from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { ScrollView } from 'react-native-gesture-handler';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';

const ChatData = [
    {
        id: '1',
        username:"Kuldeep",
        title: 'Hey guys! Who’s up for a weekend plan?',
        time:'12:15 PM',
        send: true,
    },
    {
        id: '2',
        username:"Neha",
        title: "Only if you're treating us, Mr. Planner",
        time: "12:07 PM",
        send: false,
    },
    {
        id: '3',
        username:"Amit",
        title: 'Yeah Kuldeep, last time you escaped the bill',
        time:"12:07 PM",
        send: false,
    },
    {
        id: '4',
        username:"Sanya",
        title: 'Let’s go for something chill – movie + dinner?',
        time: "12:07 PM",
        send: false,
    },
    {
        id: '5',
        username:"Raj",
        title: "I’m in! Kuldeep, your car or Uber?",
        time: "12:07 PM",
        send: false,
    },
    {
        id: '6',
        username:"Kuldeep",
        title: 'Haha okay okay... my car, but someone else drives',
        time: "12:15 PM",
        send: true,
    },
    {
        id: '7',
        username:"Neha",
        title: 'Fine, I’ll DJ the playlist!',
        time: "12:07 PM",
        send: false,
    },
    {
        id: '8',
        username:"Amit",
        title: "I’ll bring snacks. Let’s roll!",
        time: "12:07 PM",
        send: false,
    },
    {
        id: '9',
        username:"Sanya",
        title: "And I’ll handle photos – Insta needs content",
        time: "12:07 PM",
        send: false,
    },
    {
        id: '10',
        username:"Kuldeep",
        title: 'This squad is all set 🔥 Let’s make it epic!',
        time:"12:15 PM",
        send: true,
    }
]

type SingleChatScreenProps = StackScreenProps<RootStackParamList, 'SingleChat'>;

const SingleChat = ({route, navigation } : SingleChatScreenProps) => {

    const {data} = route.params;

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const scrollViewRef = useRef<any>(null);

    const [messageList, setMessageList] = useState(ChatData);
    const [message, setMessage] = useState("");
    const [time, settime] = useState("");
    const [username, setusername] = useState("")

    const sendMessage = () => {
        if(message.length > 0){
            setMessageList([
                ...messageList,
                {
                    id: '0',
                    title: message,
                    time: "12:15 PM",
                    send: true,
                    username: data.name
                },
            ])
            setMessage("");
            settime("");
            setusername("");
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: colors.card, flex: 1, }}>
            <View
                style={{
                    height:60,
                    backgroundColor:colors.card,
                    flexDirection:'row',
                    alignItems:'center'
                }}
            >
                <View
                    style={[GlobalStyleSheet.flexcenter,GlobalStyleSheet.container,{padding:0,paddingHorizontal:15}]}
                >
                    <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.goBack()}
                            style={{
                                height:30,
                                width:30,
                                borderRadius:30,
                                // backgroundColor:'red',
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            <FeatherIcon name="chevron-left" size={24} />
                        </TouchableOpacity>
                        <View
                            style={{
                                height:28,
                                width:28,
                                borderRadius:30,
                                backgroundColor:data.bgColor,
                                alignItems:'center',
                                justifyContent:'center',
                                marginLeft:-5
                            }}
                        >
                            <Text style={{...FONTS.fontMedium,fontSize:15,color:data.textColor}}>{data.initial}</Text>
                        </View>
                        <Text style={{...FONTS.fontMedium,fontSize:16,color:colors.title,marginLeft:10}}>{data.name}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                        <TouchableOpacity
                            style={{
                                padding:10,
                                borderRadius:6,
                                paddingVertical:8,
                                backgroundColor:theme.dark ? colors.background : '#F9F9F9',
                                flexDirection:'row',
                                alignItems:'center',
                                gap:5
                            }}
                        >
                            <FeatherIcon name='user-plus' size={14} color={COLORS.primary}/>
                            <Text style={{...FONTS.fontMedium,fontSize:13,color:COLORS.primary}}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={{
                                height:30,
                                width:30,
                                borderRadius:30,
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            <Ionicons name='ellipsis-vertical' size={18} color={colors.text}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                ref={scrollViewRef}
                contentContainerStyle={{flexGrow:1}}
                onContentSizeChange={() => {scrollViewRef.current?.scrollToEnd()}}
            >
                <View style={[GlobalStyleSheet.container,{backgroundColor:'#D2D5DF',borderTopLeftRadius:20,borderTopRightRadius:20,paddingTop:0,flex:1}]}>
                    <View style={{ flex: 1 ,paddingTop:20}}>
                        {messageList.map((data:any, index:any) => {
                            return (
                                <View key={index}>
                                    <View
                                        style={[{
                                            marginBottom: 10,
                                        },
                                        data.send == false
                                            ?
                                            {
                                                marginRight: 'auto',
                                                alignItems: 'flex-start',
                                            }
                                            :
                                            {
                                                marginLeft: 'auto',
                                                alignItems: 'flex-end',
                                            }
                                        ]}
                                    >
                                        <View
                                            style={[
                                                data.send == false
                                                    ?
                                                    {
                                                        backgroundColor: colors.background,
                                                        borderRadius:10,
                                                        borderTopLeftRadius:0,
                                                        borderBottomLeftRadius:6
                                                    }
                                                    :
                                                    {
                                                        backgroundColor: COLORS.primary,
                                                        borderRadius:10,
                                                        borderTopRightRadius:6,
                                                        borderBottomRightRadius:0
                                                    }

                                            ]}
                                        >
                                            <View style={{padding:10}}>
                                                <Text style={{...FONTS.fontRegular,fontSize:10,color:data.send ? 'rgba(255,255,255,0.60)': colors.text,marginBottom:5}}>{data.username}, <Text>{data.time}</Text></Text>
                                                <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: data.send ? COLORS.white :theme.dark ? COLORS.white : COLORS.title, }}>{data.title}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
            <View
                style={[{
                    width: '100%',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 2,
                        height: 2,
                    },
                    shadowOpacity: .1,
                    shadowRadius: 5,
                }, Platform.OS === "ios" && {
                    backgroundColor:'transparent',
                }]}
            >
                <View 
                    style={{ 
                        height: 60, 
                        backgroundColor: colors.card,
                    }}
                >
                    <View 
                        style={{
                            height: 60,
                            width: '100%',
                            backgroundColor:colors.card 
                        }}
                    >
                        <TextInput
                            placeholder='Type Message'
                            placeholderTextColor={'rgba(80,88,109,0.5)'}
                            onChangeText={(val) => setMessage(val)}
                            value={message}
                            style={{ ...FONTS.fontMedium, fontSize: 16,color: colors.title,flex:1,paddingHorizontal:25 }}
                        />
                        <TouchableOpacity
                            onPress={() => sendMessage()}
                            disabled={message.length == 0 ? true : false}
                            style={{ position: 'absolute', top: 20, right: 20 }}
                        >
                            <Image
                                style={{ height: 20, width: 20, resizeMode: 'contain', tintColor:COLORS.primary }}
                                source={IMAGES.send}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SingleChat