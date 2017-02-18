import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [SideBarComponent],
  exports: [SideBarComponent],
  providers: [NameListService]
})
export class SideBarModule { }
