import { AfterViewInit, OnDestroy } from '@angular/core';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ServicePointsService } from '../../services/service-points.service';
import { ServicePointInterface } from '../../types/service-point.interface';

@Component({
  selector: 'app-service-points',
  templateUrl: './service-points.component.html',
  styleUrls: ['./service-points.component.scss'],
})
export class ServicePointsComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('cards') cards: QueryList<ElementRef>;

  public searchText: string = '';
  public points$: Observable<ServicePointInterface[]>;

  private cardsSub: Subscription;

  constructor(private servicePoints: ServicePointsService) {}

  ngOnInit(): void {
    this.points$ = this.servicePoints.getServicePoints();
  }

  ngAfterViewInit(): void {
    this.cardsSub = this.cards.changes.subscribe(() => {
      this.focusBlock();
    });
  }

  ngOnDestroy(): void {
    if (this.cardsSub) {
      this.cardsSub.unsubscribe();
    }
  }

  @HostListener('window:scroll', ['$event']) checkScroll() {
    this.focusBlock();
  }

  focusBlock(): void {
    const viewportHeight = window.innerHeight;

    this.cards.forEach((card) => {
      const topPos = card.nativeElement.getBoundingClientRect().top;

      if (topPos > viewportHeight / 3.5 && topPos < viewportHeight / 1.5) {
        card.nativeElement.classList.add('focused');
      } else {
        card.nativeElement.classList.remove('focused');
      }
    });
  }
}
