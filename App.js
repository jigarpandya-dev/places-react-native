import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "./constants/colors";
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ImagePicker from "./screens/ImagePicker";
import AddPlace from "./screens/AddPlace";
import FavoritePlaces from "./screens/FavoritePlaces";
import LocationPicker from "./screens/LocationPicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { init } from "./utils/database";

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.primary800,
  },
};

export default function App() {
  useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary700,
            },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="FavoritePlaces"
            component={FavoritePlaces}
            options={({ navigation }) => ({
              title: "Favourite Places",
              headerRight: () => {
                return (
                  <Ionicons
                    name="add"
                    size={32}
                    color="white"
                    onPress={() => {
                      navigation.navigate("AddPlace");
                    }}
                  />
                );
              },
            })}
          ></Stack.Screen>
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add Place",
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="LocationPicker"
            component={LocationPicker}
            options={{
              title: "Pick a location",
            }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
