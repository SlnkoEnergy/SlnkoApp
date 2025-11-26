// components/RecentTasks.tsx
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

/* ---------- Types ---------- */

export type StatusKey =
  | "pending"
  | "idle"
  | "work stopped"
  | "completed"
  | "in progress";


export type RecentTask = {
  id: string;
  title: string;
  updatedAt: string;
  status?: StatusKey;  
  companyPayload: any;
};


type Props = {
  tasks: RecentTask[];
  maxItems?: number;
  onPressTask?: (task: RecentTask) => void;
};

const RecentTasks: React.FC<Props> = ({ tasks, maxItems = 6, onPressTask }) => {
  const { colors, dark } = useTheme();
  const [expanded, setExpanded] = useState(true);

  const sorted = useMemo(
    () =>
      [...(tasks || [])].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      ),
    [tasks]
  );

  const visible = sorted.slice(0, maxItems);
  const hasTasks = visible.length > 0;

  const getStatusIcon = (status?: StatusKey) => {
    // icon + color based on status
    switch (status) {
      case "completed":
        return {
          name: "checkmark-done-outline", // ✅ double tick
          color: "#22c55e", // green
        };
      case "idle":
        return {
          name: "ellipse-outline", // ◯ round
          color: dark ? "rgba(255,255,255,0.7)" : "rgba(148,163,184,1)",
        };
      case "work stopped":
        return {
          name: "alert-circle-outline", // ⚠ disturbance
          color: "#f97316", // orange
        };
      case "in progress":
        return {
          name: "sync-outline", // ⟳ in progress
          color: colors.primary ?? "#a855f7",
        };
      case "pending":
        return {
          name: "time-outline", // ⏱ pending
          color: dark ? "rgba(255,255,255,0.8)" : "rgba(148,163,184,1)",
        };
      default:
        return {
          name: "checkmark-done-outline",
          color: colors.primary ?? "#a855f7",
        };
    }
  };

  return (
    <View style={styles.sectionContainer}>
      {/* Header row: "Recents" with chevron */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.headerRow}
        onPress={() => setExpanded((prev) => !prev)}
      >
        <Text style={[styles.headerText, { color: colors.text }]}>Recents Tasks</Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={18}
          color={dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)"}
        />
      </TouchableOpacity>

      {/* Collapsible content */}
      {expanded && (
        <>
          {!hasTasks ? (
            <Text
              style={[
                styles.emptyText,
                {
                  color: dark
                    ? "rgba(255,255,255,0.6)"
                    : "rgba(0,0,0,0.55)",
                },
              ]}
            >
              No recent tasks yet.
            </Text>
          ) : (
            <FlatList
              data={visible}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => {
                const { name, color } = getStatusIcon(item.status);

                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => onPressTask?.(item)}
                    style={styles.row}
                  >
                    {/* Left icon driven by status */}
                    <View style={styles.iconWrap}>
                      <Ionicons name={name} size={18} color={color} />
                    </View>

                    {/* Title only, like Linear UI */}
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.title,
                        { color: colors.text },
                      ]}
                    >
                      {item.title || "Untitled"}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              ItemSeparatorComponent={() => (
                <View
                  style={[
                    styles.separator,
                    {
                      backgroundColor: dark
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.1)",
                    },
                  ]}
                />
              )}
            />
          )}
        </>
      )}
    </View>
  );
};

export default RecentTasks;

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 4,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
    marginBottom: 4,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  emptyText: {
    fontSize: 12,
    marginTop: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  iconWrap: {
    width: 28,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
  },
  separator: {
    height: 1,
    marginLeft: 38, // align under text, not under icon
  },
});
