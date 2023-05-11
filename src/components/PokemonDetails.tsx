import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "@rneui/themed";
import { Audio } from "expo-av";

import {
  formatName,
  formatNumber,
  PokeData,
  speciesDataExtractor,
} from "../helpers";
import { EvolutionTree} from "./EvolutionTree";
import { Section } from "./Section";
import { Sprites } from "./Sprites";

export function PokemonDetails({ data, stackRef }: { data: PokeData, stackRef: any }) {
  console.log("Rendering details of " + data.name + " (n°" + data.id + ")");
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
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroller}
        contentOffset={{ x: 0, y: 0 }}
        ref={scrollRef}
      >
        <View style={styles.cardBorder}>
          <View style={styles.content}>
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
              <Sprites data={data.sprites}/>
            </Section>
            <Section title={"Evolution Tree"}>
              {!evolutionTree ? (
                <Text style={styles.details}>
                  Searching in the evolution tree...
                </Text>
              ) : (
                <EvolutionTree data={evolutionTree} stackRef={stackRef} />
              )}
            </Section>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#000",
  },
  scroller: {
    alignItems: "center",
    paddingBottom: 80,
  },
  cardBorder: {
    backgroundColor: "#ffcc00",
    borderRadius: 20,
  },
  content: {
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 20,
    margin: 10,
    borderStyle: "solid",
    borderWidth: 3,
    padding: 10,
    borderColor: "#0075be",
    shadowColor: "#d5a100",
    shadowOffset: { width: -3, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  headerImage: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  artwork: {
    width: 180,
    height: 180,
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
