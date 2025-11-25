import React from 'react';
import { Image, Platform, Text, TouchableOpacity, View, } from 'react-native';
import { COLORS, FONTS,} from '../constants/theme';
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation, useTheme } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { IMAGES } from '../constants/Images';

const Header = (props: { productId?: any; transparent?: any; paddingLeft?: any; leftIcon?: any;leftIcon2?: any;  backAction?: any; titleLeft?: any; title?: any; rightIcon2?: any; rightIcon?: any; rightIcon3?: any; rightIcon4?: any;rightIcon5?:any ;rightIcon6?: any; handleLike?: any; isLike?: any; grid?: any; handleLayout?: any; layout?: any;onPress ? : any; }) => {

    const navigation = useNavigation<any>();

    const theme = useTheme();
    const { colors }: {colors :any} = theme;

    const { grid, handleLayout, layout } = props;

    return (
        <View
            style={[{
                shadowColor: "#000",
                shadowOffset: {
                    width: 2,
                    height: 2,
                },
                shadowOpacity: .1,
                shadowRadius: 5,
            }, Platform.OS === "ios" && {
                backgroundColor:'transparent',
            }]}
        >
            <View
                style={[{
                    height: props.productId ? 60 : 60,
                    backgroundColor:'transparent'
                }, props.transparent && {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                }]}
            >
                <View 
                    style={[GlobalStyleSheet.container, {
                        padding:0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft:props.paddingLeft ? 15 : 0,
                        paddingHorizontal:20,
                        justifyContent: 'space-between',
                    }]}
                >
                    {props.leftIcon == "back" &&
                        <IconButton
                            onPress={() => props.backAction ? props.backAction() : navigation.goBack()}
                            icon={props => <FeatherIcon name="chevron-left" {...props} />}
                            iconColor={colors.title}
                            size={24}
                        />
                    }
                    {props.leftIcon == "back-2" &&
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <IconButton
                                onPress={() => props.backAction ? props.backAction() : navigation.goBack()}
                                icon={props => <FeatherIcon name="chevron-left" {...props} />}
                                iconColor={colors.title}
                                size={24}
                            />
                            <Text style={{...FONTS.fontMedium,fontSize:16,color:colors.title,marginLeft:-12,lineHeight:22,textTransform:'uppercase'}}>back</Text>
                        </View>
                    }
                    {props.leftIcon2 == "menu" &&
                        <IconButton
                            onPress={props.onPress}
                            iconColor={colors.text}
                            size={20}
                            icon={prop =>
                                <Image {...props} style={{ height:16, width: 22, resizeMode: 'contain', tintColor: colors.title }} source={IMAGES.menu} />
                            }
                        />
                    }
                    <View style={{ flex: 1, justifyContent:'center'}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: colors.title,marginLeft: props.titleLeft ? -12 : 0,lineHeight:22,textAlign: props.titleLeft ? 'left' : 'center' }}>{props.title}</Text>
                        {props.productId &&
                            <Text style={{ ...FONTS.fontSm, color: colors.text, textAlign: 'center', marginTop: 2 }}>{props.productId}</Text>
                        }
                    </View>
                    {props.rightIcon == "settings" &&
                        <IconButton
                            onPress={props.onPress}
                            size={18}
                            iconColor={COLORS.primary}
                            icon={props => <FeatherIcon name="settings" {...props} />}
                            style={{marginRight:-5}}
                        />
                    }
                    {props.rightIcon == "cart" &&
                        <IconButton
                            onPress={props.onPress}
                            size={20}
                            iconColor={colors.title}
                            icon={prop =>
                                <Image {...prop} style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: colors.title }} source={IMAGES.shopping} />
                            }
                        />
                    }
                    {props.rightIcon2 == "search" &&
                        <IconButton
                            onPress={() => navigation.navigate('Search')}
                            size={20}
                            iconColor={COLORS.primary}
                            icon={props => <FeatherIcon name="search" {...props} />}
                        />
                    }
                    {props.rightIcon == "whatsapp" &&
                        <TouchableOpacity
                            activeOpacity={0.5} 
                            style={{flexDirection:'row',alignItems:'center',gap:5}}
                        >
                            <Image
                                style={{
                                    height:22,
                                    width:22,
                                    resizeMode:'contain',
                                }}
                                source={IMAGES.whatsapp}
                            />
                            <Text style={{...FONTS.fontMedium,fontSize:16,color:colors.title,lineHeight:16}}>Chat With Us</Text>
                        </TouchableOpacity>
                    }
                    {props.rightIcon == "Language" &&
                        <TouchableOpacity
                            onPress={props.onPress} 
                            style={{flexDirection:'row',alignItems:'center'}}
                            activeOpacity={0.5}
                        >
                            <Text style={[FONTS.font,{fontSize:15,color:COLORS.primary,marginRight:-10}]}>English</Text>
                            <IconButton
                                onPress={props.onPress}
                                size={16}
                                iconColor={COLORS.primary}
                                icon={props => <Image {...props} style={{height:15,width:15}} tintColor={COLORS.primary} source={IMAGES.ArrowDown}/>}
                            />
                        </TouchableOpacity>
                    }
                    {props.rightIcon == "AddUser" &&
                        <TouchableOpacity
                            onPress={props.onPress} 
                            style={{
                                padding:10,
                                paddingVertical:8,
                                borderRadius:6,
                                backgroundColor:colors.card,
                                flexDirection:'row',
                                alignItems:'center',
                                gap:5
                            }}
                        >
                            <FeatherIcon name='user-plus' size={14} color={COLORS.primary}/>
                            <Text style={{...FONTS.fontMedium,fontSize:13,color:COLORS.primary}}>Add</Text>
                        </TouchableOpacity>
                    }
                    {grid &&
                        <View
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => handleLayout('grid')}
                                style={{
                                    padding: 10,
                                }}
                            >
                                <Image
                                    style={{
                                        height: 22,
                                        width: 22,
                                        resizeMode: 'contain',
                                        tintColor: layout === 'grid' ? COLORS.primary : '#BEB9CD',
                                    }}
                                    source={IMAGES.grid}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleLayout('list')}
                                style={{
                                    padding: 10,
                                }}
                            >
                                <Image
                                    style={{
                                        height: 22,
                                        width: 22,
                                        resizeMode: 'contain',
                                        tintColor: layout === 'list' ? COLORS.primary : '#BEB9CD',
                                    }}
                                    source={IMAGES.grid2}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        </View>
    );
};



export default Header;