import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IlistOfPokemons,
  PokemonApiResponse,
} from "../types/PokemonType";
import _ from "lodash";

interface PokemonState {
  currentPage: number;
  pokemonList: PokemonApiResponse[];
  allPokemons: IlistOfPokemons[];
}

const initialPokemonState: PokemonState = {
  currentPage: 0,
  pokemonList: [],
  allPokemons: [],
};

export const pokemonSlice = createSlice({
  name: "pokemonReducer",
  initialState: initialPokemonState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    listOfPokemons: (state, action: any) => {
      const tempData = _.cloneDeep(state.allPokemons);
      state.allPokemons = [...tempData, action.payload];
    },
    editPokemon: (state, action: PayloadAction<PokemonApiResponse>) => {
      const pokemonlist: any = state.allPokemons?.find(
        (item) => item.page === Number(state.currentPage)
      )?.data;

      const tempList = pokemonlist.map((pokemon: PokemonApiResponse) => {
        if (pokemon.id === action.payload.id) {
          return action.payload;
        }
        return pokemon;
      });

      state.allPokemons = state.allPokemons.map(
        (listOfPokemons: any) => {
          if (listOfPokemons.page === state.currentPage) {
            const tempData = { page: state.currentPage, data: tempList };
            return tempData;
          }
          return listOfPokemons;
        }
      );
    },
    deletePokemonAction: (state, action: PayloadAction<number>) => {
      const pokemonlist: any = state.allPokemons?.find(
        (item) => item.page === Number(state.currentPage)
      )?.data;

      const indexFound = pokemonlist.findIndex(
        (pokemon: PokemonApiResponse) => pokemon.id === action.payload
      );

      pokemonlist.splice(indexFound, 1);

      state.allPokemons = state.allPokemons.map(
        (listOfPokemons: any) => {
          if (listOfPokemons.page === state.currentPage) {
            return { page: state.currentPage, data: pokemonlist };;
          }
          return listOfPokemons;
        }
      );
    },
  },
});

export const { setCurrentPage, editPokemon, deletePokemonAction, listOfPokemons } =
  pokemonSlice.actions;

export default pokemonSlice.reducer;
