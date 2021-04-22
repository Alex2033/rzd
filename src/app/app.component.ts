import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  Params,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  switchMap,
  takeWhile,
} from 'rxjs/operators';
import { LanguageService } from './shared/services/language.service';
import { MenuService } from './shared/services/menu.service';

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
export class AppComponent implements OnInit {
  public navigationMenu$: Observable<boolean>;
  public userMenu$: Observable<boolean>;

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private language: LanguageService,
    private router: Router
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
          if (!event.url.includes('register')) {
            localStorage.removeItem('registerForm');
          }
          return this.route.queryParams;
        }),
        distinctUntilChanged(),
        switchMap((params: Params) => {
          this.language.init(+params.langId);
          return of(void 0);
        })
      )
      .subscribe();
  }

  initializeValues(): void {
    this.navigationMenu$ = this.menuService.showNavigationMenu;
    this.userMenu$ = this.menuService.showUserMenu;
  }

  closeMenus(): void {
    this.menuService.setNavigationMenu(false);
    this.menuService.setUserMenu(false);
  }
}
