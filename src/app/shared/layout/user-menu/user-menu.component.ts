import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
  constructor(
    private menu: MenuService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  closeMenu(): void {
    this.menu.setUserMenu(false);
  }

  logout(): void {
    this.closeMenu();
    this.auth.logout();
    this.router.navigate(['/auth', 'login']);
  }
}
