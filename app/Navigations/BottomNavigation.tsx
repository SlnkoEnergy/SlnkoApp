import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTab from '../layout/BottomTab';
import { BottomTabParamList } from './BottomTabParamList';
import Messages from '../Screens/Chat/Messages';
import Estimates from '../Screens/Estimates/Estimates';
import Project from '../Screens/Project/Project';
import Company from '../Screens/Company/Company';
import Contacts from '../Screens/Contacts/Contacts';
import MyTask from "../Screens/MyTasks/MyTask";


const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomNavigation = () => {

    return (
        <Tab.Navigator
            initialRouteName='Estimates'
            screenOptions={{
                headerShown: false
            }}
            tabBar={(props: any) => <BottomTab {...props} />}
        >
            <Tab.Screen
                name="Estimates"
                component={Estimates}
            />
            <Tab.Screen
                name="Project"
                component={Project}
            />
            <Tab.Screen
                name="Company"
                component={Company}
            />
            <Tab.Screen
                name="Contacts"
                component={Contacts}
            />
            <Tab.Screen
                name="My Task"
                component={MyTask}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigation;