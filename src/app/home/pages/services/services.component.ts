import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ServicePointsService } from '../../services/service-points.service';
import { ServicesService } from '../../services/services.service';
import { ServicePointInterface } from '../../types/service-point.interface';
import { ServiceInterface } from '../../types/service.interface';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit, AfterViewInit {
  @ViewChildren('services') services: QueryList<ElementRef>;

  public services$: Observable<ServiceInterface[]>;
  public servicePoints$: Observable<ServicePointInterface[]>;

  constructor(
    private servicesService: ServicesService,
    private servicePoints: ServicePointsService
  ) {}

  ngOnInit(): void {
    this.services$ = this.servicesService.getServices();
    this.servicePoints$ = this.servicePoints.getServicePoints();
  }

  ngAfterViewInit(): void {
    // todo: пофиксить этот костыль
    setTimeout(() => {
      this.focusBlock();
    }, 500);
  }

  @HostListener('window:scroll', ['$event']) checkScroll() {
    this.focusBlock();
  }

  focusBlock(): void {
    const viewportHeight = window.innerHeight;

    this.services.forEach((card) => {
      const topPos = card.nativeElement.getBoundingClientRect().top;

      if (topPos > viewportHeight / 4.5 && topPos < viewportHeight / 1.3) {
        card.nativeElement.classList.add('focused');
      } else {
        card.nativeElement.classList.remove('focused');
      }
    });
  }
}
