export interface PokemonType {
  name: string;
}

export interface Pokemon {
  name: string;
  sprites?: {
    front_default: string;
  };
  image: string;
  types: PokemonType[];
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  id: number;
  hp: number;
  atk: number;
  def: number;
}

export interface Props {
  name: string;
  children?: React.ReactNode;
  pokemonFilter: (name: string) => void;
}

export interface PokemonModalProps {
  open: boolean;
  handleClose: () => void;
  name: string;
  image: string;
  types: PokemonType[];
}
