import * as React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PokemonModalProps } from "../../services/interface";
import { padding } from "@mui/system";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "animate.css";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartDataLabels
);

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
  hp: number;
  specialAtk: number;
  specialDef: number;
  speed: number;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  height: "auto",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
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
        hp: data.stats[0].base_stat,
        atk: data.stats[1].base_stat,
        def: data.stats[2].base_stat,
        specialAtk: data.stats[3].base_stat,
        specialDef: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
      });
    };
    fetchPokemon();
  }, [name]);
  const getChartData = () => {
    const data = {
      labels: [
        "HP",
        "Attack",
        "Defense",
        "Speed",
        "Special Attack",
        "Special Defense",
      ],
      plugin: [ChartDataLabels],

      datasets: [
        {
          label: "Base Stats",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255, 99, 132, 1)",
          data: [
            pokemonInfo?.hp,
            pokemonInfo?.atk,
            pokemonInfo?.def,
            pokemonInfo?.speed,
            pokemonInfo?.specialAtk,
            pokemonInfo?.specialDef,
          ],
          datalabels: {
            color: "white",
          },
        },
      ],
    };
    return data;
  };
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
            backgroundColor: "#121212",
            borderRadius: "12px",
            borderColor: "#fff",
            boxShadow: "0 0 10px 2px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <Grid container spacing={1}>
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              xs={1}
              sx={{
                boxShadow: 15,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderRadius: 50,
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                margin="0"
              >
                {pokemonInfo?.id}
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {name.toUpperCase()}
              </Typography>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justifyContent="space-between"
              alignItems="stretch"
            >
              <Grid item>
                <Box
                  className="animate__shakeX"
                  component="img"
                  sx={{
                    animationDuration: "5s",
                    height: 233,
                    maxHeight: { xs: 233, md: 167 },
                  }}
                  src={image}
                  alt={name}
                ></Box>
              </Grid>
              <Grid item xs={3}>
                <Box
                  sx={{
                    boxShadow: 15,
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    borderRadius: 5,
                  }}
                >
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 1 }}
                    textAlign="center"
                  >
                    TYPE: <br />
                  </Typography>
                  <Typography fontSize="15px">
                    {typeHandler(types).toUpperCase()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    boxShadow: 15,
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    borderRadius: 5,
                    height: "45%",
                    paddingTop: "15",
                  }}
                >
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Height: {pokemonInfo?.height}
                  </Typography>
                  <Typography id="modal-modal-description">
                    Weight: {pokemonInfo?.weight}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  boxShadow: 15,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderRadius: 5,
                  paddingRight: 2,
                  paddingBottom: 1,
                }}
              >
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 1 }}
                  textAlign="center"
                >
                  MOVES <br />
                </Typography>
                <List dense disablePadding>
                  {pokemonInfo?.moves.slice(0, 5).map((move: any) => (
                    <ListItem
                      key={move.move.name}
                      sx={{
                        padding: "0",
                        textAlign: "right",
                      }}
                    >
                      <ListItemText
                        primaryTypographyProps={{ fontSize: "12px" }}
                        primary={move.move.name.toUpperCase()}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid
                item
                xs={12}
                sx={{
                  flexGrow: 1,
                  boxShadow: 15,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderRadius: 7,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  STATS <br />
                </Typography>
                <Radar
                  data={getChartData()}
                  options={{
                    scales: { r: { suggestedMin: 0, suggestedMax: 135 } },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
