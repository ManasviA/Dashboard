// auth.service.ts

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt/angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';


@Injectable()
export class AuthService {

  redirectUrl: string;

  constructor(private http: Http) {}

  login(credentials:any) {
    return this.http.post('http://localhost:8080/api/authenticate', credentials)
      .map(res => res.json())
      .do(
        // We're assuming the response will be an object
        // with the JWT on an id_token key
        data => { 
          localStorage.setItem('id_token', data.id_token);
          return Observable.of(true);
        },
        error => console.log(error)
      );
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    localStorage.removeItem('id_token'); 
  }

}