import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Modal } from "@mui/material";
import PokemonModal from "../Modal";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import LinearProgress from "@mui/material/LinearProgress";
import { Pokemon } from "../../services/interface";

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

export default function PokemonCard({
  name,
  image,
  types,
  id,
  atk,
  def,
  hp,
}: Pokemon) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const typeHandler = (types: any) => {
    if (types[1]) {
      return types[0].type.name + " " + types[1].type.name;
    } else return types[0].type.name;
  };
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  return (
    <Card
      sx={{
        maxWidth: 500,
        minHeight: 275,
        minWidth: 250,
        transition: "0.3s",
        ":hover": {
          transform: "scale(1.05)",
          backgroundColor: "rgba(255, 255, 255, 0.16)",
        },
      }}
    >
      <CardActionArea onClick={handleOpen}>
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            transition: "0.3s",
            ":hover": {
              transform: "scale(1.3)",
            },
          }}
        />
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <ThemeProvider theme={theme}>
              <Grid container spacing={2}>
                <Grid xs={2}>
                  <Typography gutterBottom variant="h5" component="div">
                    {id}
                  </Typography>
                </Grid>
                <Grid xs={10}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="right"
                  >
                    {name.toUpperCase()}
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography
                    gutterBottom
                    variant="caption"
                    component="div"
                    align="center"
                  >
                    {typeHandler(types).toUpperCase()}
                  </Typography>
                </Grid>
                <Grid
                  sx={{
                    flexGrow: 1,
                    boxShadow: 1,
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    borderRadius: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography gutterBottom variant="caption" component="div">
                    ATK: {atk}
                    <LinearProgress
                      variant="determinate"
                      value={atk}
                      valueBuffer={150}
                      style={{ height: 10 }}
                      color="error"
                    />
                  </Typography>
                  <Typography gutterBottom variant="caption" component="div">
                    DEF: {def}
                    <LinearProgress
                      variant="determinate"
                      value={def}
                      valueBuffer={150}
                      style={{ height: 10 }}
                      color="info"
                    />
                  </Typography>
                  <Typography gutterBottom variant="caption" component="div">
                    HP: {hp}
                    <LinearProgress
                      variant="determinate"
                      value={hp}
                      valueBuffer={150}
                      style={{ height: 10 }}
                      color="success"
                    />
                  </Typography>
                </Grid>
              </Grid>
            </ThemeProvider>
          </Box>
        </CardContent>
      </CardActionArea>
      <PokemonModal
        open={open}
        handleClose={handleClose}
        name={name}
        image={image}
        types={types}
      />
    </Card>
  );
}
