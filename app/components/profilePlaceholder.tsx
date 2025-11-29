import React, { useMemo } from "react";
import { View, Text, Image } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { COLORS } from "../constants/theme";

type ProfilePlaceholderProps = {
    size?: number;
    name?: string;
    attachmentUrl?: string;
};

export default function ProfilePlaceholder({
    size = 120,
    name,
    attachmentUrl,
}: ProfilePlaceholderProps) {
    const bgColorNoInitials = "#D9D9D9";
    const bgColorWithInitials = "black";
    const iconColor = "#fff";

    const initials = useMemo(() => {
        if (!name) return "";
        return name
            .trim()
            .split(/\s+/)
            .map((part: string) => part.charAt(0))
            .join("")
            .slice(0, 2)
            .toUpperCase();
    }, [name]);

    const containerStyle = {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: initials ? bgColorWithInitials : bgColorNoInitials,
        alignItems: "center" as const,
        justifyContent: "center" as const,
        overflow: "hidden" as const,
    };

    const avatarSize = size * 0.8; // image size relative to outer circle
    const statusSize = size * 0.22; // green dot size
    const statusBorderWidth = Math.max(2, Math.floor(size * 0.03));

    return (
        <View style={containerStyle}>
            {attachmentUrl ? (
                <View
                    style={{
                        position: "relative",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        source={{ uri: attachmentUrl }}
                        style={{
                            width: avatarSize,
                            height: avatarSize,
                            borderRadius: avatarSize / 2,
                        }}
                        resizeMode="cover"
                    />

                    {/* Online status dot */}
                    <View
                        style={{
                            position: "absolute",
                            height: statusSize,
                            width: statusSize,
                            borderRadius: statusSize / 2,
                            backgroundColor: "#22C55E",
                            // keep it slightly inside the circle so it doesn't get clipped
                            bottom: size * 0.08,
                            right: size * 0.08,
                            borderWidth: statusBorderWidth,
                            borderColor: COLORS.background,
                        }}
                    />
                </View>
            ) : initials ? (
                // Show initials if name is available but no image
                <Text
                    style={{
                        fontSize: size * 0.35,
                        color: "#FFFFFF",
                        fontWeight: "600",
                    }}
                >
                    {initials}
                </Text>
            ) : (
                // Fallback SVG icon
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
