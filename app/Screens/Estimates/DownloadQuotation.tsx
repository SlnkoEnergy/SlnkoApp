import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IconButton } from 'react-native-paper';
import { COLORS, FONTS } from '../../constants/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import FeatherIcon from "react-native-vector-icons/Feather";
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomInput from '../../components/Input/CustomInput';
import Button from '../../components/Button/Button';

type DownloadQuotationScreenProps = StackScreenProps<RootStackParamList, 'DownloadQuotation'>;

const DownloadQuotation = ({navigation} : DownloadQuotationScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

     const refRBSheet = useRef<any>();

    const [open, setOpen] = useState<any>(false)
    
    const [date, setDate] = useState<any>(new Date())

    const [prefix, setPrefix] = useState('QT-');
    const [sequenceNumber, setSequenceNumber] = useState('1');
    
    const [savedPrefix, setSavedPrefix] = useState('QT-');
    const [savedSequenceNumber, setSavedSequenceNumber] = useState('1');

    const tabs = [
        { 
            id:"0",
            label: 'With Tax',
        },
        { 
            id:"1",
            label: 'Without Tax', 
        },
    ];

    const [selected, setSelected] = useState(0);

    return (
        <SafeAreaView style={{ backgroundColor:'#172879', flex: 1 }}>
            <View
                style={[GlobalStyleSheet.container,{
                height:60,
                padding:0,
                justifyContent:'center',
                paddingRight:15
                }]}
            >
                <View style={[GlobalStyleSheet.flexcenter]}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <IconButton
                            onPress={() => navigation.goBack()}
                            icon={props => <FeatherIcon name="chevron-left" {...props} />}
                            iconColor={COLORS.card}
                            size={24}
                        />
                        <Text style={{...FONTS.fontMedium,fontSize:16,color:COLORS.card,marginLeft:-12,lineHeight:22}}>Download Quotation</Text>
                    </View>
                </View>
            </View>
            <View style={{flex:1,borderTopLeftRadius:15,borderTopRightRadius:15,backgroundColor:colors.background}}>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
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
                            <Text style={[FONTS.fontMedium,{fontSize:18,color:colors.title}]}>Edit Quotation Number </Text>
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
                     <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:20}]}>
                        <View style={[GlobalStyleSheet.row,{gap:10,marginBottom:20}]}>
                            <View style={{flex:1}}>
                                <View>
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
                                        <Text numberOfLines={1} style={{...FONTS.fontMedium,fontSize:15,color:colors.title,paddingRight:25,flex:1}}>{savedPrefix}{savedSequenceNumber}</Text>
                                        <View style={{
                                            position:'absolute',
                                            right:10
                                        }}>
                                            <FeatherIcon color={colors.title} size={18} name="edit"/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flex:1}}>
                                <View>
                                    <TouchableOpacity
                                        onPress={() => setOpen(true)}
                                        activeOpacity={0.8}
                                        style={{
                                        flex: 1,
                                        backgroundColor: colors.card,
                                        borderRadius: 6,
                                        height: 50,
                                        borderWidth: 1,
                                        borderColor: 'rgba(80,88,109,.2)',
                                        paddingHorizontal: 15,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        }}
                                    >
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                ...FONTS.fontMedium,
                                                fontSize: 15,
                                                color: colors.title,
                                            }}
                                        >
                                            {format(date, 'dd MMM, EEE')} {/* ➤ like: 26 Jun, Thu */}
                                        </Text>
                                        <FeatherIcon name="calendar" size={18} color={colors.title} />
                                        <DatePicker
                                            modal
                                            open={open}
                                            date={date}
                                            onConfirm={(d) => {
                                                setOpen(false);
                                                setDate(d);
                                            }}
                                            onCancel={() => setOpen(false)}
                                            theme={'light'}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={{...FONTS.fontMedium,fontSize:15,color:colors.title}}>Quotation Type</Text>
                            <View style={[GlobalStyleSheet.row,{marginTop:20}]}>
                                {tabs.map((data:any,index:any) => {
                                    return(
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            key={index}
                                            style={[GlobalStyleSheet.col50]}
                                            onPress={() => setSelected(data.id)}
                                        >
                                            <View
                                                style={{
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
                                                <Text style={{...FONTS.fontMedium,fontSize:15,color:colors.title}}>{data.label}</Text>
                                                <View
                                                    style={[{
                                                        width: 18,
                                                        height: 18,
                                                        borderRadius: 9,
                                                        borderWidth: 2,
                                                        borderColor:colors.title,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    },selected === data.id && {
                                                        borderColor:COLORS.primary
                                                    }]}
                                                >
                                                    {selected === data.id &&
                                                        <View
                                                            style={{
                                                                width:11,
                                                                height:11,
                                                                borderRadius:9,
                                                                backgroundColor:COLORS.primary
                                                            }}
                                                        />
                                                    }
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>
                     </View>
                </ScrollView>
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:20}]}>
                    <Button
                        title='Save'
                        color={theme.dark ? COLORS.white :COLORS.primary}
                        text={colors.card}
                        onPress={() => {navigation.goBack(); navigation.goBack()}}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DownloadQuotation