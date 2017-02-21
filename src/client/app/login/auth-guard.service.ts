// auth-guard.service.ts

import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    if(this.auth.loggedIn()) {
      return true;
    } else {
      this.auth.redirectUrl = state.url;
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}