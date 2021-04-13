import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public showNavigationMenu: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  public showUserMenu: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  setNavigationMenu(val: boolean): void {
    this.showNavigationMenu.next(val);
  }

  setUserMenu(val: boolean): void {
    this.showUserMenu.next(val);
  }
}
