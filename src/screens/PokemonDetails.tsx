import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Image } from "@rneui/themed";
import { Audio } from "expo-av";

import {
  formatName,
  formatNumber,
  PokeData,
  speciesDataExtractor,
} from "../helpers";
import { EvolutionTree, Section } from "../components";
import { NavigationArrow } from "../components/NavigationArrow";

export function PokemonDetails({ navigation }) {
  const route = useRoute();
  const data = route.params as PokeData;

  const [subtitle, setSubtitle] = useState<string>(undefined);
  const [evolutionTree, setEvolutionTree] = useState<PokeData[][]>(undefined);

  const scrollRef = useRef();

  useEffect(() => {
    async function triggerSpeciesAPI() {
      const [sub, evTree] = await speciesDataExtractor(data.species.url);
      setSubtitle(sub);
      setEvolutionTree(evTree);
    }
    triggerSpeciesAPI();
  }, []);

  useEffect(() => {
    async function playSound() {
      const sound = new Audio.Sound();

      await sound.loadAsync({
        uri:
          "https://play.pokemonshowdown.com/audio/cries/" + data.name + ".mp3",
      });

      await sound.playAsync();
      await sound.unloadAsync();
    }
    playSound();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#eee" }}>
      <ScrollView
        contentContainerStyle={styles.container}
        contentOffset={{ x: 0, y: 0 }}
        ref={scrollRef}
      >
        <View style={styles.header}>
          <NavigationArrow
            aimId={data.id - 1}
            direction="left"
            navigation={navigation}
          />
          <View style={styles.headerImage}>
            <Image
              style={styles.artwork}
              source={{
                uri: data.sprites.other["official-artwork"].front_default,
              }}
            />
            {data.types.some((item) => item.type.name === "flying") ? (
              <View style={styles.sky} />
            ) : (
              <View style={styles.ground} />
            )}
          </View>
          <NavigationArrow
            aimId={data.id + 1}
            direction="right"
            navigation={navigation}
          />
        </View>
        <Text style={styles.nameTitle}>
          {formatName(data.name)} (n°{data.id})
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Section title={"Details"}>
          <View style={styles.detailsContainer}>
            <Text style={styles.details}>
              Height: {formatNumber(data.height / 10)}m
            </Text>
            <Text style={styles.details}>
              Weight: {formatNumber(data.weight / 10)}kg
            </Text>
            <Text style={styles.details}>Abilities:</Text>
            {data.abilities.map((item) => (
              <Text style={styles.list} key={item.slot}>
                {"- " + formatName(item.ability.name)}
              </Text>
            ))}
            <Text style={styles.details}>Types:</Text>
            {data.types.map((item) => (
              <Text style={styles.list} key={item.slot}>
                {"- " + formatName(item.type.name)}
              </Text>
            ))}
          </View>
        </Section>
        <Section title={"Sprites"}>
          <View style={styles.spriteContainer}>
            <Image
              style={styles.sprites}
              source={{ uri: data.sprites.front_default }}
            />
            <Image
              style={styles.sprites}
              source={{ uri: data.sprites.back_default }}
            />
          </View>
        </Section>
        <Section title={"Evolution Tree"}>
          {!evolutionTree ? (
            <Text style={styles.details}>
              Searching in the evolution tree...
            </Text>
          ) : (
            <EvolutionTree
              data={evolutionTree}
              navigation={navigation}
              scrollRef={scrollRef}
            />
          )}
        </Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  headerImage: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  artwork: {
    width: 200,
    height: 200,
  },
  nameTitle: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 5,
    paddingBottom: 0,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
    paddingBottom: 10,
  },
  detailsContainer: {
    alignItems: "flex-start",
  },
  details: {
    fontSize: 18,
    padding: 5,
  },
  list: {
    fontSize: 18,
    paddingVertical: 0,
    marginLeft: 15,
  },
  spriteContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  sprites: {
    width: 100,
    height: 100,
  },
  ground: {
    marginBottom: -70,
    position: "relative",
    top: -80,
    zIndex: -1,
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#89c",
    opacity: 0.4,
    shadowColor: "#347",
    shadowOpacity: 0.8,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 10 },
    transform: [{ scaleX: 2.5 }],
  },
  sky: {
    marginBottom: 20,
  },
});
