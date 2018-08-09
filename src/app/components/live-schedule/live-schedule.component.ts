import { Component, OnInit, Input } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { interval } from '../../../../node_modules/rxjs';
import { map } from '../../../../node_modules/rxjs/operators';
import { DatePipe } from '../../../../node_modules/@angular/common';

@Component({
  selector: 'app-live-schedule',
  templateUrl: './live-schedule.component.html',
  styleUrls: ['./live-schedule.component.css']
})
export class LiveScheduleComponent implements OnInit {
  
  @Input()
  now : Date;
  passedSchedule : boolean = false;
  scheduleJson: Object = null;
  scheduleLength: number;
  

  leftDay : number = null;
  leftHour : number = null;
  leftMin : number = null;
  nextPlan = null;

  private datePipe;
  
  constructor(private scheduleService: ScheduleService) {
    this.datePipe = new DatePipe('en-US');
    //get Schedule File
    scheduleService.getSchedules().subscribe(
      data => {
        this.scheduleJson = data;
        this.scheduleLength = data.length;
      },
      err => {
        console.error("Fail to load data");
      }
    );
  }

  ngOnInit() {
    interval(1000).pipe(map(() => {
      // add a second
      this.now = new Date(this.now.getTime() + 1000);
      return this.now;
    })).subscribe(
      now => {
        if (this.scheduleJson != null) {
          var dayCnt = 0;
          var scheduleNum = 0;

          // 날자비교를 위해 연월일만 추출
          var compareDayNow = new Date(this.datePipe.transform(now, 'yyyy-MM-dd'));
          /*
            전인지 후인지 체크
          */
          var firstDay = new Date(this.scheduleJson[0].day);
          var lastDay = new Date(this.scheduleJson[this.scheduleLength - 1].day);

          // Set hour, min, seconds, ms to 0
          compareDayNow.setHours(0, 0, 0, 0);
          firstDay.setHours(0, 0, 0, 0);
          lastDay.setHours(0, 0, 0, 0);
          if (compareDayNow.getTime() > lastDay.getTime()) {
            // Check it finished schedules

          } else if (compareDayNow.getTime() < firstDay.getTime()) {
            // it appoach to schedules
            this.passedSchedule = true;

            var HourMin = new String(this.scheduleJson[dayCnt].plans[scheduleNum].time).split(":");
            firstDay.setHours(Number(HourMin[0]), Number(HourMin[1]));
            this.nextPlan = this.scheduleJson[dayCnt].plans[scheduleNum].plan;
            this.setDayHourMin(now, firstDay);
          } else {
            // if 기간 안 이라면
            this.passedSchedule = true;
            for (dayCnt; dayCnt < this.scheduleLength; dayCnt++) {

              var from = new Date(this.scheduleJson[dayCnt].day);
              from.setHours(0,0);
              if (from.getTime() === compareDayNow.getTime()) {
                break;
              }
            }

            // target's Day
            var targetYMD = this.scheduleJson[dayCnt].day;

            var plansLength = this.scheduleJson[dayCnt].plans.length;
            var targetPlans = this.scheduleJson[dayCnt].plans;
            var targetPlanTime : Date = null;
            for (; scheduleNum < plansLength; scheduleNum++) {
              targetPlanTime = new Date(targetYMD + " " + targetPlans[scheduleNum].time);
              if (targetPlanTime.getTime() > now.getTime()) {
                this.nextPlan = targetPlans[scheduleNum].plan;
                break;
              }
            }
            this.setDayHourMin(now, targetPlanTime);
          }
        }
      }
    );
  }

  private setDayHourMin(from : Date, to : Date){
    var timecalcultator = new TimeCalculator(from, to);

    this.leftDay = timecalcultator.getDay();
    this.leftHour = timecalcultator.getHour(this.leftDay);
    this.leftMin = timecalcultator.getMin(this.leftDay, this.leftHour);
  }
}

class TimeCalculator {
  private dayCalValue = 86400000;
  private hourCalValue = 3600000;
  private minCalValue = 60000;
  private from: Date;
  private to: Date;

  private fromVal: number;
  private toVal: number;

  constructor(from: Date, to: Date) {
    this.from = from;
    this.to = to;

    this.fromVal = from.getTime();
    this.toVal = to.getTime();
  }

  public checkBigger() {
    return (this.fromVal - this.toVal) > 0 ? true : false
  }

  public getDay() {
    return Math.floor((this.toVal - this.fromVal) / this.dayCalValue);
  }

  public getHour(day) {
    var source = this.toVal - this.fromVal;
    if (day > 0) {
      source = source - (this.dayCalValue * day);
    }
    return Math.floor(source / this.hourCalValue);
  }

  public getMin(day, hour) {
    var source = this.toVal - this.fromVal;
    if (day > 0) {
      source = source - (this.dayCalValue * day);
    }
    if (hour > 0) {
      source = source - (this.hourCalValue * hour);
    }
    return Math.floor(source / this.minCalValue);
  }
}