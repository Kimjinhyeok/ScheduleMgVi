import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { isUndefined } from 'util';
import { ScheduleManagerService } from '../../services/schedule-manage.service';
import { ScheduleVO } from '../schedule-write/schedule-write.component';
import { LoaderService } from '../../services/loader.service';
import { LoginManagerService } from '../../services/login-manager.service';

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

  constructor(private scheduleService : ScheduleManagerService, lm : LoginManagerService
    , private loaderService : LoaderService
  ) {
    if(lm.checkLogin()){
      var {id, name} = lm.proveLogin();
      this.user = name;
      this.id = id;
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
