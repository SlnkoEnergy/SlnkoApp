import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    StyleSheet,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

import { COLORS, FONTS } from "../constants/theme";
import { IMAGES } from "../constants/Images"; // <== keep if you still use elsewhere, otherwise can remove
import { GlobalStyleSheet } from "../constants/StyleSheet";

import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

const companyList = [
    {
        id: 0,
        name: "W3itexperts",
        role: "Super Admin",
        owner: "Kuldeep",
        initial: "W",
        initialColor: "#FFFFFF",
        roleColor: "#2648E7",
        roleTextColor: "#2648E7",
        bgColor: "#E8ECFF",
        borderColor: "#2648E7",
    },
    {
        id: 1,
        name: "DexignZone",
        role: "Client",
        owner: "Kuldeep",
        initial: "D",
        initialColor: "#6E2820",
        roleColor: "#FADBD7",
        roleTextColor: "#D23131",
        bgColor: "rgba(250,219,215,0.20)",
        borderColor: "transparent",
    },
];

type Props = {
    state: any;
    navigation: any;
    descriptors: any;
    openCompanySheet?: () => void; // still optional if you want to use from parent
};

const BottomTab: React.FC<Props> = ({ state, descriptors, navigation }) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;
    const insets = useSafeAreaInsets();

    const [selectedCompany, setSelectedCompany] = useState(0);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["40%"], []);

    // Close sheet on tab change
    useEffect(() => {
        if (bottomSheetRef?.current) {
            bottomSheetRef.current.close();
        }
    }, [state.index]);

    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );

    const handleTabPress = (route: any, index: number, label: string, isFocused: boolean) => {
        // if (label === "Company") {
        //     bottomSheetRef.current?.snapToIndex(0); // open company sheet
        //     return;
        // }

        // if (label === "Messages") {
        //     navigation.navigate("Messages");
        //     return;
        // }

        const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
        }
    };

    const getIconName = (label: string) => {
        switch (label) {
            case "Estimates":
                return "document-text-outline";
            case "Project":
                return "briefcase-outline";
            case "Contacts":
                return "people-outline";
            case "Messages":
                return "mail-outline";
            case "Home":
                return "home-outline";
            case "My Task":
                return "person-outline"
            default:
                return "home-outline";
        }
    };

    return (
        <>
            {/* ---------- Company Bottom Sheet ---------- */}
            {/* <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                onChange={handleSheetChanges}
                backgroundStyle={{
                    backgroundColor: colors.background,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}
                handleIndicatorStyle={{
                    backgroundColor: colors.background,
                    width: 100,
                    height: 4,
                }}
            >
                <BottomSheetScrollView
                    contentContainerStyle={{
                        paddingBottom: 200,
                    }}
                >
                    <View
                        style={[
                            GlobalStyleSheet.container,
                            { flex: 1, paddingTop: 0, padding: 20 },
                        ]}
                    >
                        <Text
                            style={[
                                FONTS.fontRegular,
                                {
                                    fontSize: 18,
                                    color: colors.title,
                                    marginBottom: 10,
                                },
                            ]}
                        >
                            Select Company
                        </Text>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ flexGrow: 1 }}
                        >
                            <View style={{ flex: 1 }}>
                                <View style={[GlobalStyleSheet.row, { paddingTop: 10 }]}>
                                    {companyList.map((data: any, index: number) => {
                                        const isSelected = selectedCompany === data.id;
                                        return (
                                            <View
                                                key={index}
                                                style={[GlobalStyleSheet.col50, { marginBottom: 10 }]}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => setSelectedCompany(data.id)}
                                                    style={[
                                                        {
                                                            padding: 20,
                                                            backgroundColor: colors.card,
                                                            borderRadius: 8,
                                                            borderWidth: 1,
                                                            borderColor: "transparent",
                                                        },
                                                        isSelected && {
                                                            backgroundColor: data.bgColor,
                                                            borderColor: data.roleColor,
                                                        },
                                                    ]}
                                                >
                                                    <View style={{ alignItems: "center" }}>
                                                        <View
                                                            style={{
                                                                height: 50,
                                                                width: 50,
                                                                borderRadius: 20,
                                                                backgroundColor: data.roleColor,
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    ...FONTS.fontBold,
                                                                    fontSize: 22,
                                                                    color: data.initialColor,
                                                                }}
                                                            >
                                                                {data.initial}
                                                            </Text>
                                                        </View>
                                                        <View style={{ marginTop: 11 }}>
                                                            <Text
                                                                style={[
                                                                    FONTS.fontLg,
                                                                    {
                                                                        fontSize: 18,
                                                                        color: colors.title,
                                                                        textAlign: "center",
                                                                    },
                                                                ]}
                                                            >
                                                                {data.name}
                                                            </Text>
                                                            <Text
                                                                style={[
                                                                    FONTS.fontXs,
                                                                    {
                                                                        color: data.roleTextColor,
                                                                        marginTop: 5,
                                                                        textAlign: "center",
                                                                    },
                                                                ]}
                                                            >
                                                                {data.role}
                                                            </Text>
                                                        </View>
                                                        <View style={{ marginTop: 10 }}>
                                                            <Text
                                                                style={[
                                                                    FONTS.fontSm,
                                                                    {
                                                                        color: colors.text,
                                                                        textAlign: "center",
                                                                    },
                                                                ]}
                                                            >
                                                                Owner: {data.owner}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </BottomSheetScrollView>
            </BottomSheet> */}

            {/* ---------- Floating Pill Bottom Tab ---------- */}
            <View
                style={[
                    styles.FloaterWrap,
                    { paddingBottom: Math.max(insets.bottom, 8) },
                ]}
                pointerEvents="box-none"
            >
                <View style={[styles.SubFooter, { backgroundColor: COLORS.primary }]}>
                    {state.routes.map((route: any, index: number) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        const isFocused = state.index === index;

                        // Center button for Company (like the plus in the example)
                        if (label === "Company") {
                            return (
                                <TouchableOpacity
                                    key={route.key}
                                    style={styles.centerIconWrapper}
                                    activeOpacity={0.9}
                                    onPress={() => handleTabPress(route, index, label, isFocused)}
                                >
                                    {/* You can change to 'business-outline' if you want a building icon */}
                                    <Ionicons name="add" size={30} color="#fff" />
                                </TouchableOpacity>
                            );
                        }

                        const iconName = getIconName(label);
                        const iconColor = isFocused ? "#fff" : "rgba(255,255,255,0.75)";
                        const textColor = isFocused ? "#fff" : "rgba(255,255,255,0.75)";

                        return (
                            <TouchableOpacity
                                key={route.key}
                                style={styles.iconWrapper}
                                activeOpacity={0.85}
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={() => handleTabPress(route, index, label, isFocused)}
                            >
                                <Ionicons name={iconName} size={24} color={iconColor} />
                                <Text
                                    style={[
                                        styles.iconLabel,
                                        FONTS.fontXs,
                                        { color: textColor },
                                    ]}
                                >
                                    {label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    FloaterWrap: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
    },
    SubFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 16,
        height: 80,
        marginHorizontal: 12,
        marginBottom: 12,
        borderRadius: 30,

        // floaty shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 12,
    },
    iconWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    centerIconWrapper: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: "rgba(255,255,255,0.18)",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -10,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
    },
    iconLabel: {
        color: "#fff",
        fontSize: 11,
        marginTop: 4,
    },
});

export default BottomTab;
