import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "@rneui/themed";
import { SpriteData } from "../helpers";

export function Sprites({ data }: { data: SpriteData }) {
  const errorSpriteURL =
    "https://pokemonrevolution.net/forum/uploads/monthly_2022_10/Picsart_22-10-21_21-00-41-882.png.ec5258e24abb8c837f62c66a79478f8d.png";

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
    <View style={styles.spriteContainer}>
      <Image
        style={
          isSpriteFlipped
            ? [styles.sprites, { transform: [{ rotateY: "180deg" }] }]
            : styles.sprites
        }
        source={{
          uri:
            (isSpriteFront ? data.front_default : data.back_default) ||
            errorSpriteURL,
        }}
      />
      <Image
        style={
          isSpriteFlipped
            ? [styles.sprites, { transform: [{ rotateY: "180deg" }] }]
            : styles.sprites
        }
        source={{
          uri:
            (isSpriteFront ? data.back_default : data.front_default) ||
            errorSpriteURL,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  spriteContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  sprites: {
    width: 120,
    height: 120,
  },
});
