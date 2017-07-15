import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DeviceService } from '../shared/data/device.service';
import { UserService } from '../shared/data/user.service';
import { Column } from '../dbgrid/dbgrid.component';
import { AlertService } from '../shared/data/alert.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'devicelist',
  templateUrl: 'deviceList.component.html',
  styles:[`
  .showPointer {
      cursor:pointer;
  }
  `]
})
export class DeviceListComponent implements OnInit {

  constructor(private deviceService:DeviceService,private alertService:AlertService,private userService:UserService,private router:Router) {}
  devices:any=[];
  @ViewChild('lgModal') lgModal: any;
  
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;
  data:Array<any>=[];
  public rows:Array<any> = [];
  public test:any="test";
  public columns:Array<any> = [
    {title: 'Device ID', name: 'id'},
    {title: 'Device Name',name: 'name'},
    {title: 'Vehicle Number',name: 'vehicle_no'}
    //  {title: 'Action', name: 'actionString',className:'showPointer'}
   ];
  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };
  public userType:string="";
  
  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

viewHistory() {
  console.log("View History");
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
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
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
    if(data.column=="actionString") {
      if(confirm("Are you sure to delete the device?")) {
          this.deviceService.delete(data.row.id).subscribe(data=>{
             if(data && data.message) {
                  this.alertService.success(data.message);
              } else {
                  this.alertService.success("Device successfully deleted.");
              }
              this.deviceService.getAllDevices().subscribe(data=>{
              this.data=data.map((row:any)=>{
                      row.userString="";
                      row.userString=row.logins.map((login:any)=>login.user_detail.name).join(",");
                      row.actionString="<a class=\"btn btn-primary btn-sm\">Delete Device</a>";
                      row.historyString="<a class=\"btn btn-primary btn-sm\" >View History</a>";
                      row.viewConfigString="<a class=\"btn btn-primary btn-sm btn-sm\" >View Config</a>";
                      row.editConfigString="<a class=\"btn btn-primary btn-sm btn-sm\" >Edit Config</a>";
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
          },
          error => {
              if(error && error.error) {
                  this.alertService.error(error.error);
              } else {
                  this.alertService.error("Error deleting device.");
              }
          });
      }
    } else if(data.column=="historyString") {
        this.router.navigate(["user","devices","history",data.row.id]);
    } else if(data.column=="viewConfigString") {
        this.router.navigate(["user","devices","adddevice","view",data.row.id]);
    } else if(data.column=="editConfigString") {
        this.router.navigate(["user","devices","adddevice","edit",data.row.id]);
    }
  }

  addNewDevice() {
      this.router.navigate(['user','devices','adddevice']);
  }

  ngOnInit() { 
    var vm=this;
    this.userType=this.userService.getCurrentUser().user_detail.role;
    if(this.userType==="admin") {
      this.columns.push({title: 'Users', name: 'userString'});
      this.columns.push({title: 'Delete Device', name: 'actionString'});
      this.columns.push({title: 'View History', name: 'historyString'});
    }
    this.columns.push({title: 'View Configuration', name: 'viewConfigString'});
    this.columns.push({title: 'Edit Configuration', name: 'editConfigString'});
    this.deviceService.getAllDevices().subscribe(data=>{
        vm.data=data.map((row:any)=>{
            row.userString="";
            row.userString=row.logins.map((login:any)=>login.user_detail.name).join(",");
            row.actionString="<a class=\"btn btn-primary btn-sm\">Delete Device</a>";
            row.historyString="<a class=\"btn btn-primary btn-sm btn-sm\">View History</a>";
            row.viewConfigString="<a class=\"btn btn-primary btn-sm btn-sm\" >View Config</a>";
            row.editConfigString="<a class=\"btn btn-primary btn-sm btn-sm\" >Edit Config</a>";
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