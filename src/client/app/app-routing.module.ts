import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AuthGuard} from './login/auth-guard.service'

@NgModule({
  imports: [
    RouterModule.forRoot([])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

