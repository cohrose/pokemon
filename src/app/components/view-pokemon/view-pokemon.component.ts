import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { Stats } from 'src/app/shared/interfaces/pokemon-stats';
import { PokemonService } from 'src/app/services/pokemon.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-view-pokemon',
  templateUrl: './view-pokemon.component.html',
  styleUrls: ['./view-pokemon.component.scss']
})
export class ViewPokemonComponent implements OnInit {
  pokemon: string;
  stats: Stats;
  hide: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params: ParamMap) => (this.pokemon = params.get('name'))),
        switchMap((x: string) => this.pokemonService.getOne(x)),
        tap((x: Stats) => (this.stats = x)),
        catchError(err => {
          this.router.navigateByUrl('/not-found');
          return throwError(err);
        })
      )
      .subscribe();
  }

  getArt(): string {
    return this.stats.sprites.other['official-artwork'].front_default;
  }

  getSprite(id: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  getMoves() {
    if (this.hide && this.stats.moves.length > 48) {
      return this.stats.moves.slice(0, 48);
    } else {
      return this.stats.moves;
    }
  }
}
