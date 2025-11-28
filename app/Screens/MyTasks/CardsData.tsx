// Screens/MyTasks/CardsData.tsx
import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Feather";

import { RootStackParamList } from "../../Navigations/RootStackParamList";
import { COLORS } from "../../constants/theme";
import { useGetAllDprQuery } from "../../store/slices/dprSlice";
import TaskHeader from "../../layout/TaskHeader";

type Props = StackScreenProps<RootStackParamList, "CardsData">;

type WorkCompletion = {
    unit: string;
    value: number;
};

type CurrentStatus = {
    status: "pending" | "idle" | "in progress" | "completed" | string;
    user_id?: string | null;
    remarks?: string | null;
    updated_at?: string;
};

type DprTask = {
    _id: string;
    category?: string;
    activity_id?: {
        _id: string;
        name?: string;
    } | null;
    project_id?: {
        _id: string;
        code?: string;
    } | null;
    work_completion?: WorkCompletion;
    current_status?: CurrentStatus;
    percent_complete?: number;
    planned_start?: string;
    planned_finish?: string;
    createdAt?: string;
    updatedAt?: string;
    comments?: any[];
    attachments?: any[];
};

type StatusFilter = "all" | "pending" | "in progress" | "idle" | "completed";

const statusFilterOptions: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "in progress", label: "In Progress" },
    { key: "idle", label: "Idle" },
    { key: "completed", label: "Completed" },
];

const CardsDataScreen: React.FC<Props> = ({ route, navigation }) => {
    const { bucket, title } = route.params;

    // 🔁 API call – cardStatus = bucket
    const {
        data: apiRes,
        isLoading,
        isError,
    } = useGetAllDprQuery({
        page: 1,
        limit: 20,
        cardStatus: bucket,
    });

    // ✅ Normalize incoming API => array of DprTask
    // Works with:
    // { ok, message, data: [ ... ] }  <-- your sample
    // OR [ ... ] directly
    const tasks: DprTask[] = useMemo(() => {
        if (!apiRes) return [];

        const anyRes: any = apiRes;

        // Primary case: { data: [...] }
        if (Array.isArray(anyRes.data)) {
            return anyRes.data as DprTask[];
        }

        // Fallback: if API directly returns an array
        if (Array.isArray(anyRes)) {
            return anyRes as DprTask[];
        }

        // Another fallback: if your backend wraps in { items: [...] }
        if (Array.isArray(anyRes.items)) {
            return anyRes.items as DprTask[];
        }

        return [];
    }, [apiRes]);

    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

    const filteredTasks = useMemo(() => {
        if (statusFilter === "all") return tasks;
        return tasks.filter(
            (t) =>
                t.current_status?.status?.toLowerCase() === statusFilter.toLowerCase()
        );
    }, [tasks, statusFilter]);

    const totalCount = tasks.length;
    const filteredCount = filteredTasks.length;

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "-";
        const d = new Date(dateStr);
        if (Number.isNaN(d.getTime())) return "-";
        const day = d.getDate().toString().padStart(2, "0");
        const monthIndex = d.getMonth();
        const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const month = monthNames[monthIndex];
        return `${day} ${month}`;
    };

    const timeAgo = (dateStr?: string) => {
        if (!dateStr) return "";
        const now = new Date().getTime();
        const t = new Date(dateStr).getTime();
        if (Number.isNaN(t)) return "";
        const diffMs = now - t;
        const diffMin = Math.floor(diffMs / (1000 * 60));
        const diffHr = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHr / 24);

        if (diffMin < 1) return "Just now";
        if (diffMin < 60) return `${diffMin} min ago`;
        if (diffHr < 24) return `${diffHr} hr ago`;
        return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
    };

    const getStatusStyle = (status?: string) => {
        const s = status?.toLowerCase() || "";
        if (s === "pending") {
            return { bg: "#FFF4E5", text: "#F2994A" };
        }
        if (s === "in progress") {
            return { bg: "#E8F4FF", text: "#2F80ED" };
        }
        if (s === "completed" || s === "complete") {
            return { bg: "#E6F9ED", text: "#219653" };
        }
        if (s === "idle") {
            return { bg: "#F3F4F6", text: "#6B7280" };
        }
        return { bg: "#F3F4F6", text: "#4B5563" };
    };

    const renderTask = ({ item }: { item: DprTask }) => {
        const status = item.current_status?.status || "pending";
        const { bg: statusBg, text: statusText } = getStatusStyle(status);

        // ✅ Prefer percent_complete; fallback to work_completion.value
        const rawPct =
            item.percent_complete ??
            (item.work_completion?.value != null ? item.work_completion.value : 0);
        const pct = Math.min(Math.max(Math.round(rawPct), 0), 100);

        const projectCode = item.project_id && (item.project_id as any).code;
        const activityName = item.activity_id && (item.activity_id as any).name;

        const commentsCount = item.comments?.length || 0;
        const attachmentsCount = item.attachments?.length || 0;

        return (
            <TouchableOpacity
                style={styles.card}
                activeOpacity={0.85}
                onPress={() => {
                    // later: navigate to detailed DPR screen
                    // navigation.navigate("TaskDetails", { data: item });
                }}
            >
                {/* Top row: status + percent */}
                <View style={styles.cardTopRow}>
                    <View style={[styles.statusChip, { backgroundColor: statusBg }]}>
                        <View style={[styles.statusDot, { backgroundColor: statusText }]} />
                        <Text style={[styles.statusText, { color: statusText }]}>
                            {status.toUpperCase()}
                        </Text>
                    </View>

                    <View style={styles.percentBox}>
                        <Text style={styles.percentText}>{pct}%</Text>
                        <Text style={styles.percentLabel}>Complete</Text>
                    </View>
                </View>

                {/* Activity & project */}
                <View style={styles.titleRow}>
                    <Text numberOfLines={1} style={styles.activityName}>
                        {activityName || "Activity name not available"}
                    </Text>
                </View>

                <View style={styles.metaRow}>
                    {projectCode && (
                        <View style={styles.metaItem}>
                            <Icon name="hash" size={13} color={COLORS.textMuted} />
                            <Text style={styles.metaText}>{projectCode}</Text>
                        </View>
                    )}
                    {item.category && (
                        <View style={styles.metaItem}>
                            <Icon name="layers" size={13} color={COLORS.textMuted} />
                            <Text style={styles.metaText}>
                                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Progress bar */}
                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${pct}%` }]} />
                    </View>
                </View>

                {/* Dates & footer */}
                <View style={styles.footerRow}>
                    <View style={styles.dateRow}>
                        <Icon name="calendar" size={14} color={COLORS.textMuted} />
                        <Text style={styles.dateText}>
                            {formatDate(item.planned_start)} -{" "}
                            {formatDate(item.planned_finish)}
                        </Text>
                    </View>

                    <View style={styles.footerRight}>
                        <View style={styles.footerIconGroup}>
                            <Icon name="message-circle" size={14} color={COLORS.textMuted} />
                            <Text style={styles.footerIconText}>{commentsCount}</Text>
                        </View>
                        <View style={styles.footerIconGroup}>
                            <Icon name="paperclip" size={14} color={COLORS.textMuted} />
                            <Text style={styles.footerIconText}>{attachmentsCount}</Text>
                        </View>
                        {item.current_status?.updated_at && (
                            <View style={styles.footerIconGroup}>
                                <Icon name="clock" size={14} color={COLORS.textMuted} />
                                <Text style={styles.footerIconText}>
                                    {timeAgo(item.current_status.updated_at)}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            {/* <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Icon name="chevron-left" size={22} color={COLORS.textPrimary} />
                </TouchableOpacity>
                <View style={styles.headerTextBlock}>
                    <Text style={styles.headerTitle}>{title}</Text>
                    <Text style={styles.headerSubtitle}>
                        {filteredCount} of {totalCount} tasks
                    </Text>
                </View>
            </View> */}

            {/* Filter chips */}
            {/* <View style={styles.filterRow}>
                {statusFilterOptions.map((opt) => {
                    const selected = statusFilter === opt.key;
                    return (
                        <TouchableOpacity
                            key={opt.key}
                            style={[
                                styles.filterChip,
                                selected && styles.filterChipSelected,
                            ]}
                            onPress={() => setStatusFilter(opt.key)}
                        >
                            <Text
                                style={[
                                    styles.filterChipText,
                                    selected && styles.filterChipTextSelected,
                                ]}
                            >
                                {opt.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View> */}

            <TaskHeader title={title} isBack={true} />

            {/* Content */}
            {isLoading && (
                <View style={styles.stateContainer}>
                    <ActivityIndicator size="small" color={COLORS.primary} />
                    <Text style={styles.stateText}>Loading tasks…</Text>
                </View>
            )}

            {isError && !isLoading && (
                <View style={styles.stateContainer}>
                    <Text style={styles.stateText}>
                        Couldn&apos;t load tasks. Please try again.
                    </Text>
                </View>
            )}

            {!isLoading && !isError && (
                <FlatList
                    data={filteredTasks}
                    keyExtractor={(item) => item._id}
                    renderItem={renderTask}
                    contentContainerStyle={
                        filteredTasks.length === 0
                            ? styles.emptyListContainer
                            : styles.listContent
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Icon name="inbox" size={32} color={COLORS.textMuted} />
                            <Text style={styles.emptyTitle}>No tasks found</Text>
                            <Text style={styles.emptySubtitle}>
                                Looks like you&apos;re all caught up for this bucket.
                            </Text>
                        </View>
                    }
                />
            )}
        </View>
    );
};

export default CardsDataScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
    },
    backButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    headerTextBlock: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.textPrimary,
    },
    headerSubtitle: {
        fontSize: 12,
        color: COLORS.textMuted,
        marginTop: 2,
    },
    filterRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexWrap: "wrap",
    },
    filterChip: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        marginRight: 8,
        marginTop: 6,
    },
    filterChipSelected: {
        backgroundColor: COLORS.primaryLight,
        borderColor: COLORS.primary,
    },
    filterChipText: {
        fontSize: 11,
        color: COLORS.textSecondary,
    },
    filterChipTextSelected: {
        color: COLORS.primary,
        fontWeight: "600",
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 14,
        marginTop: 10,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    cardTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    statusChip: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 999,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 4,
    },
    statusText: {
        fontSize: 10,
        fontWeight: "600",
    },
    percentBox: {
        alignItems: "flex-end",
    },
    percentText: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.textPrimary,
    },
    percentLabel: {
        fontSize: 10,
        color: COLORS.textMuted,
    },
    titleRow: {
        marginTop: 8,
    },
    activityName: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.textPrimary,
    },
    metaRow: {
        flexDirection: "row",
        marginTop: 4,
    },
    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 12,
    },
    metaText: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginLeft: 4,
    },
    progressBarContainer: {
        marginTop: 8,
    },
    progressBarBackground: {
        height: 6,
        borderRadius: 999,
        backgroundColor: "#F3F4F6",
        overflow: "hidden",
    },
    progressBarFill: {
        height: 6,
        borderRadius: 999,
        backgroundColor: COLORS.primary,
    },
    footerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    dateRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    dateText: {
        fontSize: 11,
        color: COLORS.textSecondary,
        marginLeft: 4,
    },
    footerRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    footerIconGroup: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
    },
    footerIconText: {
        fontSize: 10,
        color: COLORS.textSecondary,
        marginLeft: 3,
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
    emptyListContainer: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingVertical: 30,
    },
    emptyContainer: {
        alignItems: "center",
        marginTop: 40,
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.textPrimary,
        marginTop: 10,
    },
    emptySubtitle: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 4,
        textAlign: "center",
    },
});
