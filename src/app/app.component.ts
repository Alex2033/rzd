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
import { MenuService } from './shared/services/menu.service';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';

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
    private router: Router,
    private settings: SettingsService,
    private location: LocationService,
    private gtmService: GoogleTagManagerService,
    private translate: TranslateService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.translate.use(localStorage.getItem('langId') || '1');
    this.setLocale(localStorage.getItem('langId') || '1');
    this.getQueryParams();
  }

  ngOnInit(): void {
    this.initializeValues();
    console.log(document.referrer);
  }

  setLocale(lang: string): void {
    switch (lang) {
      case '2':
        this.dateAdapter.setLocale('en-US');
        break;

      default:
        this.dateAdapter.setLocale('ru');
        break;
    }
  }

  getQueryParams(): void {
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        switchMap(({ url }: NavigationEnd) => {
          this.setGtmTag(url);
          this.removeAuthLocalStorage(url);
          this.removeOrderSessionStorage(url);
          this.toggleLocationPanel(url);

          return this.route.queryParams;
        }),
        distinctUntilChanged(),
        switchMap((params: Params) => {
          if (params.utm_source) this.settings.setUtmMark(params.utm_source);
          if (params.langId) {
            this.setLanguage(params.langId);
          }
          return of(void 0);
        }),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  initializeValues(): void {
    this.navigationMenu$ = this.menuService.showNavigationMenu;
    this.userMenu$ = this.menuService.showUserMenu;
  }

  setGtmTag(url: string): void {
    const gtmTag = {
      event: 'page',
      pageName: url,
    };

    this.gtmService.pushTag(gtmTag);
  }

  setLanguage(langId: string): void {
    this.translate.use(langId);
    localStorage.setItem('langId', langId);
  }

  removeAuthLocalStorage(url: string): void {
    if (!url.includes('sms-info')) {
      if (!url.includes('register')) {
        localStorage.removeItem('registerForm');
      }
      if (!url.includes('login')) {
        localStorage.removeItem('loginForm');
      }
    }
  }

  removeOrderSessionStorage(url: string): void {
    if (!url.includes('services-registration')) {
      sessionStorage.removeItem('rzd-order');
    }
  }

  toggleLocationPanel(url: string): void {
    if (
      url.includes('auth') ||
      (url.includes('cabinet') && !url.includes('select-point'))
    ) {
      this.location.showLocation = false;
    } else {
      this.location.showLocation = true;
    }
  }

  closeMenus(): void {
    this.menuService.setNavigationMenu(false);
    this.menuService.setUserMenu(false);
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
