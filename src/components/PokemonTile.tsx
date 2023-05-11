import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { Image } from "@rneui/themed";

import { formatName } from "../helpers/utils";
import { PokeData } from "../helpers/types";

type ItemProps = {
  index: number;
  navigation: any;
  isFront: boolean;
  isFlipped: boolean;
};

export function PokemonTile({
  index,
  navigation,
  isFront,
  isFlipped,
}: ItemProps) {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/`;
  const pokeIndex = index + 1;

  const [data, setData] = useState<PokeData>(undefined);

  useEffect(() => {
    const triggerAPICall = async () => {
      const data: PokeData = await fetch(apiUrl + pokeIndex).then((response) =>
        response.json()
      );
      setData(data);
    };
    triggerAPICall();
  }, []);

  return !!data ? (
    <TouchableOpacity
      style={styles.tile}
      onPress={() => navigation.navigate("Pokemon Details", data)}
    >
      <View style={styles.tag}>
        <Image
          style={
            isFlipped
              ? [styles.sprite, { transform: [{ rotateY: "180deg" }] }]
              : styles.sprite
          }
          source={{
            uri: isFront
              ? data.sprites.front_default
              : data.sprites.back_default,
          }}
        />
        <Text style={styles.name}>
          {data.id}. {formatName(data.name)}
        </Text>
      </View>
    </TouchableOpacity>
  ) : (
    <View />
  );
}

const styles = StyleSheet.create({
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
});
