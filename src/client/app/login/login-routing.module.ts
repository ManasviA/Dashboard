import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {UnauthorizedComponent} from './unauthorized.component';
import {AuthGuard} from './auth-guard.service';
import {AdminComponent} from './admin.component';
import {LoginComponent} from './login.component'

@NgModule({
  imports: [
    RouterModule.forRoot([{ path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent }])
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
