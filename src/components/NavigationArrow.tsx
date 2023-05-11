import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

import { PokeData } from "../helpers";

export function NavigationArrow({ aimId, direction, navigation }) {
  async function goToPokemon() {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/`;
    const newData: PokeData = await fetch(apiUrl + aimId).then((response) =>
      response.json()
    );
    navigation.setOptions({
      animationEnabled:  false,
    });
    navigation.replace("Pokemon Details", newData);
  }
  const iconName = direction === "left" ? "chevron-left" : "chevron-right";
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToPokemon}>
        <Icon name={iconName} size={30} color="black" type="entypo" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    alignContent: "center",
    justifyContent: "center",
  },
});
