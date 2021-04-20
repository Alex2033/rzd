import { AfterViewInit } from '@angular/core';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ServicePointsService } from '../../services/service-points.service';
import { ServicePointInterface } from '../../types/service-point.interface';

@Component({
  selector: 'app-service-points',
  templateUrl: './service-points.component.html',
  styleUrls: ['./service-points.component.scss'],
})
export class ServicePointsComponent implements OnInit, AfterViewInit {
  @ViewChildren('cards') cards: QueryList<ElementRef>;

  public searchText: string = '';

  public points$: Observable<ServicePointInterface[]>;

  constructor(private servicePoints: ServicePointsService) {}

  ngOnInit(): void {
    this.points$ = this.servicePoints.getServicePoints(1);
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

    this.cards.forEach((card) => {
      console.log('card:', card);
      const topPos = card.nativeElement.getBoundingClientRect().top;

      if (topPos > viewportHeight / 3.5 && topPos < viewportHeight / 1.5) {
        card.nativeElement.classList.add('focused');
      } else {
        card.nativeElement.classList.remove('focused');
      }
    });
  }
}
