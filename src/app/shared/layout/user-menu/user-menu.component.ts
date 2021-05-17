import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthResponseInterface } from 'src/app/auth/types/auth-response.interface';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
  public user$: Observable<AuthResponseInterface>;

  constructor(
    private menu: MenuService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.auth.getUser();
  }

  closeMenu(): void {
    this.menu.setUserMenu(false);
  }

  logout(): void {
    this.closeMenu();
    this.auth.logout();
    this.router.navigate(['/auth', 'login']);
  }
}
