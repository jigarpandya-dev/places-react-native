import React, { useState, useLayoutEffect, useCallback } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

function LocationPicker({ navigation }) {
  const [pickedLocation, setPickedLocation] = useState();

  const saveLocationHandler = useCallback(() => {
    navigation.navigate("AddPlace", {
      lat: pickedLocation.latitude,
      lng: pickedLocation.longitude,
    });
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Ionicons
            name="save-outline"
            size={24}
            color="white"
            onPress={saveLocationHandler}
          />
        );
      },
    });
  }, [navigation, saveLocationHandler]);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        onPress={(event) => {
          setPickedLocation(event.nativeEvent.coordinate);
        }}
      >
        {pickedLocation && <Marker coordinate={pickedLocation}></Marker>}
      </MapView>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
