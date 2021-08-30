import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CityInterface } from '../types/city.interface';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CoordinatesInterface } from '../types/coordinates.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  public langId: number;

  private currentLocationSubject$: BehaviorSubject<CityInterface> =
    new BehaviorSubject<CityInterface>(null);
  public readonly currentLocation$: Observable<CityInterface> =
    this.currentLocationSubject$.asObservable();

  private readonly ipInfo: string = 'http://ipwhois.app/json/';

  constructor(private http: HttpClient) {
    const currentLocation = localStorage.getItem('rzd-current-location');
    if (currentLocation) {
      this.currentLocationSubject$.next(JSON.parse(currentLocation));
    }
  }

  getCity(): void {
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
        this.currentLocationSubject$.next(res);
      });
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

  getCities(lang: number = this.langId): Observable<CityInterface[]> {
    return this.http.get<CityInterface[]>(
      `${environment.api}api/contents/cities?lang=${lang}`
    );
  }

  getCityByCoords(
    lat: number,
    lot: number,
    lang: number = this.langId
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
}
