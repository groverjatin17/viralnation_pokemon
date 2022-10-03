import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { PokemonApiResponse } from "../types/PokemonType";
import { RootState } from "../redux/store";
import { deletePokemonAction } from "../redux/pokemonSlice";
import { Button } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  open,
  handleClose,
  deletePokemon,
}: {
  open: boolean;
  handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  deletePokemon: number;
}) {
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

  const pokemon: any = pokemonlist?.find(
    (pokemon: PokemonApiResponse) => pokemon.id === Number(deletePokemon)
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete{" "}
            <strong style={{ textTransform: "capitalize" }}>
              {pokemon?.name}{" "}
            </strong>
            from the Table
          </Typography>

          <Button
            variant="contained"
            sx={{marginTop: '15px'}}
            onClick={(e) => {
              dispatch(deletePokemonAction(pokemon?.id));
              handleClose(e, "escapeKeyDown");
            }}
          >
            Delete Pokemon
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
