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

import SubHeader from "../../layout/SubHeader"
// If you later want a custom header, you can import it here and render above the tabs
// import Header from "../../layout/Header";

type ProjectScreenProps = StackScreenProps<RootStackParamList, "Project">;

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
            <Icon name="check" size={12} color="#000" />
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
          color={isComplete ? "#22c55e" : COLORS.primary}
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

const Project: React.FC<ProjectScreenProps> = ({ route, navigation }) => {
  // Make params safe in case this screen is opened without activityName
  const activityName = route?.params?.activityName ?? "Task name";

  const [activeTab, setActiveTab] = useState<"details" | "activity">("details");
  const [statusActiveTab, setStatusActiveTab] =
    useState<"status" | "taskType">("status");
  const [status, setStatus] = useState<StatusKey>("in-progress");
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  const [taskType, setTaskType] = useState<TaskTypeKey>("task");

  // visibility for inline property box
  const [propertyModalVisible, setPropertyModalVisible] = useState(false);

  // Activity state
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

    if (value === "in-progress") {
      iconName = "info";
      color = "#3b82f6";
    } else if (value === "complete") {
      iconName = "check-circle";
      color = "#22c55e";
    } else if (value === "todo") {
      iconName = "loader";
      color = "#e5e7eb";
    }

    return (
      <View style={styles.activityStatusChip}>
        <Icon
          name={iconName}
          size={14}
          color={color}
          style={{ marginRight: 4 }}
        />
        <Text style={[styles.activityStatusChipText, { color }]}>
          {statusLabelMap[value]}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* If you want a header, add it here */}
      <SubHeader />
      {/* <Header navigation={navigation} title="Project" /> */}

      {/* Top Tabs: Details / Activity */}
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

      {activeTab === "details" ? (
        /* ---------------- DETAILS TAB ---------------- */
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.listLabel}>Personal List</Text>

          <Text style={styles.titleText}>{activityName}</Text>

          {/* Status & Type row – opens modal */}
          <TouchableOpacity style={styles.sectionRow} onPress={openStatusModal}>
            <View style={styles.statusIconWrapper}>
              <View style={styles.statusOuterDot}>
                <View style={styles.statusInnerDot} />
              </View>
            </View>

            <View>
              <Text style={styles.sectionLabel}>Status & Type</Text>
              <Text style={styles.statusText}>
                {statusLabelMap[status] ?? "IN PROGRESS"}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Assignee */}
          <TouchableOpacity style={styles.rowButton}>
            <View style={styles.rowLeft}>
              <View style={styles.rowIconWrapper}>
                <Icon name="user" size={16} color="#fff" />
              </View>
              <Text style={styles.rowLabel}>Add Assignee</Text>
            </View>
            <Icon name="chevron-right" size={18} color="#777" />
          </TouchableOpacity>

          {/* Due Date */}
          <TouchableOpacity style={styles.rowButtonDate}>
            <View style={styles.rowLeft}>
              <View style={styles.rowIconWrapper}>
                <Icon name="calendar" size={16} color="#fff" />
              </View>
              <View>
                <Text style={styles.rowLabel}>Due date</Text>
                <Text style={styles.rowValue}>Nov 24</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={18} color="#777" />
          </TouchableOpacity>

          {/* Add property */}
          <TouchableOpacity
            style={styles.addPropertyRow}
            onPress={() =>
              setPropertyModalVisible((prevVisible) => !prevVisible)
            }
          >
            <Icon name="plus" size={16} color={COLORS.primary} />
            <Text style={styles.addPropertyText}>Add property</Text>
          </TouchableOpacity>

          {/* Inline property box directly under "Add property" */}
          {propertyModalVisible && (
            <View style={styles.propertyInlineCard}>
              <TouchableOpacity style={styles.propertyItem}>
                <View style={styles.propertyItemLeft}>
                  <Icon name="flag" size={16} color={COLORS.primary} />
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
                <Text style={styles.propertyAddSubtaskText}>Add Subtask</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Divider – full width */}
          <View style={styles.divider} />

          {/* Description */}
          <TouchableOpacity style={styles.rowButtonDesc}>
            <View style={styles.rowLeft}>
              <Text style={styles.sectionLabel}>Description</Text>
            </View>
            <Icon name="chevron-right" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.descriptionPlaceholder}>
              Tap to add a description
            </Text>
          </TouchableOpacity>

          {/* Divider – full width */}
          <View style={styles.divider} />

          {/* Upload Document */}
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
        </ScrollView>
      ) : (
        /* ---------------- ACTIVITY TAB ---------------- */
        <View style={styles.activityContainer}>
          <ScrollView
            style={styles.activityScroll}
            contentContainerStyle={styles.activityScrollContent}
          >
            {activity.map((item) => {
              if (item.kind === "comment") {
                // Comment card
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

              // System / status card
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
                          color={COLORS.textSecondary}
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
              <Icon name="plus" size={18} color={COLORS.textSecondary} />
            </View>

            <TextInput
              style={styles.commentInput}
              placeholder="Write a comment"
              placeholderTextColor={COLORS.textMuted}
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
        animationType="slide"
        onRequestClose={closeStatusModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity onPress={closeStatusModal}>
            <View style={styles.modelBlur} />
          </TouchableOpacity>

          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Status & Task Type</Text>

              <TouchableOpacity
                onPress={closeStatusModal}
                style={{ padding: 4 }}
              >
                <Text style={styles.modalDoneText}>Done</Text>
              </TouchableOpacity>
            </View>

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
                {/* Not started */}
                <Text style={styles.modalSectionHeading}>Not started</Text>
                <StatusRow
                  label="TO DO"
                  variant="todo"
                  selected={status === "todo"}
                  onPress={() => setStatus("todo")}
                />
                <View style={styles.modalDividerThin} />

                {/* Active */}
                <Text style={styles.modalSectionHeading}>Active</Text>
                <StatusRow
                  label="IN PROGRESS"
                  variant="in-progress"
                  selected={status === "in-progress"}
                  onPress={() => setStatus("in-progress")}
                />
                <View style={styles.modalDividerThin} />

                {/* Closed */}
                <Text style={styles.modalSectionHeading}>Closed</Text>
                <StatusRow
                  label="COMPLETE"
                  variant="complete"
                  selected={status === "complete"}
                  onPress={() => setStatus("complete")}
                />
              </ScrollView>
            ) : (
              /* Task Type list */
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

export default Project;

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 20,
  },

  /* Top tabs */
  tabsRow: {
    flexDirection: "row",
    paddingTop: 20,
    borderBottomColor: COLORS.textMuted,
    borderBottomWidth: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    position: "relative",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
  },
  tabTextActive: {
    color: COLORS.textSecondary,
  },
  tabTextInactive: {
    color: COLORS.textMuted,
  },
  tabIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -1,
    height: 2,
    backgroundColor: COLORS.primary,
  },

  /* Main content */
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  listLabel: {
    color: COLORS.textPrimary,
    fontSize: 15,
    marginBottom: 4,
  },
  titleText: {
    color: COLORS.textSecondary,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },

  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomColor: COLORS.textSecondary,
    borderBottomWidth: 1,
  },

  statusIconWrapper: {
    marginRight: 10,
  },
  statusOuterDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
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
  },
  statusText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginTop: 2,
  },

  rowButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomColor: COLORS.textSecondary,
    borderBottomWidth: 1,
  },
  rowButtonDesc: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  rowButtonDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1f2937",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  rowLabel: {
    color: COLORS.textPrimary,
    fontSize: 14,
    marginBottom: 2,
  },
  rowValue: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },

  addPropertyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  addPropertyRowDoc: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingLeft: 8,
  },
  addPropertyText: {
    marginLeft: 6,
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "500",
  },

  divider: {
    height: 10,
    backgroundColor: COLORS.textSecondary,
    marginVertical: 8,
    marginHorizontal: -26,
    alignSelf: "stretch",
  },

  descriptionPlaceholder: {
    paddingTop: 2,
    color: COLORS.textMuted,
    fontSize: 13,
  },

  /* Activity tab container */
  activityContainer: {
    flex: 1,
  },
  activityScroll: {
    flex: 1,
  },
  activityScrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 80, // space for comment bar
  },
  activityCard: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  activitySystemText: {
    color: "#f9fafb",
    fontSize: 13,
    marginBottom: 6,
  },
  activityStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  activityStatusChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: "#020617",
  },
  activityStatusChipText: {
    fontSize: 12,
    fontWeight: "600",
  },
  activityTimestampSmall: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 2,
  },

  /* Comment item */
  activityCommentBlock: {
    marginBottom: 16,
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
    backgroundColor: COLORS.textSecondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  activityAvatarInitial: {
    color: "#fff",
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
  },

  /* Comment bar at bottom */
  commentBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.textMuted,
    backgroundColor: "#000",
  },
  commentPlusWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.textMuted,
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
    backgroundColor: "#111827",
    color: COLORS.textSecondary,
    fontSize: 14,
    marginRight: 8,
  },

  /* Modal styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  modelBlur: {
    backgroundColor: "rgba(255,255,255,0.3)",
    height: 80,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
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
  modalSearchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111827",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 38,
    marginBottom: 12,
  },
  modalSearchInput: {
    flex: 1,
    marginLeft: 6,
    color: COLORS.textSecondary,
    fontSize: 14,
    paddingVertical: 0,
  },
  modalTabsRow: {
    flexDirection: "row",
    borderBottomColor: "#27272a",
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  modalTabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
  },
  modalTabTextActive: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },
  modalTabTextInactive: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  modalTabIndicator: {
    marginTop: 4,
    height: 2,
    width: "100%",
    backgroundColor: COLORS.textSecondary,
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
    backgroundColor: "#27272a",
    marginVertical: 8,
  },

  /* Status rows inside modal */
  statusRowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  },
  statusCircleInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  statusCircleComplete: {
    borderWidth: 0,
    backgroundColor: "#22c55e",
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
    borderBottomWidth: 0.5,
    borderBottomColor: "#27272a",
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
    marginTop: 8,
    backgroundColor: COLORS.textMuted,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  propertyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#27272a",
  },
  propertyItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  propertyItemLabel: {
    marginLeft: 8,
    color: "#ffffff",
    fontSize: 13,
  },
  propertyAddSubtaskRow: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  propertyAddSubtaskText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "500",
  },
});
