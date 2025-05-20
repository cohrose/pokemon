import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonType, Type } from 'src/app/shared/interfaces/type';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss'],
})
export class TypesComponent implements OnInit {
  param: string;
  activeType: Type;
  shiny: boolean;
  types = [
    'normal',
    'fire',
    'water',
    'grass',
    'flying',
    'fighting',
    'poison',
    'electric',
    'ground',
    'rock',
    'psychic',
    'ice',
    'bug',
    'ghost',
    'steel',
    'dragon',
    'dark',
    'fairy',
  ];

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params: ParamMap) => (this.param = params.get('type'))),
        switchMap((x: string) => this.getType(x)),
        catchError((err) => {
          this.router.navigateByUrl('/not-found');
          return throwError(err);
        })
      )
      .subscribe();
  }

  getType(type: string): Observable<Type> {
    return this.pokemonService
      .getType(type)
      .pipe(tap((x: Type) => (this.activeType = x)));
  }

  getNumber(url: string): string {
    let split = url.split('/');
    split = split.filter((x) => x != '');
    return split[split.length - 1];
  }

  createUrl(url: string): string {
    if (this.shiny) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${this.getNumber(
        url
      )}.png`;
    } else {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.getNumber(
        url
      )}.png`;
    }
  }

  filterOut(pokemon: PokemonType[]): PokemonType[] {
    return pokemon.filter((x) => +this.getNumber(x.pokemon.url) <= 1025);
  }
}
