import { LocationService } from 'src/app/shared/services/location.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, combineLatest, ReplaySubject, timer, of } from 'rxjs';
import {
  catchError,
  first,
  map,
  shareReplay,
  skipWhile,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { slideUpAnimation } from 'src/app/shared/animations/slide-up.animation';
import { ServicePointsService } from 'src/app/shared/services/service-points.service';
import { ServiceInterface } from 'src/app/shared/types/service.interface';
import { ServicesService } from '../../../shared/services/services.service';
import { ServicePointInterface } from '../../../shared/types/service-point.interface';
import { TabInterface } from '../../types/tab.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
  animations: [slideUpAnimation()],
})
export class ServiceDetailComponent implements OnInit, OnDestroy {
  @ViewChild('owlElement') owlElement: CarouselComponent;

  public activeTab: TabInterface = {} as TabInterface;
  public activeLabel: string;
  public service: ServiceInterface = {} as ServiceInterface;
  public points$: Observable<ServicePointInterface[]>;
  public addressMode: string = 'map';
  public options: object = {
    iconImageHref: 'assets/gps-red.svg',
    iconLayout: 'default#image',
  };
  public selectedPoint: ServicePointInterface;

  public customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    margin: 20,
    touchDrag: true,
    pullDrag: false,
    autoWidth: true,
    items: 3,
    dots: false,
    navSpeed: 700,
    nav: false,
  };

  public tabs: TabInterface[] = [
    {
      id: '1',
      label: 'DESCRIPTION',
      labelWidth: 79,
      text: '',
    },
    {
      id: '2',
      label: 'BEFORE_TEST',
      labelWidth: 91,
      text: '',
    },
    {
      id: '3',
      label: 'DIAGNOSTIC_METHOD',
      labelWidth: 153,
      text: '',
    },
  ];

  private selectedPlacemark;
  private map: YaReadyEvent<ymaps.Map>;
  private geoObjects: any[] = [];
  private uniqueGeoObjects: any[] = [];
  private id: number;
  private firstTime: boolean = true;
  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private services: ServicesService,
    private route: ActivatedRoute,
    private points: ServicePointsService,
    private location: LocationService,
    private translate: TranslateService
  ) {
    this.activeTab = this.tabs[0];
    this.activeLabel = this.tabs[0].id;
  }

  ngOnInit(): void {
    this.getData();
    this.langChange();
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  getData(): void {
    combineLatest([this.route.params, this.location.currentLocation$])
      .pipe(
        switchMap(([params]) => {
          this.mapPoints(+params.id);
          return this.services.getService(this.id);
        })
      )
      .subscribe((service) => {
        this.mapServices(service);
      });
  }

  mapPoints(id: number): void {
    this.id = id;
    this.points$ = this.points.getServicePoints(this.id).pipe(
      tap(() => {
        this.setMapBounds();
      }),
      shareReplay()
    );
  }

  mapServices(service: ServiceInterface): void {
    this.service = service;
    this.tabs[0].text = service?.fullDescription;
    this.tabs[1].text = service?.preparing;
    this.tabs[2].text = service?.method;
  }

  langChange(): void {
    this.translate.onLangChange
      .pipe(
        startWith(''),
        map((event, index) => [event, index]),
        tap(([event, index]) => {
          if (index > 0) {
            this.firstTime = false;
          }
        }),
        skipWhile(() => this.firstTime),
        switchMap(() => {
          this.mapPoints(this.id);
          return this.services.getService(this.id);
        }),
        takeUntil(this.destroy)
      )
      .subscribe((service) => {
        this.mapServices(service);
      });
  }

  setMapBounds(): void {
    if (this.map) {
      setTimeout(() => {
        this.map.target.setBounds(this.map.target.geoObjects.getBounds());
        this.map.target.setZoom(9);
      }, 0);
    }
  }

  selectTab(tab: TabInterface): void {
    this.owlElement.to(tab.id);
    this.activeLabel = tab.id;
    this.activeTab = tab;
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

  mapLoaded(event: YaReadyEvent<ymaps.Map>): void {
    this.map = event;

    const bounds = this.map.target.geoObjects.getBounds();
    if (bounds) {
      this.map.target.setBounds(this.map.target.geoObjects.getBounds());
    }
    this.map.target.setZoom(9);
  }
}
