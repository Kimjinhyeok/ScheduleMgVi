import { Component, OnInit, Input } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { interval } from '../../../../node_modules/rxjs';
import { map } from '../../../../node_modules/rxjs/operators';
import { ScheduleVO, PlanVO } from '../schedule-write/schedule-write.component';

@Component({
  selector: 'app-live-schedule',
  templateUrl: './live-schedule.component.html',
  styleUrls: ['./live-schedule.component.css']
})
export class LiveScheduleComponent implements OnInit {
  
  private activate : boolean;                 // 다음 일정이 있으면 true, 없으면 false
  private runningInterval;

  private now : Date;                         // 현재시각
  private scheduleArray : Array<ScheduleVO>;  // 적용할 일정 배열
  private adaptedScheduleNum : number;               // 적용될 일정의 배열 노드 번호 0~10(DB에서 10개만 조회함)
  private activatedSchedule : ScheduleVO;     // 적용 중인 일정의 객체

  private nextPlan : PlanVO;                  // 적용된 일정의 다음 계획 객체
  private nextPlanTime : Date;                // 적용된 일정의 다음 계획의 시간
  private adaptedPlanNum : number;             // 적용된 일정의 다음 계획의 번호

  leftDay : number = null;
  leftHour : number = null;
  leftMin : number = null;

  constructor(private scheduleService: ScheduleService) {
    this.now = new Date();
    this.scheduleArray = new Array<ScheduleVO>();
    this.adaptedScheduleNum = 0;
  }

  ngOnInit() {
    //get Schedules from server
    this.scheduleService.getActivateSchedules().subscribe(
      res => {
        if(res.data.length > 0){
          this.activate = true;
        }else{
          this.activate = false;
          return; // interval을 진행할 필요가 없엉
        }
        this.setSchedulesAndSortTargetday(res.data);
        this.intializeNextPlan();
        this.runInterval();
      },
      err => {
        console.error("Fail to load data" + err);
      }
    );
  }

  setSchedulesAndSortTargetday(schedules){
    var overlapSchedules = [];
    
    var arr = this.getScheduleArray(schedules);
    var maxLength = arr.length;
    
    if(maxLength > 1){
      arr.forEach((sch,idx, ar) => {
        if((maxLength - idx > 1) && sch.getTargetDay() === arr[idx+1].getTargetDay()){
          //다음 노드와 일정이 겹친다면
          // sch.setDay(sch.getTargetDay());
          
          for(var i = 1; i <= maxLength-1; i++){
            if(sch.getTargetDay() == arr[idx+i].getTargetDay()){
              sch.setPlans(this.scheduleMerge(sch.getPlans(), arr[idx+i].getPlans()));
              delete arr[idx+i]
            }else{
              break; //targetDay 오름차순 정렬이기 때문에 한번 틀리면 뒤에는 목표일이 같을 수 없다.
            }
          }
          this.scheduleArray.push(sch);
          //다다음 노드가 마지막인지 아닌지 확인, 아니라면 다다음 노드를 불러오기
          // idx = maxLength-1 > idx + 2 ? idx + 2 : maxLength;];
        }else{
          this.scheduleArray.push(sch);
        }
      });
    }
    
  }

  scheduleMerge(schedule1 : Array<PlanVO>, schedule2 : Array<PlanVO>) : Array<PlanVO>{
    var newArray = new Array<PlanVO>();
    // 첫 일정의 계획들을 넣고
    schedule1.forEach((el) => {
      newArray.push(el);
    });
    // 두번째 일정의 계획들도 넣고
    schedule2.forEach((el) => {
      newArray.push(el);
    });

    // 시간별로 정렬(오름차순)
    newArray.sort((a, b) => {
      return a.time.localeCompare(b.time);
    });

    return newArray;
  }

  intializeNextPlan(){
    // 첫 일정을 가져온다 default니까 0이다.
    this.activatedSchedule = this.scheduleArray[this.adaptedScheduleNum];
    // 적용된 일정의 계획들을 불러온다.
    var planArrays = this.activatedSchedule.getPlans();
    var scheduleDate = new Date(this.activatedSchedule.getTargetDay());

    //다음 계획을 현재 시각과 대조하여 찾는다
    planArrays.forEach( (el, idx) => {
      // 시간과 분을 분리
      var hourMinute = el.time.split(":");
      scheduleDate.setHours(Number(hourMinute[0]));
      scheduleDate.setMinutes(Number(hourMinute[1]));

      if(this.now.getTime() < scheduleDate.getTime()){
        this.nextPlan = el;
        //빠른 비교를 위해 다음 일정의 시간을 변수로 만든다
        this.nextPlanTime = scheduleDate;
        this.adaptedPlanNum = idx;
      }
    });
    this.setDayHourMin(this.now, this.nextPlanTime);
  }

  runInterval(){
    this.runningInterval = interval(1000).pipe(map(() => {
      // add a second
      this.now = new Date(this.now.getTime() + 1000);
    })).subscribe(
      () => {
        //초마다 계획 시간과 비교하는건 의미가 없으므로 분마다 할거다
        if(this.now.getSeconds() == 0){
          //현재시각이 다음 일정시간과 같거나 크다면(큰 경우는 거의 없겠지만)
          if(this.now.getTime() >= this.nextPlanTime.getTime()){
            // 다음 계획을 가져올지 검사하고 가져올거다
            if(this.checkNextPlan()){
              this.setNextPlan(this.adaptedPlanNum);
            }else{
              this.allScheduleFinished();
            }
          }
          this.setDayHourMin(this.now, this.nextPlanTime);
        }
      }
    );
  }

  /*
    현재 시간이 적용된 다음 일정과 일치하여 새로 다음 일정을 불러와야 할 때
  */
  checkNextPlan() : boolean{
    var checkResult : boolean;
    var maxPlanLength = this.activatedSchedule.getPlans().length;

    // 적용된 일정에 더 이상의 계획이 없다면, 다음 일정을 적용시키고 불러와야 한다.
    if(this.adaptedPlanNum+1 >= maxPlanLength){ // 오늘 더 이상의 일정이 있는지?

      // 오늘은 더이상 없으므로, 다음 일정이 있는지를 확인, 없다면 끝낸다.
      if(this.adaptedScheduleNum + 1 >= this.scheduleArray.length){
        // 모든 일정이 끝났음을 표시하자.
        checkResult = false;
      }else{
        // 새로운 일정을 불러온다.
        this.adaptedScheduleNum = this.adaptedScheduleNum + 1;
        this.activatedSchedule = this.scheduleArray[this.adaptedScheduleNum];
        this.adaptedPlanNum = 0;
        checkResult = true;
      }
    }else{
      // 다음 계획을 불러와서 적용한다.
      this.adaptedPlanNum += 1;
      checkResult = true;
    }
    return checkResult;
  }

  setNextPlan(planNum){
    // 만약에 0보다 작은 수가 들어오면 다음 계획을 가져오지 않는다.
    if(planNum < 0){
      return;
    }
    // 다음 계획 가져오기
    this.nextPlan = this.activatedSchedule.getPlans()[planNum];
    // 다음 계획의 시간 구하기
    this.nextPlanTime = new Date(this.activatedSchedule.getTargetDay());
    // 시 분 나누기
    var hourMinute = this.nextPlan.time.split(":");
    this.nextPlanTime.setHours(Number(hourMinute[0]));
    this.nextPlanTime.setMinutes(Number(hourMinute[1]));
  }

  allScheduleFinished(){
    // 인터벌을 종료
    clearInterval(this.runningInterval);
    // 다음 일정 출력을 종료한다.
    this.activate = false;
  }

  private setDayHourMin(from : Date, to : Date){
    var timecalcultator = new TimeCalculator(from, to);

    this.leftDay = timecalcultator.getDay();
    this.leftHour = timecalcultator.getHour(this.leftDay);
    this.leftMin = timecalcultator.getMin(this.leftDay, this.leftHour);
  }

  getScheduleArray(obj : Array<any>) : Array<ScheduleVO>{
    var arr = new Array<ScheduleVO>();
    obj.forEach(element => {
      arr.push(new ScheduleVO(element));
    });
    return arr;
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