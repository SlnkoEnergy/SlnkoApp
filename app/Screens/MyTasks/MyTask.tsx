// Screens/MyTasks/MyTask.tsx
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Card from "../../components/Cards/Card";
import Icon from "react-native-vector-icons/Feather";
import { COLORS } from "../../constants/theme";

type MyTaskProps = {};

type StatItem = {
    id: string;
    title: string;
    count: number;
    iconName: string;
    iconBg: string;
    countColor?: string;
    titleColor?: string;
};

type MyListItem = {
    id: string;
    name: string;
    count: number;
    initials: string;
    isPrivate?: boolean;
};

const items: StatItem[] = [
    {
        id: "today",
        title: "Today",
        count: 0,
        iconName: "calendar",
        iconBg: "#6C5CE7",
    },
    {
        id: "overdue",
        title: "Overdue",
        count: 0,
        iconName: "bell",
        iconBg: "#FF4B5C",
        countColor: "#FF4B5C",
        titleColor: "#FF4B5C",
    },
    {
        id: "priorities",
        title: "My Priorities",
        count: 0,
        iconName: "flag",
        iconBg: "#FF8A3C",
    },
    {
        id: "upcoming",
        title: "Upcoming",
        count: 1,
        iconName: "clock",
        iconBg: "#F6C744",
    },
    {
        id: "myTasks",
        title: "My Tasks",
        count: 1,
        iconName: "check-circle",
        iconBg: "#2F9BFF",
    },
    {
        id: "reminders",
        title: "Reminders",
        count: 0,
        iconName: "bell",
        iconBg: "#00B894",
    },
    {
        id: "comments",
        title: "Comments",
        count: 0,
        iconName: "message-square",
        iconBg: "#24A36B",
    },
];

const myLists: MyListItem[] = [
    {
        id: "personal",
        name: "Personal list",
        count: 1,
        initials: "SS",
        isPrivate: true,
    },
    // add more lists here if needed
];

const MyTask: React.FC<MyTaskProps> = () => {
    return (
        <View style={styles.container}>
            {/* Stats cards */}
            <View style={styles.grid}>
                {items.map((item) => (
                    <Card
                        key={item.id}
                        title={item.title}
                        count={item.count}
                        icon={<Icon name={item.iconName} size={18} color="#fff" />}
                        iconBgColor={item.iconBg}
                        countColor={item.countColor}
                        titleColor={item.titleColor}
                        style={styles.cardSpacing}
                    />
                ))}
            </View>

            {/* Divider */}
            <View style={styles.listDivider} />

            {/* My Lists header */}
            <View style={styles.listHeaderRow}>
                <Text style={styles.listHeaderText}>My Lists</Text>
                <Icon name="plus" size={18} color={COLORS.primary} />
            </View>

            {/* Lists */}
            {myLists.map((list) => (
                <View key={list.id} style={styles.listRow}>
                    <View style={styles.listLeft}>
                        <View style={styles.listAvatar}>
                            <Text style={styles.listAvatarInitials}>{list.initials}</Text>
                        </View>

                        <View style={styles.listTextWrap}>
                            <View style={styles.listNameRow}>
                                <Text style={styles.listName}>{list.name}</Text>
                                {list.isPrivate && (
                                    <Icon
                                        name="lock"
                                        size={12}
                                        color={COLORS.textMuted}
                                        style={{ marginLeft: 4 }}
                                    />
                                )}
                            </View>
                        </View>
                    </View>

                    <Text style={styles.listCount}>{list.count}</Text>
                </View>
            ))}
        </View>
    );
};

export default MyTask;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: COLORS.background,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    cardSpacing: {
        width: "48%", // 2 cards per row
        marginBottom: 12,
    },

    /* My Lists section */
    listDivider: {
        height: 1,
        backgroundColor: COLORS.borderColor,
        marginTop: 8,
        marginBottom: 12,
    },
    listHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    listHeaderText: {
        fontSize: 13,
        fontWeight: "600",
        color: COLORS.textMuted,
    },
    listRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    listLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    listAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primaryLight,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    listAvatarInitials: {
        color: COLORS.primary,
        fontWeight: "700",
        fontSize: 12,
    },
    listTextWrap: {
        flex: 1,
    },
    listNameRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    listName: {
        fontSize: 14,
        color: COLORS.textPrimary,
        fontWeight: "500",
    },
    listCount: {
        fontSize: 13,
        color: COLORS.textSecondary,
        fontWeight: "500",
    },
});
