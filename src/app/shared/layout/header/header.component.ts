import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageService } from '../../services/language.service';
import { MenuService } from '../../services/menu.service';
import { LanguageInterface } from '../../types/language.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public languages$: Observable<LanguageInterface[]>;
  public activeLanguage$: Observable<LanguageInterface>;
  public showDropdown: boolean = false;

  constructor(
    private language: LanguageService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.languages$ = this.language.getLanguages();
    this.activeLanguage$ = this.language.activeLanguage;
  }

  setActiveLanguage(language: LanguageInterface): void {
    this.language.activeLanguage.next(language);
    this.showDropdown = false;
  }

  setNavigationMenu(val: boolean): void {
    this.menuService.setNavigationMenu(val);
  }

  setUserMenu(val: boolean): void {
    this.menuService.setUserMenu(val);
  }
}
