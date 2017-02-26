// login.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../shared/data/alert.service'

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

export class LoginComponent implements OnInit {

  credentials: Credentials;
  username:string;
  password:string;
  message:string;

  constructor(private auth: AuthService, private router:Router,private alertService:AlertService) {}

  ngOnInit() {
      this.router.events.subscribe(event => {
            if(event.url==="/logout") {
              this.auth.logout();
              this.router.navigate(["/login"]);
            }
        });
  }

  onLogin(credentials:Credentials) {
    this.alertService.info("Signing In...");
    credentials={username:this.username,password:this.password};
    this.auth.login(credentials).subscribe(()=> {
      if(this.auth.loggedIn()) {
        let redirect=this.auth.redirectUrl ? this.auth.redirectUrl:'/user/dashboard';
        this.router.navigate([redirect]); 
      }
    },error => {
     // console.log(error);
    });
  }
}