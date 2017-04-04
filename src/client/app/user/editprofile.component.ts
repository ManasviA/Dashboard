import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  UserService } from '../shared/data/user.service';
import {  AlertService } from '../shared/data/alert.service';

@Component({
    moduleId: module.id,
    templateUrl: 'editprofile.component.html'
})

export class ProfileComponent implements OnInit {
    model: any = {};
    loading = false;
    alert:string;

    constructor(private userService: UserService, private alertService:AlertService) { }

    ngOnInit() {
        this.model = this.userService.getCurrentUser().user_detail;
        this.model.email = this.userService.getCurrentUser().email;    
    }

    register() {
        this.loading = true;
        this.userService.saveProfile(this.model)
            .subscribe(
                data => {
                    this.loading = false;
                    if(data && data.message) {
                        this.alertService.success(data.message);
                    } else {
                        this.alertService.success("Profile successfully updated.");
                    }
                },
                error => {
                    this.loading = false;
                    if(error && error.error) {
                        this.alertService.error(error.error);
                    } else {
                        this.alertService.error("Error updating profile.");
                    }
                });
    }
}
