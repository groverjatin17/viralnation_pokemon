import { useDispatch, useSelector } from "react-redux";
import { getAllPokemon, fetchPokemons } from "../../utils/pokemonFormatter";
import { Fragment, useEffect, useState } from "react";
import {
  listOfPokemons,
  setCurrentPage,
} from "../../redux/pokemonSlice";
import { PokemonType } from "../../types/PokemonType";
import Table from "./Table";
import { RootState } from "../../redux/store";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { Box, IconButton } from "@mui/material";
export default function PokemonTable() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const currentPage = useSelector(
    (state: RootState) => state.pokemonReducer.currentPage
  );
  const allPokemons = useSelector(
    (state: RootState) => state.pokemonReducer.allPokemons
  );
  const fetchPokemonProfile = async (data: PokemonType[]) => {
    let result: any = await Promise.all(
      data.map(async (pokemon: PokemonType) => {
        let pokemonRecord = await fetchPokemons(pokemon);
        return pokemonRecord;
      })
    );
    dispatch(
      listOfPokemons({ page: currentPage, data: result })
    );
    setLoading(false);
  };

  useEffect(() => {
    const page: any = allPokemons.find(
      (item) => item.page === Number(currentPage)
    );
    async function fetchData() {
      let response: any = await getAllPokemon(
        `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${currentPage * 10}`
      );
      await fetchPokemonProfile(response.results);
    }
    if (!page) {
      setLoading(true);
      fetchData();
    }
  }, [currentPage]);

  return (
    <Fragment>
      <Box component={"div"} sx={{ marginTop: "30px" }}>
        <IconButton
          aria-label="delete"
          onClick={() => {if(currentPage) dispatch(setCurrentPage(currentPage - 1))}}
          sx={{
            backgroundColor: "lightgrey",
            margin: 2
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          sx={{
            backgroundColor: "lightgrey",
          }}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          padding: "20px",
          margin: "20px",
        }}
      >
        <Table loading={loading} />
      </Box>
    </Fragment>
  );
}
