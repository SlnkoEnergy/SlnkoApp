import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigations/RootStackParamList";
import Icon from "react-native-vector-icons/Feather";

import { COLORS } from "../../constants/theme";
import SubHeader from "../../layout/SubHeader";
import { useUpdateDprLogMutation } from "../../store/slices/dprSlice";

/* --------- STATUS LABELS (UI text) --------- */

const statusLabelMap = {
  pending: "Pending",
  idle: "Idle",
  "work stopped": "Work Stopped",
  completed: "Completed",
  "in progress": "In Progress",
} as const;

type StatusKey = keyof typeof statusLabelMap;

/* --- Single status row used inside Modal --- */
type StatusRowProps = {
  label: string;
  variant: StatusKey;
  selected: boolean;
  onPress: () => void;
};

const StatusRow: React.FC<StatusRowProps> = ({
  label,
  variant,
  selected,
  onPress,
}) => {
  const isCompleted = variant === "completed";

  return (
    <TouchableOpacity style={styles.statusRowItem} onPress={onPress}>
      <View style={styles.statusRowLeft}>
        {/* Left icon / circle */}
        {isCompleted ? (
          <View style={[styles.statusCircle, styles.statusCircleComplete]}>
            <Icon name="check" size={12} color={COLORS.white} />
          </View>
        ) : (
          <View
            style={[
              styles.statusCircle,
              (variant === "pending" || variant === "idle") && !selected
                ? styles.statusCircleTodo
                : null,
              selected ? styles.statusCircleActive : styles.statusCircleIdle,
            ]}
          >
            {/* inner dot only for active "in progress" */}
            {selected && variant === "in progress" && (
              <View style={styles.statusCircleInner} />
            )}
          </View>
        )}

        <Text
          style={[
            styles.statusRowLabel,
            selected && styles.statusRowLabelSelected,
          ]}
        >
          {label}
        </Text>
      </View>

      {/* Right check icon when selected */}
      {selected && (
        <Icon
          name="check-circle"
          size={18}
          color={isCompleted ? COLORS.success : COLORS.primary}
        />
      )}
    </TouchableOpacity>
  );
};

/* --------- TASK TYPE COMPONENTS --------- */

type TaskTypeKey = "task" | "milestone" | "form" | "note";

type TaskTypeRowProps = {
  label: string;
  iconName: string;
  selected?: boolean;
  comingSoon?: boolean;
  onPress?: () => void;
};

const TaskTypeRow: React.FC<TaskTypeRowProps> = ({
  label,
  iconName,
  selected,
  comingSoon,
  onPress,
}) => {
  const disabled = !!comingSoon;

  return (
    <TouchableOpacity
      style={styles.taskTypeRow}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <View style={styles.taskTypeLeft}>
        <Icon
          name={iconName}
          size={18}
          color={
            disabled
              ? COLORS.textMuted
              : selected
              ? COLORS.primary
              : COLORS.textSecondary
          }
          style={{ marginRight: 10 }}
        />

        <View>
          <Text
            style={[
              styles.taskTypeLabel,
              selected && !disabled && { color: COLORS.primary },
            ]}
          >
            {label}
          </Text>

          {comingSoon && (
            <Text style={styles.taskTypeComingSoonText}>Coming Soon</Text>
          )}
        </View>
      </View>

      {selected && !disabled && (
        <Icon name="check-circle" size={18} color={COLORS.primary} />
      )}
    </TouchableOpacity>
  );
};

/* --------- ACTIVITY TYPES --------- */

type ActivityEvent = {
  id: string;
  kind: "system" | "status" | "comment";
  createdAt: string;
  message?: string;
  author?: string;
  fromStatus?: StatusKey;
  toStatus?: StatusKey;
};

/* fallback demo activity if backend arrays are empty */
const defaultActivity: ActivityEvent[] = [
  {
    id: "1",
    kind: "system",
    createdAt: "Thursday, 8:20 PM",
    message: "You created this task",
  },
];

/* -------- Helper: date & number formatting -------- */

function formatShortDate(value?: string | null): string {
  if (!value) return "-";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

function formatDateTime(value?: string | null): string {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleString("en-IN", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function isSameDay(dateStr?: string, today?: Date): boolean {
  if (!dateStr || !today) return false;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return false;
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
}

function safeNumber(val: any): number {
  const n = Number(val);
  return Number.isFinite(n) ? n : 0;
}

function formatQty(val?: number): string {
  if (typeof val !== "number" || !Number.isFinite(val)) return "-";
  return String(Math.round(val));
}

/* -------- normalize backend status strings -------- */

function normalizeStatusFromBackend(raw?: string | null): StatusKey {
  if (!raw) return "idle";
  const s = raw.toLowerCase().trim();

  switch (s) {
    case "pending":
      return "pending";

    // backend typo "ideal" → "idle"
    case "idle":
    case "ideal":
      return "idle";

    case "work stopped":
    case "work_stopped":
      return "work stopped";

    case "completed":
    case "complete":
      return "completed";

    case "in progress":
    case "in-progress":
    case "in_progress":
      return "in progress";

    default:
      // fallback
      return "in progress";
  }
}

/* -------------------------------------------------------------- */

type CompanyScreenProps = StackScreenProps<RootStackParamList, "Company">;

const Company = ({ route }: CompanyScreenProps) => {
  const { data } = route.params;

  console.log(data);

  // Title: prefer card title, then activity name, else fallback
  const activityName =
    data?.title || data?._raw?.activity_id?.name || "Task name";

  const project = data?._raw?.project_id;
  const projectName = project?.name ?? "—";
  const projectCode = data?.code ?? project?.code ?? "—";
  const projectState = project?.state ?? "—";

  const plannedStart = data?._raw?.planned_start ?? null;
  const plannedFinish = data?._raw?.planned_finish ?? null;
  const dueDateLabel =
    plannedFinish || plannedStart
      ? formatShortDate(plannedFinish || plannedStart)
      : "No due date";

  const statusHistory: any[] = Array.isArray(data?._raw?.status_history)
    ? data._raw.status_history
    : [];

  const percentCompleteRaw =
    typeof data?._raw?.percent_complete === "number"
      ? data._raw.percent_complete
      : typeof data?._raw?.work_completion?.value === "number"
      ? data._raw.work_completion.value
      : undefined;

  // ---- Calculate Total / Completed / Pending / Today from backend ----
  let completedQty = 0;
  let todayWorkQty = 0;
  const today = new Date();

  statusHistory.forEach((entry) => {
    const qty = safeNumber(entry.todays_progress);
    if (!qty) return;
    completedQty += qty;
    if (isSameDay(entry.date || entry.createdAt, today)) {
      todayWorkQty += qty;
    }
  });

  let totalWorkQty: number | undefined;
  let pendingQty: number | undefined;

  if (typeof percentCompleteRaw === "number" && percentCompleteRaw > 0) {
    // total = completed / (percentComplete / 100)
    totalWorkQty = completedQty / (percentCompleteRaw / 100);
    pendingQty = totalWorkQty - completedQty;
  }

  const mapUiStatusToApiStatus = (value: StatusKey): string => {
    switch (value) {
      case "in progress":
        return "in-progress";
      case "idle":
        return "ideal"; // backend typo
      case "work stopped":
        return "work-stopped";
      default:
        return "in-progress";
    }
  };

  /* -------- derive initial status from _raw -------- */
  const deriveInitialStatus = (): StatusKey => {
    const rawStatus = data?._raw?.current_status?.status as string | undefined;
    if (rawStatus) {
      return normalizeStatusFromBackend(rawStatus);
    }

    // if no current_status, use percentage
    const pct =
      typeof data?._raw?.percent_complete === "number"
        ? data._raw.percent_complete
        : typeof data?._raw?.work_completion?.value === "number"
        ? data._raw.work_completion.value
        : undefined;

    if (typeof pct === "number") {
      if (pct >= 100) return "completed";
      if (pct > 0) return "in progress";
      return "idle";
    }

    return "idle";
  };

  // current committed status
  const [status, setStatus] = useState<StatusKey>(() => deriveInitialStatus());

  // draft status inside modal
  const [draftStatus, setDraftStatus] = useState<StatusKey>(
    () => deriveInitialStatus()
  );

  // note/description for status change (inside modal)
  const [statusNote, setStatusNote] = useState("");
  // today's quantity input
  const [todayQty, setTodayQty] = useState("");

  const [activeTab, setActiveTab] = useState<"details" | "activity">("details");
  const [statusActiveTab, setStatusActiveTab] =
    useState<"status" | "taskType">("status");

  const [statusModalVisible, setStatusModalVisible] = useState(false);

  const [taskType, setTaskType] = useState<TaskTypeKey>("task");

  const [propertyModalVisible, setPropertyModalVisible] = useState(false);

  /* -------- build activity list from _raw.createdAt + _raw.status_history -------- */
  const initialActivity: ActivityEvent[] = (() => {
    const list: ActivityEvent[] = [];

    // created event
    if (data?._raw?.createdAt && data?._raw?.createdBy?.name) {
      list.push({
        id: "created",
        kind: "system",
        createdAt: formatDateTime(data._raw.createdAt) || "Created",
        message: `${data._raw.createdBy.name} created this task`,
      });
    }

    // status history → status events
    if (Array.isArray(data?._raw?.status_history)) {
      const sorted = [...data._raw.status_history].sort((a: any, b: any) => {
        const da = new Date(a.createdAt || a.date || "").getTime();
        const db = new Date(b.createdAt || b.date || "").getTime();
        return da - db;
      });

      let prevStatus: StatusKey = "idle";

      sorted.forEach((entry: any, index: number) => {
        const toStatus = normalizeStatusFromBackend(entry.status);
        const fromStatus = prevStatus;

        list.push({
          id: entry._id || `history-${index}`,
          kind: "status",
          createdAt:
            formatDateTime(entry.createdAt || entry.date) ||
            "Status updated",
          message: entry.remarks || "Status changed",
          fromStatus,
          toStatus,
        });

        prevStatus = toStatus;
      });
    }

    return list.length ? list : defaultActivity;
  })();

  const [activity, setActivity] = useState<ActivityEvent[]>(initialActivity);
  const [commentText, setCommentText] = useState("");

  const openStatusModal = () => {
    setDraftStatus(status);
    setStatusNote("");
    setTodayQty("");
    setStatusActiveTab("status");
    setStatusModalVisible(true);
  };

  const closeStatusModal = () => {
    setStatusModalVisible(false);
  };

  const [updateDprLog, { isLoading: isUpdating, error: updateErr }] =
    useUpdateDprLogMutation();

  // when user taps Done on modal
  const handleStatusModalDone = async () => {
    const trimmedNote = statusNote.trim();
    const trimmedQty = todayQty.trim();

    const qtyNumber =
      trimmedQty.length > 0 && !Number.isNaN(Number(trimmedQty))
        ? Number(trimmedQty)
        : null;

    const prevStatus = status;
    const nextStatus = draftStatus;

    // 🔹 Cap today's qty so it never exceeds pending quantity
    let effectiveQty: number | null = qtyNumber;

    if (
      qtyNumber !== null &&
      typeof pendingQty === "number" &&
      pendingQty >= 0
    ) {
      if (qtyNumber > pendingQty) {
        effectiveQty = pendingQty;
      }
    }

    // Build a nice message for activity feed
    let baseMessage = trimmedNote || "Status changed";
    if (effectiveQty !== null) {
      baseMessage = `Today's progress: ${effectiveQty} • ${baseMessage}`;
    }

    // If status changed, add status activity event
    if (prevStatus !== nextStatus) {
      setStatus(nextStatus);

      setActivity((prev) => [
        ...prev,
        {
          id: `status-${Date.now()}`,
          kind: "status",
          createdAt: "Just now",
          message: baseMessage,
          fromStatus: prevStatus,
          toStatus: nextStatus,
        },
      ]);
    } else if (trimmedNote || effectiveQty !== null) {
      // only note/qty, no status change -> add as comment event
      setActivity((prev) => [
        ...prev,
        {
          id: `comment-${Date.now()}`,
          kind: "comment",
          createdAt: "Just now",
          author: "You",
          message: baseMessage,
        },
      ]);
    }

    // Clear modal UI
    setStatusNote("");
    setTodayQty("");
    setStatusModalVisible(false);

    // 🔽 API payload
    const apiStatus = mapUiStatusToApiStatus(nextStatus);

    const apiTodayProgress =
      nextStatus === "in progress" && effectiveQty !== null ? effectiveQty : 0;

    const payload = {
      projectId: data._raw?.project_id?._id,
      activityId: data?._raw?.activity_id,
      todays_progress: apiTodayProgress, // 0 for idle / work stopped
      date: new Date().toISOString(),
      remarks: trimmedNote,
      status: apiStatus, // "in-progress" | "ideal" | "work-stopped"
    };

    console.log(payload.projectId);
    console.log(payload.activityId);

    try {
      const res = await updateDprLog(payload).unwrap();
      console.log("✅ DPR log updated:", res);
    } catch (error) {
      console.error("❌ Failed to update DPR log:", error);
    }
  };

  // 🔹 Live input capping: if user types > pendingQty, it auto-snaps to pending
  const handleTodayQtyChange = (value: string) => {
    // allow clearing the input
    if (value.trim() === "") {
      setTodayQty("");
      return;
    }

    // convert to number
    const numeric = Number(value);

    if (Number.isNaN(numeric)) {
      // invalid -> ignore / reset
      setTodayQty("");
      return;
    }

    // if we know pendingQty, cap it so user sees the real allowed value
    if (
      typeof pendingQty === "number" &&
      pendingQty >= 0 &&
      numeric > pendingQty
    ) {
      setTodayQty(String(Math.max(pendingQty, 0)));
    } else {
      setTodayQty(String(numeric));
    }
  };

  const handleSendComment = () => {
    const trimmed = commentText.trim();
    if (!trimmed) return;

    const newEvent: ActivityEvent = {
      id: Date.now().toString(),
      kind: "comment",
      createdAt: "Just now",
      author: "You",
      message: trimmed,
    };

    setActivity((prev) => [...prev, newEvent]);
    setCommentText("");
  };

  const renderStatusChip = (value: StatusKey) => {
    let iconName: string = "circle";
    let color = COLORS.textSecondary;
    let bg = COLORS.chipBgNeutral;

    switch (value) {
      case "pending":
        iconName = "clock";
        color = COLORS.textMuted;
        bg = COLORS.chipBgNeutral;
        break;

      case "idle":
        iconName = "pause-circle";
        color = COLORS.textSecondary;
        bg = COLORS.chipBgNeutral;
        break;

      case "work stopped":
        iconName = "alert-circle";
        color = COLORS.warning;
        bg = COLORS.chipBgNeutral;
        break;

      case "in progress":
        iconName = "loader";
        color = COLORS.info;
        bg = COLORS.chipBgInfo;
        break;

      case "completed":
        iconName = "check-circle";
        color = COLORS.success;
        bg = COLORS.chipBgSuccess;
        break;
    }

    return (
      <View style={[styles.activityStatusChip, { backgroundColor: bg }]}>
        <Icon
          name={iconName}
          size={14}
          color={color}
          style={{ marginRight: 4 }}
        />
        <Text
          style={[styles.activityStatusChipText, { color }]}
          numberOfLines={1}
        >
          {statusLabelMap[value]}
        </Text>
      </View>
    );
  };

  const percentSafe = Math.min(Math.max(percentCompleteRaw ?? 0, 0), 100);

  return (
    <View style={styles.container}>
      <SubHeader />

      {/* Top Tabs: Details / Activity */}
      <View style={styles.tabsWrapper}>
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setActiveTab("details")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "details"
                  ? styles.tabTextActive
                  : styles.tabTextInactive,
              ]}
            >
              Details
            </Text>
            {activeTab === "details" && <View style={styles.tabIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setActiveTab("activity")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "activity"
                  ? styles.tabTextActive
                  : styles.tabTextInactive,
              ]}
            >
              Activity
            </Text>
            {activeTab === "activity" && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === "details" ? (
        /* ---------------- DETAILS TAB ---------------- */
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Title Card */}
          <View style={styles.titleCard}>
            <Text style={styles.listLabel}>
              {projectName} • {projectCode} • {projectState}
            </Text>

            <Text style={styles.titleText}>{activityName}</Text>

            <View style={styles.statusPill}>
              {/* use normalized committed `status` */}
              {renderStatusChip(status)}
              <View style={styles.statusPillDivider} />
              <View style={styles.statusPillType}>
                <Icon
                  name="check-square"
                  size={14}
                  color={COLORS.textSecondary}
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.statusPillTypeText}>Task</Text>
              </View>
            </View>
          </View>

          {/* -------- Work Summary Card (attractive) -------- */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeaderRow}>
              <View>
                <Text style={styles.summaryTitle}>Progress overview</Text>
                <Text style={styles.summarySubtitle}>
                  {percentSafe}% complete • {formatQty(completedQty)} /{" "}
                  {formatQty(totalWorkQty)} qty
                </Text>
              </View>

              <View style={styles.summaryChip}>
                <Icon
                  name="trending-up"
                  size={14}
                  color={COLORS.success}
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.summaryChipText}>{percentSafe}%</Text>
              </View>
            </View>

            <View style={styles.summaryGridRow}>
              <View style={styles.summaryGridItem}>
                <Text style={styles.summaryLabel}>Total work</Text>
                <Text style={styles.summaryBigValue}>
                  {formatQty(totalWorkQty)}
                </Text>
                <Text style={styles.summaryUnitText}>Planned qty</Text>
              </View>

              <View style={styles.summaryGridItem}>
                <Text style={styles.summaryLabel}>Completed</Text>
                <Text style={styles.summaryBigValueSuccess}>
                  {formatQty(completedQty)}
                </Text>
                <Text style={styles.summaryUnitText}>Qty done</Text>
              </View>
            </View>

            <View style={styles.summaryGridRow}>
              <View style={styles.summaryGridItem}>
                <Text style={styles.summaryLabel}>Pending</Text>
                <Text style={styles.summaryBigValueWarning}>
                  {formatQty(pendingQty)}
                </Text>
                <Text style={styles.summaryUnitText}>Qty remaining</Text>
              </View>

              <View style={styles.summaryGridItem}>
                <Text style={styles.summaryLabel}>Today&apos;s work</Text>
                <Text style={styles.summaryBigValueInfo}>
                  {formatQty(todayWorkQty)}
                </Text>
                <Text style={styles.summaryUnitText}>Qty logged today</Text>
              </View>
            </View>

            <View style={styles.summaryProgressBarWrapper}>
              <View style={styles.summaryProgressBarBg}>
                <View
                  style={[
                    styles.summaryProgressBarFill,
                    { width: `${percentSafe}%` },
                  ]}
                />
              </View>
              <Text style={styles.summaryProgressHint}>
                Target {formatQty(totalWorkQty)} • Completed{" "}
                {formatQty(completedQty)}
              </Text>
            </View>
          </View>

          {/* Status & Type card */}
          <TouchableOpacity style={styles.cardRow} onPress={openStatusModal}>
            <View style={styles.statusIconWrapper}>
              <View style={styles.statusOuterDot}>
                <View style={styles.statusInnerDot} />
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.sectionLabel}>Status & Type</Text>
              <Text style={styles.statusText}>
                {statusLabelMap[status] ?? "In Progress"}
              </Text>
            </View>

            <Icon name="chevron-right" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>

          {/* Assignee */}
          <TouchableOpacity style={styles.cardRow}>
            <View style={styles.rowLeft}>
              <View style={styles.rowIconWrapper}>
                <Icon name="user" size={16} color={COLORS.white} />
              </View>
              <Text style={styles.rowLabel}>
                {data?._raw?.createdBy?.name || "Add Assignee"}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Due Date */}
          <TouchableOpacity style={styles.cardRow}>
            <View style={styles.rowLeft}>
              <View style={styles.rowIconWrapper}>
                <Icon name="calendar" size={16} color={COLORS.white} />
              </View>
              <View>
                <Text style={styles.rowLabel}>Due date</Text>
                <Text style={styles.rowValue}>{dueDateLabel}</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>

          {/* Upload Document */}
          <View style={styles.card}>
            <TouchableOpacity style={styles.rowButtonDesc}>
              <View style={styles.rowLeft}>
                <Text style={styles.sectionLabel}>Upload Document</Text>
              </View>
              <Icon name="chevron-right" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.addPropertyRowDoc}>
              <Icon name="plus" size={16} color={COLORS.primary} />
              <Text style={styles.addPropertyText}>Add Document</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        /* ---------------- ACTIVITY TAB ---------------- */
        <View style={styles.activityContainer}>
          <ScrollView
            style={styles.activityScroll}
            contentContainerStyle={styles.activityScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {activity.map((item) => {
              if (item.kind === "comment") {
                return (
                  <View key={item.id} style={styles.activityCommentBlock}>
                    <View style={styles.activityCommentHeader}>
                      <View style={styles.activityAvatar}>
                        <Text style={styles.activityAvatarInitial}>
                          {item.author?.[0] ?? "U"}
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <View style={styles.activityCommentTitleRow}>
                          <Text style={styles.activityAuthor}>
                            {item.author}
                          </Text>
                          <Text style={styles.activityTimestamp}>
                            {item.createdAt}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.activityCommentText}>
                      {item.message}
                    </Text>
                  </View>
                );
              }

              return (
                <View key={item.id} style={styles.activityCard}>
                  <Text style={styles.activitySystemText}>
                    {item.message || "Activity"}
                  </Text>

                  {item.kind === "status" &&
                    item.fromStatus &&
                    item.toStatus && (
                      <View style={styles.activityStatusRow}>
                        {renderStatusChip(item.fromStatus)}
                        <Icon
                          name="arrow-right"
                          size={14}
                          color={COLORS.textMuted}
                          style={{ marginHorizontal: 6 }}
                        />
                        {renderStatusChip(item.toStatus)}
                      </View>
                    )}

                  <Text style={styles.activityTimestampSmall}>
                    {item.createdAt}
                  </Text>
                </View>
              );
            })}
          </ScrollView>

          {/* Comment composer fixed at bottom */}
          <View style={styles.commentBar}>
            <View style={styles.commentPlusWrap}>
              <Icon name="plus" size={18} color={COLORS.textMuted} />
            </View>

            <TextInput
              style={styles.commentInput}
              placeholder="Write a comment"
              placeholderTextColor={COLORS.placeholder}
              value={commentText}
              onChangeText={setCommentText}
            />

            <TouchableOpacity onPress={handleSendComment}>
              <Icon
                name="send"
                size={18}
                color={
                  commentText.trim().length
                    ? COLORS.primary
                    : COLORS.textMuted
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* -------- Status & Task Type Modal -------- */}
      <Modal
        visible={statusModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeStatusModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={closeStatusModal}
            activeOpacity={1}
          />
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <View style={{ width: 60 }} />
              <Text style={styles.modalTitle}>Status & Task Type</Text>

              <TouchableOpacity
                onPress={handleStatusModalDone}
                style={{ padding: 4 }}
              >
                <Text style={styles.modalDoneText}>Done</Text>
              </TouchableOpacity>
            </View>

            {/* Small handle bar */}
            <View style={styles.modalHandle} />

            {/* Tabs */}
            <View style={styles.tabsRow}>
              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => setStatusActiveTab("status")}
              >
                <Text
                  style={[
                    styles.tabText,
                    statusActiveTab === "status"
                      ? styles.tabTextActive
                      : styles.tabTextInactive,
                  ]}
                >
                  Status
                </Text>
                {statusActiveTab === "status" && (
                  <View style={styles.tabIndicator} />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => setStatusActiveTab("taskType")}
              >
                <Text
                  style={[
                    styles.tabText,
                    statusActiveTab === "taskType"
                      ? styles.tabTextActive
                      : styles.tabTextInactive,
                  ]}
                >
                  Task Type
                </Text>
                {statusActiveTab === "taskType" && (
                  <View style={styles.tabIndicator} />
                )}
              </TouchableOpacity>
            </View>

            {statusActiveTab === "status" ? (
              <ScrollView style={styles.modalScroll}>
                {/* Only 3 status options: In Progress, Idle, Work Stopped */}
                <Text style={styles.modalSectionHeading}>Status</Text>
                <StatusRow
                  label={statusLabelMap["in progress"]}
                  variant="in progress"
                  selected={draftStatus === "in progress"}
                  onPress={() => setDraftStatus("in progress")}
                />
                <StatusRow
                  label={statusLabelMap["idle"]}
                  variant="idle"
                  selected={draftStatus === "idle"}
                  onPress={() => setDraftStatus("idle")}
                />
                <StatusRow
                  label={statusLabelMap["work stopped"]}
                  variant="work stopped"
                  selected={draftStatus === "work stopped"}
                  onPress={() => setDraftStatus("work stopped")}
                />

                {/* Description INSIDE status modal */}
                <View style={styles.modalDividerThin} />
                <Text style={styles.modalSectionHeading}>Description</Text>
                <TextInput
                  style={styles.statusNoteInput}
                  multiline
                  placeholder="Add description for this status change"
                  placeholderTextColor={COLORS.placeholder}
                  value={statusNote}
                  onChangeText={setStatusNote}
                  textAlignVertical="top"
                />

                {/* Today's quantity input below description */}
                <Text style={styles.modalSectionHeading}>
                  Today&apos;s Work (Qty)
                </Text>
                <TextInput
                  style={styles.statusQtyInput}
                  keyboardType="numeric"
                  placeholder="Enter today's work in numbers"
                  placeholderTextColor={COLORS.placeholder}
                  value={todayQty}
                  onChangeText={handleTodayQtyChange}
                />
              </ScrollView>
            ) : (
              <ScrollView style={styles.modalScroll}>
                <TaskTypeRow
                  label="Task"
                  iconName="check-circle"
                  selected={taskType === "task"}
                  onPress={() => setTaskType("task")}
                />
                <TaskTypeRow label="Milestone" iconName="flag" comingSoon />
                <TaskTypeRow
                  label="Form Response"
                  iconName="file-text"
                  comingSoon
                />
                <TaskTypeRow
                  label="Meeting Note"
                  iconName="calendar"
                  comingSoon
                />
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Company;

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* Top tabs */
  tabsWrapper: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.borderColor,
    shadowColor: COLORS.black,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  tabsRow: {
    flexDirection: "row",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    position: "relative",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "500",
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  tabTextInactive: {
    color: COLORS.textMuted,
  },
  tabIndicator: {
    position: "absolute",
    left: "20%",
    right: "20%",
    bottom: 0,
    height: 2,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },

  /* Main content */
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 32,
  },

  titleCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  listLabel: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginBottom: 4,
  },
  titleText: {
    color: COLORS.title,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },

  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 4,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: COLORS.accentSoft,
  },
  statusPillDivider: {
    width: 1,
    height: 14,
    marginHorizontal: 8,
    backgroundColor: COLORS.borderColor,
  },
  statusPillType: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusPillTypeText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.borderColor,
  },

  cardRow: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.borderColor,
  },

  statusIconWrapper: {
    marginRight: 10,
  },
  statusOuterDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  statusInnerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },

  sectionLabel: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: "500",
  },
  statusText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.4,
    marginTop: 2,
  },

  rowButtonDesc: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  rowLabel: {
    color: COLORS.textPrimary,
    fontSize: 14,
    marginBottom: 2,
    fontWeight: "500",
  },
  rowValue: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },

  addPropertyRowDoc: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
  },
  addPropertyText: {
    marginLeft: 6,
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "600",
  },

  descriptionPlaceholder: {
    paddingTop: 6,
    color: COLORS.textMuted,
    fontSize: 13,
  },

  /* Work summary card (attractive) */
  summaryCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.borderColor,
  },
  summaryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  summarySubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  summaryChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: COLORS.chipBgSuccess || COLORS.accentSoft,
  },
  summaryChipText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.success,
  },
  summaryGridRow: {
    flexDirection: "row",
    marginTop: 6,
  },
  summaryGridItem: {
    flex: 1,
    paddingVertical: 8,
    paddingRight: 8,
  },
  summaryLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  summaryBigValue: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  summaryBigValueSuccess: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.success,
    marginTop: 2,
  },
  summaryBigValueWarning: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.warning,
    marginTop: 2,
  },
  summaryBigValueInfo: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.info,
    marginTop: 2,
  },
  summaryUnitText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  summaryProgressBarWrapper: {
    marginTop: 10,
  },
  summaryProgressBarBg: {
    height: 6,
    borderRadius: 999,
    backgroundColor: COLORS.input,
    overflow: "hidden",
  },
  summaryProgressBarFill: {
    height: 6,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  summaryProgressHint: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
  },

  /* Activity tab container */
  activityContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  activityScroll: {
    flex: 1,
  },
  activityScrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  activityCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.borderColor,
  },
  activitySystemText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginBottom: 6,
  },
  activityStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  activityStatusChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  activityStatusChipText: {
    fontSize: 11,
    fontWeight: "600",
  },
  activityTimestampSmall: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 4,
  },

  /* Comment item */
  activityCommentBlock: {
    marginBottom: 14,
  },
  activityCommentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  activityAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  activityAvatarInitial: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  activityCommentTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  activityAuthor: {
    color: COLORS.textSecondary,
    fontWeight: "600",
    fontSize: 14,
  },
  activityTimestamp: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  activityCommentText: {
    marginLeft: 40,
    color: COLORS.textPrimary,
    fontSize: 13,
    marginTop: 4,
  },

  /* Comment bar at bottom */
  commentBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.borderColor,
    backgroundColor: COLORS.card,
  },
  commentPlusWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  commentInput: {
    flex: 1,
    minHeight: 36,
    maxHeight: 80,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: COLORS.input,
    color: COLORS.textSecondary,
    fontSize: 14,
    marginRight: 8,
  },

  /* Modal styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: COLORS.card,
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  modalTitle: {
    flex: 1,
    textAlign: "center",
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: "600",
  },
  modalDoneText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 999,
    backgroundColor: COLORS.borderColor,
    alignSelf: "center",
    marginBottom: 8,
  },
  modalScroll: {
    marginTop: 8,
  },
  modalSectionHeading: {
    color: COLORS.textPrimary,
    fontSize: 13,
    marginTop: 12,
    marginBottom: 6,
  },
  modalDividerThin: {
    height: 1,
    backgroundColor: COLORS.borderColor,
    marginVertical: 8,
  },

  /* Status rows inside modal */
  statusRowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  statusRowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  statusCircleIdle: {
    borderColor: COLORS.textMuted,
  },
  statusCircleActive: {
    borderColor: COLORS.primary,
  },
  statusCircleTodo: {
    borderStyle: "dashed",
    borderColor: COLORS.textMuted,
  },
  statusCircleInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  statusCircleComplete: {
    borderWidth: 0,
    backgroundColor: COLORS.success,
  },
  statusRowLabel: {
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  statusRowLabelSelected: {
    color: COLORS.textSecondary,
    fontWeight: "700",
  },

  /* Task type rows */
  taskTypeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.borderColor,
  },
  taskTypeLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskTypeLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  taskTypeComingSoonText: {
    marginTop: 2,
    fontSize: 11,
    color: COLORS.textMuted,
  },

  /* Inline Add Property menu box (kept for future if you want) */
  propertyInlineCard: {
    marginTop: 4,
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  propertyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.borderColor,
  },
  propertyItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  propertyItemLabel: {
    marginLeft: 8,
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  propertyAddSubtaskRow: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  propertyAddSubtaskText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "600",
  },

  /* Description in status modal */
  statusNoteInput: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minHeight: 80,
    maxHeight: 160,
    fontSize: 13,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.input,
  },

  statusQtyInput: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.input,
    marginTop: 4,
  },
});
