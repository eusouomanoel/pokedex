import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import { Skeletons } from "../components/Skeletons";
import PokemonModal from "../components/Modal";
import { textSpanEnd } from "typescript";

interface Pokemon {
  name: string;
  sprites?: {
    front_default: string;
  };
  image: string;
  types: any;
}

interface Props {
  name: string;
  children?: React.ReactNode;
  pokemonFilter: (name: string) => void;
}

type Pokemons = Pokemon[];

export const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemons>([]);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    let endpoints: string[] = [];
    for (let i = 1; i < 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((response) => {
        const pokemons: any = response.map((res) => res.data);
        const formattedPokemons = pokemons.map((pokemon: any) => ({
          name: pokemon.name,
          sprites: pokemon.sprites,
          image: pokemon.sprites.front_default,
          types: pokemon.types, // define a propriedade image
        })) as Pokemons;
        setPokemons(formattedPokemons);
      });
  };
  const pokemonFilter = (name: string) => {
    let filteredPokemons = [];
    if (name === "") {
      getPokemons();
    } else {
      for (const i in pokemons) {
        if (pokemons[i].name.includes(name)) {
          filteredPokemons.push(pokemons[i]);
        }
      }
    }
    setPokemons(filteredPokemons);
  };

  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter}></Navbar>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {pokemons.length === 0 ? (
            <Skeletons />
          ) : (
            pokemons.map((pokemon) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={pokemon.name}>
                <PokemonCard
                  name={pokemon.name}
                  image={pokemon.image}
                  types={pokemon.types}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
};
