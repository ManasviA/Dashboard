/// <reference path="../../../../node_modules/@types/googlemaps/index.d.ts" />

import { Component, Input, ViewEncapsulation, ViewChild, OnChanges, SimpleChange  } from '@angular/core';
import {Collapse} from './collapse.component';
import { Router } from '@angular/router';

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
export class DbGridComponent implements OnChanges{
    @Input()
    cols: Array<Column>;
    @Input()
    rows:any;
    @Input()
    filter:string;
    @ViewChild('lgModal') lgModal: any;
    detailViewRow:any={
        payload:{}
    };
    
    constructor(private router:Router) {}

    private expandedIndex:Array<Number>=[];
    private map:any;
    private marker:any;

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        if(this.detailViewRow.id) {
            this.detailViewRow=changes['rows'].currentValue.filter((data:any)=>data.id==this.detailViewRow.id)[0];
            var LatLng = new google.maps.LatLng(this.detailViewRow.payload.lat, this.detailViewRow.payload.lon);
            this.marker.setPosition(LatLng);
            if(!this.map.getBounds().contains(this.marker.getPosition())) {
                this.map.setCenter(this.marker.getPosition());  
            }
        }
    }

    viewHistory() {
        this.router.navigate(['user','devices','history',this.detailViewRow.id]);
    }
    
    expand(row:any) {
        this.detailViewRow=row;
        this.lgModal.show();
        var vm=this;
        setTimeout(() => {
            this.map=new google.maps.Map(document.getElementById('map'), {
            center: {lat: parseInt(row.payload.lat), lng: parseInt(row.payload.lon)},
            zoom: 15
            });
            vm.marker = new google.maps.Marker({
                position: {lat: parseInt(row.payload.lat), lng: parseInt(row.payload.lon)},
                map: this.map,
                icon:'assets/images/Jeep.png'
            });
            if(!this.map.getBounds().contains(this.marker.getPosition())) {
                this.map.setCenter(this.marker.getPosition());  
            }
        
        },500);
    }
}