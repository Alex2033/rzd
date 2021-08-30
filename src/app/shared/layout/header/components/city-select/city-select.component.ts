import { LocationService } from './../../../../services/location.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CityInterface } from 'src/app/shared/types/city.interface';

@Component({
  selector: 'app-city-select',
  templateUrl: './city-select.component.html',
  styleUrls: ['./city-select.component.scss'],
})
export class CitySelectComponent implements OnInit {
  @Output() selectCity: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() cities: CityInterface[];

  public searchText: string;

  constructor() {}

  ngOnInit() {}
}
