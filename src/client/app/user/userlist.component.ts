import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../shared/data/user.service';
import { DeviceService } from '../shared/data/device.service';
import { Column } from '../dbgrid/dbgrid.component';
import { AlertService } from '../shared/data/alert.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'userlist',
  templateUrl: 'userlist.component.html',
  styles:[`
  .showPointer {
      cursor:pointer;
  }
  `]
})
export class UserListComponent implements OnInit {

  constructor(private userService:UserService,private alertService:AlertService,private deviceService:DeviceService,private router:Router) {}
  devices:any=[];
  @ViewChild('lgModal') lgModal: any;
  
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;
  data:Array<any>=[];
  public rows:Array<any> = [];
  editUser:any={};
  public columns:Array<any> = [
    {title: 'Name', name: 'name'},
    {title: 'Email',name: 'email'},
    {title: 'Employee ID',name: 'employee_id'},
    {title: 'Mobile Number', name: 'mobile_number'},
    {title: 'Location', name: 'location'},
    {title: 'Role', name: 'role'},
    {title: 'Devices', name: 'deviceString'},
    {title: 'Action', name: 'actionString'},
    {title: '', name:'deleteActionString'},
    {title: '', name:'viewLogActionString'}
   ];
  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };
  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name] && item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
    if(data.column==="actionString") {
      this.editUser=data.row;
      this.lgModal.show();
    } else if(data.column==="deleteActionString"){
      if(confirm("Are you sure to delete the user?")) {
        this.userService.delete(data.row.email).subscribe(
                data => {
                    if(data && data.message) {
                        this.alertService.success(data.message);
                    } else {
                        this.alertService.success("User successfully deleted.");
                    }
                    this.refresh();
                },
                error => {
                    if(error && error.error) {
                        this.alertService.error(error.error);
                    } else {
                        this.alertService.error("Error deleting user.");
                    }
                });
      }
    } else if(data.column==="viewLogActionString"){
        this.router.navigate(['user','activity',data.row.email]);
    }
    
  }

  addNewUser() {
      this.router.navigate(['user','users','register']);
  }

  removeDevice(id:string) {
    this.deviceService.revokeDevice({device_id:id,email:this.editUser.email})
            .subscribe(
                data => {
                    this.editUser.devices=this.editUser.devices.filter((device:any)=>device.id!=id);
                    if(data && data.message) {
                        this.alertService.success(data.message);
                    } else {
                        this.alertService.success("Device successfully revoked.");
                    }
                    this.refresh();
                },
                error => {
                    if(error && error.error) {
                        this.alertService.error(error.error);
                    } else {
                        this.alertService.error("Error revoking device.");
                    }
                });
                
  }

  addDevice(id:string) {
    this.deviceService.attachDevice({device_id:id,email:this.editUser.email})
            .subscribe(
                data => {
                    this.editUser.devices=[...this.editUser.devices,{id:id}];
                    if(data && data.message) {
                        this.alertService.success(data.message);
                    } else {
                        this.alertService.success("Device successfully attached.");
                    }
                    this.refresh();
                },
                error => {
                    if(error && error.error) {
                        this.alertService.error(error.error);
                    } else {
                        this.alertService.error("Error attaching device.");
                    }
                });
                
  }

  refresh() {
    this.userService.getAllUsers().subscribe(data=>{
        this.data=data.map((row:any)=>{
            row.deviceString="";
            row.deviceString=row.devices.map((device:any)=>device.id).join(",");
            row.name=row.user_detail.name;
            row.employee_id=row.user_detail.employee_id;
            row.mobile_number=row.user_detail.mobile_number;
            row.location=row.user_detail.location;
            row.role=row.user_detail.role;
            row.actionString="<a class=\"btn btn-primary btn-sm\">Assign Devices</a>";
            row.deleteActionString="<a class=\"btn btn-primary btn-sm\">Delete User</a>";
            row.viewLogActionString = "<a class=\"btn btn-primary btn-sm\">View Activity Log</a>";
            return row;
        });
        this.onChangeTable(this.config);
    },
    error => {
        if(error && error.error) {
            this.alertService.error(error.error);
        } else {
            this.alertService.error("Error getting devices");
        }
    });
  }

  ngOnInit() { 
    var vm=this;
    this.userService.getAllUsers().subscribe(data=>{
        vm.data=data.map((row:any)=>{
            row.deviceString="";
            row.deviceString=row.devices.map((device:any)=>device.id).join(",");
            row.name=row.user_detail.name;
            row.employee_id=row.user_detail.employee_id;
            row.mobile_number=row.user_detail.mobile_number;
            row.location=row.user_detail.location;
            row.role=row.user_detail.role;
            row.actionString="<a class=\"btn btn-primary btn-sm\">Assign Devices</a>";
            row.deleteActionString="<a class=\"btn btn-primary btn-sm\">Delete User</a>";
            row.viewLogActionString = "<a class=\"btn btn-primary btn-sm\">View Activity Log</a>";
            return row;
        });
        vm.onChangeTable(this.config);
    },
    error => {
        if(error && error.error) {
            this.alertService.error(error.error);
        } else {
            this.alertService.error("Error getting devices");
        }
    });
  }

}