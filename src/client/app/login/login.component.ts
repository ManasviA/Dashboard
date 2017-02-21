// login.component.ts

import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';

interface Credentials {
  username: string,
  password: string
}

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  moduleId: module.id,
  styleUrls: ['login.component.css']
})

export class LoginComponent {

  credentials: Credentials;
  username:string;
  password:string;
  message:string;

  constructor(private auth: AuthService, private router:Router) {}

  onLogin(credentials:Credentials) {
    this.message="Signing In..."
    credentials={username:this.username,password:this.password};
    this.auth.login(credentials).subscribe(()=> {
      if(this.auth.loggedIn()) {
        let redirect=this.auth.redirectUrl ? this.auth.redirectUrl:'/user/dashboard';
        this.router.navigate([redirect]); 
      }
    },error => {
      this.message=error.error;
    });
  }
}