import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Subject } from 'rxjs/Subject';
import { CONTEXTROOT } from '../contextRoot';

export interface Device {
    id: number;
    vehicle_no:Number;
    name:string;
    driver:string;
}

export interface DeviceUserMapping {
    device_id:string;
    email:string;
}

@Injectable()
export class DeviceService {
    constructor(private http: Http, private authHttp:AuthHttp) { }

    create(device: Device) {
        return this.authHttp.post(CONTEXTROOT+'device/add', device).map((response: Response) => response.json());
    }

    delete(deviceId: string) {
        return this.authHttp.post(CONTEXTROOT+'device/remove', {id:deviceId}).map((response: Response) => response.json());
    }
    
    getAllDevices() {
        return this.authHttp.get(CONTEXTROOT+'device').map((response: Response) => response.json());
    }

    attachDevice(deviceUserMapping:DeviceUserMapping) {
        return this.authHttp.post(CONTEXTROOT+'device/assign',deviceUserMapping).map((response: Response) => response.json());
    }

    revokeDevice(deviceUserMapping:DeviceUserMapping) {
        return this.authHttp.post(CONTEXTROOT+'device/revoke',deviceUserMapping).map((response: Response) => response.json());
    }

    getAddress(longitude:any,latitude:any) {
        return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude).map((response: Response) => response.json());
    }

    getHistory(id:string) {
        return this.authHttp.get(CONTEXTROOT+"device/history").map((response: Response) => response.json());
    }

}