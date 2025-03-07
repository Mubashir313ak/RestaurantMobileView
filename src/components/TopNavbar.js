import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const TopNavBar = () => {
  const navigation = useNavigation();

  // Check if navigation object has the toggleDrawer method
  if (navigation && navigation.toggleDrawer) {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 80,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#6200ea",
          paddingHorizontal: 10,
          paddingTop: 30,
        }}
      >
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <MaterialIcons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={{ color: "#fff", fontSize: 20 }}>App Title</Text>
        {/* Empty space to balance the right side */}
        <View />
      </View>
    );
  }

  // If navigation does not have toggleDrawer, return a default view
  return <View />;
};

export default TopNavBar;
