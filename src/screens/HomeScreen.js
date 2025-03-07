import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper"; // Optional for button styling
import { FlatList } from "react-native"; // Optional for displaying list of food items
import LoginScreen from "./auth/LoginScreen";

const { width, height } = Dimensions.get("window"); // Get device screen dimensions

const data = [
  { id: "1", name: "Pizza", image: "https://example.com/pizza.jpg" },
  { id: "2", name: "Burger", image: "https://example.com/burger.jpg" },
  { id: "3", name: "Pasta", image: "https://example.com/pasta.jpg" },
  { id: "4", name: "Salad", image: "https://example.com/salad.jpg" },
  // Add more food items here
];

const HomeScreen = () => {
  return (
    <>
      <LoginScreen />
    </>
    // <ScrollView style={styles.container}>
    //   <ImageBackground
    //     source={{ uri: "https://example.com/food-background.jpg" }} // Background image
    //     style={styles.backgroundImage}
    //   >
    //     <View style={styles.headerContainer}>
    //       <Text style={styles.headerText}>Welcome to Foodies</Text>
    //       <Button mode="contained" style={styles.button}>
    //         Explore Now
    //       </Button>
    //     </View>
    //   </ImageBackground>

    //   <Text style={styles.sectionTitle}>Popular Dishes</Text>

    //   {/* FlatList to display food items */}
    //   <FlatList
    //     data={data}
    //     renderItem={({ item }) => (
    //       <View style={styles.foodCard}>
    //         <ImageBackground
    //           source={{ uri: item.image }}
    //           style={styles.foodImage}
    //           imageStyle={{ borderRadius: 10 }}
    //         >
    //           <Text style={styles.foodName}>{item.name}</Text>
    //         </ImageBackground>
    //       </View>
    //     )}
    //     keyExtractor={(item) => item.id}
    //     horizontal
    //     showsHorizontalScrollIndicator={false}
    //   />
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  backgroundImage: {
    width: "100%",
    height: height * 0.4, // 40% of the screen height
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    padding: 20,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#ff6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  foodCard: {
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
    width: width * 0.6, // Take 60% of the screen width
    marginBottom: 20,
  },
  foodImage: {
    width: "100%",
    height: 150,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  foodName: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add some transparency for text visibility
    paddingVertical: 5,
    width: "100%",
  },
});

export default HomeScreen;
