import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "@rneui/themed";

import { formatName, PokeData } from "../helpers";

type ItemProps = {
  data: PokeData;
  stackRef: any;
};

export function EvolutionTile({ data, stackRef }: ItemProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(stackRef.current);
        console.log(data.id)
        stackRef.current.scrollTo({ index:1, animated: true });
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
