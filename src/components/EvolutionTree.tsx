import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

import { EvolutionTile } from "./EvolutionTile";
import { PokeData } from "../helpers/types";

type ItemProps = {
  data: PokeData[][];
  navigation: any;
  scrollRef: any;
};

export function EvolutionTree({ data, navigation, scrollRef }: ItemProps) {
  return (
    <View style={styles.container}>
      {data.map((row, index) => {
        return row.length == 0 ? (
          <View key={index} />
        ) : (
          <View key={index}>
            <Text style={styles.stageTitle}>
              Evolution stage n°{index + 1}
            </Text>
            {row.map((item) => (
              <EvolutionTile data={item} key={item.id} navigation={navigation} scrollRef={scrollRef}/>
            ))}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  stageTitle: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
  },
});
