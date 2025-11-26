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

type CompanyScreenProps = StackScreenProps<RootStackParamList, "Project">;

/* --------- STATUS LABELS --------- */

const statusLabelMap = {
  todo: "TO DO",
  "in-progress": "IN PROGRESS",
  complete: "COMPLETE",
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
  const isComplete = variant === "complete";

  return (
    <TouchableOpacity style={styles.statusRowItem} onPress={onPress}>
      <View style={styles.statusRowLeft}>
        {/* Left icon / circle */}
        {isComplete ? (
          <View style={[styles.statusCircle, styles.statusCircleComplete]}>
            <Icon name="check" size={12} color={COLORS.white} />
          </View>
        ) : (
          <View
            style={[
              styles.statusCircle,
              variant === "todo" && !selected && styles.statusCircleTodo,
              selected && variant === "in-progress"
                ? styles.statusCircleActive
                : styles.statusCircleIdle,
            ]}
          >
            {selected && variant === "in-progress" && (
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
          color={isComplete ? COLORS.success : COLORS.primary}
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

const initialActivity: ActivityEvent[] = [
  {
    id: "1",
    kind: "system",
    createdAt: "Thursday, 8:20 PM",
    message: "You created this task",
  },
  {
    id: "2",
    kind: "status",
    createdAt: "Thursday, 8:20 PM",
    message: "You changed status to",
    fromStatus: "todo",
    toStatus: "in-progress",
  },
  {
    id: "3",
    kind: "comment",
    createdAt: "Thursday, 8:25 PM",
    author: "Devashish",
    message: "Hi",
  },
  {
    id: "4",
    kind: "status",
    createdAt: "Thursday, 8:26 PM",
    message: "You changed status to",
    fromStatus: "in-progress",
    toStatus: "complete",
  },
  {
    id: "5",
    kind: "status",
    createdAt: "Thursday, 8:30 PM",
    message: "You changed status to",
    fromStatus: "complete",
    toStatus: "in-progress",
  },
];

/* -------------------------------------------------------------- */

const Company: React.FC<CompanyScreenProps> = ({ route }) => {
  const activityName = route?.params?.activityName ?? "Task name";

  const [activeTab, setActiveTab] = useState<"details" | "activity">("details");
  const [statusActiveTab, setStatusActiveTab] =
    useState<"status" | "taskType">("status");
  const [status, setStatus] = useState<StatusKey>("in-progress");
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  const [taskType, setTaskType] = useState<TaskTypeKey>("task");

  const [propertyModalVisible, setPropertyModalVisible] = useState(false);

  const [activity, setActivity] = useState<ActivityEvent[]>(initialActivity);
  const [commentText, setCommentText] = useState("");

  const openStatusModal = () => setStatusModalVisible(true);
  const closeStatusModal = () => setStatusModalVisible(false);

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

    if (value === "in-progress") {
      iconName = "loader";
      color = COLORS.info;
      bg = COLORS.chipBgInfo;
    } else if (value === "complete") {
      iconName = "check-circle";
      color = COLORS.success;
      bg = COLORS.chipBgSuccess;
    } else if (value === "todo") {
      iconName = "clock";
      color = COLORS.textMuted;
      bg = COLORS.chipBgNeutral;
    }

    return (
      <View style={[styles.activityStatusChip, { backgroundColor: bg }]}>
        <Icon
          name={iconName}
          size={14}
          color={color}
          style={{ marginRight: 4 }}
        />
        <Text style={[styles.activityStatusChipText, { color }]} numberOfLines={1}>
          {statusLabelMap[value]}
        </Text>
      </View>
    );
  };

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
            <Text style={styles.listLabel}>Personal List</Text>
            <Text style={styles.titleText}>{activityName}</Text>

            <View style={styles.statusPill}>
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
                {statusLabelMap[status] ?? "IN PROGRESS"}
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
              <Text style={styles.rowLabel}>Add Assignee</Text>
            </View>
            <Icon name="chevron-right" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>

          {/* Due Date */}
          <TouchableOpacity style={styles.cardRow}>
            <View style={styles.rowLeft}>
              <View style={styles.rowIconWrapper}>
                <Icon name="calendar" size={16} color={COLORS.white} />
              </View>
              <View>
                <Text style={styles.rowLabel}>Due date</Text>
                <Text style={styles.rowValue}>Nov 24</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>

          {/* Add property */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.addPropertyRow}
              onPress={() =>
                setPropertyModalVisible((prevVisible) => !prevVisible)
              }
            >
              <Icon name="plus" size={16} color={COLORS.primary} />
              <Text style={styles.addPropertyText}>Add property</Text>
            </TouchableOpacity>

            {propertyModalVisible && (
              <View style={styles.propertyInlineCard}>
                <TouchableOpacity style={styles.propertyItem}>
                  <View style={styles.propertyItemLeft}>
                    <Icon name="flag" size={16} color={COLORS.warning} />
                    <Text style={styles.propertyItemLabel}>Priority</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.propertyItem}>
                  <View style={styles.propertyItemLeft}>
                    <Icon name="tag" size={16} color={COLORS.textSecondary} />
                    <Text style={styles.propertyItemLabel}>Tags</Text>
                  </View>
                  <Icon
                    name="chevron-right"
                    size={16}
                    color={COLORS.textMuted}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.propertyItem, { borderBottomWidth: 0 }]}
                >
                  <View style={styles.propertyItemLeft}>
                    <Icon
                      name="clock"
                      size={16}
                      color={COLORS.textSecondary}
                    />
                    <Text style={styles.propertyItemLabel}>Time tracking</Text>
                  </View>
                  <Icon
                    name="chevron-right"
                    size={16}
                    color={COLORS.textMuted}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.propertyAddSubtaskRow}>
                  <Text style={styles.propertyAddSubtaskText}>
                    + Add Subtask
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Description */}
          <View style={styles.card}>
            <TouchableOpacity style={styles.rowButtonDesc}>
              <View style={styles.rowLeft}>
                <Text style={styles.sectionLabel}>Description</Text>
              </View>
              <Icon
                name="chevron-right"
                size={18}
                color={COLORS.textMuted}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.descriptionPlaceholder}>
                Tap to add a description
              </Text>
            </TouchableOpacity>
          </View>

          {/* Upload Document */}
          <View style={styles.card}>
            <TouchableOpacity style={styles.rowButtonDesc}>
              <View style={styles.rowLeft}>
                <Text style={styles.sectionLabel}>Upload Document</Text>
              </View>
              <Icon
                name="chevron-right"
                size={18}
                color={COLORS.textMuted}
              />
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
                onPress={closeStatusModal}
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
                <Text style={styles.modalSectionHeading}>Not started</Text>
                <StatusRow
                  label="TO DO"
                  variant="todo"
                  selected={status === "todo"}
                  onPress={() => setStatus("todo")}
                />
                <View style={styles.modalDividerThin} />

                <Text style={styles.modalSectionHeading}>Active</Text>
                <StatusRow
                  label="IN PROGRESS"
                  variant="in-progress"
                  selected={status === "in-progress"}
                  onPress={() => setStatus("in-progress")}
                />
                <View style={styles.modalDividerThin} />

                <Text style={styles.modalSectionHeading}>Closed</Text>
                <StatusRow
                  label="COMPLETE"
                  variant="complete"
                  selected={status === "complete"}
                  onPress={() => setStatus("complete")}
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

  addPropertyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
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

  /* Inline Add Property menu box */
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
});
