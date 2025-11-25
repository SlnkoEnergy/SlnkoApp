import React from 'react'
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const Customotp = () => {

    const { colors } : {colors : any} = useTheme();

    return (
        <View style={{marginBottom:20}}>
            <OTPTextInput 
                tintColor={COLORS.primary}
                inputCount={6}
                textInputStyle={{
                    ...FONTS.fontRegular,
                    height:50,
                    width:50,
                    borderRadius:SIZES.radius_sm,
                    backgroundColor:colors.card,
                    borderWidth:1.5,
                    borderBottomWidth:1.5,
                    borderColor:colors.border,
                    color:colors.title,
                }}
                
            />
        </View>
    )
}

export default Customotp