import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './topnav.component';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';
import { DropdownModule } from 'ng2-bootstrap';

@NgModule({
  imports: [CommonModule, DropdownModule.forRoot(),SharedModule],
  declarations: [TopNavComponent],
  exports: [TopNavComponent],
  providers: [NameListService]
})
export class TopNavModule { }
