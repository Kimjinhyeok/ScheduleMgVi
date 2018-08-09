import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { isUndefined } from 'util';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  private setDay;
  constructor(route : ActivatedRoute) {
    route.queryParams.subscribe(
      params =>{
        var recvDate = params['setDay'];
        if(recvDate == null || isUndefined(recvDate)) this.setDay = new Date();
        else this.setDay = new Date(recvDate);
    })
  }

  ngOnInit() {
  }

}
