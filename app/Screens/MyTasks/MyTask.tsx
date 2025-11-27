// Screens/MyTasks/MyTask.tsx
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Card from "../../components/Cards/Card";
import Icon from "react-native-vector-icons/Feather";
import { COLORS } from "../../constants/theme";
import Header from "../../layout/Header";

const items = [
  { id: "today", title: "Today", count: 0, iconName: "calendar", iconBg: "#6C5CE7" },
  { id: "overdue", title: "Overdue", count: 0, iconName: "bell", iconBg: "#FF4B5C" },
  { id: "priorities", title: "My Priorities", count: 0, iconName: "flag", iconBg: "#FF8A3C" },
  { id: "upcoming", title: "Upcoming", count: 1, iconName: "clock", iconBg: "#F6C744" },
  { id: "myTasks", title: "My Tasks", count: 1, iconName: "check-circle", iconBg: "#2F9BFF" },
  { id: "reminders", title: "Reminders", count: 0, iconName: "bell", iconBg: "#00B894" },
  { id: "comments", title: "Comments", count: 0, iconName: "message-square", iconBg: "#24A36B" },
];

const myLists = [
  { id: "personal", name: "Personal list", count: 1, initials: "SS", isPrivate: true },
];

const MyTask = () => {
  return (
    <View style={styles.container}>
      {/* ✅ Simple Header call */}
      <Header title="My Tasks" rightIcon2="search" />

      {/* Stats cards */}
      <View style={styles.grid}>
        {items.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            count={item.count}
            icon={<Icon name={item.iconName} size={18} color="#fff" />}
            iconBgColor={item.iconBg}
            style={styles.cardSpacing}
          />
        ))}
      </View>

      {/* Divider */}
      <View style={styles.listDivider} />

      {/* My Lists */}
      <View style={styles.listHeaderRow}>
        <Text style={styles.listHeaderText}>My Lists</Text>
        <Icon name="plus" size={18} color={COLORS.primary} />
      </View>

      {myLists.map((list) => (
        <View key={list.id} style={styles.listRow}>
          <View style={styles.listLeft}>
            <View style={styles.listAvatar}>
              <Text style={styles.listAvatarInitials}>{list.initials}</Text>
            </View>
            <Text style={styles.listName}>{list.name}</Text>
            {list.isPrivate && (
              <Icon name="lock" size={12} color={COLORS.textMuted} style={{ marginLeft: 4 }} />
            )}
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
    width: "48%",
    marginBottom: 12,
  },
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
