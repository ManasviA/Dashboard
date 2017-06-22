import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/data/user.service';
import { AlertService } from '../shared/data/alert.service';
import { DeviceService} from '../shared/data/device.service';
import { NgZone } from '@angular/core';
import { Subject }           from 'rxjs/Subject';

import 'jquery/dist/jquery.min.js';

@Component({
    moduleId: module.id,
    templateUrl: 'deviceView.component.html'
})

export class DeviceViewComponent implements OnInit{
    model: any = {};
    loading = false;
    alert:string;
    step:number;
    mapCircle:any;
    map:any; //Will contain map object.
    marker:any = false; ////Has the user plotted their location marker? 
    radiusChangeSubject = new Subject<String>();
    mode:string = "View";
    deviceId:any;

    constructor(private deviceService: DeviceService, private alertService:AlertService, private zone: NgZone, private route:ActivatedRoute, private router:Router) { 
        this.step = 1;
    }

    ngOnInit() {
        this.route.url.subscribe((path:any) => {
            if(path && path[1] && path[1].path === "view") {
                this.mode = "View";
                this.getDeviceConfig(path[2].path);
            } else if(path && path[1] && path[1].path === "edit") {
                this.mode = "Edit";
                this.getDeviceConfig(path[2].path);
            } else {
                this.mode = "Add";
            }
        });
        
    }

    getDeviceConfig(id:string) {
        this.deviceService.getDeviceConfig(id)
            .subscribe(
                data => {
                    this.model = data;
                }
            );
    }

    nextStep() {
        this.step++;
        if(this.step === 3 && this.model.geofence_enabled==='true') {
            setTimeout(()=> { 
                this.initMap();
            },500);
        }
    }

    previousStep() {
        this.step--;
    }

    register() {
        this.loading = true;
        this.deviceService.create(this.model)
            .subscribe(
                data => {
                    this.loading=false;
                    if(data && data.message) {
                        this.alertService.success(data.message);
                    } else {
                        this.alertService.success("Device successfully added.");
                    }
                },
                error => {
                    this.loading=false;
                    if(error && error.error) {
                        this.alertService.error(error.error);
                    } else {
                        this.alertService.error("Error adding device.");
                    }
                });
    }

    
        
//Function called to initialize / create the map.
//This is called when the page has loaded.
initMap() {
 
    //The center location of our map.
    var centerOfMap = new google.maps.LatLng(this.model.lat, this.model.lon);
 
    //Map options.
    var options = {
      center: centerOfMap, //Set center.
      zoom: 7 //The zoom value.
    };
 
    //Create the map object.
    this.map = new google.maps.Map(document.getElementById('map'), options);

    var that = this;
    
    this.marker = new google.maps.Marker({
        position: centerOfMap,
        map: that.map
    });
 
    
    new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: that.map,
        center: that.marker.getPosition(),
        radius: parseInt(that.model.radius)*1000
    });
}
        
}
