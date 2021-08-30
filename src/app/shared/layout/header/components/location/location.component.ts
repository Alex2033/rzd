import { LanguageService } from './../../../../services/language.service';
import { Observable } from 'rxjs';
import { LocationService } from './../../../../services/location.service';
import { Component, OnInit } from '@angular/core';
import { CityInterface } from 'src/app/shared/types/city.interface';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  public cities$: Observable<CityInterface[]>;
  public currentLocation$: Observable<CityInterface>;
  public showConfirm: boolean = false;

  constructor(
    private location: LocationService,
    private language: LanguageService
  ) {
    if (!localStorage.getItem('rzd-current-location')) {
      this.showConfirm = true;
    }
  }

  ngOnInit(): void {
    this.location.getCity();
    this.cities$ = this.location.getCities(this.language.langId.getValue());
    this.currentLocation$ = this.location.currentLocation$;
  }
}
