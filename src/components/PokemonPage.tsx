import { View, Text, Button, StyleSheet } from "react-native";

export function PokemonPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Back to Pokedex"
        onPress={() => navigation.navigate("Pokedex")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
  },
});
