import { Component, Input, ViewEncapsulation } from '@angular/core';
import {Collapse} from './collapse.component';

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
  styleUrls: ['dbgrid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DbGridComponent {
    @Input()
    cols: Array<Column>;
    @Input()
    rows:any;
    
    private expandedIndex:Array<Number>=[];

    isExpanded(i:Number){
        return this.expandedIndex.indexOf(i)>=0;
    }
    expand(i:Number) {
        let index=this.expandedIndex.indexOf(i);
        if(index>=0) {
            this.expandedIndex=this.expandedIndex.slice(0,index).concat(this.expandedIndex.slice(index+1))
        } else {
            this.expandedIndex=[...this.expandedIndex,i];
        }
    }
}