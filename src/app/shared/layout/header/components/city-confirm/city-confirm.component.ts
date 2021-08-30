import { LocationService } from './../../../../services/location.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CityInterface } from 'src/app/shared/types/city.interface';

@Component({
  selector: 'app-city-confirm',
  templateUrl: './city-confirm.component.html',
  styleUrls: ['./city-confirm.component.scss'],
})
export class CityConfirmComponent implements OnInit {
  @Output() confirm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() cities: CityInterface[];
  @Input() currentLocation: CityInterface;

  public showCityList: boolean = false;

  constructor(private location: LocationService) {}

  ngOnInit(): void {}

  confirmLocation(): void {
    this.location.setLocation(this.currentLocation);
    this.confirm.emit(false);
  }

  selectCity(city: CityInterface): void {
    this.location.setLocation(city);
    this.showCityList = false;
  }
}
