import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Dashboard } from "../components/Dashboard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import { getAllPokemons, getPokemons } from "../services/api";
import { Pokemon } from "../services/interface";

type Pokemons = Pokemon[];

export const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemons>([]);
  const [offset, setOffset] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [allPokemons, setAllPokemons] = useState<Pokemons>([]);

  useEffect(() => {
    getPokemons(offset)
      .then((data: any) => {
        if (offset === 0) {
          setPokemons(data);
        } else {
          setPokemons((prevPokemons) => [...prevPokemons, ...data]);
        }
      })
      .catch((error) => {
        alert("Não foi possivel carregar os pokemons.");
      });
    const timeout = setTimeout(() => {
      getAllPokemons().then((data: any) => {
        setAllPokemons(data);
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [offset]);

  const pokemonFilter = (name: string | undefined | null) => {
    if (name === "" || !name || name.length < 3) {
      getPokemons(0).then((data) => setPokemons(data));
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
        <Dashboard allPokemons={allPokemons}></Dashboard>
        <Grid container spacing={2}>
          {pokemons.length === 0
            ? null
            : pokemons.map((pokemon, index) => (
                <Grid item xs={6} sm={4} md={3} lg={2} xl={2} key={index}>
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
              ))}
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
