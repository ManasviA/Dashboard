import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../login/auth-guard.service';
import { MyHomeComponent} from './myhome.component';
import { DashboardComponent} from '../dashboard/dashboard.component';
import {RegisterComponent} from '../user/register.component';


const myHomeRoutes: Routes = [
  {
    path: 'user',
    component: MyHomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'register', component: RegisterComponent }
        ],
      }
    ]
  }
];

// [{ path: 'user', component: MyHomeComponent,children: [
//           {
//             path: 'dashboard',
//             component: DashboardComponent
//           }
//         ]
//     }]


@NgModule({
  imports: [
    RouterModule.forChild(myHomeRoutes)
  ],
  exports: [RouterModule]
})
export class MyHomeRoutingModule { }