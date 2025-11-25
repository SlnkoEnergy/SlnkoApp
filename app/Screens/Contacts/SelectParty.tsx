import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { SafeAreaView } from 'react-native';
import Header from '../../layout/Header';
import { ScrollView } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CustomInput from '../../components/Input/CustomInput';
import { TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import FeatherIcon from "react-native-vector-icons/Feather";
import Button from '../../components/Button/Button';

type SelectPartyScreenProps = StackScreenProps<RootStackParamList, 'SelectParty'>;

const SelectParty = ({ navigation } : SelectPartyScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title={"Select Party"}
                leftIcon={'back'}
                titleLeft
            />
            <View style={{flex:1,backgroundColor:colors.card,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow:1}}
                >
                    <View
                        style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:30}]}
                    >
                        <View style={{marginBottom:20}}>
                            <CustomInput
                                inputBorder
                                placeholder={'Search...'}
                            />
                        </View>
                        <View style={[GlobalStyleSheet.flexcenter,{justifyContent:'flex-end'}]}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
                                onPress={() => navigation.navigate('NewContact')}
                            >
                                <FeatherIcon color={COLORS.primary} size={18} name="plus" />
                                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: COLORS.primary }}>
                                    Add item
                                </Text>
                            </TouchableOpacity>
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

export default SelectParty