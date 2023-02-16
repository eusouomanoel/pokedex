import { render, screen } from "@testing-library/react";
import { Home } from "./pages/Home";
import React from "react";

describe("Home component", () => {
  test("renders BUTTON component", () => {
    render(<Home />);
    const botao = screen.getByDisplayValue("CARREGAR MAIS POKEMONS...");
    expect(botao).toHaveTextContent("CARREGAR MAIS POKEMONS...");
  });
});
