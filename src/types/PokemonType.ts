export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  isHidden: boolean;
  slot: number;
}

interface Form {
  name: string;
  url: string;
}

interface Version {
  name: string;
  url: string;
}

interface GameIndex {
  gameIndex: number;
  version: Version[];
}

interface MoveLearnMethod {
  name: string;
  url: string;
}

interface VersionGroupDetails {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod[];
  version_group: Version[];
}

interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: VersionGroupDetails[];
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Species {
  name: string;
  url: string;
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface AllPokemonResponse {
  count: number;
  next: string;
  previous: string | null;
  results: PokemonType[];
}

export interface IlistOfPokemons {
  page: number;
  data: PokemonApiResponse[];
}

export interface PokemonApiResponse {
  abilities: Ability[];
  base_experience: number;
  forms: Form[];
  game_indices: GameIndex[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: any[];
  species: Species;
  sprites: {
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
    other: {
      "official-artwork": {
        front_default: string;
      };
      dream_world: {
        front_default: string;
        front_female: any;
      };
      home: {
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
      };
    };
  };
  stats: Stat[];
  types: Type[];
  weight: number;
}
