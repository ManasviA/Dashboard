import { Component, Input, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserService } from '../shared/data/user.service';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js';
import 'bootstrap-timepicker/js/bootstrap-timepicker.js';
import { CONTEXTROOT } from '../shared/contextRoot';


interface ActivityLog {
  "login_id": Number,
  "created_at": Date,
  "activity_type": String,
  "details": any
}

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  templateUrl: 'activity.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ActivityComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private datePipe: DatePipe
  ) { }

  private data: any;
  private startOpened: boolean;
  startdt: Date = new Date();
  private endOpened: boolean;
  enddt: Date = new Date();
  dateEntered: boolean = false;
  private loading: any;
  date: Date;
  userId:string;
  public columns: Array<any> = [
    { title: 'Time', name: 'created_at' },
    { title: 'Activity', name: 'activity' }
  ];
  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-striped', 'table-bordered']
  };
  rows: Array<any>;

  ngOnInit() {
    (this.startdt = new Date()).setHours(this.startdt.getHours() - 24);
    this.route.params
          .subscribe((params: Params) => {
              this.userId=params['id'] || this.userService.getCurrentUser().email;
          })    
  }

  startOpen(): void {
    this.startOpened = !this.startOpened;
  }

  getStartDate(): number {
    return this.startdt && this.startdt.getTime() || new Date().getTime();
  }

  clearStartDate(): void {
    this.startdt = void 0;
  }

  onStartSelectionDone(): void {
    this.startOpened = false;
    this.endOpened = true;
  }

  endOpen(): void {
    this.endOpened = !this.endOpened;
  }

  getEndDate(): number {
    return this.enddt && this.enddt.getTime() || new Date().getTime();
  }

  clearEndDate(): void {
    this.enddt = void 0;
  }

  onEndSelectionDone(): void {
    this.endOpened = false;
  }

  getData(): void {
    this.dateEntered = true;
    this.loading = true;
    this.userService.getActivityLog((new Date(this.startdt)).toISOString(), (new Date(this.enddt)).toISOString(), this.userId)
      .subscribe((data: any) => {
        this.data = data;
        this.rows = data.map((log: ActivityLog) => {
          return {
            created_at: this.getLocalDate(log.created_at),
            activity: this.getActivityString(log)
          }
        });
        this.loading = false;
      });
  }

  getActivityString(log: ActivityLog): String {
    switch (log.activity_type) {
      case 'login':
        return `User logged in.`;

      case 'logout':
        return `User logged out.`;

      case 'reset_password_email':
        return `User requested password reset.`;

      case 'change_password':
        return 'User changed password.';

      case 'add_user':
        return `Admin added user - <b>${log.details.email}</b>.`;

      case 'user_created':
        return `User was added by admin - <b>${log.details.email}</b>.`;

      case 'remove_user':
        return `Admin removed user - <b>${log.details.email}</b>.`;

      case 'update_profile':
        return `User updated profile.`;

      case 'add_device':
        return `Admin added device - <b>${log.details.id}</b>`;

      case 'remove_device':
        return `Admin removed device - <b>${log.details.id}</b>`;

      case 'update_device_config':
        return `User updated device configuration - <b>${log.details.id}</b>.`;

      case 'assign_device':
        return `Admin assigned device <b>${log.details.id}</b> to user - <b>${log.details.email}</b>`;

      case 'device_assigned':
        return `Admin - <b>${log.details.email}</b> assigned device <b>${log.details.id}</b> to user.`;

      case 'revoke_device':
        return `Admin revoked device <b>${log.details.id}</b> from user - <b>${log.details.email}</b>`;

      case 'device_revoked':
        return `Admin - <b>${log.details.email}</b> revoked device <b>${log.details.id}</b> from user.`;

      case 'view_historic_data':
        return `User viewed historic data for device - <b>${log.details.id}</b> from <b>${this.getLocalDate(log.details.from)}</b> to <b>${this.getLocalDate(log.details.to)}</b>.`;

      case 'pdf_report':
        return `User generated PDF report for device - <b>${log.details.id}</b> from <b>${this.getLocalDate(log.details.from)}</b> to <b>${this.getLocalDate(log.details.to)}</b>.`;

      case "csv_report":
        return `User generated CSV report for device - <b>${log.details.id}</b> from <b>${this.getLocalDate(log.details.from)}</b> to <b>${this.getLocalDate(log.details.to)}</b>.`;

      default:
        return "";
    }
  }

  getLocalDate(date:any) {
    return this.datePipe.transform(new Date(`${date} UTC`),'medium');
  }

}