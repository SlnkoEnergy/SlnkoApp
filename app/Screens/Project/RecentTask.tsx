// components/RecentTasks.tsx
import React, { useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export type RecentTask = {
  id: string;
  title: string;
  updatedAt: string;
};

type Props = {
  tasks: RecentTask[];              
  maxItems?: number;                
  onPressTask?: (task: RecentTask) => void;
};

const RecentTasks: React.FC<Props> = ({ tasks, maxItems = 6, onPressTask }) => {
  const { colors, dark } = useTheme();

  const sorted = useMemo(
    () =>
      [...(tasks || [])].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      ),
    [tasks]
  );

  const visible = sorted.slice(0, maxItems);

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Text style={[styles.header, { color: colors.text }]}>Recents</Text>

      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
            }}
          />
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onPressTask?.(item)}
            style={[
              styles.row,
              {
                backgroundColor: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
                borderColor: dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)",
              },
            ]}
          >
            <View
              style={[
                styles.leading,
                {
                  backgroundColor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                  borderColor: dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)",
                },
              ]}
            >
              <Ionicons name="checkbox-outline" size={18} color={colors.primary ?? "#8B5CF6"} />
            </View>

            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={[styles.title, { color: colors.text }]}>
                {item.title || "Untitled"}
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  styles.sub,
                  { color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" },
                ]}
              >
                {formatRelative(item.updatedAt)}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)"}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default RecentTasks;

function formatRelative(dateLike: string) {
  const d = new Date(dateLike);
  if (isNaN(d.getTime())) return "";
  const diff = Date.now() - d.getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  if (days < 7) return `${days}d ago`;
  return d.toDateString().split(" ").slice(1).join(" ");
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginVertical: 6,
    borderWidth: 1,
  },
  leading: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 1,
  },
  title: { fontSize: 15, fontWeight: "600" },
  sub: { marginTop: 2, fontSize: 12, fontWeight: "500" },
});
