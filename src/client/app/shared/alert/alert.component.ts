import { Component, OnInit } from '@angular/core';

import { AlertService } from '../data/alert.service';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit {
    message: any;

    constructor(private alertService: AlertService) {}

    ngOnInit() {
console.log("Intialized");
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}