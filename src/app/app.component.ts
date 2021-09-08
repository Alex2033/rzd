import { LocationService } from 'src/app/shared/services/location.service';
import { SettingsService } from './shared/services/settings.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  Params,
  Router,
} from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { LanguageService } from './shared/services/language.service';
import { MenuService } from './shared/services/menu.service';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('200ms', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  public navigationMenu$: Observable<boolean>;
  public userMenu$: Observable<boolean>;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private language: LanguageService,
    private router: Router,
    private settings: SettingsService,
    private location: LocationService,
    private gtmService: GoogleTagManagerService
  ) {
    this.getQueryParams();
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  getQueryParams(): void {
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        switchMap((event: NavigationEnd) => {
          this.setGtmTag(event.url);

          this.removeAuthLocalStorage(event);
          if (!event.url.includes('services-registration')) {
            sessionStorage.removeItem('rzd-order');
          }
          if (
            event.url.includes('auth') ||
            (event.url.includes('cabinet') &&
              !event.url.includes('select-point'))
          ) {
            this.location.showLocation = false;
          } else {
            this.location.showLocation = true;
          }
          return this.route.queryParams;
        }),
        distinctUntilChanged(),
        switchMap((params: Params) => {
          if (params.utm_source) this.settings.setUtmMark(params.utm_source);
          this.language.init(+params.langId);
          return of(void 0);
        }),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  setGtmTag(url: string): void {
    const gtmTag = {
      event: 'page',
      pageName: url,
    };

    this.gtmService.pushTag(gtmTag);
  }

  removeAuthLocalStorage(event: NavigationEnd): void {
    if (!event.url.includes('sms-info')) {
      if (!event.url.includes('register')) {
        localStorage.removeItem('registerForm');
      }
      if (!event.url.includes('login')) {
        localStorage.removeItem('loginForm');
      }
    }
  }

  initializeValues(): void {
    this.navigationMenu$ = this.menuService.showNavigationMenu;
    this.userMenu$ = this.menuService.showUserMenu;
  }

  closeMenus(): void {
    this.menuService.setNavigationMenu(false);
    this.menuService.setUserMenu(false);
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
