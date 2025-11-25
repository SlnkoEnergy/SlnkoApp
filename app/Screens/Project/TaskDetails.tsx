import { View, Text, TouchableOpacity, Image, Animated, Easing, Platform, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { SafeAreaView } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IconButton } from 'react-native-paper';
import { COLORS, FONTS } from '../../constants/theme';
import FeatherIcon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from 'react-native';
import { IMAGES } from '../../constants/Images';
import { X ,ChevronDown} from 'lucide-react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomInput from '../../components/Input/CustomInput';
import Button from '../../components/Button/Button';
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';

const ChatData = [
    {
        id: '1',
        username:"Kuldeep",
        title: "Haha okay okay... my car, but \nsomeone else drives",
        time:'12:15 PM',
        send: true,
    },
    {
        id: '2',
        username:"Neha",
        title: "Fine, I’ll DJ the playlist!",
        time: "12:07 PM",
        send: false,
    },
    {
        id: '3',
        username:"Amit",
        title: 'I’ll bring snacks. Let’s roll!',
        time:"12:07 PM",
        send: false,
    },
    {
        id: '4',
        username:"Sanya",
        title: 'And I’ll handle photos – Insta needs content',
        time: "12:07 PM",
        send: false,
    },
    {
        id: '5',
        username:"Kuldeep",
        title: 'This squad is all set 🔥 Let’s make it epic!',
        time: "12:15 PM",
        send: true,
    },
    {
        id: '6',
        username:"Kuldeep",
        title: '40 % \nBest Work',
        time: "12:15 PM",
        send: true,
    }
]

type TaskDetailsScreenProps = StackScreenProps<RootStackParamList, 'TaskDetails'>;

const TaskDetails = ({route, navigation} : TaskDetailsScreenProps) => {

    const {data} = route.params;

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [isOpen, setIsOpen] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleCard = () => {
        Animated.timing(animation, {
        toValue: isOpen ? 0 : 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
        }).start();
        setIsOpen(!isOpen);
    };

    // Interpolations
    const height = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 150], // final height of the content
    });

    const opacity = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const rotateIcon = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

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

    const refRBSheet = useRef<any>();

    const [open, setOpen] = useState<any>(false)
    
    const [date, setDate] = useState<any>(new Date())

    return (
         <SafeAreaView style={{ backgroundColor:'#172879', flex: 1 }}>
            <RBSheet
                ref={refRBSheet}
                height={330}
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
                        <Text style={[FONTS.fontRegular,{fontSize:18,color:colors.title}]}>Progress</Text>
                        <TouchableOpacity
                            onPress={() => setOpen(true)}
                            activeOpacity={0.8}
                            style={[GlobalStyleSheet.flexcenter,{
                                height: 42,
                                flex: 1,
                                backgroundColor:'rgba(38,72,231,0.08)',
                                borderRadius: 6,
                                paddingHorizontal: 15,
                                gap:10,
                                position:'absolute',
                                right:20,
                                top:25
                            }]}
                        >
                            <Text
                                numberOfLines={1}
                                style={{
                                    ...FONTS.fontMedium,
                                    fontSize: 15,
                                    color: 'rgba(80,88,109,0.6)',
                                }}
                            >
                                {format(date, 'dd MMM, EEE')} {/* ➤ like: 26 Jun, Thu */}
                            </Text>
                            <FeatherIcon name="calendar" size={18} color={'rgba(80,88,109,0.6)'} />
                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                onConfirm={(d) => {
                                    setOpen(false);
                                    setDate(d);
                                }}
                                onCancel={() => setOpen(false)}
                                theme={'light'}
                            />
                        </TouchableOpacity>
                        <View style={{marginBottom:20,marginTop:20 }}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Progress Qty: (%)</Text>
                            <CustomInput
                                inputBorder
                                keyboardType={'number-pad'}
                            />
                        </View>
                        <View style={{marginBottom:25 }}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Add Notes</Text>
                            <CustomInput
                                inputBorder
                            />
                        </View>
                        <Button
                            title='Save Progress'
                            onPress={() => refRBSheet.current.close()} 
                        />
                    </View>
                </ScrollView>
            </RBSheet>
            <View
                style={[GlobalStyleSheet.container,{
                    height:60,
                    padding:0,
                    justifyContent:'center',
                    paddingRight:5
                }]}
            >
                <View style={[GlobalStyleSheet.flexcenter]}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <IconButton
                            onPress={() => navigation.goBack()}
                            icon={props => <FeatherIcon name="chevron-left" {...props} />}
                            iconColor={COLORS.card}
                            size={24}
                        />
                        <Text style={{...FONTS.fontMedium,fontSize:16,color:COLORS.card,marginLeft:-12,lineHeight:22}}>Task</Text>
                    </View>
                    <Text style={{...FONTS.fontRegular,fontSize:12,color:COLORS.secondary, flex:1,textAlign:'right',lineHeight:22}}>Compete</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            height:40,
                            width:40,
                            borderRadius:25,
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                    >
                        <Ionicons name='ellipsis-vertical' size={16} color={COLORS.card} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:1,borderTopLeftRadius:15,borderTopRightRadius:15,backgroundColor:'#D2D5DF'}}>
                <View
                    style={[GlobalStyleSheet.container,{padding:20,borderTopLeftRadius:15,borderTopRightRadius:15,backgroundColor:colors.card}]}
                >
                    <Text style={[FONTS.h6,{color:colors.title,marginBottom:0}]}>{data.siteName}</Text>
                    <Animated.View
                        style={[{  height, opacity , }]}
                    >
                        <View style={{marginTop:15}}>
                            <View style={[GlobalStyleSheet.flexcenter,{marginBottom:15}]}>
                                <View style={{width:'35%'}}>
                                    <Text style={[FONTS.font,{...FONTS.fontMedium,color:'rgba(80,88,109,0.8)'}]}>Assign to :</Text>
                                </View>
                                <View style={{width:'70%'}}>
                                    <Text style={[FONTS.font,{...FONTS.fontMedium,color:'rgba(80,88,109,0.8)'}]}>--</Text>
                                </View>
                            </View>
                            <View style={[GlobalStyleSheet.flexcenter,{marginBottom:15}]}>
                                <View style={{width:'30%'}}>
                                    <Text style={[FONTS.font,{...FONTS.fontMedium,color:'rgba(80,88,109,0.8)'}]}>Start/End Date  :</Text>
                                </View>
                                <View style={{width:'65%',flexDirection:'row',alignItems:'center',gap:5}}>
                                    <Ionicons name='calendar' size={16} color={colors.text}/>
                                    <Text style={[FONTS.font,{...FONTS.fontMedium,color:'rgba(80,88,109,0.8)'}]}>26 Jun 25 - 25 Jun <Text style={{fontSize:12,color:'rgba(80,88,109,0.4)'}}>( 4 days )</Text></Text>
                                </View>
                            </View>
                            <View style={[GlobalStyleSheet.flexcenter,{marginBottom:15}]}>
                                <View style={{width:'30%'}}>
                                    <Text style={[FONTS.font,{...FONTS.fontMedium,color:'rgba(80,88,109,0.8)'}]}>Progress :</Text>
                                </View>
                                <View style={{width:'65%',flexDirection:'row',alignItems:'center',gap:5}}>
                                    <Image
                                        resizeMode='contain'
                                        style={{height:16,width:16}}
                                        source={IMAGES.UpTask}
                                    />
                                    <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.title}]}>40 / 100%</Text>
                                </View>
                            </View>
                            <View style={[GlobalStyleSheet.flexcenter,{marginBottom:15,paddingBottom:10}]}>
                                <View style={{width:'30%'}}>
                                    <Text style={[FONTS.font,{...FONTS.fontMedium,color:'rgba(80,88,109,0.8)'}]}>Todo :</Text>
                                </View>
                                <View style={{width:'65%'}}>
                                    <Text style={[FONTS.font,{...FONTS.fontMedium,color:'rgba(80,88,109,0.8)'}]}>Todo</Text>
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                    <TouchableOpacity 
                        onPress={toggleCard}
                        style={{
                            height:40,
                            width:40,
                            borderRadius:50,
                            alignItems:'center',
                            justifyContent:'center',
                            position:'absolute',
                            right:10,
                            top:8
                        }}
                    >
                        <View
                            style={{
                                height:18,
                                width:18,
                                borderRadius:15,
                                borderWidth:1,
                                borderColor:colors.text,
                                alignItems:'center',
                                justifyContent:'center',
                            }}
                        >
                            {isOpen ? (
                                <X size={15} color={colors.text} />
                            ) : (
                                <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
                                    <ChevronDown size={18} color="#000" />
                                </Animated.View>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    ref={scrollViewRef}
                    onContentSizeChange={() => {scrollViewRef.current?.scrollToEnd()}}
                >
                    <View style={[GlobalStyleSheet.container,{ flex: 1 ,paddingTop:30,paddingHorizontal:20}]}>
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
                </ScrollView>
                <View 
                    style={[GlobalStyleSheet.flexcenter,{
                        height:60,
                        width: '100%',
                        backgroundColor:colors.card ,
                        padding:10,
                        gap:10
                    }]}
                >
                    <View style={{flex:1,position:'relative'}}>
                        <TextInput
                            placeholder='Type Message'
                            placeholderTextColor={colors.text}
                            onChangeText={(val) => setMessage(val)}
                            value={message}
                            style={{ 
                                flex:1,
                                ...FONTS.fontMedium, 
                                fontSize: 16,
                                color: colors.title,
                                borderWidth:1,
                                borderColor:'rgba(80,88,109,0.2)',
                                borderRadius:6,
                                paddingLeft:20
                            }}
                        />
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={{
                                height:40,
                                width:40,
                                borderRadius:50,
                                alignItems:'center',
                                justifyContent:'center',
                                position: 'absolute', 
                                top: 0, 
                                right: 30 
                            }}
                        >
                            <FeatherIcon name='image' color={'rgba(80,88,109,0.7)'} size={20}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => sendMessage()}
                            disabled={message.length == 0 ? true : false}
                            style={{
                                height:40,
                                width:40,
                                borderRadius:50,
                                alignItems:'center',
                                justifyContent:'center',
                                position: 'absolute', 
                                top: 0, 
                                right: 0 
                            }}
                        >
                            <FeatherIcon name='send' color={'rgba(80,88,109,0.7)'} size={20}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => refRBSheet.current.open()} 
                        activeOpacity={0.8}
                        style={{
                            backgroundColor:COLORS.primary,
                            paddingHorizontal:12,
                            paddingVertical:12,
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:6,
                        }}
                    >
                        <Text numberOfLines={1} style={{...FONTS.fontMedium,fontSize:14,color:colors.card,lineHeight:16}}>Add Progress</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default TaskDetails