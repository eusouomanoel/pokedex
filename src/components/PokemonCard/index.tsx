import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Modal } from "@mui/material";
import PokemonModal from "../Modal";
import styles from "./styles.module.css";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import LinearProgress from "@mui/material/LinearProgress";
import { Pokemon } from "../../services/interface";

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
        width: "100%",
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
              <Grid
                container
                spacing={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                xs={12}
                sx={{ padding: "0", margin: "0" }}
              >
                <Grid
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  xs={2}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    borderRadius: 50,
                    padding: 0.5,
                    margin: 0,
                  }}
                >
                  <Typography component="div" align="center" fontSize="0.75rem">
                    {id}
                  </Typography>
                </Grid>
                <Grid
                  xs={9}
                  display="flex"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Typography component="div" align="right" fontSize="1rem">
                    {name.toUpperCase()}
                  </Typography>
                </Grid>
                <Grid xs={12} sm={12} xl={12}>
                  <Typography
                    gutterBottom
                    // variant="caption"
                    component="div"
                    fontSize="0.75rem"
                    align="center"
                  >
                    {typeHandler(types).toUpperCase()}
                  </Typography>
                </Grid>
                <Grid
                  xs={12}
                  sm={12}
                  xl={12}
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
