import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../shared/data/data.service';
import { DeviceService } from '../shared/data/device.service';
import { Column } from '../dbgrid/dbgrid.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';


/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private dataservice:DataService,private deviceService:DeviceService) {}

  private timerSubscription:any;
  searchText:any;

	ngOnInit() { 
		this.dataservice.getDashBoardData().subscribe(data=>{
					let existingDeviceIds:Array<any>=this.rows.map((row:any)=>row.id);

					let transformedData=this.transform(data);
					this.onlineDevices=transformedData.filter((device:any)=>parseInt(device.is_online)!=0);
					this.offlineDevices=transformedData.filter((device:any)=>parseInt(device.is_online)==0);

					this.rows=[...this.onlineDevices,...this.offlineDevices];

			});
    this.timerSubscription=Observable.interval(10*1000).subscribe(()=>{
      this.dataservice.getDashBoardData().subscribe(data=>{

					let existingDeviceIds:Array<any>=this.rows.map((row:any)=>row.id);
					let transformedData=this.transform(data);
					this.onlineDevices=transformedData.filter((device:any)=>parseInt(device.is_online)!=0);
					this.offlineDevices=transformedData.filter((device:any)=>parseInt(device.is_online)==0);

					this.rows=[...this.onlineDevices,...this.offlineDevices];

			});
    })
  }

  	ngOnDestroy() {
		this.timerSubscription.unsubscribe();
	}

	private onlineDevices:Array<any>=[];
	private offlineDevices:Array<any>=[];
	rows:Array<any>=[];
	
	cols:Array<Column>=[{key:'lineStatus',label:'Status'},
		{key:'alerts',label:'Alerts'},
		{key:'id',label:'Device ID/Name'},
		{key:'temp',label:'Temperature'},
		{key:'speed',label:'Speed'},
    	{key:'address',label:'Address'},
		{key:'lastUpdated',label:'Last Updated'}
  ];

	transform(devices:any) {
		return devices.map((device:any)=>{
			let newObj=device;
			if(device.is_online) {
				newObj.lineStatus="Online";
			} else {
				newObj.lineStatus="Offline";
			}
			if(device.latest_device_log) {
				newObj.lastUpdated=device.latest_device_log.created_at;
				newObj.payload=device.latest_device_log.payload;
				if(newObj.payload && newObj.payload.lat && newObj.payload.lon) {
					this.deviceService.getAddress(newObj.payload.lon,newObj.payload.lat)
					.subscribe((data:any)=>{
						if(data && data.results && data.results.length) {
							newObj.address=data.results[0].formatted_address;
						}
					})
				}
			} else {
				newObj.lastUpdated=null;
				newObj.payload={};
			}
			
			return newObj;
		});
	}
}
