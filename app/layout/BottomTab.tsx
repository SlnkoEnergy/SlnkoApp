import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

import { COLORS, FONTS } from "../constants/theme";

type Props = {
  state: any;
  navigation: any;
  descriptors: any;
  openCompanySheet?: () => void;
};

const BottomTab: React.FC<Props> = ({ state, descriptors, navigation }) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  const insets = useSafeAreaInsets();

  const handleTabPress = (
    route: any,
    index: number,
    label: string,
    isFocused: boolean
  ) => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate({ name: route.name, merge: true });
    }
  };

  // ✅ icons based on route.name (not label)
  const getIconName = (routeName: string) => {
    switch (routeName) {
      case "Estimates":
        return "document-text-outline";
      case "Project":
        return "briefcase-outline";
      case "Contacts":
        return "home-outline";
      case "MyTask":
        return "checkmark-done-outline";
      case "Invite":
        return "person-add-outline";
      case "Messages":
        return "mail-outline";


      default:
        return "ellipse-outline";
    }
  };

  return (
    <View
      style={[
        styles.FloaterWrap,
        { paddingBottom: Math.max(insets.bottom, 8) },
      ]}
      pointerEvents="box-none"
    >
      <View style={[styles.SubFooter, { backgroundColor: COLORS.primary }]}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          // ⭐ Center floating button for Company
          if (route.name === "Contacts") {
            const iconName = getIconName(route.name);

            return (
              <TouchableOpacity
                key={route.key}
                style={styles.centerIconWrapper}
                activeOpacity={0.9}
                onPress={() => handleTabPress(route, index, label, isFocused)}
              >
                {/* same size as others so it doesn't look HUGE */}
                <Ionicons name={iconName} size={24} color="#fff" />
              </TouchableOpacity>
            );
          }

          const iconName = getIconName(route.name);
          const iconColor = isFocused ? "#fff" : "rgba(255,255,255,0.75)";
          const textColor = isFocused ? "#fff" : "rgba(255,255,255,0.75)";

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.iconWrapper}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={() => handleTabPress(route, index, label, isFocused)}
            >
              <Ionicons name={iconName} size={24} color={iconColor} />
              <Text
                style={[
                  styles.iconLabel,
                  FONTS.fontXs,
                  { color: textColor },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  FloaterWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  SubFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    height: 80,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
  },
  iconWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centerIconWrapper: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },
  iconLabel: {
    color: "#fff",
    fontSize: 11,
    marginTop: 4,
  },
});

export default BottomTab;
