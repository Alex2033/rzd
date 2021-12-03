import { CityInterface } from './../../../../types/city.interface';
import { LocationService } from './../../../../services/location.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-bar',
  templateUrl: './location-bar.component.html',
  styleUrls: ['./location-bar.component.scss'],
})
export class LocationBarComponent implements OnInit {
  @Input() cities: CityInterface[];
  @Input() currentLocation: CityInterface;

  public showCityList: boolean = false;

  constructor(private location: LocationService) {}

  ngOnInit(): void {}

  selectCity(city: CityInterface): void {
    this.location.setLocation(city);
    this.showCityList = false;
  }
}
