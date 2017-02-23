import { Component, Input } from '@angular/core';

export interface Column {
    key:string;
    label:string;
    minWidth:string;
}


/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'db-grid',
  templateUrl: 'dbgrid.component.html',
  styleUrls: ['dbgrid.component.css']
})
export class DbGridComponent {
    @Input()
    cols: Array<Column>;
    @Input()
    rows:any;
}