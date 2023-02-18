import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ViewPokemonComponent } from './components/view-pokemon/view-pokemon.component';
import { ErrorComponent } from './components/error/error.component';
import { TypesComponent } from './components/types/types.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'view/:name', component: ViewPokemonComponent },
  { path: 'type/:type', component: TypesComponent },
  { path: 'not-found', component: ErrorComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
