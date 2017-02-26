import { Component, Input } from '@angular/core';
import { Column } from './dbgrid.component'


/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'db-column',
  templateUrl: 'dbcolumn.component.html',
  styleUrls: ['dbgrid.component.css']
})
export class DbColumnComponent {
    @Input()
    col: Column;
    @Input()
    data:any;
}