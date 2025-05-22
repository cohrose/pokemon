import { Pokemon } from './all-pokemon';

export interface Species {
  id: number;
  name: string;
  varieties: Variety[];
}

export interface Variety {
  is_default: boolean;
  pokemon: Pokemon;
  sprite?: string;
}
