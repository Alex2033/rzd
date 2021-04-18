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
    private menu: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  goHome(): void {
    this.menu.setNavigationMenu(false);
    this.router.navigate(['/']);
  }

  closeMenu(): void {
    this.menu.setNavigationMenu(false);
  }
}
