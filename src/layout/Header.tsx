import React from "react";
import { View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Image } from "@rneui/themed";

export default function Header() {
  const [loaded] = useFonts({
    solidFont: require("./../../assets/fonts/Pokemon-Solid.ttf"),
    hollowFont: require("./../../assets/fonts/Pokemon-Hollow.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.headerShadow}>
      <View style={styles.ribbon} />
      <View style={styles.container}>
        <Image style={styles.logo} source={require("./../../assets/pokemon-logo.png")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerShadow: {
    zIndex: 100,
    shadowColor: "#009",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  ribbon: {
    width: "100%",
    height: 20,
    backgroundColor: "#ffcc00",
  },
  container: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    zIndex: 100,
    width: 140,
    height: 140,
  }
});
