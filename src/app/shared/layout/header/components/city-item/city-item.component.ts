import { Observable } from 'rxjs';
import { LocationService } from 'src/app/shared/services/location.service';
import { CityInterface } from 'src/app/shared/types/city.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-city-item',
  templateUrl: './city-item.component.html',
  styleUrls: ['./city-item.component.scss'],
})
export class CityItemComponent implements OnInit {
  @Output() select: EventEmitter<CityInterface> =
    new EventEmitter<CityInterface>();

  @Input() city: CityInterface;

  public currentLocation$: Observable<CityInterface>;

  constructor(private location: LocationService) {}

  ngOnInit(): void {
    this.currentLocation$ = this.location.currentLocation$;
  }
}
