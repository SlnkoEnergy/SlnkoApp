import { View, Text, TouchableWithoutFeedback, Animated, Easing, StyleSheet, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import Header from '../../layout/Header';
import { ScrollView } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CustomInput from '../../components/Input/CustomInput';
import FeatherIcon from "react-native-vector-icons/Feather";
import { COLORS, FONTS } from '../../constants/theme';
import { TouchableOpacity } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import Button from '../../components/Button/Button';

const dropdownData = [
    {
        id:"1",
        key:"SiteStaff",
        label:"Site Staff",
      },
      {
        id:"2",
        key:"OfficeStaff",
        label:"Office Staff",
    },
]

const DROPDOWN_OPTIONS = ['Active', 'InActive'];

type PayrollPeopleScreenProps = StackScreenProps<RootStackParamList, 'PayrollPeople'>;

const PayrollPeople = ({ navigation } : PayrollPeopleScreenProps)  => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const dropdownAnim = useRef(new Animated.Value(0)).current;
    const [visible, setVisible] = useState(false);
    const [animating, setAnimating] = useState(false);

    const toggleDropdown = () => {
        if (animating) return;

        setAnimating(true);
        if (!visible) {
        setVisible(true); // set first to mount
        Animated.timing(dropdownAnim, {
            toValue: 1,
            duration: 250,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start(() => setAnimating(false));
        } else {
        Animated.timing(dropdownAnim, {
            toValue: 0,
            duration: 200,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            setVisible(false);
            setAnimating(false);
        });
        }
    };

    const hideDropdown = () => {
        if (!visible || animating) return;
            setAnimating(true);
        Animated.timing(dropdownAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setVisible(false);
            setAnimating(false);
        });
    };

    const translateY = dropdownAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-10, 0],
    });

    const opacity = dropdownAnim;

    const [selected, setSelected] = useState('Active');
    const [isOpen, setIsOpen] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const toggleDropdown2 = () => {
        setIsOpen(!isOpen);
        Animated.timing(animation, {
            toValue: isOpen ? 0 : 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleSelect = (value: string) => {
        setSelected(value);
        toggleDropdown2();
    };

    const heightInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, DROPDOWN_OPTIONS.length * 33], // height per item
    });

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title={"Payroll People"}
                leftIcon={'back'}
                titleLeft
            />
            <View style={{flex:1,backgroundColor:colors.card,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow:1}}
                >
                    <View
                        style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:30,flex:1}]}
                    >
                        <View style={{marginBottom:20}}>
                            <CustomInput
                                inputBorder
                                placeholder={'Search...'}
                            />
                        </View>
                        <View style={[GlobalStyleSheet.flexcenter]}>
                            <View>
                                <TouchableOpacity
                                    onPress={toggleDropdown2}
                                    activeOpacity={0.5} 
                                    style={{flexDirection:'row',alignItems:'center',gap:5}}
                                >
                                    <Text style={[FONTS.fontLg,{color:colors.title}]}>{selected}</Text>
                                    <FeatherIcon size={16} color={colors.text} name={isOpen ? "chevron-up" : "chevron-down"}/>
                                </TouchableOpacity>
                                <Animated.View 
                                    style={[{ 
                                        width:110,
                                        height: heightInterpolate,
                                        position:'absolute',
                                        top:30,
                                        zIndex:99,
                                        overflow: 'hidden',
                                        backgroundColor: colors.card,
                                        borderRadius: 8,
                                        elevation: 5,
                                    }]}
                                >
                                    <FlatList
                                        data={DROPDOWN_OPTIONS}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }:any) => (
                                            <TouchableOpacity 
                                                onPress={() => handleSelect(item)}
                                                style={{
                                                    paddingVertical:6,
                                                    paddingHorizontal:20,
                                                    flexDirection:'row',
                                                    alignItems:'center',
                                                    gap:10
                                                }}
                                            >
                                                <Text 
                                                    style={[FONTS.font,FONTS.fontMedium,{color:colors.text}]}>{item}
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </Animated.View>
                            </View>
                            <View style={{ zIndex: 99 }}>
                                {/* Trigger Button */}
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={toggleDropdown}
                                    style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
                                >
                                    <FeatherIcon color={COLORS.primary} size={18} name="plus" />
                                    <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: COLORS.primary }}>
                                        Add item
                                    </Text>
                                    <FeatherIcon
                                        size={16}
                                        color={COLORS.primary}
                                        style={{ opacity: 0.5 }}
                                        name={visible ? 'chevron-up' : 'chevron-down'}
                                    />
                                </TouchableOpacity>
    
                                {/* Overlay Click Dismiss */}
                                {visible && (
                                    <TouchableWithoutFeedback onPress={hideDropdown}>
                                        <View
                                            style={{
                                                ...StyleSheet.absoluteFillObject,
                                                backgroundColor: 'transparent',
                                                zIndex: 1,
                                            }}
                                        />
                                    </TouchableWithoutFeedback>
                                )}
    
                                {/* Dropdown */}
                                {visible && (
                                    <Animated.View
                                        style={{
                                                position: 'absolute',
                                                top: 30,
                                                right: 0,
                                                zIndex: 2,
                                                opacity,
                                                transform: [{ translateY }],
                                            }}
                                        >
                                        <DropShadow
                                            style={{
                                                shadowColor: 'rgb(18,9,46)',
                                                shadowOffset: { width: 0, height: 4 },
                                                shadowOpacity: 0.1,
                                                shadowRadius: 5,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    padding: 20,
                                                    paddingVertical:10,
                                                    borderRadius: 8,
                                                    backgroundColor: colors.card,
                                                    width: 150,
                                                }}
                                            >
                                                {dropdownData.map((item, index) => (
                                                    <TouchableOpacity
                                                        key={index}
                                                        activeOpacity={0.8}
                                                        onPress={() => {
                                                            navigation.navigate('SelectParty');
                                                            hideDropdown();
                                                        }}
                                                        style={{ paddingVertical: 10 }}
                                                    >
                                                        <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text }}>
                                                            {item.label}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </DropShadow>
                                    </Animated.View>
                                )}
                            </View>
                        </View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.text,textAlign:'center'}]}>No Payroll added</Text>
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

export default PayrollPeople