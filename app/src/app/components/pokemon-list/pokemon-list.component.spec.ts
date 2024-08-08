import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonService } from '../../services/pokemon.service';
import { of, throwError } from 'rxjs';

const mockPokemonService = {
  getPokemons: jest.fn().mockReturnValue(of({ results: [] })),
  getPokemonByName: jest.fn(),
};

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let pokemonService: jest.Mocked<PokemonService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonListComponent],
      providers: [{ provide: PokemonService, useValue: mockPokemonService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadMore on init', () => {
    const loadMoreSpy = jest.spyOn(component, 'loadMore');
    component.ngOnInit();
    expect(loadMoreSpy).toHaveBeenCalled();
  });

  it('should call getPokemons and update pokemons list', () => {
    const mockPokemons = {
      results: [{ name: 'Pikachu' }, { name: 'Bulbasaur' }],
    };
    mockPokemonService.getPokemons.mockReturnValue(of(mockPokemons));

    component.loadMore();
    fixture.detectChanges();

    expect(component.pokemons.length).toBe(2);
    expect(component.pokemons[0].name).toBe('Pikachu');
    expect(component.pokemons[1].name).toBe('Bulbasaur');
  });

  it('should handle error in loadMore', () => {
    mockPokemonService.getPokemons.mockReturnValue(
      throwError(() => new Error('Error fetching Pokemons'))
    );

    component.loadMore();
    fixture.detectChanges();

    expect(component.isLoadingList).toBeFalsy();
  });

  it('should call getPokemonByName and update searchResults', () => {
    const mockPokemon = { name: 'Pikachu', message: 'Found' };
    mockPokemonService.getPokemonByName.mockReturnValue(of(mockPokemon));

    component.searchTerm = 'Pikachu';
    component.searchPokemon();
    fixture.detectChanges();

    expect(component.searchResults.length).toBe(1);
    expect(component.searchResults[0].name).toBe('Pikachu');
  });

  it('should handle no result in searchPokemon', () => {
    const mockResponse = { message: 'No result' };
    mockPokemonService.getPokemonByName.mockReturnValue(of(mockResponse));

    component.searchTerm = 'InvalidName';
    component.searchPokemon();
    fixture.detectChanges();

    expect(component.searchResults.length).toBe(0);
  });

  it('should handle error in searchPokemon', () => {
    mockPokemonService.getPokemonByName.mockReturnValue(
      throwError(() => new Error('Error searching Pokemon'))
    );

    component.searchTerm = 'Pikachu';
    component.searchPokemon();
    fixture.detectChanges();

    expect(component.isSearching).toBeFalsy();
  });

  it('should call clearSearch and reset search results', () => {
    component.searchTerm = 'Pikachu';
    component.hasSearched = true;
    component.searchResults = [{ name: 'Pikachu' }];

    component.clearSearch();
    fixture.detectChanges();

    expect(component.searchTerm).toBe('');
    expect(component.hasSearched).toBeFalsy();
    expect(component.searchResults.length).toBe(0);
  });
});
