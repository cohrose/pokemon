import { Pokemon } from './all-pokemon';
import { Move } from './pokemon-stats';

export interface Type {
  id: number;
  name: string;
  pokemon: Pokemon[];
  moves: Move;
  blank?: boolean;
}
