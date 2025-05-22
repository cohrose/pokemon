import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, tap, switchMap, catchError, filter } from 'rxjs/operators';
import { Move, Stats } from 'src/app/shared/interfaces/pokemon-stats';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Observable, throwError, zip } from 'rxjs';
import { Species } from 'src/app/shared/interfaces/species';

@Component({
  selector: 'app-view-pokemon',
  templateUrl: './view-pokemon.component.html',
  styleUrls: ['./view-pokemon.component.scss'],
})
export class ViewPokemonComponent implements OnInit {
  pokemonId: string;
  stats: Stats;
  hide: boolean = true;
  abilities = [];
  species: Species;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(() => (this.abilities = [])),
        map((params: ParamMap) => (this.pokemonId = params.get('id'))),
        switchMap((x: string) => this.pokemonService.getOne(x)),
        tap((x: Stats) => this.getAbilities(x)),
        switchMap(() => this.pokemonService.getSpecies(this.pokemonId)),
        tap((x: Species) => (this.species = x)),
        filter(() => this.species.varieties.length > 1),
        switchMap(() => zip(this.getSpecies())),
        catchError((err) => {
          this.router.navigateByUrl('/not-found');
          return throwError(err);
        })
      )
      .subscribe();
  }

  getAbilities(stats: Stats): void {
    this.stats = stats;
    stats.abilities.forEach((x) => {
      this.pokemonService
        .getAbility(x.ability.url)
        .pipe(tap((x) => this.abilities.push(x)))
        .subscribe();
    });
  }

  getSpecies(): Observable<Stats>[] {
    return this.species.varieties.map((variety) => {
      return this.pokemonService
        .getOne(this.getNumber(variety.pokemon.url))
        .pipe(tap((x) => (variety.sprite = x.sprites.front_default)));
    });
  }

  getNumber(url: string): string {
    let split = url.split('/');
    split = split.filter((x) => x != '');
    return split[split.length - 1];
  }

  getArt(): string {
    return this.stats.sprites.other['official-artwork'].front_default;
  }

  getSprite(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  getMoves(): Move[] {
    if (this.hide && this.stats.moves.length > 48) {
      return this.stats.moves.slice(0, 48);
    } else {
      return this.stats.moves;
    }
  }

  getAbilityText(ability): string {
    let found = ability.flavor_text_entries.find((a) => {
      return a.language.name == 'en';
    });
    let foundName = ability.effect_entries.find((a) => {
      return a.language.name == 'en';
    });
    if (found) {
      return found.flavor_text;
    } else if (foundName) {
      return foundName.effect;
    }
  }
}
