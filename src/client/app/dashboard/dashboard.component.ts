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
	"dataset": {
		"trackid": {
			"idnum": "0123456",
			"title": "example"
		},
		"gpsdata": {
			"lat": "12.909362793",
			"lon": "77.614883423",
			"alt": "887",
			"speed": "60.5",
			"satellite": "13"
		},
		"masterdata": {
			"door": "1",
			"platetemp": "-22",
			"roomtemp": "-20",
			"cdtemp": "-21",
			"kwhunit": "5010",
			"fault": "0",
			"vmrc": "0",
			"probe": "0",
			"compstate": "101",
			"fan1": "1",
			"fan2": "1",
			"highpr": "10",
			"lowpr": "8",
			"sppr": "0",
			"overvolt": "0",
			"param1": "0",
			"param2": "0",
			"param3": "0",
			"param4": "0",
			"param5": "0",
			"paramn": "0"
		},
		"localdata": {
			"msgnum": "1",
			"gsmsignal": "21",
			"battery": "80"
		}
	}
}];

  private cols:Array<Column>=[{key:'lineStatus',label:'Status',minWidth:'50px'},
    {key:'lastUpdated',label:'Last Updated',minWidth:'50px'},
		    {key:'groupName',label:'GroupName',minWidth:'50px'},
		    {key:'location',label:'Location',minWidth:'50px'},
				{key:'speed',label:'Speed',minWidth:'50px'}
  ];

  ngOnInit() { 
    Observable.interval(10*1000).subscribe(()=>{
      this.dataservice.getDashBoardData().subscribe(data=>console.log);
    })
  }

}