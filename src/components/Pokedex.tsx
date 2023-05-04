import { Button, FlatList, StyleSheet, Text, View } from "react-native";
const pokemonList = require("./../../assets/kanto.json");

type ItemProps = { name: string; navigation: any };

const Pokemon = ({ name, navigation }: ItemProps) => (
  <View style={styles.pokemon}>
    <Text style={styles.name}>{name}</Text>
    <Button
      title="Details"
      onPress={() => navigation.navigate("PokemonPage")}
    />
  </View>
);

export function Pokedex({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        renderItem={({ item }) => (
          <Pokemon name={item.name} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  pokemon: {
    backgroundColor: "#bdf",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  name: {
    fontSize: 20,
  },
});
