import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Platform, TouchableOpacity, View, Animated, Text, Dimensions, ScrollView } from 'react-native';
import { COLORS,  SIZES, FONTS } from '../constants/theme';
import { useTheme } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { IMAGES } from '../constants/Images';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import DropShadow from 'react-native-drop-shadow';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';

const companyList = [
    {
        id: 0,
        name: 'W3itexperts',
        role: 'Super Admin',
        owner: 'Kuldeep',
        initial: 'W',
        initialColor:"#FFFFFF",
        roleColor: '#2648E7',        
        roleTextColor: '#2648E7',
        bgColor: '#E8ECFF',         
        borderColor: '#2648E7',
    },
    {
        id: 1,
        name: 'DexignZone',
        role: 'Client',
        owner: 'Kuldeep',
        initial: 'D',
        initialColor:"#6E2820",
        roleColor: '#FADBD7',         
        roleTextColor: '#D23131',
        bgColor: 'rgba(250,219,215,0.20)',          
        borderColor: 'transparent',
    },
];

type Props = {
    state : any,
    navigation : any,
    descriptors : any,
    openCompanySheet: () => void,
    bottomSheetRef: any; // 👈 add this
}

const BottomTab = ({ state, descriptors, navigation,openCompanySheet } : Props) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    useEffect(() => {
        if (bottomSheetRef?.current) {
            bottomSheetRef.current.close(); // 👈 Close sheet on tab change
        }
    }, [state.index]);

    const [tabWidth, setWidth] = useState(wp('100%'));

    const tabWD =
        tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5;

    const circlePosition = useRef(
        new Animated.Value(0),
    ).current;

    Dimensions.addEventListener('change', val => {
        setWidth(val.window.width);
    });
    
    useEffect(() => {
        Animated.spring(circlePosition, {
            toValue: state.index * tabWD,
            useNativeDriver: true,
        }).start();
    },[state.index,tabWidth])


    const onTabPress = (index: number) => {
        const tabW =
            tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5; // Adjust this according to your tab width

        Animated.spring(circlePosition, {
            toValue: index * tabW,
            useNativeDriver: true,
        }).start();
    };

    const [Select, setSelect] = useState(0)

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['40%'], []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const renderBackdrop = useCallback(
        (props:any) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        ),
        []
    );


    return (
        <>
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                onChange={handleSheetChanges}
                backgroundStyle={{
                    backgroundColor:colors.background,
                    borderTopLeftRadius:20,
                    borderTopRightRadius:20,
                }}
                handleIndicatorStyle={{
                    backgroundColor:colors.background,
                    width:100,
                    height:4,
                }}
            >
                <BottomSheetScrollView
                    contentContainerStyle={{
                        paddingBottom:200,
                    }}
                >
                    <View style={[GlobalStyleSheet.container,{flex:1,paddingTop:0,padding:20}]}>
                         <Text style={[FONTS.fontRegular,{fontSize:18,color:colors.title,marginBottom:10}]}>Select Company</Text>
                         <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{flexGrow:1}}
                         >
                            <View style={{flex:1}}>
                                <View style={[GlobalStyleSheet.row,{paddingTop:10}]}>
                                    {companyList.map((data:any,index:any) => {
                                        return(
                                            <View 
                                                key={index}
                                                style={[GlobalStyleSheet.col50,{marginBottom:10}]}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => setSelect(data.id)}
                                                    style={[
                                                        {
                                                            padding:20,
                                                            backgroundColor:colors.card,
                                                            borderRadius:8,
                                                            borderWidth:1,
                                                            borderColor:'transparent'
                                                        },Select === data.id && {
                                                            backgroundColor:data.bgColor,
                                                            borderColor:data.roleColor
                                                        }
                                                    ]}
                                                >
                                                    <View style={{alignItems:'center'}}>
                                                        <View
                                                            style={{
                                                                height:50,
                                                                width:50,
                                                                borderRadius:20,
                                                                backgroundColor:data.roleColor,
                                                                alignItems:'center',
                                                                justifyContent:'center'
                                                            }}
                                                        >
                                                            <Text style={{...FONTS.fontBold,fontSize:22,color:data.initialColor}}>{data.initial}</Text>
                                                        </View>
                                                        <View style={{marginTop:11}}>
                                                            <Text style={[FONTS.fontLg,{fontSize:18,color:colors.title,textAlign:'center'}]}>{data.name}</Text>
                                                            <Text style={[FONTS.fontXs,{color:data.roleTextColor,marginTop:5,textAlign:'center'}]}>{data.role}</Text>
                                                        </View>
                                                        <View style={{marginTop:10}}>
                                                            <Text style={[FONTS.fontSm,{color:colors.text,textAlign:'center'}]}>Owner: {data.owner}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                         </ScrollView>
                    </View>
                </BottomSheetScrollView>
            </BottomSheet>
            <DropShadow
                style={[{
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowOpacity: .10,
                    shadowRadius: 30,
                },Platform.OS === 'ios' && {
                    backgroundColor:colors.card,
                }]}
            >
                <View
                    style={[{
                        height: 60,
                        backgroundColor:colors.card,
                        borderTopLeftRadius:10,
                        borderTopRightRadius:10
                    }]}>

                    <View style={[GlobalStyleSheet.container,{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        paddingTop: 0,
                        paddingBottom: 0,
                    }]}>
                        {state.routes.map((route:any, index:any) => {
                            const { options } = descriptors[route.key];
                            const label =
                                options.tabBarLabel !== undefined
                                    ? options.tabBarLabel
                                    : options.title !== undefined
                                        ? options.title
                                        : route.name;

                            const isFocused = state.index === index;


                            const iconTranslateY = useRef(new Animated.Value(0)).current;
                            Animated.timing(iconTranslateY, {
                                toValue: isFocused ? -18 : 0,
                                duration: 200,
                                useNativeDriver: true,
                            }).start();

                            // const onPress = () => {
                            //     if(label == "Messages"){
                            //         navigation.navigate('Messages');
                            //     }
                            //     const event = navigation.emit({
                            //         type: 'tabPress',
                            //         target: route.key,
                            //         canPreventDefault: true,
                            //     });

                            //     if (!isFocused && !event.defaultPrevented) {
                            //         navigation.navigate({ name: route.name, merge: true });
                            //         onTabPress(index);
                            //     }
                            // };

                            const onPress = () => {
                                if (label === "Company") {
                                    bottomSheetRef.current?.snapToIndex(0); // Open sheet
                                    // setPendingNavigation(route.name); // Store the route name
                                    return;
                                }

                                if (label === "Messages") {
                                    navigation.navigate('Messages');
                                    return;
                                }

                                const event = navigation.emit({
                                    type: 'tabPress',
                                    target: route.key,
                                    canPreventDefault: true,
                                });

                                if (!isFocused && !event.defaultPrevented) {
                                    navigation.navigate({ name: route.name, merge: true });
                                    onTabPress(index);
                                }
                            };

                            
                            if(label === 'Company'){
                            return(
                                <View
                                    key={index}
                                    style={{
                                        width:'20%',
                                        alignItems:'center',
                                    }}
                                >
                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        onPress={onPress}
                                        style={{
                                            height:60,
                                            width:60,
                                            borderRadius:50,
                                            alignItems:'center',
                                            justifyContent:'center',
                                        }}
                                    >
                                        <View
                                            style={[{
                                                height:40,
                                                width:40,
                                                borderRadius:50,
                                                backgroundColor:COLORS.primary,
                                                alignItems:'center',
                                                justifyContent:'center',
                                            }]}
                                        >
                                            <Text style={{...FONTS.fontBold,fontSize:18,color:COLORS.card,lineHeight:22}}>W</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                            }else{
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        activeOpacity={.8}
                                        accessibilityRole="button"
                                        accessibilityState={isFocused ? { selected: true } : {}}
                                        accessibilityLabel={options.tabBarAccessibilityLabel}
                                        testID={options.tabBarTestID}
                                        onPress={onPress}
                                        style={{ flex: 1, alignItems: 'center', height: '100%', justifyContent: 'center', marginTop: 5 }}
                                    >
                                        <Image
                                            style={{ width: 18, height: 18, tintColor: isFocused ? COLORS.primary : colors.text }}
                                            source={
                                                label == 'Estimates' ? IMAGES.Estimates :
                                                label == 'Project' ? IMAGES.Project :
                                                label == 'Contacts' ? IMAGES.Contacts :
                                                label == 'Messages' ? IMAGES.Messages : IMAGES.home
                                            }
                                            resizeMode='center'
        
                                        />
                                        <Text style={[{...FONTS.fontMedium,fontSize:12,color:isFocused ? COLORS.primary : colors.text}]}>{label}</Text>
                                    </TouchableOpacity>
                                );
                            }
                        })}
                    </View>
                </View>
            </DropShadow>
        </>
    );
};

export default BottomTab;