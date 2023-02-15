import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import { Skeletons } from "../components/Skeletons";
import { Pokemon } from "../services/interface";

type Pokemons = Pokemon[];

export const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemons>([]);
  const [offset, setOffset] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [allPokemons, setAllPokemons] = useState<Pokemons>([]);

  useEffect(() => {
    getPokemons();
    const timeout = setTimeout(() => {
      getAllPokemons();
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const getPokemons = (offset: number = 0) => {
    let endpoints: string[] = [];
    for (let i = 1 + offset; i <= 25 + offset; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((response) => {
        const pokemons: string[] = response.map((res) => res.data);
        const formattedPokemons = pokemons.map((pokemon: any) => ({
          name: pokemon.name,
          sprites: pokemon.sprites,
          image: pokemon.sprites.front_default,
          types: pokemon.types,
          id: pokemon.id,
          hp: pokemon.stats[0].base_stat,
          atk: pokemon.stats[1].base_stat,
          def: pokemon.stats[2].base_stat,
        })) as Pokemons;
        if (offset === 0) {
          setPokemons(formattedPokemons);
        } else {
          setPokemons((prevPokemons) => [
            ...prevPokemons,
            ...formattedPokemons,
          ]);
        }
      });
  };

  const getAllPokemons = () => {
    let endpoints: string[] = [];
    for (let i = 1; i <= 1008; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((response) => {
        const pokemons: string[] = response.map((res) => res.data);
        const formattedPokemons = pokemons.map((pokemon: any) => ({
          name: pokemon.name,
          sprites: pokemon.sprites,
          image: pokemon.sprites.front_default,
          types: pokemon.types,
          id: pokemon.id,
          hp: pokemon.stats[0].base_stat,
          atk: pokemon.stats[1].base_stat,
          def: pokemon.stats[2].base_stat,
        })) as Pokemons;
        setAllPokemons(formattedPokemons);
      });
  };

  const pokemonFilter = (name: string) => {
    if (name === "") {
      setPokemons([]);
      getPokemons();
    } else {
      let filteredPokemons: Pokemon[] = [];
      for (let i in allPokemons) {
        if (allPokemons[i].name.includes(name.toLowerCase())) {
          filteredPokemons.push(allPokemons[i]);
        }
      }
      setPokemons(filteredPokemons);
    }
  };
  const handleLoadMore = () => {
    setOffset(offset + 25);
    getPokemons(offset + 25);
  };

  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter}></Navbar>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {pokemons.length === 0 ? (
            <Skeletons />
          ) : (
            pokemons.map((pokemon, index) => (
              <Grid item xs={12} sm={4} md={3} lg={2} xl={1} key={index}>
                <PokemonCard
                  name={pokemon.name}
                  image={pokemon.image}
                  types={pokemon.types}
                  id={pokemon.id}
                  atk={pokemon.atk}
                  def={pokemon.def}
                  hp={pokemon.hp}
                />
              </Grid>
            ))
          )}
        </Grid>
        <div className="error-container">{error ? error : null}</div>

        {pokemons.length === 0 ? null : (
          <Box mt={3} textAlign="center">
            <Button onClick={handleLoadMore} variant="outlined">
              Carregar mais pokemons...
            </Button>
          </Box>
        )}
      </Container>
      <Footer></Footer>
    </div>
  );
};
