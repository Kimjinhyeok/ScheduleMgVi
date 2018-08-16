import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { isUndefined } from 'util';
import { ScheduleManagerService } from '../../services/schedule-manage.service';
import { ScheduleVO } from '../write-schedule/write-schedule.component';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  private setDay;
  private schedules;

  constructor(route : ActivatedRoute, private scheduleService : ScheduleManagerService
    , private loaderService : LoaderService
  ) {
    route.queryParams.subscribe(
      params =>{
        var recvDate = params['setDay'];
        if(recvDate == null || isUndefined(recvDate)) this.setDay = new Date();
        else this.setDay = new Date(recvDate);
    })
  }

  ngOnInit() {
    this.loaderService.display(true);
    this.scheduleService.getSchedules().subscribe(
      data => {
        this.schedules = data.schedules.value as Array<ScheduleVO>;
      },
      err => {
        console.log('에러 발생 : ' + err.message);
      },() =>{
        this.loaderService.display(false);
      }
    )
  }

}
