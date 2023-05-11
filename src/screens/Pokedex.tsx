import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import React from "react";

import { PokemonTile } from "../components";

export function Pokedex({ navigation }) {
  const maxPokemonIndex = 898;

  const [isSpriteFront, setIsSpriteFront] = useState<boolean>(true);
  const [isSpriteFlipped, setIsSpriteFlipped] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => rotate(), 800);
    var rotate = function () {
      if (isSpriteFlipped) {
        setIsSpriteFront(!isSpriteFront);
      }
      setIsSpriteFlipped(!isSpriteFlipped);
    };
  }, [isSpriteFlipped]);

  return (
    <View style={styles.container}>
      <FlatList
        data={[...Array(maxPokemonIndex).keys()]}
        renderItem={({ index }) => (
          <PokemonTile
            index={index}
            navigation={navigation}
            isFront={isSpriteFront}
            isFlipped={isSpriteFlipped}
          />
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
});
