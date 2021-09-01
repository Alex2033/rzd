import { LanguageService } from './language.service';
import { CityInterface } from './../types/city.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CoordinatesInterface } from '../types/coordinates.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  public currentLocationSubject$: BehaviorSubject<CityInterface> =
    new BehaviorSubject<CityInterface>(environment.defaultLocation);
  public readonly currentLocation$: Observable<CityInterface> =
    this.currentLocationSubject$.asObservable();
  public readonly cityId: number = this.currentLocationSubject$.getValue()?.id;

  public showLocation: boolean = false;
  private readonly ipInfo: string = 'http://ipwhois.app/json/';

  constructor(private http: HttpClient, private language: LanguageService) {
    this.getLocationFromStorage();
  }

  getLocationFromStorage(): void {
    const currentLocation = localStorage.getItem('rzd-current-location');
    if (currentLocation) {
      this.currentLocationSubject$.next(JSON.parse(currentLocation));
    }
  }

  getCity(): void {
    if (this.showLocation) {
      this.getCurrentLocation()
        .pipe(
          catchError(() => this.getCityByIp()),
          switchMap((coords) =>
            this.getCityByCoords(coords.latitude, coords.longitude)
          ),
          catchError((err) => {
            return of(err.error);
          })
        )
        .subscribe((res: CityInterface) => {
          if (
            JSON.stringify(this.currentLocationSubject$.getValue) ===
            JSON.stringify(res)
          ) {
            this.currentLocationSubject$.next(res);
          }
        });
    }
  }

  getCurrentLocation(): Observable<GeolocationCoordinates> {
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      );
    });
  }

  getCities(
    lang: number = this.language.langId.getValue()
  ): Observable<CityInterface[]> {
    return this.http.get<CityInterface[]>(
      `${environment.api}api/contents/cities?lang=${lang}`
    );
  }

  getCityByCoords(
    lat: number,
    lot: number,
    lang: number = this.language.langId.getValue()
  ): Observable<CityInterface> {
    return this.http.get<CityInterface>(
      `${environment.api}api/contents/findcity`,
      {
        params: {
          latitude: lat.toString(),
          longtitude: lot.toString(),
          lang: lang.toString(),
        },
      }
    );
  }

  getCityByIp(): Observable<CoordinatesInterface> {
    return this.http.get<CoordinatesInterface>(this.ipInfo).pipe(
      map((data) => {
        return {
          latitude: data.latitude,
          longitude: data.longitude,
        };
      })
    );
  }

  setLocation(val: CityInterface): void {
    this.currentLocationSubject$.next(val);
    localStorage.setItem('rzd-current-location', JSON.stringify(val));
  }

  getLocationValue(): CityInterface {
    return this.currentLocationSubject$.getValue();
  }
}
