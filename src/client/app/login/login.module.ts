import {NgModule} from '@angular/core';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth-guard.service';
import {LoginComponent} from './login.component';
import {UnauthorizedComponent} from './unauthorized.component';
import {LoginRoutingModule} from './login-routing.module';
import {AdminComponent} from './admin.component';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@NgModule({
  imports:[LoginRoutingModule, FormsModule, BrowserModule, CommonModule],
  declarations: [LoginComponent,UnauthorizedComponent,AdminComponent],
  providers: [AuthService, AuthGuard]
})
export class LoginModule {}

  