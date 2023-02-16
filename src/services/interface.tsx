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

export interface PokemonInfo extends PokemonModalProps {
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
