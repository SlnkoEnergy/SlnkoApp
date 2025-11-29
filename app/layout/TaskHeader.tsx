// TaskHeader.tsx
import React, { useState } from "react";
import {
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProfilePlaceholder from "../components/profilePlaceholder";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../constants/theme";
import { useAuthUser } from "../utils/userHooks/getUser";
import { BellIcon } from "lucide-react-native";

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
        <View
            style={{
                backgroundColor: COLORS.COLORS.background,
            }}
        >
            {/* TOP HEADER (flat, not card) */}
            <View
                style={{
                    backgroundColor: COLORS.COLORS.white,
                    paddingBottom: 16,
                    paddingHorizontal: 16,
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        paddingBottom: 16,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            flex: 1,
                        }}
                    >
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

                        <View
                           
                        >
                            <Text
                                style={{
                                    color: COLORS.COLORS.primary,
                                    fontSize: 20,
                                    fontWeight: "700",
                                }}
                            >
                                {title}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Notification")}
                            activeOpacity={0.8}
                        >
                            <View
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 18,
                                    borderWidth: 1,
                                    borderColor: "rgba(15, 23, 42, 0.10)",
                                    backgroundColor: "rgba(15, 23, 42, 0.02)",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <BellIcon
                                    size={20}
                                    color={COLORS.COLORS.primary}
                                    strokeWidth={1.8}
                                />
                                <View
                                    style={{
                                        position: "absolute",
                                        top: 6,
                                        right: 6,
                                        width: 8,
                                        height: 8,
                                        borderRadius: 4,
                                        backgroundColor: "#F97316",
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* SEARCH + FILTER – only on main screen */}
                {!isBack && (
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                backgroundColor: "#FFFFFF",
                                borderRadius: 16,
                                paddingHorizontal: 12,
                                height: 42,
                                flex: 1,
                                borderWidth: 1,
                                borderColor: "rgba(15, 23, 42, 0.08)",
                            }}
                        >
                            <Icon
                                name="search"
                                size={18}
                                color={COLORS.COLORS.textMuted}
                                style={{ marginRight: 6 }}
                            />
                            <TextInput
                                style={{
                                    flex: 1,
                                    fontSize: 14,
                                    color: COLORS.COLORS.textPrimary,
                                    paddingVertical: 0,
                                }}
                                placeholder="Search tasks, projects…"
                                placeholderTextColor={COLORS.COLORS.textMuted}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                returnKeyType="search"
                                accessibilityLabel="Search"
                            />
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={{
                                backgroundColor: "#FFFFFF",
                                padding: 10,
                                borderRadius: 16,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: "rgba(15, 23, 42, 0.08)",
                            }}
                        >
                            <Icon name="tune" size={22} color={COLORS.COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* STATUS FILTER CHIPS */}
            <View
                style={{
                    marginTop: 6,
                    paddingHorizontal: 16,
                }}
            >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingVertical: 10,
                    }}
                >
                    {options.map((opt) => {
                        const selected = statusFilter === opt.key;
                        return (
                            <TouchableOpacity
                                key={opt.key}
                                style={[
                                    {
                                        paddingHorizontal: 12,
                                        paddingVertical: 6,
                                        borderRadius: 999,
                                        borderWidth: 1,
                                        borderColor: "transparent",
                                        marginRight: 8,
                                        backgroundColor: "#F3F4F6",
                                    },
                                    selected && {
                                        backgroundColor:
                                            COLORS.COLORS.primaryLight || "#D1E3FF",
                                        borderColor: COLORS.COLORS.primary,
                                    },
                                ]}
                                onPress={() => handleStatusPress(opt.key)}
                                activeOpacity={0.85}
                            >
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: selected
                                            ? COLORS.COLORS.primary
                                            : COLORS.COLORS.textSecondary,
                                        fontWeight: selected ? "600" : "400",
                                    }}
                                >
                                    {opt.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    );
};

export default TaskHeader;
