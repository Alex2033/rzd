import { LocationService } from 'src/app/shared/services/location.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Observable, pipe, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ServiceInterface } from 'src/app/shared/types/service.interface';
import { ServicesService } from '../../../shared/services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('services') services: QueryList<ElementRef>;

  public services$: Observable<ServiceInterface[]>;

  private servicesSub: Subscription;

  constructor(
    private servicesService: ServicesService,
    private location: LocationService
  ) {}

  ngOnInit(): void {
    this.services$ = this.location.currentLocation$.pipe(
      switchMap(() => this.servicesService.getServices()),
      tap(() => this.focusBlock())
    );
  }

  ngAfterViewInit(): void {
    this.servicesSub = this.services.changes.subscribe(() => {
      this.focusBlock();
    });
  }

  ngOnDestroy(): void {
    if (this.servicesSub) {
      this.servicesSub.unsubscribe();
    }
  }

  @HostListener('window:scroll', ['$event']) checkScroll() {
    this.focusBlock();
  }

  focusBlock(): void {
    const viewportHeight = window.innerHeight;

    this.services.forEach((card) => {
      const topPos = card.nativeElement.getBoundingClientRect().top;

      if (topPos > viewportHeight / 4.5 && topPos < viewportHeight / 1.4) {
        card.nativeElement.classList.add('focused');
      } else {
        card.nativeElement.classList.remove('focused');
      }
    });
  }
}
