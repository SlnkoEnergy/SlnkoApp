import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const CustomInput = (props : any) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [passwordShow, setPasswordShow] = useState(true);

    const handndleShowPassword = () => {
        setPasswordShow(!passwordShow);
    }

    const [isFocused, setIsFocused] = useState(false);

    return (
        <>
            <View style={{ position: 'relative', justifyContent: 'center' }}>
                <TextInput
                    secureTextEntry={props.type === "password" ? passwordShow : false}
                    style={[{
                        ...FONTS.fontMedium,
                        fontSize: 16,
                        height: 50,
                        color: colors.title,
                        paddingVertical: 12,
                        backgroundColor:props.background ? colors.card : colors.input,
                        borderRadius:SIZES.radius_sm,
                        paddingHorizontal: 15,
                    },props.paddingLeft &&{
                        paddingLeft: 100,
                    },
                     props.icon && {
                        paddingLeft: 50,
                    }, props.inputXl && {
                        height: 250,
                        // paddingVertical: 18,
                    }, props.inputLg && {
                        height: 98,
                        // paddingVertical: 18,
                    }, props.inputSm && {
                        paddingVertical: 7,
                        height: 45,
                    }, props.inputRounded && {
                        borderRadius: 30,
                    }, props.textAlignVertical && {
                        textAlignVertical: "top",
                    }, 
                    props.inputBorder && {
                        borderWidth: 1.5,
                        borderBottomWidth:1.5,
                        borderColor: isFocused ? COLORS.primary : colors.border,
                        backgroundColor: colors.card,
                        paddingLeft:20,
                        paddingRight:props.type === "password" ? 45 :20,
                    },props.style && {
                    ...props.style
                    }]}
                    placeholderTextColor={colors.textLight}
                    placeholder={props.placeholder}
                    onChangeText={props.onChangeText}
                    value={props.value}
                    defaultValue={props.defaultValue}
                    multiline={props.inputLg || props.inputXl}
                    keyboardType={props.keyboardType}
                    editable={props.editable}
                    maxLength={props.maxLength}
                    onFocus={(e) => {
                        setIsFocused(true);
                        props.onFocus && props.onFocus(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        props.onBlur && props.onBlur(e);
                    }}
                />
                {props.type === "password" &&
                    <TouchableOpacity
                        accessible={true}
                        accessibilityLabel="Password"
                        accessibilityHint="Password show and hidden"
                        onPress={() => handndleShowPassword()}
                        style={styles.eyeIcon}>
                        <FeatherIcon color={COLORS.primary} size={18} name={passwordShow ? 'eye-off' : 'eye'} />
                    </TouchableOpacity>
                }
                {props.lefticon &&
                    <View style={{
                        position: 'absolute',
                        height: 48,
                        width: 48,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                        left:0
                        //top:16,
                    }}>
                        {props.lefticon && props.lefticon}
                    </View>
                }
                {props.icon &&
                    <View style={{
                        position: 'absolute',
                        height: 48,
                        width: 48,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                        right:0
                        //top:16,
                    }}>
                        {props.icon && props.icon}
                    </View>
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({

    eyeIcon: {
        position: 'absolute',
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        zIndex: 1,
        top: 0,
    }
})

export default CustomInput;