import { View, Text, ScrollView, StyleSheet, TextInput, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import FeatherIcon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from 'react-native';
import { Animated } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import RBSheet from 'react-native-raw-bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../../components/Button/Button';

const filterOptions = [
    { id: '0', label: 'All' },
    { id: '1', label: 'Last Week' },
    { id: '2', label: 'This Week' },
    { id: '3', label: 'Today' },
    { id: '4', label: 'This Month' },
    { id: '5', label: 'Last Month' },
];


type NotificationScreenProps = StackScreenProps<RootStackParamList, 'Notification'>;

const Notification = ({ navigation }: NotificationScreenProps) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const [showSearch, setShowSearch] = useState(false);
    const translateX = useRef(new Animated.Value(-300)).current;

    const animationRef = useRef<Animated.CompositeAnimation | null>(null);

    const openSearchBar = () => {
        setShowSearch(true);

        animationRef.current?.stop();

        const anim = Animated.timing(translateX, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        })

        animationRef.current = anim;
        anim.start();
    };

    const closeSearchBar = () => {

        animationRef.current?.stop();

        const anim = Animated.timing(translateX, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        })

        animationRef.current = anim;

        anim.start(({ finished }) => {
            if (finished) {
                setShowSearch(false);
                translateX.setValue(-300);
            }
        });
    };

    useEffect(() => {
        return () => {
            animationRef.current?.stop();
        };
    }, []);


    const refRBSheet = useRef<any>(null);

    const [selectedId, setSelectedId] = useState('0');

    const [showPicker, setShowPicker] = useState(false);
    const [currentField, setCurrentField] = useState<'start' | 'end' | null>(null);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const onChange = (event: any, selectedDate: Date | undefined) => {
        setShowPicker(false);
        if (selectedDate && currentField) {
            const formatted = selectedDate.toLocaleDateString();
            if (currentField === 'start') setStartDate(formatted);
            else setEndDate(formatted);
        }
    };

    const openPicker = (field: 'start' | 'end') => {
        setCurrentField(field);
        setShowPicker(true);
    };

    const DateInput = ({ label, value, onPress }: any) => (
        <View style={{ flex: 1, marginBottom: 15 }}>
            <Text style={[styles.label, { ...FONTS.fontMedium, fontSize: 14, color: colors.text, }]}>{label}</Text>
            <TouchableOpacity onPress={onPress} style={[styles.dateBox, { backgroundColor: colors.card }]}>
                <Text style={[{ ...FONTS.fontMedium, fontSize: 14, color: colors.text, }]}>{value ? value : 'dd-mm-yyyy'}</Text>
                <FeatherIcon name="calendar" size={16} color={COLORS.primary} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title={"Notification"}
                leftIcon={'back'}
                titleLeft
            />
            <View style={{ flex: 1, backgroundColor: colors.card, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <View
                    style={[GlobalStyleSheet.container, { paddingHorizontal: 20, paddingTop: 10 }]}
                >
                    <View
                        style={[GlobalStyleSheet.flexcenter, {
                            borderBottomWidth: 1,
                            borderColor: colors.border,
                            marginHorizontal: -20,
                            paddingHorizontal: 15,
                            paddingBottom: 5
                        }]}
                    >
                        <TouchableOpacity
                            onPress={() => refRBSheet.current.open()}
                            activeOpacity={0.5}
                            style={[styles.Button]}
                        >
                            <FeatherIcon name='filter' size={16} color={colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={[styles.Button]}
                            onPress={openSearchBar}
                        >
                            <FeatherIcon name='search' size={16} color={colors.text} />
                        </TouchableOpacity>
                        {showSearch && (
                            <Animated.View style={[{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: colors.background,
                                borderWidth: 1,
                                borderColor: colors.border,
                                borderRadius: 8,
                                paddingHorizontal: 10,
                                height: 40,
                                width: '85%',
                                position: 'absolute',
                                right: 20,
                                transform: [{ translateX }]
                            }]}>
                                <TextInput
                                    placeholder="Search..."
                                    style={[FONTS.font, FONTS.fontMedium, {
                                        color: colors.title,
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
                <RBSheet
                    ref={refRBSheet}
                    height={520}
                    openDuration={250}
                    customStyles={{
                        container: {
                            backgroundColor: colors.background,
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
                    <View
                        style={[GlobalStyleSheet.container, { padding: 20 }]}
                    >
                        <Text style={[FONTS.fontMedium, { fontSize: 18, color: colors.title }]}>Data Filter</Text>
                    </View>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={[GlobalStyleSheet.container, { padding: 20, paddingTop: 0, flex: 1 }]}>
                            <View style={{ marginBottom: 0 }}>
                                <View style={[styles.row, { gap: 12 }]}>
                                    <DateInput label="Start Date" value={startDate} onPress={() => openPicker('start')} />
                                    <DateInput label="End Date" value={endDate} onPress={() => openPicker('end')} />
                                </View>

                                {showPicker && (
                                    <DateTimePicker
                                        value={new Date()}
                                        mode="date"
                                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                        onChange={onChange}
                                    />
                                )}
                            </View>
                            <View>
                                {filterOptions.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => setSelectedId(item.id)}
                                            activeOpacity={0.5}
                                            key={index}
                                            style={[GlobalStyleSheet.flexcenter, {
                                                height: 50,
                                                paddingHorizontal: 20,
                                                borderRadius: 8,
                                                borderWidth: 1,
                                                borderColor: '#EFEFEF',
                                                backgroundColor: colors.card,
                                                marginBottom: 10
                                            }]}
                                        >
                                            <Text style={[FONTS.font, FONTS.fontMedium, { color: colors.title }]}>{item.label}</Text>
                                            <View
                                                style={{
                                                    height: 20,
                                                    width: 20,
                                                    borderRadius: 25,
                                                    borderWidth: 1,
                                                    borderColor: item.id === selectedId ? COLORS.primary : colors.border,
                                                    backgroundColor: colors.background,
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                {item.id === selectedId &&
                                                    <View
                                                        style={{
                                                            height: 13,
                                                            width: 13,
                                                            borderRadius: 25,
                                                            backgroundColor: COLORS.primary
                                                        }}
                                                    />
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>
                    </ScrollView>
                    <View
                        style={[GlobalStyleSheet.container, { paddingHorizontal: 20 }]}
                    >
                        <Button
                            title='Apply'
                            onPress={() => refRBSheet.current.close()}
                        />
                    </View>
                </RBSheet>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <View
                        style={[GlobalStyleSheet.container, { paddingHorizontal: 20, paddingTop: 10, flex: 1, justifyContent: 'center' }]}
                    >
                        <Text style={[FONTS.font, FONTS.fontMedium, { color: colors.text, textAlign: 'center' }]}>No Notification Available</Text>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Button: {
        height: 40,
        width: 40,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        marginBottom: 10,
    },
    dateBox: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderWidth: 1.5,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        backgroundColor: COLORS.card
    },
});

export default Notification