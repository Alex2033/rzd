import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { LocationService } from 'src/app/shared/services/location.service';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { combineLatest, ReplaySubject, Subscription } from 'rxjs';
import { AccountService } from 'src/app/shared/services/account.service';
import { MenuService } from '../../services/menu.service';
import { LanguageInterface } from '../../types/language.interface';
import { Router } from '@angular/router';
import { startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('headerInner') headerInner: ElementRef;

  public activeLanguage: LanguageInterface = {} as LanguageInterface;
  public showDropdown: boolean = false;
  public isAuth: boolean;
  public languages: LanguageInterface[] = [
    {
      langId: '1',
      flag: 'assets/flags/russia.svg',
      label: 'Rus',
    },
    {
      langId: '2',
      flag: 'assets/flags/eng.svg',
      label: 'En',
    },
  ];

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private menuService: MenuService,
    private router: Router,
    private translate: TranslateService,
    public location: LocationService,
    public account: AccountService
  ) {}

  ngOnInit(): void {
    this.getActiveLanguage();
    this.isAuth = this.account.isAuth();
    this.setHeaderHeightVar();
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  getActiveLanguage(): void {
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy))
      .subscribe((event: LangChangeEvent) => {
        this.activeLanguage = this.languages.find(
          (language: LanguageInterface) => language.langId === event.lang
        );
      });
  }

  setHeaderHeightVar(): void {
    combineLatest([this.router.events, this.location.currentLocation$])
      .pipe(takeUntil(this.destroy))
      .subscribe(([events, currentLocation]) => {
        setTimeout(() => {
          document.documentElement.style.setProperty(
            '--header-content-height',
            this.headerInner.nativeElement.offsetHeight + 'px'
          );
        }, 0);
      });
  }

  setActiveLanguage(language: LanguageInterface): void {
    this.translate.use(language.langId);
    localStorage.setItem('langId', language.langId);
    this.showDropdown = false;
  }

  setNavigationMenu(val: boolean): void {
    this.menuService.setNavigationMenu(val);
  }

  setUserMenu(val: boolean): void {
    this.menuService.setUserMenu(val);
  }
}
