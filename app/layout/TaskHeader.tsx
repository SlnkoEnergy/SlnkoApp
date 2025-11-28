// TaskHeader.tsx
import React, { useState } from "react";
import {
    Text,
    TouchableOpacity,
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProfilePlaceholder from "../components/profilePlaceholder";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../constants/theme";
import { useAuthUser } from "../utils/userHooks/getUser";
import { BellIcon } from "lucide-react-native";

const { width } = Dimensions.get("window");

type StatusOption = {
    key: string;
    label: string;
};

interface TaskHeaderProps {
    onMenuPress?: () => void;
    onHomePress?: () => void;
    title?: string;
    statusFilterOptions?: StatusOption[];
    onStatusFilterChange?: (key: string) => void;
    isBack?: boolean;
}

const DEFAULT_STATUS_OPTIONS: StatusOption[] = [
    { key: "all", label: "All" },
    { key: "today", label: "Today" },
    { key: "overdue", label: "Overdue" },
    { key: "upcoming", label: "Upcoming" },
    { key: "completed", label: "Completed" },
];

const TaskHeader: React.FC<TaskHeaderProps> = ({
    title = "My Task",
    statusFilterOptions,
    onStatusFilterChange,
    isBack = false,
}) => {
    const user = useAuthUser();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const navigation = useNavigation<any>();

    const displayName =
        (user?.name && String(user.name).trim()) ||
        (user?.emp_id && String(user.emp_id).trim()) ||
        "User";

    const options =
        Array.isArray(statusFilterOptions) && statusFilterOptions.length > 0
            ? statusFilterOptions
            : DEFAULT_STATUS_OPTIONS;

    const handleStatusPress = (key: string) => {
        setStatusFilter(key);
        onStatusFilterChange?.(key);
    };

    return (
        <View style={styles.headerWrapper}>
            {/* TOP HEADER (flat, not card) */}
            <View style={styles.header}>
                <View style={styles.headerMain}>
                    <View style={styles.leftContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                if (isBack) {
                                    navigation.goBack();
                                } else {
                                    navigation.openDrawer();
                                }
                            }}
                            activeOpacity={0.8}
                        >
                            {isBack ? (
                                <Icon
                                    name="chevron-left"
                                    size={30}
                                    color={COLORS.COLORS.textPrimary}
                                />
                            ) : (
                                <ProfilePlaceholder size={40} name={displayName} />
                            )}
                        </TouchableOpacity>

                        <View>
                            <Text style={styles.headerTitle}>{title}</Text>
                        </View>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Notification")}
                            activeOpacity={0.8}
                        >
                            <View style={styles.bellBadgeWrapper}>
                                <BellIcon
                                    size={20}
                                    color={COLORS.COLORS.primary}
                                    strokeWidth={1.8}
                                />
                                <View style={styles.badgeDot} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* SEARCH + FILTER */}
                {!isBack && (
                    <View style={styles.SubHeader}>
                        <View style={styles.searchBar}>
                            <Icon
                                name="search"
                                size={18}
                                color={COLORS.COLORS.textMuted}
                                style={styles.searchIconLeft}
                            />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search tasks, projects…"
                                placeholderTextColor={COLORS.COLORS.textMuted}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                returnKeyType="search"
                                accessibilityLabel="Search"
                            />
                        </View>

                        <TouchableOpacity activeOpacity={0.85} style={styles.filterBox}>
                            <Icon name="tune" size={22} color={COLORS.COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* STATUS FILTER CHIPS */}
            <View style={styles.filtersContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterRow}
                >
                    {options.map((opt) => {
                        const selected = statusFilter === opt.key;
                        return (
                            <TouchableOpacity
                                key={opt.key}
                                style={[
                                    styles.filterChip,
                                    selected && styles.filterChipSelected,
                                ]}
                                onPress={() => handleStatusPress(opt.key)}
                                activeOpacity={0.85}
                            >
                                <Text
                                    style={[
                                        styles.filterChipText,
                                        selected && styles.filterChipTextSelected,
                                    ]}
                                >
                                    {opt.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        </View >
    );
};

export default TaskHeader;

const styles = StyleSheet.create({
    headerWrapper: {
        backgroundColor: COLORS.COLORS.background,
    },

    header: {
        backgroundColor: COLORS.COLORS.white,
        paddingBottom: 16,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },

    headerMain: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingBottom: 16,
    },

    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flex: 1,
    },

    headerTitle: {
        color: COLORS.COLORS.primary,
        fontSize: 20,
        fontWeight: "700",
    },

    headerSubtitle: {
        marginTop: 2,
        fontSize: 12,
        color: COLORS.COLORS.textSecondary,
    },

    headerRight: {
        flexDirection: "row",
        alignItems: "center",
    },

    bellBadgeWrapper: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "rgba(15, 23, 42, 0.10)",
        backgroundColor: "rgba(15, 23, 42, 0.02)",
        justifyContent: "center",
        alignItems: "center",
    },

    badgeDot: {
        position: "absolute",
        top: 6,
        right: 6,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#F97316",
    },

    SubHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
    },

    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingHorizontal: 12,
        height: 42,
        flex: 1,
        borderWidth: 1,
        borderColor: "rgba(15, 23, 42, 0.08)",
    },

    searchIconLeft: {
        marginRight: 6,
    },

    searchInput: {
        flex: 1,
        fontSize: 14,
        color: COLORS.COLORS.textPrimary,
        paddingVertical: 0,
    },

    filterBox: {
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(15, 23, 42, 0.08)",
    },

    filtersContainer: {
        marginTop: 6,
        paddingHorizontal: 16,
    },

    filterRow: {
        paddingVertical: 10,
    },

    filterChip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "transparent",
        marginRight: 8,
        backgroundColor: "#F3F4F6",
    },

    filterChipSelected: {
        backgroundColor: COLORS.COLORS.primaryLight || "#D1E3FF",
        borderColor: COLORS.COLORS.primary,
    },

    filterChipText: {
        fontSize: 12,
        color: COLORS.COLORS.textSecondary,
    },

    filterChipTextSelected: {
        color: COLORS.COLORS.primary,
        fontWeight: "600",
    },
});
