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
  public showCityList: boolean = false;

  constructor(private location: LocationService) {}

  ngOnInit(): void {
    this.location.getCity();
    this.cities$ = this.location.getCities();
    this.currentLocation$ = this.location.currentLocation$;
  }
}
