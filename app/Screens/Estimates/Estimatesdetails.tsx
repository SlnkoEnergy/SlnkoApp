import { View, Text, SafeAreaView, ScrollView, Animated, Easing, TouchableWithoutFeedback, StyleSheet, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from "react-native-vector-icons/Feather";
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IconButton } from 'react-native-paper';
import { COLORS, FONTS } from '../../constants/theme';
import { TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomInput from '../../components/Input/CustomInput';
import Button from '../../components/Button/Button';
import DropShadow from 'react-native-drop-shadow';

const dropdownData = [
    {
        id:"1",
        key:"material",
        label:"Add item",
      },
      {
        id:"2",
        key:"labour",
        label:"Add Section",
    },
    {
        id:"3",
        key:"equipment",
        label:"Add item from Library",
    },
]

type EstimatesdetailsScreenProps = StackScreenProps<RootStackParamList, 'Estimatesdetails'>;

const Estimatesdetails = ({route,navigation} : EstimatesdetailsScreenProps)  => {

    const {data} = route.params;

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [open, setOpen] = useState<any>(false)

    const [date, setDate] = useState<any>(new Date())

    const [isChecked, setisChecked] = useState(false);
    
    const [isCheckedAssign, setisCheckedAssign] = useState(false);

    const refRBSheet1 = useRef<any>(null);

    const refRBSheet = useRef<any>(null);

    const [selectedType, setSelectedType] = useState(null);

    const [prefix, setPrefix] = useState('QT-');
    const [sequenceNumber, setSequenceNumber] = useState('1');
    
    const [savedPrefix, setSavedPrefix] = useState('QT-');
    const [savedSequenceNumber, setSavedSequenceNumber] = useState('1');

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
                      <Text style={{...FONTS.fontMedium,fontSize:16,color:COLORS.card,marginLeft:-12,lineHeight:22}}>{data.title}</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Notification')}
                        style={{ 
                          padding: 5,
                          height:40,
                          width:40,
                          borderRadius:30,
                          backgroundColor:'transparent',
                          alignItems:'center',
                          justifyContent:'center',
                          marginRight:-5
                        }}
                    >
                        <FeatherIcon name='bell' color={COLORS.card} size={20}/>
                        <View
                          style={{
                            height:10,
                            width:10,
                            borderRadius:5,
                            backgroundColor:'#EA4230',
                            borderWidth:2,
                            borderColor:'#172879',
                            position:'absolute',
                            right:10,
                            top:10
                          }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('DownloadQuotation')}
                        style={{ 
                          padding: 5,
                          height:40,
                          width:40,
                          borderRadius:30,
                          backgroundColor:'transparent',
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                    >
                        <FeatherIcon name='download' color={COLORS.card} size={20}/>
                    </TouchableOpacity>
                  </View>
              </View>
            </View>
            <View style={{flex:1,borderTopLeftRadius:15,borderTopRightRadius:15,backgroundColor:colors.background}}>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <RBSheet
                        ref={refRBSheet1}
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
                                refRBSheet1.current.close();            
                              }}
                            />
                        </View>
                      </ScrollView>
                    </RBSheet>
                    <RBSheet
                      ref={refRBSheet}
                      height={selectedType === 'equipment' ? 300: 600}
                      openDuration={250}
                      customStyles={{
                        container: {
                          backgroundColor: colors.background,
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                        },
                      }}
                    >
                      <ScrollView contentContainerStyle={{ padding: 20,flexGrow:1 }}>
                        {selectedType === 'labour' && (
                          <View style={[GlobalStyleSheet.container,{paddingTop:5,padding:0,flex:1}]}>
                              <Text style={[FONTS.fontMedium,{fontSize:18,color:colors.title}]}>Add Section</Text>
                              <View style={{marginBottom:10,marginTop:30 }}>
                                  <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Enter Section Name</Text>
                                  <CustomInput
                                      inputBorder
                                  />
                              </View>
                              <TouchableOpacity
                                  onPress={() => setisCheckedAssign(!isCheckedAssign)}
                                  style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      gap:10,
                                      paddingVertical: 10,
                                      paddingLeft:5,
                                      marginBottom:10,
                                  }}
                              >
                                  <View
                                      style={{
                                          height:20,
                                          width:20,
                                          borderRadius:4,
                                          borderWidth:1.5,
                                          borderColor:isCheckedAssign ? COLORS.primary : colors.title,
                                          backgroundColor:isCheckedAssign ? COLORS.primary: 'transparent',
                                          alignItems:'center',
                                          justifyContent:'center',
                                      }}
                                  >
                                      {isCheckedAssign &&
                                          <FeatherIcon size={14} color={COLORS.card} name={'check'} />
                                      }
                                  </View>
                                  <View style={{flexDirection:'row',alignItems:'center',flex:1,gap:5}}>
                                      <Text
                                          style={[FONTS.fontLg,{...FONTS.fontMedium, color:colors.title}]}
                                      >
                                          Assign Parent
                                      </Text>
                                  </View>
                              </TouchableOpacity>
                              <Button
                                title='Save'
                                onPress={() => {
                                  refRBSheet.current.close();            
                                }}
                              />
                          </View>
                        )}
                        {selectedType === 'equipment' && (
                          <View style={[GlobalStyleSheet.container,{paddingTop:5,padding:0,flex:1}]}>
                              <Text style={[FONTS.fontMedium,{fontSize:18,color:colors.title}]}>Add Form Rate Library</Text>
                              <View style={{flex:1}}>
                                <View style={{marginVertical:15,marginHorizontal:-15,paddingHorizontal:15,}}>
                                    <TextInput
                                        style={{
                                            ...FONTS.fontMedium,
                                            fontSize:16,
                                            color:colors.title,
                                            height:50,
                                            borderRadius:8,
                                            borderWidth:1.5,
                                            borderColor:colors.border,
                                            paddingHorizontal:45,
                                            paddingLeft:15,
                                            backgroundColor:colors.card,
                                        }}
                                        placeholder={'Search'}
                                        placeholderTextColor={'rgba(80,80,109,0.5)'}
                                    />
                                    <View style={{position:'absolute',right:30,top:14}}>
                                        <FeatherIcon color={colors.text} size={20} name='search'/>
                                    </View>
                                </View>
                                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                  <Text style={[FONTS.fontLg,{color:colors.text}]}>No items Found</Text>
                                </View>
                              </View>
                              <Button
                                title='Save'
                                onPress={() => {
                                  refRBSheet.current.close();            
                                }}
                              />
                          </View>
                        )}
                      </ScrollView>
                    </RBSheet>
                    <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:20,backgroundColor:colors.card,borderTopLeftRadius:15,borderTopRightRadius:15,flex:1}]}>
                        <View style={[GlobalStyleSheet.row,{gap:10,marginBottom:20}]}>
                          <View style={{flex:1}}>
                              <View>
                                  <TouchableOpacity
                                      onPress={() => {
                                          refRBSheet1.current.open();
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
                        <View style={{alignItems:'flex-end',borderBottomWidth:1,borderColor:'rgba(238,238,238,0.5)',paddingBottom:15,marginHorizontal:-15,paddingHorizontal:15}}>
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
                                color={colors.text}
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
                                      borderRadius: 8,
                                      backgroundColor: colors.background,
                                      width: 200,
                                    }}
                                  >
                                    {dropdownData.map((item, index) => (
                                      <TouchableOpacity
                                        key={index}
                                        activeOpacity={0.8}
                                        onPress={() => {
                                          if (item.key === 'material') {
                                            navigation.navigate('AddItem');
                                          } else {
                                            setSelectedType(item.key);
                                            refRBSheet.current?.open();
                                          }
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
                        <View style={{zIndex:9}}>
                            <View
                              style={[GlobalStyleSheet.flexcenter,{paddingVertical:15,borderBottomWidth:1,borderColor:'#EEEEEE',marginHorizontal:-15,paddingHorizontal:15,zIndex:-1}]}
                            >
                              <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.title}]}>Bet</Text>
                              <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.title}]}>₹18,000</Text>
                            </View>
                            <View style={[GlobalStyleSheet.flexcenter,{paddingTop:20,paddingBottom:30,zIndex:-1}]}>
                                <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                  <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.title}]}>Morbal</Text>
                                  <FeatherIcon size={16} color={colors.title} name="chevron-down"/>
                                </View>
                                <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.title}]}>₹0</Text>
                            </View>
                            <View style={[GlobalStyleSheet.flexcenter,{marginBottom:10,zIndex:-1}]}>
                                <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.text}]}>Item Subtotal</Text>
                                <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.title}]}>₹18000</Text>
                            </View>
                            <View style={[GlobalStyleSheet.flexcenter,{marginBottom:10,zIndex:-1}]}>
                                <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.text}]}>CGST</Text>
                                <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.text}]}>₹1,620</Text>
                            </View>
                            <View style={[GlobalStyleSheet.flexcenter,{marginBottom:10,zIndex:-1}]}>
                                <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.text}]}>SGST</Text>
                                <Text style={[FONTS.font,{...FONTS.fontMedium,color:colors.text}]}>₹1,620</Text>
                            </View>
                        </View>
                        <View style={{marginVertical:10,paddingBottom:20,borderBottomWidth:1,borderStyle:'dashed',borderColor:colors.text}}>
                          <TouchableOpacity
                            // onPress={() => refRBSheet.current.open()} 
                            activeOpacity={0.5}
                            style={{flexDirection:'row',alignItems:'center',gap:3}}
                          >
                            <FeatherIcon color={COLORS.primary} size={18} name='plus'/>
                            <Text style={{...FONTS.fontMedium,fontSize:14,color:COLORS.primary,lineHeight:16}}>Additional Charges</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            // onPress={() => refRBSheet.current.open()} 
                            activeOpacity={0.5}
                            style={{flexDirection:'row',alignItems:'center',gap:3,marginTop:10}}
                          >
                            <FeatherIcon color={COLORS.primary} size={18} name='plus'/>
                            <Text style={{...FONTS.fontMedium,fontSize:14,color:COLORS.primary,lineHeight:16}}>Discount</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{marginTop:5,marginBottom:10}}>
                          <Text style={[FONTS.h5,{...FONTS.fontMedium,color:colors.text}]}>Total</Text>
                          <View style={[GlobalStyleSheet.flexcenter]}>
                              <TouchableOpacity
                                  onPress={() => setisChecked(!isChecked)}
                                  style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      gap:10,
                                      paddingVertical: 10,
                                      paddingLeft:5,
                                      flex:1
                                  }}
                              >
                                  <View
                                      style={{
                                          height:20,
                                          width:20,
                                          borderRadius:4,
                                          borderWidth:1.5,
                                          borderColor:isChecked ? COLORS.primary : colors.checkBoxborder,
                                          backgroundColor:isChecked ? COLORS.primary: 'transparent',
                                          alignItems:'center',
                                          justifyContent:'center',
                                      }}
                                  >
                                      {isChecked &&
                                          <FeatherIcon size={14} color={COLORS.card} name={'check'} />
                                      }
                                  </View>
                                  <View style={{flexDirection:'row',alignItems:'center',flex:1,gap:5}}>
                                      <Text
                                          style={[FONTS.font,{color:colors.text}]}
                                      >
                                          Round off
                                      </Text>
                                  </View>
                              </TouchableOpacity>
                              <Text style={{...FONTS.fontSemiBold,fontSize:20,color:colors.title}}>₹21,240</Text>
                          </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Estimatesdetails