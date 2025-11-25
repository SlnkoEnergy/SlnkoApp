import { View, Text, ImageBackground, ScrollView, Image,Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { SafeAreaView } from 'react-native';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Button from '../../components/Button/Button';

type OnbordingScreenProps = StackScreenProps<RootStackParamList, 'Onbording'>;

const Onbording = ({ navigation } : OnbordingScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

     // Create an animated value for vertical translation
    const moveAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0)).current; // Start with scale 0

    useEffect(() => {
        Animated.parallel([
            // Animate scale from 0 to 1
            Animated.timing(scaleAnim, {
              toValue: 1, // Scale up to full size
              duration: 500, // Duration for the scaling effect
              useNativeDriver: true,
            }),
            // Loop the left-right movement animation
            Animated.loop(
                Animated.sequence([
                    Animated.timing(moveAnim, {
                    toValue: -15, // Move up by 50 units
                    duration: 1500,
                    useNativeDriver: true,
                    }),
                    Animated.timing(moveAnim, {
                    toValue: 0, // Move down by 50 units
                    duration: 1500,
                    useNativeDriver: true,
                    }),
                ])
            ),
        ]).start(); // Start both animations together after the delay
    }, [moveAnim, scaleAnim]);

    return (
        <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
            <ImageBackground
                style={{
                    height:'100%',
                    width:'100%',
                    flex:1
                }}
                resizeMode='cover'
                source={IMAGES.bgonboarding}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow:1}}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            position:'absolute',
                            left:0,
                            right:0,
                            top:0,
                            bottom:0
                        }}
                    />
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(38, 72, 231, 0.8)', // Light overlay
                            position:'absolute',
                            left:0,
                            right:0,
                            top:0,
                            bottom:0
                        }}
                    />
                    <View
                        style={{
                            flex:1.2,
                            overflow:'hidden'
                        }}
                    >
                        <View
                            style={{
                                alignItems:'center',
                                justifyContent:'center',
                                flex:1,
                                paddingHorizontal:20
                            }}
                        >
                            <View
                                style={{
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}
                            >
                                <Image
                                    style={{
                                        width:'100%',
                                        height:null,
                                        aspectRatio:1/1,
                                        zIndex:9
                                    }}
                                    source={IMAGES.onboardingpic1}
                                />
                                <Animated.Image
                                    style={{
                                        height:45,
                                        width:45,
                                        borderRadius:25,
                                        position:'absolute',
                                        right:20,
                                        marginBottom:60,
                                        zIndex:999,
                                        transform: [
                                            { translateY: moveAnim }, // Apply the animated horizontal translation
                                            { scale: scaleAnim },     // Apply the scaling effect
                                        ],
                                    }}
                                    source={IMAGES.onboardinguser1}
                                />
                                <Animated.Image
                                    style={{
                                        height:45,
                                        width:45,
                                        borderRadius:25,
                                        position:'absolute',
                                        left:20,
                                        marginTop:60,
                                        zIndex:999,
                                        transform: [
                                            { translateY: moveAnim},
                                            { scale: scaleAnim },
                                        ],
                                    }}
                                    source={IMAGES.onboardinguser2}
                                />
                            </View>
                            <View
                                style={{
                                    width:300,
                                    height:190,
                                    borderRadius:160,
                                    backgroundColor:'red',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    overflow:'hidden',
                                    position:'absolute',
                                    left:-110,
                                    top:-20,
                                    transform:[{rotate :'45.85deg'}]
                                }}
                            >
                                <Image
                                    style={{
                                        width:'100%',
                                        height:null,
                                        aspectRatio:1/1,
                                        transform:[{rotate :'-45.85deg'}],
                                        marginBottom:-70,
                                        marginRight:-120
                                    }}
                                    resizeMode='cover'
                                    source={IMAGES.onboardingpic2}
                                />
                            </View>
                            <Animated.View
                                style={{
                                    position:'absolute',
                                    right:20,
                                    top:20,
                                    alignItems:'center',
                                    transform: [
                                        { translateX: moveAnim},
                                        { scale: scaleAnim },
                                    ],
                                }}
                            >
                                <View
                                    style={{
                                        width:165,
                                        height:130,
                                        borderRadius:67,
                                        backgroundColor:'red',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        overflow:'hidden',
                                    }}
                                >
                                    <Image
                                        style={{
                                            width:'100%',
                                            height:null,
                                            aspectRatio:1/1,
                                        }}
                                        resizeMode='cover'
                                        source={IMAGES.onboardingpic3}
                                    />
                                </View>
                                <View
                                    style={{
                                        padding:5,
                                        backgroundColor:COLORS.card,
                                        borderRadius:6,
                                        paddingHorizontal:10,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        position:'absolute',
                                        bottom:-10,
                                        zIndex:99
                                    }}
                                >
                                    <Text style={{...FONTS.fontRegular,fontSize:13,color:colors.title}}>Planning</Text>
                                </View>
                            </Animated.View>
                            <View
                                style={{
                                    width:300,
                                    height:190,
                                    borderRadius:160,
                                    backgroundColor:'red',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    overflow:'hidden',
                                    position:'absolute',
                                    right:-110,
                                    bottom:-20,
                                    transform:[{rotate :'45.85deg'}]
                                }}
                            >
                                <Image
                                    style={{
                                        width:'100%',
                                        height:null,
                                        aspectRatio:1/1,
                                        transform:[{rotate :'-45.85deg'}],
                                    }}
                                    resizeMode='cover'
                                    source={IMAGES.onboardingpic5}
                                />
                            </View>
                            <Animated.View
                                style={{
                                    position:'absolute',
                                    left:20,
                                    bottom:30,
                                    alignItems:'center',
                                    transform: [
                                        { translateX: moveAnim},
                                        { scale: scaleAnim },
                                    ],
                                }}
                            >
                                <View
                                    style={{
                                        width:165,
                                        height:130,
                                        borderRadius:67,
                                        backgroundColor:'red',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        overflow:'hidden',
                                    }}
                                >
                                    <Image
                                        style={{
                                            width:'100%',
                                            height:null,
                                            aspectRatio:1/1,
                                        }}
                                        resizeMode='cover'
                                        source={IMAGES.onboardingpic4}
                                    />
                                </View>
                                <View
                                    style={{
                                        padding:5,
                                        backgroundColor:COLORS.card,
                                        borderRadius:6,
                                        paddingHorizontal:10,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        position:'absolute',
                                        bottom:-10,
                                        zIndex:99
                                    }}
                                >
                                    <Text style={{...FONTS.fontRegular,fontSize:13,color:colors.title}}>Manage</Text>
                                </View>
                            </Animated.View>
                        </View>
                    </View>
                    <View
                        style={[GlobalStyleSheet.container,{
                            flex:1,
                            backgroundColor:colors.card,
                            padding:20,
                            paddingTop:45,
                            borderTopLeftRadius:20,
                            borderTopRightRadius:20
                        }]}
                    >
                        <Text style={{
                            ...FONTS.fontSemiBold,
                            fontSize:24,
                            color:colors.title,
                            lineHeight:30,
                            marginBottom:10
                        }}>Everything You Need {"\n"}
  to Run Your Construction {"\n"}
  Business Smarter</Text>
                        <Text
                            style={{
                                ...FONTS.fontRegular,
                                fontSize:18,
                                color:colors.text,
                                lineHeight:24
                            }}
                        >Plan Projects. Track Progress. Create {"\n"}Invoices. From Site to Office Manage {"\n"}It All by SmartProtrac</Text>
                    </View>
                </ScrollView>
                <View
                    style={[GlobalStyleSheet.container,{
                        position:'absolute',
                        bottom:0,
                        left:0,
                        right:0
                    }]}
                >
                    <Button
                        title='Get Started'
                        onPress={() => navigation.navigate('ChooseLanguage')}
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Onbording