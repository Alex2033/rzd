import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/internal/operators/first';
import { LanguageService } from '../../services/language.service';
import { MenuService } from '../../services/menu.service';
import { LanguageInterface } from '../../types/language.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public activeLanguage: LanguageInterface = {} as LanguageInterface;
  public showDropdown: boolean = false;
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

  constructor(
    private menuService: MenuService,
    private language: LanguageService
  ) {}

  ngOnInit(): void {
    this.language.langId.subscribe((langId: number) => {
      if (langId) {
        this.activeLanguage = this.languages.find(
          (language: LanguageInterface) => {
            return language.langId === langId;
          }
        );
      }
    });
  }

  setActiveLanguage(language: LanguageInterface): void {
    this.activeLanguage = language;
    this.showDropdown = false;
  }

  setNavigationMenu(val: boolean): void {
    this.menuService.setNavigationMenu(val);
  }

  setUserMenu(val: boolean): void {
    this.menuService.setUserMenu(val);
  }
}
