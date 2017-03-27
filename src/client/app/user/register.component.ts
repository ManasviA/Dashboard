import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {  UserService } from '../shared/data/user.service';
import {  AlertService } from '../shared/data/alert.service';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    alert:string;

    constructor(private userService: UserService, private alertService:AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.loading = false;
                    if(data && data.message) {
                        this.alertService.success(data.message);
                    } else {
                        this.alertService.success("User successfully registered.");
                    }
                },
                error => {
                    this.loading = false;
                    if(error && error.error) {
                        this.alertService.error(error.error);
                    } else {
                        this.alertService.error("Error registering user.");
                    }
                });
    }
}
