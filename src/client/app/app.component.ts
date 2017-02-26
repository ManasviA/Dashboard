import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Config } from './shared/config/env.config';
import {AuthService} from './login/auth.service'
import './operators';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';


/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit{
  constructor(private idle: Idle, private router:Router, private auth: AuthService) {
    console.log('Environment config', Config);
  }
  ngOnInit() { 
    this.idle.setIdle(2);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(2);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.idle.onIdleEnd.subscribe(() => {console.log("Idle end")});

    this.idle.onTimeout.subscribe(() => {
      console.log("timeout");
      if(this.auth.loggedIn()) {
        this.auth.logout();
       this.router.navigate(['/login']);
      }
    });
    this.idle.onIdleStart.subscribe(() =>{console.log('You\'ve gone idle!')});

  }
}
