import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { isUndefined } from 'util';
import { ScheduleManagerService } from '../../services/schedule-manage.service';
import { ScheduleVO } from '../schedule-write/schedule-write.component';
import { LoaderService } from '../../services/loader.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: [
    './schedule.component.css',
    '../../../assets/css/loader.css'
  ]
})
export class ScheduleComponent implements OnInit {

  private user;
  private id;
  private schedules;

  constructor(private scheduleService : ScheduleManagerService, auth : AuthService
    , private loaderService : LoaderService
  ) {
    if(auth.isAuthenticated()){
      this.user = auth.getUserName();
      this.id = auth.getUserid();
    }
  }

  ngOnInit() {
    this.loaderService.display(true);
    this.scheduleService.getActivateSchedules(this.id).subscribe(
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
