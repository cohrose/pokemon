import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { tap } from 'rxjs/operators';
import { AllPokemon, Pokemon } from 'src/app/shared/interfaces/all-pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  pokemon: Pokemon[];
  searchTerm: string;
  shiny: boolean;
  generation: string = 'one';

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.getAll('one');
  }

  getAll(gen: string): void {
    this.pokemonService
      .getAll(gen)
      .pipe(tap((x: AllPokemon) => (this.pokemon = x.results)))
      .subscribe();
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

  search(): void {
    this.router.navigateByUrl(`/view/${this.searchTerm.toLocaleLowerCase()}`);
  }

  changeGen(gen: string): void {
    if (gen == 'nine') {
      this.shiny = false;
    }
    this.getAll(gen);
  }
}
