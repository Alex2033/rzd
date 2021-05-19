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
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServicePointsService } from '../../services/service-points.service';
import { ServicePointInterface } from '../../types/service-point.interface';

@Component({
  selector: 'app-service-points',
  templateUrl: './service-points.component.html',
  styleUrls: ['./service-points.component.scss'],
})
export class ServicePointsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChildren('cards') cards: QueryList<ElementRef>;

  public searchText: string = '';
  public points$: Observable<ServicePointInterface[]>;

  private cardsSub: Subscription;

  constructor(
    private servicePoints: ServicePointsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.points$ = this.route.queryParams.pipe(
      switchMap((params) =>
        this.servicePoints.getServicePoints(+params.serviceId)
      )
    );
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
}
