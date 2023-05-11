import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

import { EvolutionTile } from "./EvolutionTile";
import { PokeData } from "./../helpers";

type ItemProps = {
  data: PokeData[][];
  stackRef: any;
};

export function EvolutionTree({ data, stackRef }: ItemProps) {
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
              <EvolutionTile data={item} key={item.id} stackRef={stackRef}/>
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
