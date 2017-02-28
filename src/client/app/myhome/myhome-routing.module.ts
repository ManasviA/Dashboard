import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../login/auth-guard.service';
import { AdminGuard } from '../login/admin-guard.service';
import { MyHomeComponent} from './myhome.component';
import { DashboardComponent} from '../dashboard/dashboard.component';
import {RegisterComponent} from '../user/register.component';
import {DeviceRegisterComponent} from '../device/deviceRegister.component';
import {DeviceListComponent} from '../device/deviceList.component';
import {UserListComponent} from '../user/userlist.component';


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
          { path: 'register', component: RegisterComponent, canActivate: [AdminGuard] },
          { path: 'adddevice', component: DeviceRegisterComponent, canActivate: [AdminGuard]  },
          { path: 'devices', component: DeviceListComponent  },
          { path: 'users', component: UserListComponent, canActivate: [AdminGuard]  },
          { path: '**', component: DashboardComponent }
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