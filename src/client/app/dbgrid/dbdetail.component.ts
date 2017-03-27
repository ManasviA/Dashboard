/// <reference path="../../../../node_modules/@types/googlemaps/index.d.ts" />
import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { Column } from './dbgrid.component'


/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'db-detail',
  templateUrl: 'dbdetail.component.html',
})
export class DbDetailComponent {
    @Input()
    data:any;

    getBoolVal(val:any) {
        return (val==0)?"OFF":"ON";
    }
}