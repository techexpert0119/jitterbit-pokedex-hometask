import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailsComponent } from './pokemon-details.component';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;
  let pokemonService: jest.Mocked<PokemonService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        PokemonDetailsComponent,
      ],
      providers: [
        {
          provide: PokemonService,
          useValue: {
            getPokemonByName: jest.fn(),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ name: 'Pikachu' }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(
      PokemonService
    ) as jest.Mocked<PokemonService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoading to false and set pokemon data on successful data fetch', () => {
    const mockPokemon = {
      name: 'Pikachu',
      sprites: { front_default: 'pikachu.png' },
      base_experience: 112,
      height: 4,
      weight: 60,
      order: 1,
    };
    pokemonService.getPokemonByName.mockReturnValue(of(mockPokemon));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isLoading).toBeFalsy();
    expect(component.pokemon).toEqual(mockPokemon);
  });

  it('should handle error and set isLoading to false', () => {
    pokemonService.getPokemonByName.mockReturnValue(
      throwError(() => new Error('Error fetching Pokemon'))
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isLoading).toBeFalsy();
    expect(component.pokemon).toBeUndefined();
  });

  it('should navigate back to the main page on goBack', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should display no Pokemon details available message when no pokemon data is present', () => {
    component.isLoading = false;
    component.pokemon = undefined;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement as HTMLElement;
      const messageElement = compiled.querySelector(
        'mat-card mat-card-content p'
      );

      expect(messageElement?.textContent?.trim()).toBe(
        'No Pokemon details available.'
      );
    });
  });

  it('should display loading spinner when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement as HTMLElement;
      const spinnerElement = compiled.querySelector('mat-spinner');
      expect(spinnerElement).toBeTruthy();
    });
  });

  it('should display Pokemon details when pokemon data is present', () => {
    component.isLoading = false;
    component.pokemon = {
      name: 'Pikachu',
      sprites: { front_default: 'pikachu.png' },
      base_experience: 112,
      height: 4,
      weight: 60,
      order: 1,
    };
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement as HTMLElement;
      const titleElement = compiled.querySelector('mat-card-title');
      const imgElement = compiled.querySelector('img');
      expect(titleElement?.textContent?.trim()).toBe('Pikachu');
      expect(imgElement?.getAttribute('src')).toBe('pikachu.png');
    });
  });
});
