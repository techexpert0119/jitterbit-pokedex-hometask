import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });

    service = TestBed.inject(PokemonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return pokemons', () => {
    const mockPokemons = { results: [{ name: 'Pikachu' }] };

    service.getPokemons(20, 0).subscribe((pokemons) => {
      expect(pokemons).toEqual(mockPokemons);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/api/pokemon?limit=20&offset=0'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemons);
  });

  it('should return a single pokemon by name', () => {
    const mockPokemon = { name: 'Pikachu', sprites: { front_default: 'url' } };

    service.getPokemonByName('pikachu').subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/api/pokemon/pikachu'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });
});
