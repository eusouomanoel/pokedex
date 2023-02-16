import React from "react";
import axios from "axios";
import { Pokemon } from "../services/interface";

type Pokemons = Pokemon[];

export const getAllPokemons = () => {
  let endpoints: string[] = [];
  for (let i = 1; i <= 1008; i++) {
    endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
  }
  for (let i = 10001; i <= 10271; i++) {
    endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
  }
  return axios
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
      return formattedPokemons;
    });
};

export const getPokemons = (offset: number = 0) => {
  let endpoints: string[] = [];
  for (let i = 1 + offset; i <= 25 + offset; i++) {
    endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
  }
  return axios
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
      return formattedPokemons;
    });
};

export const getTypesPokemons = () => {
  let endpoints: string[] = [];
  for (let i = 1; i < 19; i++) {
    endpoints.push(`https://pokeapi.co/api/v2/type/${i}/`);
  }
  for (let i = 10001; i <= 10002; i++) {
    endpoints.push(`https://pokeapi.co/api/v2/type/${i}/`);
  }
  return axios
    .all(endpoints.map((endpoint) => axios.get(endpoint)))
    .then((response) => {
      const types: string[] = response.map((res) => res.data);
      const formattedTypes: any = types.map((type: any) => ({
        typeName: type.name,
        quantidade: Number(type.pokemon.length),
      })) as unknown;
      return formattedTypes;
    });
};
