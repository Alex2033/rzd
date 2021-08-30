import { LocationService } from 'src/app/shared/services/location.service';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/shared/services/account.service';
import { LanguageService } from '../../services/language.service';
import { MenuService } from '../../services/menu.service';
import { LanguageInterface } from '../../types/language.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
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
    private location: LocationService,
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
  }

  ngAfterViewInit(): void {
    this.location.currentLocation$.subscribe(() => {
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
