import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
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
    private language: LanguageService
  ) {
    this.getQueryParams();
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  getQueryParams(): void {
    this.route.queryParams
      .pipe(
        switchMap((params: Params) => {
          if (+params.langId === 2) {
            this.language.setLangId(2);
            this.language.init(2);
          }
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
