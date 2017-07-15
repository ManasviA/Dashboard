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
    templateUrl: 'deviceEdit.component.html'
})

export class DeviceEditComponent implements OnInit{
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
        this.radiusChangeSubject
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe((data)=>{
                this.mapCircle && this.mapCircle.setMap(null);
                var that = this;
                this.mapCircle = new google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    map: that.map,
                    center: that.marker.getPosition(),
                    radius: parseInt(that.model.radius)*1000
                });
            })
            this.model.geofence_enabled = "false";
    }

    getTimeZones() {
        return this.deviceService.getTimezones();
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
        this.deviceService.edit(this.model)
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

    handleChange(e:Event) {
        if((<HTMLInputElement>e.target).checked && this.model.geofence_enabled === "true") {
            setTimeout(()=> { 
                this.initMap();
            },500);
        }
    }

    radiusChanged(value:any) {
        this.radiusChangeSubject.next(value);
    }

    
        
//Function called to initialize / create the map.
//This is called when the page has loaded.
initMap() {

    var lat = 19.37334071336406, lon = 73.13323974609375;
 
    //The center location of our map.
    if(this.model.lat && this.model.lat!="") {
        lat = parseFloat(this.model.lat);
    }

    if(this.model.lon && this.model.lon!="") {
        lon = parseFloat(this.model.lon);
    }

    var centerOfMap = new google.maps.LatLng(lat,lon);

    //Map options.
    var options = {
      center: centerOfMap, //Set center.
      zoom: 7 //The zoom value.
    };
 
    //Create the map object.
    this.map = new google.maps.Map(document.getElementById('map'), options);

    if(this.model.lat && this.model.lat!="" && this.model.lon && this.model.lon!="") {
        this.marker = new google.maps.Marker({
                position: centerOfMap,
                map: this.map,
                draggable: true //make it draggable
            });
    }

    if(this.model.radius && this.model.radius!="") {
        this.mapCircle && this.mapCircle.setMap(null);
        var that = this;
        this.mapCircle = new google.maps.Circle({
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

    //Listen for any clicks on the map.
    google.maps.event.addListener(this.map, 'click', (event:any) => {                
        //Get the location that the user clicked.
        var clickedLocation = event.latLng;
        //If the marker hasn't been added.
        if(this.marker === false){
            //Create the marker.
            this.marker = new google.maps.Marker({
                position: clickedLocation,
                map: this.map,
                draggable: true //make it draggable
            });
            //Listen for drag events!
            google.maps.event.addListener(this.marker, 'dragend', (event:any) => {
                this.markerLocation();
            });
        } else{
            //Marker has already been added, so just change its location.
            this.marker.setPosition(clickedLocation);
        }
        //Get the marker's location.
        this.markerLocation();
    });
}
        
//This function will get the marker's current location and then add the lat/long
//values to our textfields so that we can save the location.
    markerLocation(){
        //Get location.
        var currentLocation = this.marker.getPosition();
        //Add lat and lng values to a field that we can save.
        this.zone.run(()=> {
            this.mapCircle && this.mapCircle.setMap(null);
            this.model.radius = 0;
            this.model.lat = currentLocation.lat(); //latitude
            this.model.lon = currentLocation.lng(); //longitude
        })
        
    }





}
