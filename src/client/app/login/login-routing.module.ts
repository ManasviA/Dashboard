import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth-guard.service';
import {AdminGuard} from './admin-guard.service';
import {NotLoggedInGuard} from './not-logged-guard.service'
import {AuthService} from './auth.service';
import {LoginComponent} from './login.component';
import {ResetComponent} from './reset.component';
import {NewPassComponent} from './newpass.component';

const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent , canActivate: [NotLoggedInGuard] },
  { path: 'logout', component: LoginComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'resetpassword', component: NewPassComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**',   redirectTo: '/login', pathMatch: 'full' }
];

// { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard', component: AdminComponent, canActivate: [AuthGuard] }
  

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AdminGuard,
    NotLoggedInGuard,
    AuthService
  ]
})
export class LoginRoutingModule { }
