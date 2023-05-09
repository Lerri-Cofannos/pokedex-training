import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "@rneui/themed";

import { formatName, PokeData } from "../helpers";

type ItemProps = {
  data: PokeData;
  navigation: any;
  scrollRef: any;
};

export function EvolutionTile({ data, navigation, scrollRef }: ItemProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
        navigation.navigate("Pokemon Details", data);
      }}
    >
      <View style={styles.container}>
        <Image
          style={styles.artwork}
          source={{ uri: data.sprites.other["official-artwork"].front_default }}
        />
        <Text style={styles.name}>
          {formatName(data.name)} (n°{data.id})
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  artwork: {
    width: 120,
    height: 120,
  },
  name: {
    fontSize: 16,
  },
});
