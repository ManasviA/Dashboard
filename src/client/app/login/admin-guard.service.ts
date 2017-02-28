// admin-guard.service.ts

import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { UserService } from '../shared/data/user.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    if(this.userService.getCurrentUser().user_detail.role==="admin") {
      return true;
    } else {
      this.router.navigateByUrl('/user/dashboard');
      return false;
    }
  }
}