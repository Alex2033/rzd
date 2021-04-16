import { Component, OnInit } from '@angular/core';
import { ServicePointInterface } from '../../types/service-point.interface';

@Component({
  selector: 'app-service-points',
  templateUrl: './service-points.component.html',
  styleUrls: ['./service-points.component.scss'],
})
export class ServicePointsComponent implements OnInit {
  public searchText: string = '';

  public points: ServicePointInterface[] = [
    {
      id: 1,
      title: 'Международный аэропорт Шереметьево, терминал B',
      locationText:
        'Московская обл., г. Химки, аэропорт Шереметьево терминал B',
      timeText: 'Круглосуточно',
    },
    {
      id: 2,
      title: 'Международный аэропорт Шереметьево, терминал D',
      locationText:
        'Московская обл., г. Химки, аэропорт Шереметьево терминал D',
      timeText: 'Круглосуточно',
    },
    {
      id: 3,
      title: 'Международный аэропорт Внуково',
      locationText:
        'г. Москва, Рейсовая 2-ая улица, дом 2, корпус 4, сооружение 1',
      timeText: 'Круглосуточно',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
