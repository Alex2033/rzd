import { CityInterface } from 'src/app/shared/types/city.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent implements OnInit {
  @Input() cities: CityInterface[];

  constructor() {}

  ngOnInit() {}
}
