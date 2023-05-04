import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { Image } from "@rneui/themed";

import { formatName, pokeapiData } from "./utils";

export function PokemonDetails() {
  const route = useRoute();
  const data = route.params as pokeapiData;

  return (
    <View style={styles.container}>
      <Image
        style={styles.artwork}
        source={{ uri: data.sprites.other["official-artwork"].front_default }}
      />
      <Text style={styles.nameTitle}>
        {formatName(data.name)} (n°{data.id})
      </Text>
      <View>
        <Text style={styles.details}>Height: {data.height}</Text>
        <Text style={styles.details}>Weight: {data.weight}kg</Text>
        <Text style={styles.details}>
          Abilities:{" "}
          {data.abilities
            .map((item) => formatName(item.ability.name))
            .join(", ")}
        </Text>
      </View>
      <View style={styles.row}>
        <Image
          style={styles.sprites}
          source={{ uri: data.sprites.front_default }}
        />
        <Image
          style={styles.sprites}
          source={{ uri: data.sprites.back_default }}
        />
      </View>
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
  artwork: {
    width: 200,
    height: 200,
  },
  nameTitle: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 5,
  },
  details: {
    fontSize: 18,
    padding: 5,
  },
  row: {
    flexDirection: "row",
  },
  sprites: {
    width: 100,
    height: 100,
  },
});
