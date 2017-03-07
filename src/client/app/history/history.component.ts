import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DeviceService } from '../shared/data/device.service';
import 'rxjs/add/operator/switchMap';


/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'history',
  templateUrl: 'history.component.html',
})
export class HistoryComponent  implements OnInit{

      constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceService
  ) {}

  private data:any;


    ngOnInit() {
        this.route.params
        .switchMap((params: Params) => this.deviceService.getHistory(params['id']))
        .subscribe((data: any) => this.data = data);
    }

}