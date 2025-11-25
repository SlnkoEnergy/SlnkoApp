import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import Header from '../../layout/Header';
import { ScrollView } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Button from '../../components/Button/Button';
import { COLORS } from '../../constants/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { IMAGES } from '../../constants/Images';
import Carousel from 'react-native-reanimated-carousel';

const images = [
  IMAGES.BusinessCards,
  IMAGES.BusinessCards1,
  IMAGES.BusinessCards2
];

type BusinessCardsScreenProps = StackScreenProps<RootStackParamList, 'BusinessCards'>;

const BusinessCards = ({ navigation } : BusinessCardsScreenProps) => {

    const { width } = Dimensions.get('window');

    const ITEM_WIDTH = width * 1;
    const SPACING = width * 0.26; // to see 10% of the next & previous items

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title={'Business Cards'}
                leftIcon={'back'}
                titleLeft
            />
            <View style={{flex:1,backgroundColor:'rgba(38,72,231,0.10)',borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow:1}}
                >
                    <View
                        style={[{alignItems:'center',justifyContent:'center',flex:1}]}
                    >
                        <Carousel
                            width={ITEM_WIDTH}
                            height={ITEM_WIDTH * 1.2}
                            data={images}
                            loop
                            style={{ flexGrow: 0 }}
                            mode="parallax"
                            modeConfig={{
                                parallaxScrollingScale: 0.9,
                                parallaxScrollingOffset: SPACING / 2,
                            }}
                            pagingEnabled
                            renderItem={({ item }) => (
                                <View style={styles.itemContainer}>
                                    <Image source={item} style={styles.image} resizeMode="cover" />
                                </View>
                            )}
                        />
                        
                    </View>
                </ScrollView>
                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 20,paddingBottom:20 }]}>
                    <Button
                        title={"Share"}
                        color={theme.dark ? COLORS.white :COLORS.primary}
                        text={colors.card}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderRadius: 7,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default BusinessCards