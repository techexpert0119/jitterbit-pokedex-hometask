import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
})
export class PokemonDetailsComponent {
  pokemon: any;
  isLoading: boolean = true;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pokemonService.getPokemonByName(params['name']).subscribe({
        next: (data) => {
          if (data.message !== 'No result') this.pokemon = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching Pokemon details:', error);
          this.isLoading = false;
        },
      });
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
