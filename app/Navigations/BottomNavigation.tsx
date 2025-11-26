import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";

import BottomTab from "../layout/BottomTab";
import { BottomTabParamList } from "./BottomTabParamList";

import Messages from "../Screens/Chat/Messages";
import Estimates from "../Screens/Estimates/Estimates";
import Project from "../Screens/Project/Project";
import Company from "../Screens/Company/Company";
import Contacts from "../Screens/Contacts/Contacts";
import MyTask from "../Screens/MyTasks/MyTask";
import Invite from "../Screens/Settings/Invite";
import Settings from "../Screens/Settings/Settings";

const Tab = createBottomTabNavigator<BottomTabParamList>();


const TAB_ICONS: Record<keyof BottomTabParamList, string> = {
  Estimates: "file-text",
  Project: "grid",
  MyTask: "home",
  Contacts: "check-square",
  Invite: "user-plus",
  Messages: "message-circle",
  Company: "briefcase",
  Settings: "settings",
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Project"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarLabel:
          route.name === "Contacts"
            ? "Homw"
            : route.name === "MyTask"
            ? "My Task"
            : route.name,

        tabBarIcon: ({ color, size, focused }) => {
          const iconName =
            TAB_ICONS[route.name as keyof BottomTabParamList] || "circle";

          const finalSize = focused ? size + 2 : size;

          return <Icon name={iconName} color={color} size={finalSize} />;
        },
      })}
      tabBar={(props: any) => <BottomTab {...props} />}
    >
      <Tab.Screen name="Estimates" component={Estimates} />
      <Tab.Screen name="Project" component={Project} />
      
      <Tab.Screen
  name="Contacts"
  component={Contacts}
  options={{ tabBarLabel: "My Task" }}
/>
<Tab.Screen name="MyTask" component={MyTask} />
      <Tab.Screen name="Invite" component={Invite} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
