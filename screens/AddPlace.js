import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { launchCameraAsync } from "expo-image-picker";
import { Colors } from "../constants/colors";
import CustomButton from "../components/CustomButton";
import Place from "../models/Place";
import {
  useForegroundPermissions,
  PermissionStatus,
  getCurrentPositionAsync,
} from "expo-location";
import { insertPlace } from "../utils/database";

function AddPlace({ navigation }) {
  const [placeTitle, setPlaceTitle] = useState("");
  const [image, setImage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState();
  const [permissionResponse, requestPermission] = useForegroundPermissions();

  const route = useRoute();
  const pickedLocation = route.params;

  useEffect(() => {
    if (pickedLocation) {
      setSelectedLocation(pickedLocation);
    }
  }, [pickedLocation]);

  async function submitHandler() {
    const place = new Place(placeTitle, image, selectedLocation);
    await insertPlace(place);
    navigation.navigate("FavoritePlaces", {
      place: place,
    });
  }

  const captureImageHandler = async () => {
    let result = await launchCameraAsync({
      //mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const verifyLocationPermission = async () => {
    if (permissionResponse.status == PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();
      return response.granted;
    }

    if (permissionResponse.status == PermissionStatus.DENIED) {
      Alert.alert(
        "Permission denied",
        "You don't have the permission to access location"
      );
      return false;
    }

    return true;
  };

  const locateUser = async () => {
    const hasPermissions = await verifyLocationPermission();
    if (!hasPermissions) return;
    const location = await getCurrentPositionAsync();

    setSelectedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickLocation = () => {
    navigation.navigate("LocationPicker");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setPlaceTitle(text);
        }}
      ></TextInput>
      <View style={styles.imageContainer}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ borderRadius: 8, height: "100%", width: "100%" }}
          />
        )}
      </View>
      <CustomButton
        icon="camera"
        text="Capture"
        onPress={captureImageHandler}
      ></CustomButton>
      <View
        style={[
          styles.imageContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        {selectedLocation && (
          <Text style={styles.selectedLocation}>
            Selected Location :{" "}
            {selectedLocation.lat.toFixed(2) +
              " , " +
              selectedLocation.lng.toFixed(2)}
          </Text>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <CustomButton
          icon="location"
          text="Locate"
          onPress={locateUser}
        ></CustomButton>
        <CustomButton
          icon="map"
          text="Pick"
          onPress={pickLocation}
        ></CustomButton>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end", margin: 32 }}>
        <Button title="Submit" onPress={submitHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    margin: 12,
    padding: 8,
    borderColor: "white",
    color: "white",
    fontSize: 16,
    borderWidth: 1,
  },
  imageContainer: {
    height: 150,
    margin: 12,
    padding: 2,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primary700,
  },
  selectedLocation: {
    color: "white",
  },
});
export default AddPlace;
