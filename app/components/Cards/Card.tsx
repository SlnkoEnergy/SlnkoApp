// components/Cards/Card.tsx
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
    StyleSheet as RNStyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS } from "../../constants/theme";

type CardProps = {
    title: string;
    count: number | string;
    icon: React.ReactNode;
    style?: ViewStyle;
    onPress?: () => void;

    // optional styling overrides
    iconBgColor?: string;
    countColor?: string;
    titleColor?: string;
};

const hexToRgba = (hex: string, alpha: number) => {
    let cleaned = hex.replace("#", "");
    if (cleaned.length === 3) {
        cleaned = cleaned
            .split("")
            .map((c) => c + c)
            .join(""); // #abc -> #aabbcc
    }

    const num = parseInt(cleaned, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Card: React.FC<CardProps> = ({
    title,
    count,
    icon,
    style,
    onPress,
    iconBgColor,
    countColor,
    titleColor,
}) => {
    const Wrapper: any = onPress ? TouchableOpacity : View;
    const baseColor = iconBgColor || "#6C5CE7";

    const gradientColors = [
        hexToRgba(baseColor, 0.18), // left side tint
        hexToRgba(baseColor, 0.03), // soft middle
        "transparent",              // fade out to plain white
    ];

    return (
        <Wrapper
            style={[styles.card, style]}
            {...(onPress ? { onPress, activeOpacity: 0.8 } : {})}
        >
            {/* Gradient overlay inside the card (not the whole box background) */}
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                pointerEvents="none"
                style={RNStyleSheet.absoluteFillObject}
            />

            <View style={styles.contentRow}>
                <View style={styles.left}>
                    <View
                        style={[
                            styles.iconWrap,
                            iconBgColor ? { backgroundColor: iconBgColor } : null,
                        ]}
                    >
                        {icon}
                    </View>
                    <Text
                        style={[
                            styles.title,
                            titleColor ? { color: titleColor } : null,
                        ]}
                    >
                        {title}
                    </Text>
                </View>

                <View style={styles.right}>
                    <Text
                        style={[
                            styles.count,
                            countColor ? { color: countColor } : null,
                        ]}
                    >
                        {count}
                    </Text>
                </View>
            </View>
        </Wrapper>
    );
};

export default Card;

const styles = StyleSheet.create({
    card: {
        borderRadius: 14,
        backgroundColor: COLORS.card,      // plain white base
        shadowColor: COLORS.black,
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
        minWidth: 130,
        minHeight: 100,
        overflow: "hidden",                // keep gradient inside rounded corners
    },
    contentRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 14,
        paddingVertical: 10,
        flex: 1,
    },
    left: {
        alignItems: "flex-start",
    },
    iconWrap: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: "#6C5CE7", // default, overridden by iconBgColor
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 4,
    },
    title: {
        fontSize: 15,
        color: COLORS.textPrimary,
    },
    right: {
        justifyContent: "center",
        alignItems: "flex-end",
    },
    count: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.textPrimary,
    },
});
