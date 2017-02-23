import { Component, Input } from '@angular/core';
import { Column } from './dbgrid.component'


/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'db-detail',
  templateUrl: 'dbdetail.component.html',
})
export class DbDetailComponent {
    @Input()
    data:any;
}