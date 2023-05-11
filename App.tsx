import React from "react";
import { View } from "react-native";

import CardStack from "./src/layout/CardStack";
import Header from "./src/layout/Header";

export default function App() {
  return (
    <View>
      <Header />
      <CardStack />
    </View>
  );
}
