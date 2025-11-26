import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavigation from './BottomNavigation';
import { SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Sidebar from '../layout/Sidebar';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const { colors }: { colors: any } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
      <Drawer.Navigator
        initialRouteName="BottomNavigation"
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: colors.card,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}
        drawerContent={(props) => <Sidebar navigation={props.navigation} />}
      >
        <Drawer.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={{
            drawerLabel: "Home",
            title: "Home",
          }}
        />
      </Drawer.Navigator>
    </SafeAreaView>
  );
};

export default DrawerNavigation;
