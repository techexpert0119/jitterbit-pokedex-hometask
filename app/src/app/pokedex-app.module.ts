import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './pokedex-app-routing.module';
import { PokedexAppComponent } from './pokedex-app.component';
import { PokemonService } from './services/pokemon.service';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule],
  providers: [PokemonService],
  declarations: [PokedexAppComponent, PokemonListComponent],
  bootstrap: [PokedexAppComponent],
})
export class PokedexAppModule {}
