import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormatPipe, FormatVersion } from './shared/format.pipe';
import { FormatDashPipe } from './shared/format.pipe';
import { ReplaceDashPipe } from './shared/format.pipe';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/card/card.component';
import { ViewPokemonComponent } from './components/view-pokemon/view-pokemon.component';
import { ErrorComponent } from './components/error/error.component';
import { TypesComponent } from './components/types/types.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

const MatModules = [
  FlexLayoutModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatButtonToggleModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    ViewPokemonComponent,
    FormatPipe,
    FormatDashPipe,
    ReplaceDashPipe,
    FormatVersion,
    ErrorComponent,
    TypesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...MatModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
