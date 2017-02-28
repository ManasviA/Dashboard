import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AlertService} from '../shared/data/alert.service';
import {PasswordService} from '../shared/data/password.service'


@Component({
    moduleId: module.id,
    templateUrl: 'reset.component.html'
})

export class ResetComponent {

    constructor(private route: ActivatedRoute,private alertService:AlertService,private passwordService:PasswordService) { }
    alert:string;
    emailInput:string="";
    loading:boolean=false;

    reset() {
        this.loading = true;
        this.passwordService.forgetPass(this.emailInput)
            .subscribe(
                data=> {
                    if(data && data.message) {
                        this.alertService.success(data.message);
                    }
                },
                error => {
                  this.loading = false;
                  if(error && error.error) {
                        this.alertService.error(error.error);
                    } else {
                        this.alertService.error("Error. Please try again.");
                    }
                }
            )
    }

    // reset() {
    //     this.loading = true;
    //     this.userService.create(this.model)
    //         .subscribe(
    //             data => {
    //                 if(data && data.message) {
    //                     this.alertService.success(data.message);
    //                 } else {
    //                     this.alertService.success("User successfully registered.");
    //                 }
    //             },
    //             error => {
    //                 if(error && error.error) {
    //                     this.alertService.error(error.error);
    //                 } else {
    //                     this.alertService.error("Error registering user.");
    //                 }
    //             });
    // }
}