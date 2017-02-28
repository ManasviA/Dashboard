import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NameListService } from './name-list/name-list.service';
import {DataService} from './data/data.service';
import {UserService} from './data/user.service';
import {PasswordService} from './data/password.service';
import  {AlertService} from './data/alert.service';
import {DeviceService} from './data/device.service';
import {AlertComponent} from './alert/alert.component'

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ToolbarComponent, NavbarComponent,AlertComponent],
  exports: [ToolbarComponent, NavbarComponent,AlertComponent,
    CommonModule, FormsModule, RouterModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NameListService,DataService,UserService,AlertService,PasswordService,DeviceService]
    };
  }
}
