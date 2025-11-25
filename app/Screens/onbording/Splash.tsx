import { Image, SafeAreaView, Text, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigations/RootStackParamList";
import { COLORS, FONTS } from "../../constants/theme";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { IMAGES } from "../../constants/Images";
import { ImageBackground } from "react-native";
import { useEffect } from "react";

type SplashScreenProps = StackScreenProps<RootStackParamList, 'splash'>;

const Splash = ({navigation}: SplashScreenProps) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.replace('Onbording'); 
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    return(
        <SafeAreaView style={{backgroundColor:COLORS.card,flex:1}}>
            <ImageBackground
                style={{
                    height:'100%',
                    width:'100%',
                    flex:1
                }}
                resizeMode='cover'
                source={IMAGES.bgonboarding}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(51, 102, 153, 0.8)', // Light overlay
                        position:'absolute',
                        left:0,
                        right:0,
                        top:0,
                        bottom:0
                    }}
                />
                <View style={[GlobalStyleSheet.container,{alignItems:'center',justifyContent:'center',flex:1}]}>
                    <Image
                        style={{
                            width:'100%',
                            resizeMode:'contain',
                        }}
                        source={IMAGES.logo}
                    />
            <Text
  style={{
    ...FONTS.fontMedium,
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    position: 'absolute',
    bottom: 10,
  }}
>
  Turn sunlight into progress with{' '}
  <Text style={{ ...FONTS.fontBold, color: 'rgba(255,255,255,1)' }}>Slnko</Text>
</Text>


                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Splash;