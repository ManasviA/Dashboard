// auth-guard.service.ts

import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class NotLoggedInGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    if(this.auth.loggedIn()) {
      this.router.navigateByUrl('/user/dashboard');
      return false;
    } else {
      return true;
    }
  }
}