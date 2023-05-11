import { View, Dimensions, ViewStyle, Text } from "react-native";
import { interpolate, AnimatedStyleProp } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import React, { useRef } from "react";

import { Card, NavigationArrow } from "../components";

type TAnimationStyle = (value: number) => AnimatedStyleProp<ViewStyle>;

export default function CardStack() {
  const window = Dimensions.get("window");
  const PAGE_WIDTH = window.width;
  const PAGE_HEIGHT = window.height;
  const pokemonMaxIndex = 1010;

  const stackRef = useRef();

  const animationStyle: TAnimationStyle = React.useCallback(
    (value: number) => {
      "worklet";
      const translateX = interpolate(value, [-1, 0, 1], [-PAGE_WIDTH, 0, 0]);
      const zIndex = interpolate(value, [-1, 0, 1], [300, 0, -300]);
      const scale = interpolate(value, [-1, 0, 1], [1, 1, 0.5]);
      const opacity = interpolate(value, [1, 0, 1], [0, 1, 0]);
      return {
        transform: [{ translateX }, { scale }],
        zIndex,
        opacity,
      };
    },
    [PAGE_HEIGHT, PAGE_WIDTH]
  );

  return (
    <View>
      <View style={{ flex: 1 }}>
        <Carousel
          windowSize={5}
          loop
          ref={stackRef}
          style={{
            width: PAGE_WIDTH,
            height: PAGE_HEIGHT,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
          width={PAGE_WIDTH}
          height={PAGE_HEIGHT}
          data={[...new Array(pokemonMaxIndex).keys()]}
          renderItem={({ index, animationValue }) => (
            <Card
              stackRef={stackRef}
              key={index}
              index={index}
              animationValue={animationValue}
            />
          )}
          customAnimation={animationStyle}
        />
      </View>
      <NavigationArrow stackRef={stackRef} direction={"left"} />
      <NavigationArrow stackRef={stackRef} direction={"right"} />
    </View>
  );
}
