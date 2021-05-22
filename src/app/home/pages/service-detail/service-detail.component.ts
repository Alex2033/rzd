import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServicePointsService } from 'src/app/shared/services/service-points.service';
import { ServiceInterface } from 'src/app/shared/types/service.interface';
import { ServicesService } from '../../../shared/services/services.service';
import { ServicePointInterface } from '../../../shared/types/service-point.interface';
import { TabInterface } from '../../types/tab.interface';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
})
export class ServiceDetailComponent implements OnInit {
  @ViewChild('owlElement') owlElement: CarouselComponent;

  public activeTab: TabInterface = {} as TabInterface;
  public activeLabel: string;
  public service: ServiceInterface = {} as ServiceInterface;
  public points$: Observable<ServicePointInterface[]>;

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
          this.points$ = this.points.getServicePoints(+params.id);
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
}
