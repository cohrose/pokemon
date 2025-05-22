import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AllPokemon } from '../shared/interfaces/all-pokemon';
import { Stats } from '../shared/interfaces/pokemon-stats';
import { Type } from '../shared/interfaces/type';
import { Species } from '../shared/interfaces/species';

const generations = {
  one: { limit: '151', offset: '0' },
  two: { limit: '100', offset: '151' },
  three: { limit: '135', offset: '251' },
  four: { limit: '107', offset: '386' },
  five: { limit: '156', offset: '493' },
  six: { limit: '72', offset: '649' },
  seven: { limit: '88', offset: '721' },
  eight: { limit: '96', offset: '809' },
  nine: { limit: '120', offset: '905' },
};

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getAll(generation: string): Observable<AllPokemon> {
    return this.http.get<AllPokemon>(
      `https://pokeapi.co/api/v2/pokemon-species?limit=${generations[generation].limit}&offset=${generations[generation].offset}`
    );
  }

  getOne(id: string): Observable<Stats> {
    return this.http.get<Stats>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

  getSpecies(id: string): Observable<Species> {
    return this.http.get<Species>(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
  }

  getType(type: string): Observable<Type> {
    return this.http.get<Type>(`https://pokeapi.co/api/v2/type/${type}`);
  }

  getAbility(url: string) {
    return this.http.get<any>(url);
  }
}
