/// <reference path="../../../../node_modules/@types/googlemaps/index.d.ts" />

const Highcharts = require('../../../../node_modules/highcharts/highcharts.js');
import { Component, Input, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DeviceService } from '../shared/data/device.service';
import 'jquery/dist/jquery.min.js';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js';
import 'bootstrap-timepicker/js/bootstrap-timepicker.js';
import { CONTEXTROOT } from '../shared/contextRoot';


/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'history',
  templateUrl: 'history.component.html',
  styleUrls: ['history.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceService
  ) { }
  
  @ViewChild('csvframe') csvframe:any; 

  private data: any;
  private deviceId:any;
  private startOpened: boolean;
  private startdt: Date = new Date();
  private endOpened: boolean;
  private enddt: Date = new Date();
  private minDate: Date = void 0;
  private activeView: string = 'db';
  private dateEntered: boolean = false;
  private map:any;
  private marker:any;
  date: Date;

  ngOnInit() {
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    this.route.params
          .subscribe((params: Params) => {
            this.deviceId=params['id'];
          })
  }

  selectTab(view: string) {
    this.activeView = view;
    if(this.data) {
      switch (this.activeView) {
          case 'map':
            this.renderMap();
            break;
          case 'table':
            break;
          default:
            this.renderChart();
      }
    }
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
    this.route.params
          .switchMap((params: Params) => this.deviceService.getHistoryForDb(params['id'],(new Date(this.startdt)).toISOString(),(new Date(this.enddt)).toISOString()))
          .subscribe((data: any) => {
            this.data = data;
            switch (this.activeView) {
                case 'map':
                  this.renderMap();
                  break;
                case 'table':
                  break;
                default:
                  this.renderChart();
            }
    });
  }

  renderChart(): void {
    setTimeout(()=>{
        Highcharts.chart('container-highchart', {
              chart: {
                zoomType: 'x'
              },
              title: {
                text: 'Device Historical Data'
              },
              xAxis: [{
                type: 'datetime'
              }],
              yAxis: [{ // Primary yAxis
                labels: {
                  format: '{value}°C',
                  style: {
                    color: Highcharts.getOptions().colors[1]
                  }
                },
                title: {
                  text: 'Temperature',
                  style: {
                    color: Highcharts.getOptions().colors[1]
                  }
                }
              }, 
                { // Secondary yAxis
                title: {
                    enabled:false
                },
                labels: {
                    enabled:false
                },
                min:0,
                max:1,
                tickInterval:1,
                opposite: true
            }
              ],
              tooltip: {
                shared: true
              },
              legend: {
                layout: 'vertical',
                align: 'left',
                x: 120,
                verticalAlign: 'top',
                y: 100,
                floating: true,
                backgroundColor:  '#FFFFFF'
              },
              series: [{
                name: 'Door Open',
                type: 'column',
                yAxis: 1,
                data: this.getDOData(),
              

              },{
                name: 'Room Temp',
                type: 'spline',
                data: this.getRTData(),
              

              }, {
                name: 'Plate Temp',
                type: 'spline',
                data:  this.getPTData(),
              
              }, {
                name: 'Cd Temp',
                type: 'spline',
                data:  this.getCTData(),
              
              }]
            });
    },500);
    
  }

  renderMap() {
    setTimeout(()=>{
      var polyline = new google.maps.Polyline({
            path: [],
            strokeColor: '#FF0000',
            strokeWeight: 3
          });
          var bounds = new google.maps.LatLngBounds();
          this.map=new google.maps.Map(document.getElementById('maphistory'), {
            center: {lat: parseInt(this.data.historic_logs[0].payload.lat), lng: parseInt(this.data.historic_logs[0].payload.lat)},
            zoom: 10
          });
          
          this.data.historic_logs.forEach((point:any)=>{
            var nextPoint=new google.maps.LatLng(point.payload.lat, point.payload.lon);
            polyline.getPath().push(nextPoint);
            bounds.extend(nextPoint);
            var marker=new google.maps.Marker({
                position: nextPoint,
                title: '#' + polyline.getPath().getLength(),
                map: this.map
            });
            var infowindow = new google.maps.InfoWindow({
              content: "<div><b>Date:</b>"+new Date(point.created_at)+"<br/><b>Room Temp:</b>"+point.payload.rt
              +"<br/><b>Cd Temp:</b>"+point.payload.ct
              +"<br/><b>Plate Temp:</b>"+point.payload.pt
              +" </div>"
            });
            marker.addListener('click', function() {
              infowindow.open(this.map, marker);
            });
          });
          new google.maps.Marker({
              position: {lat: parseInt(this.data.historic_logs[0].payload.lat), lng: parseInt(this.data.historic_logs[0].payload.lat)},
              map: this.map,
              icon:'assets/images/Jeep.png'
          });
          polyline.setMap(this.map);
          this.map.fitBounds(bounds);
    },500);
    
  }

  getDOData() {
    return this.data.historic_logs.map((data:any)=>[new Date(data.created_at).getTime(), data.payload.do=="Yes"?1:0]);
  }

  getRTData() {
    return this.data.historic_logs.map((data:any)=>[new Date(data.created_at).getTime(), data.payload.rt]);
  }

  getPTData() {
    return this.data.historic_logs.map((data:any)=>[new Date(data.created_at).getTime(), data.payload.pt]);
  }

  getCTData() {
    return this.data.historic_logs.map((data:any)=>[new Date(data.created_at).getTime(), data.payload.ct]);
  }

  print() {
    window.open("print.html?id="+this.deviceId+"&from="+(new Date(this.startdt)).toISOString()+"&to="+(new Date(this.startdt)).toISOString()+"&token="+localStorage.getItem('id_token').replace("Bearer ",""));
  }

  getCSV() {
    this.csvframe.nativeElement.src=CONTEXTROOT+"device/history/csv?device_id="+this.deviceId+"&from_timestamp="+(new Date(this.startdt)).toISOString()+"&to_timestamp="+(new Date(this.enddt)).toISOString()+"&token="+localStorage.getItem('id_token').replace("Bearer ","");
  }

}