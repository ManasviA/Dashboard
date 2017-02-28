import { Component, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import {Collapse} from './collapse.component';

export interface Column {
    key:string;
    label:string;
    minWidth?:string;
}


/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'db-grid',
  templateUrl: 'dbgrid.component.html',
  styleUrls: ['dbgrid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DbGridComponent {
    @Input()
    cols: Array<Column>;
    @Input()
    rows:any;
    @Input()
    filter:string;
    @ViewChild('lgModal') lgModal: any;
    detailViewRow:Object={
        masterdata:{},
        localdata:{},
        gpsdata:{}
    };
    
    private expandedIndex:Array<Number>=[];

    
    expand(row:Object) {
        this.detailViewRow=row;
        this.lgModal.show();
    }
}