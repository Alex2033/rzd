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
import { combineLatest, Observable, ReplaySubject, Subscription } from 'rxjs';
import { startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ServiceInterface } from 'src/app/shared/types/service.interface';
import { ServicesService } from '../../../shared/services/services.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('services') services: QueryList<ElementRef>;

  public services$: Observable<ServiceInterface[]>;

  private servicesSub: Subscription;
  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private servicesService: ServicesService,
    private location: LocationService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.services$ = combineLatest([
      this.translate.onLangChange,
      this.location.currentLocation$,
    ]).pipe(
      startWith(undefined),
      switchMap(() => this.servicesService.getServices()),
      takeUntil(this.destroy)
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
    this.destroy.next(null);
    this.destroy.complete();
  }

  setServices(): void {}

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
