import { PokeChainItem, PokeData, PokeSpecies } from "./types";

export async function speciesDataExtractor(
  url: string
): Promise<[string, PokeData[][]]> {
  const species: PokeSpecies = await fetch(url).then((res) => res.json());
  const subtitle = species.genera.filter(
    (item) => item.language.name === "en"
  )[0].genus;
  const evolutionTree = await evolutionTreeExtractor(
    species.evolution_chain.url
  );
  return [subtitle, evolutionTree];
}

async function evolutionTreeExtractor(chainUrl: string): Promise<PokeData[][]> {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/`;

  // Fetch the chain and the first individual to be studied
  const chainData: PokeChainItem = await fetch(chainUrl)
    .then((res) => res.json())
    .then((res) => res.chain);

  // Initialize the generation and family data
  let t_generation: PokeChainItem[] = [chainData];
  const familyData: PokeData[][] = [[]];
  let generationIndex = 0;

  // Iterate through the generations to unpack them and add them to the family data
  while (t_generation.length > 0) {

    let t_newGeneration: PokeChainItem[] = []; // Initialize the next generation
    for (let index = 0; index < t_generation.length; index++) {
      familyData[generationIndex] = familyData[generationIndex] || [];
      // Inspect each individual in the current generation
      const individual: PokeChainItem = t_generation[index];
      const individualData: PokeData = await fetch(
        apiUrl + individual.species.name
      ).then((res) => res.json());
      familyData[generationIndex].push(individualData);
      t_newGeneration = t_newGeneration.concat(individual.evolves_to);
    }
    t_generation = t_newGeneration;
    generationIndex++;
  }
  console.log("Pokemons extracted: " + familyData.map((gen) => gen.map((poke) => poke.name)));
  return familyData;
}
