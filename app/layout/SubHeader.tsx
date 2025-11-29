import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HeaderBar() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const topPadding = insets.top + 8;

  return (
    <View style={[styles.headerBar, { paddingTop: topPadding }]}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-left" size={26} color={COLORS.textSecondary} />
      </TouchableOpacity>

      {/* Right Icons */}
      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="share-2" size={22} color={COLORS.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Icon name="more-horizontal" size={22} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.textMuted,
    backgroundColor: "white",
  },
  rightIcons: {
    flexDirection: "row",
    gap: 18,
    alignItems: "center",
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
  },
});
