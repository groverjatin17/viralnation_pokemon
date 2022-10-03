import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { Ability, PokemonApiResponse } from "../types/PokemonType";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import _ from "lodash";
import { editPokemon } from "../redux/pokemonSlice";
import { Button } from "@mui/material";

const flex = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
export default function EditPokemon() {
  const { pokemonId } = useParams();
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonApiResponse>();
  const [navigateToHome, setNavigateToHome] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.pokemonReducer.currentPage
  );
  const allPokemons = useSelector(
    (state: RootState) => state.pokemonReducer.allPokemons
  );

  const pokemonlist: any = allPokemons.find(
    (item) => item.page === Number(currentPage)
  )?.data;

  useEffect(() => {
    const pokemon: any = pokemonlist?.find(
      (pokemon: PokemonApiResponse) => pokemon.id === Number(pokemonId)
    );
    setSelectedPokemon(pokemon);
  }, []);

  const handleChange = (e: any) => {
    if (selectedPokemon !== undefined) {
      const tempPokemon: PokemonApiResponse = _.cloneDeep(selectedPokemon);
      if (e.target.name === "name") {
        tempPokemon.name = e.target.value;
      } else if (e.target.name === "weight") {
        tempPokemon.weight = e.target.value;
      } else if (e.target.name === "abilities") {
        let abilitiesArray = e.target.value.split(",");
        const newArray = abilitiesArray.map((item: string) => {
          return {
            ability: {
              name: item,
              url: "https://pokeapi.co/api/v2/ability/",
            },
            is_hidden: false,
            slot: 1,
          };
        });
        tempPokemon.abilities = newArray;
      }
      setSelectedPokemon(tempPokemon);
    }
  };
  const handleSubmit = () => {
    if (selectedPokemon) {
      dispatch(editPokemon(selectedPokemon));
    }
    setNavigateToHome(true);
  };
  return (
    <Fragment>
      {navigateToHome && <Navigate to="/" replace={true} />}
      <Box
        component="div"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          ...flex,
          height: "100vh",
        }}
      >
        <Box sx={{ ...flex }}>
          <TextField
            id="name"
            name="name"
            label="Name"
            type="text"
            variant="standard"
            value={selectedPokemon?.name}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <TextField
            id="weight"
            name="weight"
            label="Weight"
            type="text"
            variant="standard"
            value={selectedPokemon?.weight}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <TextField
            id="abilities"
            name="abilities"
            label="Abilities"
            type="text"
            defaultValue=""
            value={selectedPokemon?.abilities
              .map((item: Ability) => item.ability.name)
              ?.toString()}
            variant="standard"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </Box>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            marginTop: "20px",
          }}
        >
          Submit
        </Button>
      </Box>
    </Fragment>
  );
}
