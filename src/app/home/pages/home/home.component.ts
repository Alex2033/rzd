import { TranslateService } from '@ngx-translate/core';
import { LocationService } from 'src/app/shared/services/location.service';
import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  HostListener,
} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Observable, ReplaySubject } from 'rxjs';
import { shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { slideUpAnimation } from 'src/app/shared/animations/slide-up.animation';
import { AccountService } from 'src/app/shared/services/account.service';
import { ServicePointsService } from 'src/app/shared/services/service-points.service';
import { ServiceInterface } from 'src/app/shared/types/service.interface';
import { ServicesService } from '../../../shared/services/services.service';
import { ServicePointInterface } from '../../../shared/types/service-point.interface';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { environment } from 'src/environments/environment.prod';
import { CityInterface } from 'src/app/shared/types/city.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideUpAnimation()],
})
export class IndexComponent implements OnInit, AfterViewInit {
  @ViewChild('corpPanel') corpPanel: MatExpansionPanel;
  @ViewChild('faq') faq: ElementRef;

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
  public faqDocumentLink: string;
  public locationId: number;
  public currentLang: string;

  private selectedPlacemark;
  private map: YaReadyEvent<ymaps.Map>;
  private geoObjects: any[] = [];
  private uniqueGeoObjects: any[] = [];
  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private services: ServicesService,
    private servicePoints: ServicePointsService,
    private account: AccountService,
    private route: ActivatedRoute,
    private location: LocationService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy))
      .subscribe((lang) => {
        this.currentLang = lang.lang;
        this.initializeValues();
      });
    this.initializeValues();
    this.locationChanges();
    this.isAuth = this.account.isAuth();
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['c'] !== undefined && params['c'] !== null) {
        const el = document.getElementById('corp-clients-faq');
        this.corpPanel.open();
        setTimeout(() => {
          window.scrollTo(0, el.offsetTop - 70);
        }, 500);
      }
    });
  }

  initializeValues(): void {
    this.currentLang = this.translate.currentLang;
    this.services$ = this.location.currentLocation$.pipe(
      switchMap(() => this.services.getServices())
    );
    this.servicePoints$ = this.location.currentLocation$.pipe(
      switchMap(() => this.servicePoints.getServicePoints()),
      tap(() => {
        this.setMapBounds();
      }),
      shareReplay(),
      takeUntil(this.destroy)
    );
  }

  setMapBounds(): void {
    if (this.map) {
      setTimeout(() => {
        this.map.target.setBounds(this.map.target.geoObjects.getBounds());
        this.map.target.setZoom(9);
      }, 0);
    }
  }

  locationChanges(): void {
    this.location.currentLocation$.subscribe((location: CityInterface) => {
      this.locationId = location.id;

      switch (location.id) {
        case environment.isProdMode ? 1122 : 1101:
          this.faqDocumentLink =
            'assets/files/?????????????????? ???? ?????????????? (????????????).doc';
          break;

        case environment.isProdMode ? 1123 : 1102:
          this.faqDocumentLink =
            'assets/files/?????????????????????? ?????????????????? ???? ??????????????  (1).doc';
          break;

        case environment.isProdMode ? 1143 : 1111:
          this.faqDocumentLink = 'assets/files/?????? ?????????????????? ???? ?????????????? .doc';
          break;

        case 1163:
          this.faqDocumentLink =
            'assets/files/???????????????????????? ?????????????????? ???? ??????????????  (1).doc';
          break;

        default:
          break;
      }
    });
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

  mapLoaded(event: YaReadyEvent<ymaps.Map>): void {
    this.map = event;

    const bounds = this.map.target.geoObjects.getBounds();
    this.map.target.setBounds(this.map.target.geoObjects.getBounds());
    this.map.target.setZoom(9);
  }

  @HostListener('window:scroll', ['$event']) checkScroll(): void {
    if (
      this.faq.nativeElement.getBoundingClientRect().top * 2 <=
      (window.innerHeight || document.documentElement.clientHeight)
    ) {
      console.log('FAQ is IN');
    }
  }
}
