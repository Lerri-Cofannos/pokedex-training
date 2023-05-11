import React, { useState, useEffect } from "react";
import { View } from "react-native";

import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import { PokemonDetails } from "./PokemonDetails";
import { PokeData } from "../helpers";

export function Card({ animationValue, index, stackRef }) {
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

  const maskStyle = useAnimatedStyle(() => {
    const zIndex = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [300, 0, -300]
    );

    const backgroundColor = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ["transparent", "transparent", "rgba(0,0,0,0.3)"]
    );

    return {
      backgroundColor,
      zIndex,
    };
  }, [animationValue]);

  return (
    <View
      style={{
        backgroundColor: "#000",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          maskStyle,
          { position: "absolute", width: "100%", height: "100%" },
        ]}
      />
      {!!data ? <PokemonDetails data={data} stackRef={stackRef} /> : <View />}
    </View>
  );
};
