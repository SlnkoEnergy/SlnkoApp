import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

export default function ProfilePlaceholder({
    size = 120,
    name,
}: {
    size?: number;
    name?: string;
}) {
    const bgColor = "#D9D9D9";
    const iconColor = "#fff";
    const bgColor1 = "black";

    const initials = name
        ?.trim()
        .split(/\s+/)           // split by spaces
        .map((part: string) => part.charAt(0))   // take first letter of each part
        .join("")
        .slice(0, 2)            // max 2 letters
        .toUpperCase();

    return (
        <View
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: initials ? bgColor1 : bgColor,
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            {initials ? (
                <Text
                    style={{
                        color: iconColor,
                        fontWeight: "700",
                        fontSize: size / 2.5,
                    }}
                >
                    {initials}
                </Text>
            ) : (
                <Svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24">
                    {/* Head */}
                    <Circle cx="12" cy="8" r="5" fill={iconColor} />
                    {/* Shoulders */}
                    <Path
                        d="M12 14c-5 0-9 2.5-9 6v1h18v-1c0-3.5-4-6-9-6z"
                        fill={iconColor}
                    />
                </Svg>
            )}
        </View>
    );
}
