import { TranslateService } from '@ngx-translate/core';
import { Observable, ReplaySubject } from 'rxjs';
import { LocationService } from './../../../../services/location.service';
import { Component, OnInit } from '@angular/core';
import { CityInterface } from 'src/app/shared/types/city.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  public cities$: Observable<CityInterface[]>;
  public currentLocation$: Observable<CityInterface>;
  public showConfirm: boolean = false;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private location: LocationService,
    private translate: TranslateService
  ) {
    if (!localStorage.getItem('rzd-current-location')) {
      this.showConfirm = true;
    }
  }

  ngOnInit(): void {
    this.langChange();
    this.location.getCity();
    this.getCities();
    this.currentLocation$ = this.location.currentLocation$;
  }

  langChange(): void {
    this.translate.onLangChange.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.getCities();
    });
  }

  getCities(): void {
    this.cities$ = this.location.getCities();
  }
}
