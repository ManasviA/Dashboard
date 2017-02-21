import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../shared/data/data.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';


/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  constructor(private dataservice:DataService) {}

  ngOnInit() { 
    Observable.interval(10*1000).subscribe(()=>{
      this.dataservice.getDashBoardData().subscribe(data=>console.log);
    })
  }

}