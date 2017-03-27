import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AlertService} from '../shared/data/alert.service';
import {PasswordService} from '../shared/data/password.service'

export interface NewPassObj {
    token?:string;
    email?:string;
    password?:string;
    password_confirmation?:string;
}


@Component({
    moduleId: module.id,
    templateUrl: 'newpass.component.html'
})

export class NewPassComponent implements OnInit{

    constructor( private route: ActivatedRoute,private alertService:AlertService,private passwordService:PasswordService) { }
    alert:string;
    loading:boolean=false;
    newPassObj:NewPassObj={};
    passChanged:boolean=false;

    ngOnInit() {
        this.route.queryParams
        .subscribe((params: Params) => {
            this.newPassObj.email=params['email'];
            this.newPassObj.token=params['token'];
        });
    }

    reset() {
        this.loading = true;
        this.passwordService.resetPass(this.newPassObj)
            .subscribe(
                data=> {
                    this.loading = false;
                    this.passChanged=true;
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
}