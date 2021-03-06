import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [FooterComponent],
  exports: [FooterComponent],
  providers: [NameListService]
})
export class FooterModule { }
