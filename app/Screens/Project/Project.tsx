import { View, Text, SafeAreaView, ImageBackground, ScrollView, StyleSheet, Animated, TextInput, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS } from '../../constants/theme';
import DropShadow from 'react-native-drop-shadow';
import FeatherIcon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ProgressBar from '../../components/ProgressBar';
import Progresscircle from '../../components/Progresscircle';


const ProjectCards = [
  {
    title: "Prem 2nd House",
    address: "23, Mokshita Dairy",
    progress: 0.15,
    inAmount: 157,
    outAmount: 6820,
    view: 'grid',
  },
  {
    title: "Teacher Kolony",
    address: "23, Mokshita Dairy",
    progress: 0.7,
    inAmount: 140,
    outAmount: 1200,
    view: 'grid',
  },
  {
    title: "KOTA House",
    address: "23, Mokshita Dairy",
    progress: 1,
    inAmount: 5000,
    outAmount: 27000,
    view: 'grid',
  },
  {
    title: "Jaipur House",
    address: "23, Mokshita Dairy",
    progress: 0,
    inAmount: 0,
    outAmount: 400,
    view: 'grid',
  },
  {
    title: "KOTA House",
    address: "23, Mokshita Dairy",
    progress: 1,
    inAmount: 5000,
    outAmount: 27000,
    view: 'grid',
    images: [IMAGES.projectpic3,IMAGES.projectpic4,IMAGES.projectpic5,IMAGES.projectpic6,IMAGES.projectpic5,IMAGES.projectpic6],
  },
  {
    title: "Jaipur House",
    address: "23, Mokshita Dairy",
    progress: 0,
    inAmount: 0,
    outAmount: 400,
    view: 'grid',
    images: [IMAGES.projectpic2],
  },
  {
    title: "Prem 2nd House",
    address: "23, Mokshita Dairy, Sector B",
    progress: 0.52,
    inAmount: 5000,
    outAmount: 27000,
    view: 'list',
    images: [IMAGES.projectpic1],
  },
  {
    title: "Prem 2nd House",
    address: "23, Mokshita Dairy, Sector B",
    progress: 0.52,
    inAmount: 5000,
    outAmount: 27000,
    view: 'list',
  },
];

const DROPDOWN_OPTIONS = ['All', 'Ongoing', 'Completed', 'Not Started', 'On Hold'];

type ProjectScreenProps = StackScreenProps<RootStackParamList, 'Project'>;

const Project = ({navigation} : ProjectScreenProps)  => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [showSearch, setShowSearch] = useState(false);
    const translateX = useRef(new Animated.Value(-300)).current;
  
    const openSearchBar = () => {
      setShowSearch(true);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };
  
    const closeSearchBar = () => {
      Animated.timing(translateX, {
        toValue: 400, // Slide out to right
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowSearch(false);
        translateX.setValue(-300); // RESET to left (prepare for next open)
      });
    };

    const [selected, setSelected] = useState('All');
    const [isOpen, setIsOpen] = useState(false);
    const [animation] = useState(new Animated.Value(0));
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
      Animated.timing(animation, {
        toValue: isOpen ? 0 : 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    };
  
    const handleSelect = (value: string) => {
      setSelected(value);
      toggleDropdown();
    };
  
    const heightInterpolate = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, DROPDOWN_OPTIONS.length * 33], // height per item
    });


    return (
      <SafeAreaView style={{ backgroundColor: colors.background, flex: 1, marginBottom: 0 }}>
        <StatusBar backgroundColor={colors.background}/>
        <View style={[GlobalStyleSheet.container, {padding:0}]}>
          <View 
              style={[GlobalStyleSheet.flexcenter,{
                  height:60, 
                  zIndex: 11,
                  backgroundColor:colors.background,
                  paddingHorizontal:20
              }]}
          >
              <TouchableOpacity
                  onPress={() => navigation.openDrawer()}
                  style={{flex:1}}
              >
                  <Image
                      style={{
                          height:16,
                          width:24,
                      }}
                      tintColor={colors.title}
                      resizeMode='contain'
                      source={IMAGES.menu}
                  />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height:30,
                  padding:8,
                  borderRadius:6,
                  backgroundColor:'#FFB743',
                  flexDirection:'row',
                  alignItems:'center',
                  gap:5,
                  marginRight:40
                }}
              >
                  <Image
                    style={{
                      height:15,
                      width:15
                    }}
                    resizeMode='contain'
                    source={IMAGES.crown}
                  />
                  <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.title,lineHeight:14}}>Upgrade</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate('Notification')}
                  style={{ 
                    padding: 5,
                    height:40,
                    width:40,
                    borderRadius:30,
                    backgroundColor:'transparent',
                    alignItems:'center',
                    justifyContent:'center',
                    position:'absolute',
                    right:15
                  }}
              >
                  <FeatherIcon name='bell' color={colors.text} size={20}/>
                  <View
                    style={{
                      height:10,
                      width:10,
                      borderRadius:5,
                      backgroundColor:'#EA4230',
                      borderWidth:2,
                      borderColor:colors.card,
                      position:'absolute',
                      right:10,
                      top:10
                    }}
                  />
              </TouchableOpacity>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1}}>
          <View style={[GlobalStyleSheet.container,{padding:0,flex:1,zIndex:999}]}>
            <DropShadow
                style={[{
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: -4,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                },Platform.OS === 'ios' && {
                    backgroundColor:'transparent',
                }]}
            >
              <View
                style={[GlobalStyleSheet.container,
                  {
                    paddingTop:10,
                    padding:0,
                    backgroundColor:colors.background,
                    borderBottomWidth:1,
                    borderColor:'#EEEEEE',
                    position:'relative',
                    // zIndex:9999
                  }
                ]}
              >
                <LinearGradient
                    locations={[0.3,0.60,0.7]}
                    colors={
                        theme.dark ?
                        ["rgba(12,16,28,0.3)","rgba(12,16,28,.95)","rgba(12,16,28,1)"]
                        :
                        ["#F9F9F9","#F9F9F9","#FFFFFF"]
                    }
                    style={{
                      position:'absolute',
                      bottom:0,
                      top:0,
                      left:0,
                      right:0
                    }}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    height:135,
                    overflow:'hidden',
                    borderRadius:8,
                    marginBottom:10,
                    marginHorizontal:20
                  }}
                >
                  <ImageBackground
                    style={{flex:1}}
                    source={IMAGES.Shap1}
                  >
                    <View
                      style={[GlobalStyleSheet.flexcenter,{
                        flex:1,
                        padding:20,
                        borderRadius:8,
                        alignItems:'flex-end',
                        overflow:'hidden',
                      }]}
                    >
                      <View style={[{flexDirection:'column',justifyContent:'flex-end'}]}>
                        <View style={{flex:1}}>
                          <Text style={{...FONTS.fontMedium,fontSize:18,color:COLORS.card,marginBottom:2}}>Approval</Text>
                          <Text style={{...FONTS.fontLight,fontSize:14,color:COLORS.card}}>Pending Approval</Text>
                        </View>
                        <Text style={{...FONTS.fontMedium,fontSize:28,color:COLORS.card}}>07</Text>
                      </View>
                      <FeatherIcon name='arrow-right' color={COLORS.card} size={22}/>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
                <View style={[GlobalStyleSheet.flexcenter,{justifyContent:'center',gap:10,paddingHorizontal:20,marginBottom:25}]}>
                    <TouchableOpacity
                      activeOpacity={0.8} 
                      style={[GlobalStyleSheet.col50,{
                        padding:20,
                        paddingHorizontal:20,
                        borderRadius:8,
                        backgroundColor:colors.card,
                        borderWidth:1,
                        borderColor:'#EFEFEF'
                      }]}
                    >
                      <Text style={{...FONTS.fontMedium,fontSize:18,color:colors.title,marginBottom:2}}>Material</Text>
                      <Text style={{...FONTS.fontLight,fontSize:14,color:colors.text}}>Request</Text>
                      <View style={[GlobalStyleSheet.flexcenter,{marginTop:35}]}>
                        <Text style={{...FONTS.fontMedium,fontSize:28,color:colors.title}}>10</Text>
                        <FeatherIcon name='arrow-right' color={COLORS.primary} size={22}/>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8} 
                      style={[GlobalStyleSheet.col50,{
                        padding:20,
                        paddingHorizontal:20,
                        borderRadius:8,
                        backgroundColor:colors.card,
                        borderWidth:1,
                        borderColor:'#EFEFEF'
                      }]}
                    >
                      <Text style={{...FONTS.fontMedium,fontSize:18,color:colors.title,marginBottom:2}}>To Do</Text>
                      <Text style={{...FONTS.fontLight,fontSize:14,color:colors.text}}>Pending</Text>
                      <View style={[GlobalStyleSheet.flexcenter,{marginTop:35}]}>
                        <Text style={{...FONTS.fontMedium,fontSize:28,color:colors.title}}>12</Text>
                        <FeatherIcon name='arrow-right' color={COLORS.primary} size={22}/>
                      </View>
                    </TouchableOpacity>
                </View>
                <View style={[GlobalStyleSheet.flexcenter,{paddingHorizontal:20,marginBottom:15,}]}>
                  <View style={{flexDirection:'row',alignItems:'center',gap:15}}>
                    <View>
                      <TouchableOpacity
                          onPress={toggleDropdown}
                          activeOpacity={0.5} 
                          style={{flexDirection:'row',alignItems:'center',gap:5}}
                      >
                          <Text style={[FONTS.fontLg,{color:colors.title}]}>{selected}</Text>
                          <FeatherIcon size={16} color={colors.text} name={isOpen ? "chevron-up" : "chevron-down"}/>
                      </TouchableOpacity>
                      <Animated.View 
                        style={[{ 
                            width:200,
                            height: heightInterpolate,
                            position:'absolute',
                            top:40,
                            zIndex:99,
                            overflow: 'hidden',
                            backgroundColor: colors.card,
                            borderRadius: 8,
                            elevation: 5,
                        }]}>
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
                              <View
                                style={[{
                                  height: 8,
                                  width: 8,
                                  borderRadius: 4,
                                  backgroundColor:colors.text,
                                },item === 'Ongoing' && {
                                  backgroundColor:'#419A90'
                                },item === 'Completed' && {
                                  backgroundColor:'#6A38FF'
                                },item === 'On Hold' && {
                                  backgroundColor:'#E8B73D'
                                },item === 'Not Started' && {
                                  backgroundColor:'#DD1951'
                                }]}
                              />
                              <Text 
                                style={[
                                  FONTS.font,FONTS.fontMedium,
                                  {
                                    color:colors.text
                                  },item === 'Ongoing' && {
                                    color:'#419A90'
                                  },item === 'Completed' && {
                                    color:'#6A38FF'
                                  },item === 'On Hold' && {
                                    color:'#E8B73D'
                                  },item === 'Not Started' && {
                                    color:'#DD1951'
                                  }]}>{item}</Text>
                            </TouchableOpacity>
                          )}
                        />
                      </Animated.View>
                    </View>
                    <TouchableOpacity
                      onPress={openSearchBar}  
                      activeOpacity={0.5}
                    >
                      <FeatherIcon color={COLORS.primary} size={16} name='search'/>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('CreateProject')}
                    activeOpacity={0.5}
                    style={{flexDirection:'row',alignItems:'center',gap:3}}
                  >
                    <FeatherIcon color={COLORS.primary} size={16} name='plus'/>
                    <Text style={{...FONTS.fontMedium,fontSize:15,color:COLORS.primary,lineHeight:20}}>Project</Text>
                  </TouchableOpacity>
                  {showSearch && (
                    <Animated.View style={[{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: colors.background,
                        borderWidth:1,
                        borderColor:colors.border,
                        borderRadius: 8,
                        paddingHorizontal: 10,
                        height: 40,
                        width: '65%',
                        position: 'absolute',
                        left: 15,
                        transform: [{ translateX }] 
                    }]}>
                        <TextInput
                            placeholder="Search..."
                            style={[FONTS.font,FONTS.fontMedium,{
                              color:colors.title,
                              flex: 1,
                            }]}
                            placeholderTextColor={colors.placeholder}
                            multiline
                        />
                        <TouchableOpacity onPress={closeSearchBar}>
                          <FeatherIcon name="x" size={20} color={colors.text} />
                        </TouchableOpacity>
                    </Animated.View>
                  )}
                </View>
              </View>
            </DropShadow>
          </View>
          <View style={[GlobalStyleSheet.container,{flex:1,padding:20,}]}>
              {/* ProjectCards Start*/}
              <View style={[GlobalStyleSheet.row]}>
                {ProjectCards.map((data:any,index:any) => {
                  if(data.view === 'list'){
                    return(
                      <View
                        key={index}
                        style={[GlobalStyleSheet.col50,{width:'100%'}]}
                      >
                        <TouchableOpacity
                          onPress={() => navigation.navigate('ProjectDetails',{data : data})}
                          activeOpacity={0.8}
                          style={{
                            backgroundColor:colors.card,
                            borderRadius:6,
                            borderWidth:1,
                            borderColor:'#EFEFEF',
                            marginBottom:10,
                            overflow:'hidden',
                          }}
                        >
                          <View style={{flexDirection:'row',alignItems:'center',width:'100%'}}>
                            {data.images && (
                              <View style={{width:'25%'}}>
                                <View
                                  style={{
                                    width:'100%',
                                    height:null,
                                    aspectRatio:1/1.25,
                                    alignItems:'center',
                                    justifyContent:'center',
                                  }}
                                >
                                  <Image
                                    style={{
                                      width:'100%',
                                      height:'100%'
                                    }}
                                    resizeMode='cover'
                                    source={data.images[0]}
                                  />
                                </View>
                              </View>
                            )}
                            <View style={{width:data.images ? '75%': '100%'}}>
                              <View
                                style={[GlobalStyleSheet.flexcenter,{
                                  padding:15,
                                  alignItems:'flex-start',
                                  borderBottomWidth: 1,
                                  borderColor: '#EFEFEF',
                                }]}
                              >
                                <View style={{flexDirection:'row',gap:10}}>
                                  <Progresscircle progress={data.progress}/>
                                  <View>
                                    <Text style={{...FONTS.fontMedium,fontSize:15,color:colors.title}}>{data.title}</Text>
                                    <Text style={[FONTS.font,{fontSize:14, color:colors.text,marginTop:3}]}>{data.address}</Text>
                                  </View>
                                </View>
                                <TouchableOpacity
                                  activeOpacity={0.5}
                                  style={{
                                    height:45,
                                    width:45,
                                    borderRadius:25,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    position:'absolute',
                                    right:0,
                                    top:5
                                  }}
                                >
                                  <Ionicons name='ellipsis-vertical' size={16} color={colors.text} style={{opacity:0.5}}/>
                                </TouchableOpacity>
                              </View>
                              <View style={[GlobalStyleSheet.flexcenter,{padding:15, paddingHorizontal:20,justifyContent:'center'}]}>
                                  <Text style={[FONTS.fontMedium,{fontSize:13, color:'#419A90',lineHeight:16,flex:1}]}>₹ {data.inAmount} In</Text>
                                  <Text numberOfLines={1} style={[FONTS.fontMedium,{fontSize:13, color:'#DD1951',lineHeight:16,flex:1,marginRight:50}]}>₹ {data.outAmount} Out</Text>
                                  <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={{
                                      height:40,
                                      width:40,
                                      borderRadius:50,
                                      alignItems:'center',
                                      justifyContent:'center',
                                      position:'absolute',
                                      right:10,
                                    }}
                                  >
                                    <FeatherIcon name='arrow-right' color={COLORS.primary} style={{opacity:0.4}} size={18}/>
                                  </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )
                  }else{
                    return(
                      <View
                        key={index}
                        style={[GlobalStyleSheet.col50]}
                      >
                        <TouchableOpacity
                          onPress={() => navigation.navigate('ProjectDetails',{data : data})}
                          activeOpacity={0.8}
                          style={{
                            backgroundColor:colors.card,
                            borderRadius:6,
                            borderWidth:1,
                            borderColor:'#EFEFEF',
                            marginBottom:10,
                            overflow:'hidden'
                          }}
                        >
                          {data.images?.length > 0 && (
                            <View style={{ width: '100%' }}>
                              {/* If only 1 image */}
                              {data.images.length === 1 ? (
                                <View
                                  style={{
                                    width: '100%',
                                    height:null,
                                    aspectRatio: 1 / 0.4,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Image
                                    style={{ width: '100%', height: '100%' }}
                                    resizeMode="cover"
                                    source={data.images[0]}
                                  />
                                </View>
                              ) : (
                                // If multiple images
                                <View 
                                  style={{ 
                                    flexDirection: 'row', 
                                    width: '100%',
                                    height:null,
                                    aspectRatio: 1 / 0.4,
                                    overflow: 'hidden' 
                                  }}
                                >
                                  {/* Left big image */}
                                  <Image
                                    source={data.images[0]}
                                    style={{
                                      width: '50%',
                                      height: '100%',
                                      marginRight:1
                                    }}
                                    resizeMode="cover"
                                  />

                                  {/* Right: top image + bottom two small */}
                                  <View style={{ width: '50%' }}>
                                    {data.images.length === 2 ? (
                                      <Image
                                        source={data.images[1]}
                                        style={{
                                          width: '100%',
                                          height: '100%' 
                                        }}
                                        resizeMode="cover"
                                      />
                                    ) : (
                                      <>  
                                        {/* Top right image */}
                                        <Image
                                          source={data.images[1]}
                                          style={{
                                            width: '100%',
                                            height: '50%',
                                            marginBottom:1
                                          }}
                                          resizeMode="cover"
                                        />

                                        {/* Bottom row (2 small images) */}
                                        <View style={{ flexDirection: 'row', height: '50%' }}>
                                          {data.images.length === 3 ? (
                                            <View 
                                              style={{ 
                                                flex: 1,
                                              }}
                                            >
                                              <Image
                                                source={data.images[2]}
                                                style={{ width: '100%', height: '100%' }}
                                                resizeMode="cover"
                                              />
                                            </View>
                                          ) : (
                                            [2, 3].map((index) => (
                                              <View
                                                key={index}
                                                style={{
                                                  flex: 1,
                                                  borderRightWidth: index === 2 ? 1 : 0,
                                                  borderColor: colors.card,
                                                }}
                                              >
                                                <Image
                                                  source={data.images[index]}
                                                  style={{ width: '100%', height: '100%' }}
                                                  resizeMode="cover"
                                                />
  
                                                {/* Overlay +x on the last image if needed */}
                                                {index === 3 && data.images.length > 4 && (
                                                  <View
                                                    style={{
                                                      ...StyleSheet.absoluteFillObject,
                                                      backgroundColor: 'rgba(0,0,0,0.4)',
                                                      justifyContent: 'center',
                                                      alignItems: 'center',
                                                    }}
                                                  >
                                                    <Text style={{...FONTS.fontSemiBold, fontSize: 15 ,color:COLORS.card}}>
                                                      +{data.images.length - 4}
                                                    </Text>
                                                  </View>
                                                )}
                                              </View>
                                            ))
                                          )}
                                        </View>
                                      </>
                                    )}
                                  </View>
                                </View>
                              )}
                            </View>
                          )}
                          <View
                            style={[GlobalStyleSheet.flexcenter,{
                              padding:15,
                              paddingBottom:10,
                              alignItems:'flex-start'
                            }]}
                          >
                            <View>
                              <Text style={{...FONTS.fontMedium,fontSize:15,color:colors.title}}>{data.title}</Text>
                              <View style={{marginTop:3}}>
                                <Text numberOfLines={1} style={[FONTS.font,{fontSize:13, color:colors.text}]}>{data.address}</Text>
                              </View>
                            </View>
                            <TouchableOpacity
                              activeOpacity={0.5}
                              style={{
                                height:45,
                                width:45,
                                borderRadius:25,
                                alignItems:'center',
                                justifyContent:'center',
                                position:'absolute',
                                right:0,
                                top:0
                              }}
                            >
                              <Ionicons name='ellipsis-vertical' size={16} color={colors.text} style={{opacity:0.5}}/>
                            </TouchableOpacity>
                          </View>
                          <ProgressBar progress={data.progress} />
                          <View style={{padding:15}}>
                              <Text style={[FONTS.fontMedium,{fontSize:13, color:'#419A90',lineHeight:16}]}>₹ {data.inAmount} In</Text>
                              <View
                                style={[GlobalStyleSheet.flexcenter,{paddingTop:5}]}
                              >
                                <Text style={[FONTS.fontMedium,{fontSize:13, color:'#DD1951',lineHeight:16}]}>₹ {data.outAmount} Out</Text>
                                <TouchableOpacity
                                  activeOpacity={0.8}
                                  style={{
                                    height:40,
                                    width:40,
                                    borderRadius:50,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    position:'absolute',
                                    right:-10,
                                  }}
                                >
                                  <FeatherIcon name='arrow-right' color={COLORS.primary} style={{opacity:0.4}} size={18}/>
                                </TouchableOpacity>
                              </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )
                  }
                })}
              </View>
              {/* ProjectCards Start*/}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
}

export default Project