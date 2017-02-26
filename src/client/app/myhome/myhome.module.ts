import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MyHomeComponent } from './myhome.component';
import { MyHomeRoutingModule } from './myhome-routing.module';

import { TopNavModule } from '../topnav/topnav.module';
import { SideBarModule } from '../sidebar/sidebar.module';
import { FooterModule } from '../footer/footer.module';
import { DashboardComponent} from '../dashboard/dashboard.component';
import { DbGridComponent  } from '../dbgrid/dbgrid.component';
import { DbColumnComponent } from '../dbgrid/dbcolumn.component';
import {DbHeaderComponent} from '../dbgrid/dbheader.component';
import {DbDetailComponent} from '../dbgrid/dbdetail.component';
import { SharedModule } from '../shared/shared.module';
import {Collapse} from '../dbgrid/collapse.component';
import {RegisterComponent} from '../user/register.component';

@NgModule({
  imports: [BrowserModule, HttpModule, MyHomeRoutingModule, SideBarModule, TopNavModule, FooterModule, SharedModule.forRoot()],
  declarations: [MyHomeComponent,DashboardComponent,Collapse,DbGridComponent,DbColumnComponent,DbHeaderComponent,DbDetailComponent,RegisterComponent],
  providers: [],
  bootstrap: [MyHomeComponent]

})
export class MyHomeModule { }