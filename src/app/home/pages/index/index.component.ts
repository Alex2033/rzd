import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Observable, ReplaySubject } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';
import { slideUpAnimation } from 'src/app/shared/animations/slide-up.animation';
import { AccountService } from 'src/app/shared/services/account.service';
import { ServicePointsService } from 'src/app/shared/services/service-points.service';
import { ServiceInterface } from 'src/app/shared/types/service.interface';
import { ServicesService } from '../../../shared/services/services.service';
import { ServicePointInterface } from '../../../shared/types/service-point.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [slideUpAnimation()],
})
export class IndexComponent implements OnInit, AfterViewInit {
  @ViewChild('corpPanel') corpPanel: MatExpansionPanel;

  public services$: Observable<ServiceInterface[]>;
  public servicePoints$: Observable<ServicePointInterface[]>;
  public isAuth: boolean;
  public addressMode: string = 'map';
  public mapOptions: object = {
    suppressMapOpenBlock: true,
  };
  public options: object = {
    iconImageHref: 'assets/gps-red.svg',
    iconLayout: 'default#image',
  };
  public selectedPoint: ServicePointInterface;

  private selectedPlacemark;
  private geoObjects: any[] = [];
  private uniqueGeoObjects: any[] = [];
  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private services: ServicesService,
    private servicePoints: ServicePointsService,
    private account: AccountService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['corp-anchor']) {
        const el = document.querySelector('#corp-clients-faq');
        this.corpPanel.open();
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  }

  initializeValues(): void {
    this.services$ = this.services.getServices();
    this.servicePoints$ = this.servicePoints
      .getServicePoints()
      .pipe(shareReplay(), takeUntil(this.destroy));
    this.isAuth = this.account.isAuth();
  }

  openRefundsPanel(
    refundsPanel: MatExpansionPanel,
    cashbackPanel: MatExpansionPanel
  ): void {
    const el = document.querySelector('#refunds-panel');
    refundsPanel.open();
    cashbackPanel.close();
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  selectMapPoint(event, point: ServicePointInterface): void {
    this.selectedPlacemark = this.uniqueGeoObjects.find(
      (o) =>
        o.geometry._coordinates[0] === event.target.geometry._coordinates[0]
    );
    this.uniqueGeoObjects.forEach((o) => {
      o.options.set('iconImageHref', 'assets/gps-red.svg');
    });
    this.selectedPlacemark.options.set('iconImageHref', 'assets/gps-blue.svg');
    this.selectedPoint = point;
  }

  ready(event): void {
    this.geoObjects.push(event.target);
    this.uniqueGeoObjects = this.geoObjects.filter(
      (thing, index, self) =>
        index ===
        self.findIndex(
          (t) => t.geometry._coordinates[0] === thing.geometry._coordinates[0]
        )
    );
  }

  closeMapCard(): void {
    this.selectedPoint = null;
    this.selectedPlacemark.options.set('iconImageHref', 'assets/gps-red.svg');
    this.selectedPlacemark = null;
  }
}
