import * as React from "react";
import { Box, Modal, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PokemonModalProps } from "../../services/interface";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface PokemonInfo extends PokemonModalProps {
  weight: number;
  height: number;
  id: number;
  moves: {
    move: { name: string };
  }[];
  atk: number;
  def: number;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PokemonModal({
  name,
  image,
  types,
  open,
  handleClose,
}: PokemonModalProps) {
  const typeHandler = (types: any) => {
    if (types[1]) {
      return types[0].type.name + " " + types[1].type.name;
    } else return types[0].type.name;
  };

  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo | null>(null);
  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const data = response.data;
      setPokemonInfo({
        open,
        handleClose,
        name,
        image,
        types,
        weight: data.weight,
        height: data.height,
        id: data.id,
        moves: data.moves,
        atk: data.stats[1].base_stat,
        def: data.stats[0].base_stat,
      });
    };
    fetchPokemon();
  }, [name]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            flexGrow: 1,
            width: "320",
            backgroundColor: "#121212",
            borderRadius: "12px",
            borderColor: "#fff",
            boxShadow: "0 0 10px 2px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {pokemonInfo?.id}
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {name.toUpperCase()}
              </Typography>
            </Grid>
          </Grid>

          <Box
            component="img"
            sx={{
              height: 233,

              maxHeight: { xs: 233, md: 167 },
            }}
            src={image}
            alt={name}
          ></Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {typeHandler(types).toUpperCase()}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Weight: {pokemonInfo?.weight} | Height: {pokemonInfo?.height}
          </Typography>

          <Typography>
            Moves <br />
          </Typography>
          {pokemonInfo?.moves.slice(0, 5).map((move: any) => (
            <li key={move.move.name}>{move.move.name}</li>
          ))}
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
