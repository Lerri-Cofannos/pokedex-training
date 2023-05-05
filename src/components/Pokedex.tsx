import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "@rneui/themed";

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
    <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate("Pokemon Details", data)}>
      <View style={styles.tag}>
        <Image
          style={styles.sprite}
          source={{ uri: data.sprites.front_default }}
        />
        <Text style={styles.name}>{data.id}. {formatName(data.name)}</Text>
      </View>
    </TouchableOpacity>
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
  tile: {
    backgroundColor: "#bdf",
    paddingHorizontal: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 300,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
  },
  sprite: {
    height: 60,
    width: 60,
  },
  name: {
    fontSize: 18,
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
