import React from 'react';
import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';
import { COLORS, FONTS } from '../constants/theme';
import { useTheme } from '@react-navigation/native';

const Progresscircle = ({ progress } : any) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;
  
    return (
        <View style={{position:'relative',alignItems:'center',justifyContent:'center'}}>
            <View
                style={{transform:[{rotate : '0deg'}]}}
            >
                    <Progress.Circle 
                        borderWidth={0}
                        unfilledColor={'#DDDDDD'}
                        color={COLORS.primary}
                        progress={progress} 
                        size={35} 
                        thickness={3}
                        strokeCap={'round'}
                    />
            </View>
            <Text style={[FONTS.fontSemiBold,{fontSize:12,color:colors.text,position:'absolute'}]}>{Math.round(progress * 100)}</Text>
        </View>
    );
};

export default Progresscircle;
