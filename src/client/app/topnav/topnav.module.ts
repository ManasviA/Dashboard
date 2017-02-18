import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './topnav.component';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [TopNavComponent],
  exports: [TopNavComponent],
  providers: [NameListService]
})
export class TopNavModule { }
