import { View, Text } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import Header from '../../layout/Header';
import { ScrollView } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { PoundSterling,Coins } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const LibraryData = [
    {
        image:<FeatherIcon name='user' size={20} color={COLORS.text}/>,
        title:"Party Library",
        navigate:"PartyLibrary"
    },
    {
        image:<FeatherIcon name='truck' size={20} color={COLORS.text} />,
        title:"Material Library",
        navigate:"MaterialLibrary"
    },
    {
        image:<FeatherIcon name='truck' size={20} color={COLORS.text} />,
        title:"Material Category Library",
        navigate:"MaterialCategoryLibrary"
    },
    {
        image:<FeatherIcon name='tag' size={20} color={COLORS.text} />,
        title:"Cost Code Library",
        navigate:"CostCodeLibrary"
    },
    {
        image:<FeatherIcon name='user' size={20} color={COLORS.text}/>,
        title:"Workforce Library",
        navigate:"WorkforceLibrary"
    },
    {
        image:<PoundSterling size={20} color={COLORS.text}/>,
        title:"Deduction Library ",
        navigate:"DeductionLibrary "
    },
    {
        image:<Coins size={20} color={COLORS.text}/>,
        title:"Retention Library",
        navigate:"RetentionLibrary "
    },
    {
        image:<FeatherIcon name='tag' size={20} color={COLORS.text} />,
        title:"Todo Type Library",
        navigate:"TodoTypeLibrary "
    },
]

type LibraryManagementScreenProps = StackScreenProps<RootStackParamList, 'LibraryManagement'>;

const LibraryManagement = ({ navigation } : LibraryManagementScreenProps)  => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title={'Library Management'}
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
                        <View>
                            {LibraryData.map((data:any,index) => {
                                return(
                                    <TouchableOpacity
                                        // onPress={() => navigation.navigate(data.navigate)}
                                        activeOpacity={0.5} 
                                        key={index}
                                        style={[GlobalStyleSheet.flexcenter,{
                                            padding:15,
                                            paddingHorizontal:13,
                                            borderWidth:1.5,
                                            marginBottom:12,
                                            borderRadius:8,
                                            borderColor:'#E8E8E8',
                                            backgroundColor:colors.background
                                        }]}
                                    >
                                        <View style={{flexDirection:'row',alignItems:'center',gap:10,flex:1}}>
                                            {data.image}
                                            <Text style={[FONTS.fontMedium,FONTS.font,{color:colors.text}]}>{data.title}</Text>
                                        </View>
                                        <FeatherIcon size={20} color={colors.title} name={'chevron-right'} />
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default LibraryManagement