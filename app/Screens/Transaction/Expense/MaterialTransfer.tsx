import { View, Text, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Navigations/RootStackParamList';
import { SafeAreaView } from 'react-native';
import Header from '../../../layout/Header';
import { ScrollView } from 'react-native';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import { TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../../constants/theme';
import FeatherIcon from "react-native-vector-icons/Feather";
import CustomInput from '../../../components/Input/CustomInput';
import Button from '../../../components/Button/Button';
import RBSheet from 'react-native-raw-bottom-sheet';

type MaterialTransferScreenProps = StackScreenProps<RootStackParamList, 'MaterialTransfer'>;

const MaterialTransfer = ({navigation} : MaterialTransferScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const refRBSheet = useRef<any>(null);

    
    const [prefix, setPrefix] = useState('');
    const [sequenceNumber, setSequenceNumber] = useState('0');
    
    const [savedPrefix, setSavedPrefix] = useState('');
    const [savedSequenceNumber, setSavedSequenceNumber] = useState('0');

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title={"Add Material Transfer"}
                leftIcon={'back'}
                titleLeft
            />
            <View style={{flex:1,backgroundColor:colors.card,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <RBSheet
                    ref={refRBSheet}
                    height={360}
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
                        <Text style={[FONTS.fontMedium,{fontSize:18,color:colors.title}]}>Edit Quotation Number</Text>
                        <View style={{marginBottom:20,marginTop:30 }}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Prefix</Text>
                            <CustomInput
                                inputBorder
                                value={prefix}
                                onChangeText={(text :any) => setPrefix(text)}
                            />
                        </View>
                        <View style={{marginBottom:25 }}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Starting Sequence Number</Text>
                            <CustomInput
                                inputBorder
                                value={sequenceNumber}
                                onChangeText={(text:any) => setSequenceNumber(text)}
                            />
                        </View>
                        <Button
                            title='Save'
                            onPress={() => {
                            setSavedPrefix(prefix);                 
                            setSavedSequenceNumber(sequenceNumber); 
                            refRBSheet.current.close();            
                        }}
                        />
                    </View>
                    </ScrollView>
                </RBSheet>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow:1}}
                >
                    <View
                        style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:20}]}
                    >
                        <View style={{marginBottom:20}}>
                            <Text style={[FONTS.font,FONTS.fontMedium,{ color: colors.text,marginBottom:5 }]}>Transfer Out No</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    refRBSheet.current.open();
                                }}
                                activeOpacity={0.5}
                                style={{
                                    flex:1,
                                    backgroundColor:colors.card,
                                    borderRadius:6,
                                    height:50,
                                    borderWidth:1,
                                    borderColor: 'rgba(80,88,109,.2)',
                                    paddingHorizontal:15,
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'space-between'
                                }}
                            >
                                <Text 
                                    numberOfLines={1} 
                                    style={{
                                        ...FONTS.fontMedium,
                                        fontSize:15,
                                        color:colors.title,
                                        paddingRight:25,
                                        flex:1
                                    }}
                                >{savedPrefix}{savedSequenceNumber}</Text>
                                <View style={{
                                    position:'absolute',
                                    right:10
                                }}>
                                    <FeatherIcon color={colors.text} size={18} name="edit"/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom:20}}>
                            <Text style={[FONTS.font,FONTS.fontMedium,{ color: colors.text,marginBottom:5 }]}>Form</Text>
                            <CustomInput
                                inputBorder
                            />
                        </View>
                        <View style={{marginBottom:20}}>
                            <Text style={[FONTS.font,FONTS.fontMedium,{ color: colors.text,marginBottom:5 }]}>To</Text>
                            <CustomInput
                                inputBorder
                            />
                        </View>
                        <View style={[styles.row,{marginBottom:15}]}>
                            <Text style={[FONTS.font,FONTS.fontMedium,{color:COLORS.primary}]}>Select Material Request</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('invoiceAddItem')}
                                activeOpacity={0.5} 
                                style={[styles.addButton,{gap:5,right:-10}]}
                            >
                                <Text style={[FONTS.font,FONTS.fontMedium,{color:COLORS.primary}]}>Add Material</Text>
                                <FeatherIcon name='plus' size={14} color={COLORS.primary}/>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.row,{marginBottom:20}]}>
                            <Text style={[FONTS.fontMedium,{fontSize:16,color:colors.title,flex:1}]}>Total Amount</Text>
                            <View>
                                <CustomInput
                                    inputBorder
                                    placeholder={'₹'}
                                    style={{
                                        height:30,
                                        paddingVertical:0,
                                        textAlign:'center',
                                        fontSize:15,
                                        paddingLeft:30,
                                        paddingRight:30,
                                    }}
                                    numberOfLines={1}
                                />
                            </View>
                        </View>
                        <View style={{marginBottom:15}}>
                            <TouchableOpacity
                                activeOpacity={0.5} 
                                style={[styles.row,{gap:5,justifyContent:'flex-end'}]}
                            >
                                <Text style={[FONTS.font,FONTS.fontMedium,{color:COLORS.primary}]}>E Way Bill No</Text>
                                <FeatherIcon name='plus' size={14} color={COLORS.primary}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom:15}}>
                            <TouchableOpacity
                                activeOpacity={0.5} 
                                style={[styles.row,{gap:5,justifyContent:'flex-end'}]}
                            >
                                <Text style={[FONTS.font,FONTS.fontMedium,{color:COLORS.primary}]}>Add Notes</Text>
                                <FeatherIcon name='plus' size={14} color={COLORS.primary}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom:15}}>
                            <TouchableOpacity
                                activeOpacity={0.5} 
                                style={[styles.row,{gap:5,justifyContent:'flex-end'}]}
                            >
                                <Text style={[FONTS.font,FONTS.fontMedium,{color:COLORS.primary}]}>Reference No</Text>
                                <FeatherIcon name='plus' size={14} color={COLORS.primary}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom:15}}>
                            <TouchableOpacity
                                activeOpacity={0.5} 
                                style={[styles.row,{gap:5,justifyContent:'flex-end'}]}
                            >
                                <Text style={[FONTS.font,FONTS.fontMedium,{color:COLORS.primary}]}>Add Vehicle No.</Text>
                                <FeatherIcon name='plus' size={14} color={COLORS.primary}/>
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

const styles = StyleSheet.create({
   row: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    Button:{
        height:40,
        width:40,
        backgroundColor:'transparent',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:30,
    },
    addButton:{
        // backgroundColor:'red',
        height:40,
        paddingHorizontal:12,
        borderRadius:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:10,
        position:'absolute',
        right:-15,
        top:-10
    },
})

export default MaterialTransfer