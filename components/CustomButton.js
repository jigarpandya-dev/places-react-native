import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

function CustomButton({ icon, text, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Ionicons name={icon} color={Colors.primary400} size={24} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    minWidth: "45%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: 12,
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primary700,
  },
  text: {
    color: Colors.primary400,
    marginStart: 8,
    fontSize: 16,
  },
});
