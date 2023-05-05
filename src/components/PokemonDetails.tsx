import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { Image } from "@rneui/themed";
import { Audio } from "expo-av";

import { formatName, formatNumber, isPokemonFlying, pokeapiData } from "./utils";

export function PokemonDetails() {
  const route = useRoute();
  const data = route.params as pokeapiData;

  useEffect(() => {
    async function playSound() {
      const sound = new Audio.Sound();

      await sound.loadAsync({
        uri:
          "https://play.pokemonshowdown.com/audio/cries/" + data.name + ".mp3",
      });

      await sound.playAsync();
      await sound.unloadAsync();
    }
    playSound();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.artwork}
        source={{ uri: data.sprites.other["official-artwork"].front_default }}
      />
      {isPokemonFlying(data.types) ? <View style={styles.sky} /> : <View style={styles.ground} />}
      <Text style={styles.nameTitle}>
        {formatName(data.name)} (n°{data.id})
      </Text>
      <View>
        <Text style={styles.details}>Height: {formatNumber(data.height/10)}m</Text>
        <Text style={styles.details}>Weight: {formatNumber(data.weight/10)}kg</Text>
        <Text style={styles.details}>Abilities:</Text>
        {data.abilities.map((item) => (
          <Text style={styles.list} key={item.slot}>
            {"- " + formatName(item.ability.name)}
          </Text>
        ))}
        <Text style={styles.details}>Types:</Text>
        {data.types.map((item) => (
          <Text style={styles.list} key={item.slot}>
            {"- " + formatName(item.type.name)}
          </Text>
        ))}
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
    justifyContent: "flex-start",
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
  list: {
    fontSize: 18,
    paddingVertical: 0,
    marginLeft: 15,
  },
  row: {
    flexDirection: "row",
  },
  sprites: {
    width: 100,
    height: 100,
  },
  ground: {
    marginBottom: -60,
    position: "relative",
    top: -80,
    zIndex: -1,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#89c",
    opacity: 0.4,
    shadowColor: "#347",
    shadowOpacity: 0.8,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 10 },
    transform: [{ scaleX: 2.5 }],
  },
  sky: {
    marginBottom: 20,
  },
});
