import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../shared/data/data.service';
import { Column } from '../dbgrid/dbgrid.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';


/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  constructor(private dataservice:DataService) {}

  private rows:any=[{
					"id":"IOL6889YG",
					"lastUpdated":"02-02-1999",
					"lineStatus":"Online",
					"groupName":"Sneha Foods",
					"vehicleNumber":"GJ-12-R-6788",
					"driver":"Mana H. Dav",
					"speed":"60",
					"latitude":"16.489",
					"longitude":"77.93",
					"activePower":"6.77",
					"PH1":"0",
					"PH2":"0",
					"PH3":"0",
					"roomTemp":"14.6",
					"plateTemp":"53",
					"cdTemp":"20",
					"avgVolt":"0",
					"totalCurrent":"0",
					"totalKwh":"29.26",
					"battery":"11.59"
				},{
					"id":"IOL6468WK",
					"lastUpdated":"02-02-1999",
					"lineStatus":"Online",
					"groupName":"Sneha Foods",
					"vehicleNumber":"GJ-12-R-6788",
					"driver":"Mana H. Dav",
					"speed":"60",
					"latitude":"16.489",
					"longitude":"77.93",
					"activePower":"6.77",
					"PH1":"0",
					"PH2":"0",
					"PH3":"0",
					"roomTemp":"14.6",
					"plateTemp":"53",
					"cdTemp":"20",
					"avgVolt":"0",
					"totalCurrent":"0",
					"totalKwh":"29.26",
					"battery":"11.59"
				}];

  private cols:Array<Column>=[{key:'lineStatus',label:'Status',minWidth:'50px'},
    {key:'lastUpdated',label:'Last Updated',minWidth:'50px'},
		{key:'groupName',label:'GroupName',minWidth:'50px'},
		{key:'location',label:'Location',minWidth:'50px'},
		{key:'speed',label:'Speed',minWidth:'50px'}
  ];

	

  ngOnInit() { 
    Observable.interval(10*1000).subscribe(()=>{
      this.dataservice.getDashBoardData().subscribe(data=>{
				
				
	
			});
    })
  }

	

}