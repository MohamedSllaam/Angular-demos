import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { catchError, map, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private errorService = inject(ErrorService);
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'something went wrong fetch the available'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'something went wrong fetch the available'
    ).pipe(
      tap({
        next: (userPlaces) => this.userPlaces.set(userPlaces),
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const preplaces = this.userPlaces();
    if (!preplaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...preplaces, place]);
    }

    //this.userPlaces.update((pre) => [...pre, place]);
    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: place.id,
      })
      .pipe(
        catchError((error) => {
          this.userPlaces.set(preplaces);
          this.errorService.showError('Falied to store');
          return throwError(() => new Error('failed'));
        })
      );
  }

  removeUserPlace(place: Place) {
    const preplaces = this.userPlaces();
    if (preplaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(preplaces.filter((p) => p.id !== place.id));
    }

    //this.userPlaces.update((pre) => [...pre, place]);
    return this.httpClient
      .delete('http://localhost:3000/user-places/' + place.id)
      .pipe(
        catchError((error) => {
          this.userPlaces.set(preplaces);
          this.errorService.showError('Falied to store');
          return throwError(() => new Error('failed'));
        })
      );
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((resData) => resData.places),
      catchError((error) => {
        console.log(error);
        return throwError(() => {
          new Error(errorMessage);
        });
      })
    );
  }
}
