import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack"; // Import StackNavigator
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SearchScreen from "../screens/SearchScreen";
import BottomTabNavigator from "./BottomTabNavigator"; // Import BottomTabNavigator
import LoginScreen from "../screens/auth/LoginScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator(); // Stack navigator to wrap the BottomTabNavigator

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Tabs" // Set the initial route to "Tabs"
      screenOptions={{
        headerShown: false, // Hide the default header for the drawer
      }}
    >
      {/* Wrap BottomTabNavigator inside a StackNavigator */}
      <Drawer.Screen name="Tabs" options={{ title: "Home" }}>
        {() => (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />

            {/* Screen that will always have the bottom tab navigator visible */}
            <Stack.Screen name="Tabs" component={BottomTabNavigator} />
            {/* Other screens inside the stack that you want to show */}
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />

            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
            <Stack.Screen name="Search" component={SearchScreen} />
          </Stack.Navigator>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
