import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MyHomeComponent } from './myhome.component';
import { MyHomeRoutingModule } from './myhome-routing.module';
import { PaginationModule  } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { DropdownModule } from 'ng2-bootstrap';
import { Ng2TableModule } from 'ng2-table/ng2-table';
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
import {UserListComponent} from '../user/userlist.component';
import {DeviceRegisterComponent} from '../device/deviceRegister.component';
import {DeviceListComponent} from '../device/deviceList.component';
import {SearchPipe} from '../dashboard/search.pipe';
import { ModalModule } from 'ng2-bootstrap';
import { HistoryComponent } from '../history/history.component';
import { DatepickerModule } from 'ng2-bootstrap';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

@NgModule({
  imports: [BrowserModule, HttpModule,Ng2TableModule,PaginationModule.forRoot(),ModalModule.forRoot(),DropdownModule.forRoot(),TabsModule.forRoot(), DatepickerModule.forRoot(), NKDatetimeModule, MyHomeRoutingModule, SideBarModule, TopNavModule, FooterModule, SharedModule.forRoot()],
  declarations: [MyHomeComponent,DashboardComponent,Collapse,DbGridComponent,DbColumnComponent,DbHeaderComponent,DbDetailComponent,RegisterComponent,DeviceRegisterComponent,DeviceListComponent,UserListComponent,SearchPipe,HistoryComponent],
  providers: [],
  bootstrap: [MyHomeComponent]

})
export class MyHomeModule { }