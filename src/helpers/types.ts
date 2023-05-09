export interface PokeData {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Array<{
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }>;
  forms: Array<{
    name: string;
    url: string;
  }>;
  game_indices: Array<{
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }>;
  location_area_encounters: string;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
    other: {
      dream_world: {
        front_default: string;
        front_female: string;
      };
      home: {
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
      };
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: number;
      url: string;
    };
  }>;
  types: Array<PokeType>;
}

export interface PokeType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokeSpecies {
  capture_rate: number;
  color: {
    name: string;
    url: string;
  };
  evolution_chain: { url: string };
  evolves_from_species: { name: string; url: string };
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }>;
  genera: Array<{
    genus: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  generation: {
    name: string;
    url: string;
  };
  growth_rate: {
    name: string;
    url: string;
  };
  habitat: {
    name: string;
    url: string;
  };
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Array<{
    language: {
      name: string;
      url: string;
    };
    name: string;
  }>;
  order: number;
  pal_park_encounters: Array<{
    area: {
      name: string;
      url: string;
    };
    base_score: number;
    rate: number;
  }>;
  pokedex_numbers: Array<{
    entry_number: 1;
    pokedex: {
      name: string;
      url: string;
    };
  }>;
}

export interface PokeChain {
  chain: PokeChainItem;
  id: 1;
}

export interface PokeChainItem {
  evolves_to: Array<PokeChainItem>;
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
};
