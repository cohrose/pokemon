import { Pokemon } from './all-pokemon';
import { Move } from './pokemon-stats';

export interface Type {
  id: number;
  name: string;
  pokemon: PokemonType[];
  moves: Move;
  blank?: boolean;
}

export interface PokemonType {
  pokemon: Pokemon;
  slot: number;
}
