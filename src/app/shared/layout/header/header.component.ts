import { LocationService } from 'src/app/shared/services/location.service';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { AccountService } from 'src/app/shared/services/account.service';
import { LanguageService } from '../../services/language.service';
import { MenuService } from '../../services/menu.service';
import { LanguageInterface } from '../../types/language.interface';
import { Router } from '@angular/router';

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
      langId: 1,
      flag: 'assets/flags/russia.svg',
      label: 'Rus',
    },
    {
      langId: 2,
      flag: 'assets/flags/eng.svg',
      label: 'En',
    },
  ];

  private langSub: Subscription;

  constructor(
    private menuService: MenuService,
    private language: LanguageService,
    private router: Router,
    public location: LocationService,
    public account: AccountService
  ) {}

  ngOnInit(): void {
    this.langSub = this.language.getLangId().subscribe((langId: number) => {
      if (langId) {
        this.activeLanguage = this.languages.find(
          (language: LanguageInterface) => {
            return language.langId === langId;
          }
        );
      }
    });
    this.isAuth = this.account.isAuth();
    combineLatest([
      this.router.events,
      this.location.currentLocation$,
    ]).subscribe(([events, currentLocation]) => {
      setTimeout(() => {
        document.documentElement.style.setProperty(
          '--header-content-height',
          this.headerInner.nativeElement.offsetHeight + 'px'
        );
      }, 0);
    });
  }

  ngOnDestroy(): void {
    if (this.langSub) {
      this.langSub.unsubscribe;
    }
  }

  setActiveLanguage(language: LanguageInterface): void {
    this.language.setLangId(language.langId);
    this.showDropdown = false;
  }

  setNavigationMenu(val: boolean): void {
    this.menuService.setNavigationMenu(val);
  }

  setUserMenu(val: boolean): void {
    this.menuService.setUserMenu(val);
  }
}
