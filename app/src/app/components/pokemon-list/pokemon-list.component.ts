import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  searchResults: any[] = [];
  limit: number = 20;
  offset: number = 0;
  searchTerm: string = '';
  hasSearched: boolean = false;
  isLoadingList: boolean = false;
  isSearching: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadMore();
  }

  loadMore(): void {
    if (!this.searchTerm.trim()) {
      this.isLoadingList = true;
      this.pokemonService.getPokemons(this.limit, this.offset).subscribe({
        next: (data) => {
          this.pokemons = [...this.pokemons, ...data.results];
          this.offset += this.limit;
          this.isLoadingList = false;
        },
        error: (error) => {
          console.error('Error fetching Pokemons:', error);
          this.isLoadingList = false;
        },
      });
    }
  }

  searchPokemon(): void {
    if (this.searchTerm.trim()) {
      this.hasSearched = true;
      this.isSearching = true;
      this.pokemonService.getPokemonByName(this.searchTerm.trim()).subscribe({
        next: (data) => {
          if (data.message === 'No result') {
            this.searchResults = [];
          } else {
            this.searchResults = [data];
          }
          this.isSearching = false;
        },
        error: (error) => {
          console.error('Error searching Pokemon:', error);
          this.isSearching = false;
        },
      });
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchPokemon();
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.hasSearched = false;
    this.searchResults = [];
  }
}
