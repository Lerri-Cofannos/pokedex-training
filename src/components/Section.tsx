import { View, Text, StyleSheet } from "react-native";
import React from "react";

export function Section({ title, children }: { title: string; children: any }) {
  return (
    <View style={sectionStyles.container}>
      <Text style={sectionStyles.title}>{title}</Text>
      <View style={sectionStyles.content}>{children}</View>
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 0,
  },
  content: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 300,
  },
});
