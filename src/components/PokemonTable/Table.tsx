import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Ability, PokemonApiResponse } from "../../types/PokemonType";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Avatar, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import DeletePokemon from "../../pages/DeletePokemon";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const fetchAbilities = (abilities: Ability[]) => {
  return abilities.map((item: Ability) => item.ability.name)?.toString();
};

const TableHeaderCell = styled(TableCell)({
  color: "black",
  fontWeight: "bold",
  background: "lightgrey",
  borderLeft: "1px solid rgba(224, 224, 224, 1)",
});

const Cell = styled(TableCell)({
  borderLeft: "1px solid rgba(224, 224, 224, 1)",
  textAlign: "center",
  textTransform: "capitalize",
});

export default function PokemonTable({ loading }: { loading: boolean }) {
  const [deletePokemon, setDeletePokemon] = React.useState(0);
  const currentPage = useSelector(
    (state: RootState) => state.pokemonReducer.currentPage
  );
  const allPokemons = useSelector(
    (state: RootState) => state.pokemonReducer.allPokemons
  );
  const pokemonlist: any = allPokemons.find(
    (item) => item.page === Number(currentPage)
  )?.data;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <DeletePokemon
        open={open}
        handleClose={handleClose}
        deletePokemon={deletePokemon}
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell align="center">Pokemon</TableHeaderCell>
              <TableHeaderCell align="center">Name</TableHeaderCell>
              <TableHeaderCell align="center">Weight</TableHeaderCell>
              <TableHeaderCell align="center">Abilities</TableHeaderCell>
              <TableHeaderCell align="center">Edit</TableHeaderCell>
              <TableHeaderCell align="center">Delete</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from({ length: 10 }, (x, i) => i).map((row) => (
                  <TableRow key={row} sx={{ width: "100%" }}>
                    {Array.from({ length: 7 }, (x, i) => i).map((row) => (
                      <Cell component="th" scope="row">
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={60}
                        />
                      </Cell>
                    ))}
                  </TableRow>
                ))
              : pokemonlist?.map((row: PokemonApiResponse) => (
                  <TableRow key={row.id}>
                    <Cell component="th" scope="row">
                      {row.id}
                    </Cell>
                    <Cell component="th" scope="row">
                      <Avatar
                        alt={row.name}
                        src={row.sprites.other.dream_world.front_default}
                      />
                    </Cell>
                    <Cell component="th" scope="row">
                      {row.name}
                    </Cell>
                    <Cell align="right">{row.weight}</Cell>
                    <Cell align="right">{fetchAbilities(row.abilities)}</Cell>
                    <Cell align="right">
                      <Link to={`editPokemon/${row.id}`}>
                        <Button variant="contained">Edit</Button>
                      </Link>
                    </Cell>
                    <Cell align="right">
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleOpen();
                          setDeletePokemon(row.id);
                        }}
                      >
                        Delete
                      </Button>
                    </Cell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
