import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
  constructor(private menu: MenuService) {}

  ngOnInit(): void {}

  closeMenu(): void {
    this.menu.setUserMenu(false);
  }

  logout(): void {
    console.log('LOGOUT');
  }
}
