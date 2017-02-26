import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TopNavModule } from './topnav/topnav.module';
import { SideBarModule } from './sidebar/sidebar.module';
import { FooterModule } from './footer/footer.module';
import { SharedModule } from './shared/shared.module';
import { MyHomeModule } from './myhome/myhome.module';
import { LoginModule } from './login/login.module';
import {NgIdleModule} from '@ng-idle/core';
import { MomentModule } from 'angular2-moment';


@NgModule({
  imports: [BrowserModule, HttpModule, AppRoutingModule, MyHomeModule, LoginModule, SharedModule.forRoot(),
    MomentModule,
    NgIdleModule.forRoot()
],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})
export class AppModule { }