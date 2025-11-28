// Screens/MyTasks/MyTask.tsx
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Card from "../../components/Cards/Card";
import Icon from "react-native-vector-icons/Feather";
import { COLORS } from "../../constants/theme";   // keep whatever you use here
import TaskHeader from "../../layout/TaskHeader";
import { useGetAllDprStatusQuery } from "../../store/slices/dprSlice";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigations/RootStackParamList";

type MyTaskNavigationProp = StackNavigationProp<
  RootStackParamList,
  "BottomNavigation"
>;

const MyTask = () => {
  const { data, isLoading, isError } = useGetAllDprStatusQuery();
  const navigation = useNavigation<MyTaskNavigationProp>();

  const stats = data?.data || {
    today: 0,
    overdue: 0,
    upcoming: 0,
    completed: 0,
  };

  const totalTasks =
    (stats.today || 0) +
    (stats.overdue || 0) +
    (stats.upcoming || 0) +
    (stats.completed || 0);

  const items = [
    {
      id: "today",
      title: "Today",
      count: stats.today ?? 0,
      iconName: "calendar",
      iconBg: "#6366F1",
    },
    {
      id: "overdue",
      title: "Overdue",
      count: stats.overdue ?? 0,
      iconName: "bell",
      iconBg: "#EF4444",
    },
    {
      id: "upcoming",
      title: "Upcoming",
      count: stats.upcoming ?? 0,
      iconName: "clock",
      iconBg: "#F59E0B",
    },
    {
      id: "completed",
      title: "Completed",
      count: stats.completed ?? 0,
      iconName: "check-circle",
      iconBg: "#10B981",
    },
    {
      id: "mytask",
      title: "My Tasks",
      count: totalTasks,
      iconName: "check-square",
      iconBg: "#2F9BFF",
    },
  ] as const;

  const handleCardPress = (item: (typeof items)[number]) => {
    navigation.navigate("CardsData", {
      bucket: item.id,
      title: item.title,
    });
  };

  return (
    <View style={styles.container}>
      <TaskHeader title="My Task" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {isLoading && (
          <View style={styles.stateContainer}>
            <ActivityIndicator size="small" color={COLORS.primary} />
            <Text style={styles.stateText}>Loading your tasks…</Text>
          </View>
        )}

        {isError && !isLoading && (
          <View style={styles.stateContainer}>
            <Text style={styles.stateText}>Unable to load DPR status.</Text>
          </View>
        )}

        {!isLoading && !isError && (
          <View style={styles.gridWrapper}>
            <View style={styles.grid}>
              {items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.cardSpacing}
                  activeOpacity={0.85}
                  onPress={() => handleCardPress(item)}
                >
                  <Card
                    title={item.title}
                    count={item.count}
                    icon={<Icon name={item.iconName} size={18} color="#fff" />}
                    iconBgColor={item.iconBg}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.listDivider} />
      </ScrollView>
    </View>
  );
};

export default MyTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // light grey from theme (#F4F6FB style)
  },
  scrollContent: {
    paddingBottom: 100,
  },

  // big white “sheet” that holds the stats cards
  gridWrapper: {
    marginTop: 12,
    paddingHorizontal: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: COLORS.card || "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardSpacing: {
    width: "48%",
    marginBottom: 14,
  },
  listDivider: {
    height: 1,
    backgroundColor: COLORS.borderColor,
    marginTop: 16,
    marginBottom: 12,
    opacity: 0.4,
  },
  stateContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  stateText: {
    marginTop: 6,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
});
