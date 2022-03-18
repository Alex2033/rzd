import { LocationService } from 'src/app/shared/services/location.service';
import { AfterViewInit, OnDestroy } from '@angular/core';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, ReplaySubject } from 'rxjs';
import {
  map,
  skipWhile,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { slideUpAnimation } from 'src/app/shared/animations/slide-up.animation';
import { ServicePointsService } from 'src/app/shared/services/service-points.service';
import { ServicePointInterface } from '../../../shared/types/service-point.interface';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-service-points',
  templateUrl: './service-points.component.html',
  styleUrls: ['./service-points.component.scss'],
  animations: [slideUpAnimation()],
})
export class ServicePointsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChildren('cards') cards: QueryList<ElementRef>;

  public searchText: string = '';
  public points: ServicePointInterface[];
  public addressMode: string = 'map';
  public selectedPoint: ServicePointInterface;
  public mapOptions: object = {
    suppressMapOpenBlock: true,
  };
  public options: object = {
    iconImageHref: 'assets/gps-red.svg',
    iconLayout: 'default#image',
  };

  private selectedPlacemark;
  private map: YaReadyEvent<ymaps.Map>;
  private geoObjects: any[] = [];
  private uniqueGeoObjects: any[] = [];
  private firstTime: boolean = true;
  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);
  private serviceId: number;

  constructor(
    private servicePoints: ServicePointsService,
    private route: ActivatedRoute,
    private location: LocationService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getPoints();
    this.langChange();
  }

  ngAfterViewInit(): void {
    this.cards.changes.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.focusBlock();
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  getPoints(): void {
    combineLatest([this.route.queryParams, this.location.currentLocation$])
      .pipe(
        switchMap(([params]) => {
          this.serviceId = +params.serviceId;
          return this.servicePoints.getServicePoints(this.serviceId);
        }),
        tap(() => {
          this.setMapBounds();
        })
      )
      .subscribe((points) => {
        this.points = points;
      });
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
          return this.servicePoints.getServicePoints(this.serviceId);
        }),
        takeUntil(this.destroy)
      )
      .subscribe((points) => {
        this.points = points;
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

  @HostListener('window:scroll', ['$event']) checkScroll() {
    this.focusBlock();
  }

  focusBlock(): void {
    const viewportHeight = window.innerHeight;

    this.cards.forEach((card, index) => {
      const topPos = card.nativeElement.getBoundingClientRect().top;

      if (this.cards.length <= 1) {
        card.nativeElement.classList.add('focused');
      } else if (
        topPos > viewportHeight / 4.5 &&
        topPos < viewportHeight / 1.4
      ) {
        if (this.cards.length > 1) {
          this.cards.forEach((filteredCard, filteredIndex) => {
            if (index !== filteredIndex) {
              filteredCard.nativeElement.classList.remove('focused');
            }
          });
        }

        card.nativeElement.classList.add('focused');
      } else {
        card.nativeElement.classList.remove('focused');
      }
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

  mapLoaded(event: YaReadyEvent<ymaps.Map>): void {
    this.map = event;

    this.map.target.setBounds(this.map.target.geoObjects.getBounds());
    this.map.target.setZoom(9);
  }
}
