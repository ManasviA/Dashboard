import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/data/user.service';
import { AlertService } from '../shared/data/alert.service';
import { DeviceService} from '../shared/data/device.service';

@Component({
    moduleId: module.id,
    templateUrl: 'deviceRegister.component.html'
})

export class DeviceRegisterComponent {
    model: any = {};
    loading = false;
    alert:string;

    constructor(private deviceService: DeviceService, private alertService:AlertService) { }

    register() {
        this.loading = true;
        this.deviceService.create(this.model)
            .subscribe(
                data => {
                    if(data && data.message) {
                        this.alertService.success(data.message);
                    } else {
                        this.alertService.success("Device successfully added.");
                    }
                },
                error => {
                    if(error && error.error) {
                        this.alertService.error(error.error);
                    } else {
                        this.alertService.error("Error adding device.");
                    }
                });
    }
}
