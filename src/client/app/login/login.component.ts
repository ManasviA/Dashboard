// login.component.ts

import { Component } from '@angular/core';
import { AuthService } from './auth.service';

interface Credentials {
  username: string,
  password: string
}

@Component({
  selector: 'login',
  template: `
    <form #f="ngForm" (ngSubmit)="onLogin(f.value)" *ngIf="!auth.loggedIn()">
      <input type="text" placeholder="username" [(ngModel)]="username" name="username">
      <input type="password" placeholder="password" [(ngModel)]="password" name="password">
      <button type="submit">Submit</button>    
    </form>
  `
})

export class LoginComponent {

  credentials: Credentials;
  username:string;
  password:string;

  constructor(private auth: AuthService) {}

  onLogin(credentials:Credentials) {
    credentials={username:this.username,password:this.password};
    this.auth.login(credentials);
  }
}