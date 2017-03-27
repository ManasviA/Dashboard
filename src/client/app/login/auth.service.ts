// auth.service.ts

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt/angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { UserService } from '../shared/data/user.service';
import { AlertService } from '../shared/data/alert.service';
import { CONTEXTROOT } from '../shared/contextRoot';


@Injectable()
export class AuthService {

  redirectUrl: string;

  constructor(private http: Http,private userService:UserService,private alertService:AlertService) {}

  login(credentials:any) {
    return this.http.post(CONTEXTROOT+'authenticate', credentials)
      .map(res => res.json())
      .do(
        // We're assuming the response will be an object
        // with the JWT on an id_token key
        data => { 
          this.userService.saveCurrentUser(data.user);
          localStorage.setItem('id_token', data.token);
          return Observable.of(true);
        },
        error => {error=error.json(); this.alertService.error(error.error)}
      );
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    localStorage.removeItem('id_token'); 
  }

}