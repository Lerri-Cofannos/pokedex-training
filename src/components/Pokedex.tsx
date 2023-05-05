import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

import { formatName, pokeapiData } from "./utils";

type ItemProps = { index: number; navigation: any };

function Pokemon({ index, navigation }: ItemProps) {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/`;
  const pokeIndex = index + 1;

  const [data, setData] = useState<pokeapiData>(undefined);

  useEffect(() => {
    const triggerAPICall = async () => {
      const data: pokeapiData = await fetch(apiUrl + pokeIndex).then(
        (response) => response.json()
      );
      setData(data);
    };
    triggerAPICall();
  }, []);

  return !!data ? (
    <View style={styles.pokemon}>
      <Text style={styles.name}>
        {pokeIndex}. {formatName(data.name)}
      </Text>
      <View style={styles.button}>
        <Button
          title="+"
          onPress={() => navigation.navigate("Pokemon Details", data)}
        />
      </View>
    </View>
  ) : (
    <View />
  );
}

export function Pokedex({ navigation }) {
  const maxPokemonIndex = 898;
  return (
    <View style={styles.container}>
      <FlatList
        data={[...Array(maxPokemonIndex).keys()]}
        renderItem={({ index }) => (
          <Pokemon index={index} navigation={navigation} />
        )}
        keyExtractor={(index) => index.toString()}
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
    width: 300,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#dde",
    borderRadius: 5,
    shadowOffset: { width: 0, height: 10 },
    justifyContent: "center",
    flexDirection: "column",
    alignContent: "flex-start",
    width: 35,
    height: 35,
    fontSize: 45,
  },
});
