import { Component, DestroyRef, inject, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
  // places = signal<Place[] | undefined>(undefined);
  // private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  error = signal('');
  private placesService = inject(PlacesService);
  places = this.placesService.loadedUserPlaces;

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscribtion = this.placesService.loadUserPlaces().subscribe({
      // next: (place) => {
      //   this.places.set(place);
      // },

      error: (error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscribtion.unsubscribe();
    });
  }

  onRemovePlace(place: Place) {
    const subscribtion = this.placesService.removeUserPlace(place).subscribe();
    this.destroyRef.onDestroy(() => {
      subscribtion.unsubscribe();
    });
  }

  // constructor(pr
}
