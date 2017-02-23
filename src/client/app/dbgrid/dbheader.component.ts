import { Component, Input } from '@angular/core';
import { Column } from './dbgrid.component'


/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'db-header',
  templateUrl: 'dbheader.component.html',
})
export class DbHeaderComponent {
    @Input()
    col: Column;
}