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
import { BellIcon, SearchIcon, XIcon } from "lucide-react-native";

type StatusOption = { key: string; label: string };

interface TaskHeaderProps {
    onMenuPress?: () => void;
    title?: string;
    statusFilterOptions?: StatusOption[];
    onStatusFilterChange?: (key: string) => void;
    isBack?: boolean;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({
    title = "My Task",
    statusFilterOptions,
    onStatusFilterChange,
    isBack = false,
    searchValue = "search...",
    onSearchChange,
}) => {
    const navigation = useNavigation<any>();
    const user = useAuthUser();

    const [searchQuery, setSearchQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const displayName =
        (user?.name && String(user.name).trim()) ||
        (user?.emp_id && String(user.emp_id).trim()) ||
        "User";

    const attachmentUrl: string | undefined =
        (user?.attachment_url && String(user.attachment_url).trim()) ||
        (user as any)?.attachment_url ||
        undefined;

    console.log(attachmentUrl);
    const handleStatusPress = (key: string) => {
        setStatusFilter(key);
        onStatusFilterChange?.(key);
    };

    // ✅ safe handler for menu/back
    const handleMenuPress = () => {
        if (isBack) {
            navigation.goBack();
            return;
        }

        if (typeof onMenuPress === "function") {
            onMenuPress();
            return;
        }

        // only try to open drawer if parent has it
        const parentNav = navigation.getParent?.();
        if (parentNav && typeof parentNav.openDrawer === "function") {
            parentNav.openDrawer();
        }
    };

    return (
        <View
            style={{
                paddingTop: 10,
                paddingHorizontal: 16,
                paddingBottom: 12,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
            }}
        >
            {/* HEADER ROW */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                }}
            >
                {/* LEFT SIDE ALWAYS VISIBLE */}
                <TouchableOpacity onPress={handleMenuPress}>
                    {isBack ? (
                        <Icon
                            name="chevron-left"
                            size={28}
                            color={COLORS.COLORS.textPrimary}
                        />
                    ) : (
                        <ProfilePlaceholder size={40} name="" attachmentUrl={attachmentUrl} />
                    )}
                </TouchableOpacity>

                {/* CENTER + RIGHT SIDE */}
                {!searchOpen ? (
                    // ************* NORMAL HEADER *************
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flex: 1,
                        }}
                    >
                        {/* Title */}
                        <Text
                            style={{
                                color: COLORS.COLORS.primary,
                                fontSize: 20,
                                fontWeight: "700",
                            }}
                            numberOfLines={1}
                        >
                            {title}
                        </Text>

                        {/* Icons */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 15,
                            }}
                        >
                            <TouchableOpacity onPress={() => setSearchOpen(true)}>
                                <SearchIcon size={20} opacity={0.9} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("Notification")}
                                style={{ position: "relative" }}
                            >
                                <BellIcon
                                    size={22}
                                    color={COLORS.COLORS.primary}
                                    strokeWidth={1.7}
                                />
                                <View
                                    style={{
                                        position: "absolute",
                                        right: 1,
                                        width: 8,
                                        height: 8,
                                        borderRadius: 4,
                                        backgroundColor: "#F97316",
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    // ************* SEARCH BAR *************
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "#FFFFFF",
                            borderRadius: 18,
                            paddingHorizontal: 14,
                            height: 45,
                            flex: 1,
                            borderWidth: 1,
                            borderColor: "rgba(15, 23, 42, 0.12)",
                            marginLeft: 10,
                        }}
                    >
                        <Icon
                            name="search"
                            size={20}
                            color={COLORS.COLORS.textMuted}
                            style={{ marginRight: 8 }}
                        />

                        <TextInput
                            style={{
                                flex: 1,
                                fontSize: 15,
                                color: COLORS.COLORS.textPrimary,
                            }}
                            placeholder={searchValue}
                            placeholderTextColor={COLORS.COLORS.textMuted}
                            value={searchQuery}
                            onChangeText={(text) => {
                                setSearchQuery(text);
                                onSearchChange?.(text);
                            }}
                            autoFocus
                        />

                        {/* Close Search */}
                        <TouchableOpacity
                            onPress={() => {
                                setSearchOpen(false);
                                setSearchQuery("");
                                onSearchChange?.("");
                            }}
                        >
                            <XIcon size={20} color={COLORS.COLORS.textPrimary} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* If you still want status chips, you can add them here using statusFilterOptions */}
            {/* <ScrollView ...> ... </ScrollView> */}

            {/* STATUS FILTER CHIPS */}
            {statusFilterOptions && statusFilterOptions.length > 0 && (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingVertical: 10,
                    }}
                    style={{ marginTop: 4 }}
                >
                    {statusFilterOptions.map((opt) => {
                        const selected = statusFilter === opt.key;
                        return (
                            <TouchableOpacity
                                key={opt.key}
                                onPress={() => handleStatusPress(opt.key)}
                                activeOpacity={0.85}
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
                                        backgroundColor: COLORS.COLORS.primaryLight || "#D1E3FF",
                                        borderColor: COLORS.COLORS.primary,
                                    },
                                ]}
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
            )}

        </View>
    );
};

export default TaskHeader;
