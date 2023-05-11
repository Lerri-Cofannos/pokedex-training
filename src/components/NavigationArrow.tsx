import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { Icon } from "react-native-elements";

export function NavigationArrow({ direction, stackRef }) {
  const isLeft = direction === "left";

  async function goToPokemon() {
    stackRef.current.scrollTo({ count: isLeft ? -1 : 1, animated: true });
  }

  const verticalVal = new Animated.Value(0);
  const config = (value: number) => ({
    toValue: value,
    duration: 1500,
    easing: Easing.inOut(Easing.quad),
    useNativeDriver: false,
  });

  useEffect(() => {
    const range = 10;
    Animated.timing(verticalVal, config(range)).start();
    verticalVal.addListener(({ value }) => {
      if (value == range) {
        Animated.timing(verticalVal, config(0)).start();
      } else if (value == 0) {
        Animated.timing(verticalVal, config(range)).start();
      }
    });
  }, []);

  return (
    <View style={isLeft ? styles.containerLeft : styles.containerRight}>
      <TouchableOpacity onPress={goToPokemon} style={styles.sizer}>
        <Animated.View
          style={{
            transform: [{ translateY: verticalVal }],
          }}
        >
          <Icon
            name={"chevron-thin-" + direction}
            size={40}
            color="black"
            type="entypo"
            style={styles.arrow}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerRight: {
    position: "absolute",
    top: Dimensions.get("window").height / 2 - 100,
    right: 0,
  },
  containerLeft: {
    position: "absolute",
    top: Dimensions.get("window").height / 2 - 100,
    left: 0,
  },
  sizer: {
    height: 200,
    width: 50,
    alignContent: "center",
    justifyContent: "center",
  },
  arrow: {
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
});
