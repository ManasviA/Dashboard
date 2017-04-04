import { NgModule} from '@angular/core';
import {Http, RequestOptions} from '@angular/http'
import { AuthService} from './auth.service';
import { AuthGuard} from './auth-guard.service';
import { LoginComponent} from './login.component';
import { ResetComponent} from './reset.component';
import { NewPassComponent} from './newpass.component';
import { LoginRoutingModule} from './login-routing.module';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AuthHttp, AuthConfig } from 'angular2-jwt/angular2-jwt';
import {SharedModule} from '../shared/shared.module';
import { CarouselModule } from 'ng2-bootstrap';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}


@NgModule({
  imports:[LoginRoutingModule, FormsModule, BrowserModule, CommonModule, CarouselModule.forRoot(), SharedModule.forRoot()],
  declarations: [LoginComponent,ResetComponent,NewPassComponent],
  providers: [{
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  }]
})
export class LoginModule {}