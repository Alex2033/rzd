import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.router.navigate(['/plug']);
    return false; // todo: убрать (временно)
    // if (this.auth.isAuth()) {
    //   return true;
    // } else {
    //   this.auth.logout();
    //   this.router.navigate(['/auth', 'login']);
    //   return false;
    // }
  }
}
