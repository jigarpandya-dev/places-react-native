import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { useRoute, useIsFocused } from "@react-navigation/native";
import { fetchPlaceDetails, fetchPlaces } from "../utils/database";
import { FlatList } from "react-native-gesture-handler";
import Place from "../models/Place";
import PlaceItem from "../components/PlaceItem";
import { createUser } from "../utils/network";

function FavoritePlaces() {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();
  //const route = useRoute();
  //const place = route.params?.place;

  useEffect(() => {
    //if (place) console.log(place);
    async function loadPlaces() {
      const places = await fetchPlaces();
      setPlaces(places);
      // const res = await createUser("jigar@grr.com", "123456");
      // console.log(res.error ? res.error.message : res);
    }
    if (isFocused) loadPlaces();
  }, [isFocused]);

  async function onItemClickHandler(id) {
    const placeFromDb = await fetchPlaceDetails(id);
    console.log("Place from db is " + placeFromDb.lat);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        keyExtractor={(item) => item.image}
        renderItem={({ item }) => (
          <PlaceItem place={item} onItemClick={onItemClickHandler}></PlaceItem>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default FavoritePlaces;
