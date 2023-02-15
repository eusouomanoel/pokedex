import { render, screen } from "@testing-library/react";
import { Home } from "../src/pages/Home";
import React from "react";

describe("Home component", () => {
  test("renders Navbar component", () => {
    render(<Home />);
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });
});

describe("Home component", () => {
  test("loads more pokemons when button is clicked", () => {
    render(<Home />);
    const loadMoreButton = screen.getByText("Carregar mais pokemons...");
    loadMoreButton.click();
    const pokemonCards = screen.getAllByTestId("pokemon-card");
    expect(pokemonCards.length).toBeGreaterThan(0);
  });
});
