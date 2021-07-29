import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';
import { slideUpAnimation } from 'src/app/shared/animations/slide-up.animation';
import { ServicePointsService } from 'src/app/shared/services/service-points.service';
import { ServiceInterface } from 'src/app/shared/types/service.interface';
import { ServicesService } from '../../../shared/services/services.service';
import { ServicePointInterface } from '../../../shared/types/service-point.interface';
import { TabInterface } from '../../types/tab.interface';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
  animations: [slideUpAnimation()],
})
export class ServiceDetailComponent implements OnInit {
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
      label: 'Описание',
      labelWidth: 79,
      text: '',
    },
    {
      id: '2',
      label: 'Подготовка',
      labelWidth: 91,
      text: '',
    },
    {
      id: '3',
      label: 'Метод диагностики',
      labelWidth: 153,
      text: '',
    },
  ];

  private selectedPlacemark;
  private geoObjects: any[] = [];
  private uniqueGeoObjects: any[] = [];

  constructor(
    private services: ServicesService,
    private route: ActivatedRoute,
    private points: ServicePointsService
  ) {
    this.activeTab = this.tabs[0];
    this.activeLabel = this.tabs[0].id;
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.points$ = this.points
            .getServicePoints(+params.id)
            .pipe(shareReplay());
          return this.services.getService(+params.id);
        })
      )
      .subscribe((res) => {
        this.service = res;
        this.tabs[0].text = res.fullDescription;
        this.tabs[1].text = res.preparing;
        this.tabs[2].text = res.method;
      });
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
}
