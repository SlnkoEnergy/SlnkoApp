import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../constants/theme';

type Props = {
    quantity : any
}

const CheckoutItems = ({quantity} : Props) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [itemQuantity, setItemQuantity] = useState(quantity);

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <TouchableOpacity
                onPress={() => itemQuantity > 1 && setItemQuantity(itemQuantity - 1)}
                style={{
                    height: 24,
                    width: 24,
                    borderRadius:3,
                    backgroundColor:'#FFEBF1',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <FeatherIcon size={18} color={COLORS.danger} name='minus' />
            </TouchableOpacity>
            {itemQuantity ?
                <Text style={[FONTS.font,{color: colors.title, width: 45, textAlign: 'center' }]}>{itemQuantity}</Text>
                :
                <Text style={[FONTS.font,{color: colors.title, width: 45, textAlign: 'center' }]}>1</Text>
            }
            <TouchableOpacity
                onPress={() => setItemQuantity(itemQuantity + 1)}
                style={{
                    height: 24,
                    width: 24,
                    borderRadius:3,
                    backgroundColor:'#E7F5F4',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <FeatherIcon size={18} color={COLORS.success} name='plus' />
            </TouchableOpacity>
        </View>
    )
}

export default CheckoutItems