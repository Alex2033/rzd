import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
})
export class NavigationMenuComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document,
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  scrollToElement(anchor: string): void {
    this.menuService.setNavigationMenu(false);
    const element = this.document.querySelector('#' + anchor);
    element.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    });
  }

  goHome(): void {
    this.menuService.setNavigationMenu(false);
    this.router.navigate(['/home']);
  }
}
