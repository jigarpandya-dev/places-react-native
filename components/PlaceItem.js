import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Colors } from "../constants/colors";

function PlaceItem({ place, onItemClick }) {
  function onItemClickHandler() {
    onItemClick(place.id);
  }

  return (
    <Pressable onPress={onItemClickHandler}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: place.image }} />
        </View>
        <View style={styles.textContainer}>
          <Text>{place.title}</Text>
          <Text>
            {place.location.lat.toFixed(2) +
              " , " +
              place.location.lng.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 8,
    margin: 8,
    backgroundColor: Colors.primary400,
  },
  imageContainer: {
    flex: 1,
    height: 140,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "80%",
    width: "100%",
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    margin: 8,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
export default PlaceItem;
