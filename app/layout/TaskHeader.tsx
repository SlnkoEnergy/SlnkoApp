// CustomHeader.tsx
import React, { useState } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProfilePlaceholder from "../components/profilePlaceholder";
import Icon from "react-native-vector-icons/MaterialIcons";
// import { useAuthUser } from "../../hooks/Auth";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import COLORS from "../constants/theme"
import { useAuthUser } from "../utils/userHooks/getUser";


interface TaskHeaderProps {
    onMenuPress?: () => void;
    onHomePress?: () => void;
    title?: string;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({title}) => {
    const user = useAuthUser();
    const [searchQuery, setSearchQuery] = useState("");

    const displayName =
        (user?.name && String(user.name).trim()) ||
        (user?.emp_id && String(user.emp_id).trim());

    return (
        <View style={styles.header}>
            <View style={styles.headerMain}>
                <View style={styles.leftContainer}>
                    <ProfilePlaceholder size={40} name="" />
                    <Text style={styles.headerTitle}>{title}</Text>
                </View>

                <View>
                    <ProfilePlaceholder size={40} name={displayName} />
                </View>
            </View>

            <View style={styles.SubHeader}>
                <View style={styles.searchBar}>
                    <Icon
                        name="search"
                        size={20}
                        color="#6e6e6e"
                        style={styles.searchIconLeft}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor="#8a8a8a"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        returnKeyType="search"
                        accessibilityLabel="Search"
                    />
                </View>
                <View style={styles.filterBox}>
                    <Icon name="tune" size={24} color="#6e6e6e" />
                </View>
            </View>
        </View>
    );
};

export default TaskHeader;



export const styles = StyleSheet.create({

    blueSection: {
        backgroundColor: COLORS.COLORS.primary,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 32,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },

    appIconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.COLORS.primarySoft,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },

    appIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.COLORS.textOnPrimary,
    },

    appTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },

    appTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.COLORS.textOnPrimary,
    },

    header: {
        backgroundColor: COLORS.COLORS.surfaceAlt,
        paddingTop: 25,
        paddingBottom: 15,
        paddingHorizontal: 7,
        flexDirection: "column",
        alignItems: "center",
        // borderBottomLeftRadius: 15,
        // borderBottomRightRadius: 15,
        // height: "25%"
        // borderBottomLeftRadius: 12,
        // borderBottomRightRadius: 12,
    },

    SubHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        gap: 20
    },

    searchPlaceholder: {
        flex: 1,
        color: COLORS.COLORS.textMuted,
        fontSize: 14,
    },

    searchIcon: {
        fontSize: 18,
        color: COLORS.COLORS.primaryLight,
    },

    filterBox: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },


    headerMain: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingBottom: 20,
    },

    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10, // spacing between avatar and name
    },

    headerTitle: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
    },
    headerRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    profileCircle: {
        backgroundColor: "#fff",
        borderRadius: 20,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    profileInitial: {
        color: "#003366",
        fontWeight: "bold",
    },
    logoContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    logo: {
        width: 120,
        height: 50,
    },
    subtitle: {
        marginTop: 6,
        fontSize: 14,
        color: "#333",
        fontWeight: "600",
    },
    grid: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    card: {
        width: (width - 60) / 2,
        aspectRatio: 1,
        backgroundColor: "#f0f4f7",
        borderRadius: 12,
        padding: 10,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
    },
    cardText: {
        marginTop: 10,
        fontSize: 14,
        color: "#003366",
        textAlign: "center",
        fontWeight: "500",
    },
    footer: {
        alignItems: "center",
        marginTop: "auto",
        paddingBottom: 10,
    },
    footerText: {
        fontSize: 12,
        color: "#888",
    },
    footerLogo: {
        width: 80,
        height: 30,
        marginTop: 4,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        paddingHorizontal: 12,
        height: 42,
        flex: 1,
        // optional subtle border/shadow:
        borderWidth: 1,
        borderColor: "#E6E6E6",
    },

    searchIconLeft: {
        marginRight: 8,
    },

    searchInput: {
        flex: 1,
        fontSize: 14,
        color: "#1A1A1A",
        paddingVertical: 0, // keeps height tight on Android/iOS
    },

});

