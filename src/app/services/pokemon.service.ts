import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AllPokemon } from '../shared/interfaces/all-pokemon';
import { Stats } from '../shared/interfaces/pokemon-stats';
import { Type } from '../shared/interfaces/type';

const generations = {
  one: { limit: '151', offset: '0' },
  two: { limit: '100', offset: '151' },
  three: { limit: '135', offset: '251' },
  four: { limit: '107', offset: '386' },
  five: { limit: '156', offset: '493' },
  six: { limit: '72', offset: '649' },
  seven: { limit: '88', offset: '721' },
  eight: { limit: '96', offset: '809' },
  nine: { limit: '103', offset: '905' },
};

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getAll(generation: string): Observable<AllPokemon> {
    return this.http.get<AllPokemon>(
      `https://pokeapi.co/api/v2/pokemon?limit=${generations[generation].limit}&offset=${generations[generation].offset}`
    );
  }

  getOne(name: string): Observable<Stats> {
    return this.http.get<Stats>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  getType(type: string): Observable<Type> {
    return this.http.get<Type>(`https://pokeapi.co/api/v2/type/${type}`);
  }
}
