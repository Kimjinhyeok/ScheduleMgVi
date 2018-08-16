import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '../../../../node_modules/@angular/forms';
import { ScheduleManagerService } from '../../services/schedule-manage.service';

@Component({
  selector: 'app-write-schedule',
  templateUrl: './write-schedule.component.html',
  styleUrls: ['./write-schedule.component.css']
})
export class WriteScheduleComponent implements OnInit {

  formModel : FormGroup;
  items : FormArray;

  constructor(private formBuilder : FormBuilder, private scheduleService : ScheduleManagerService) {
    this.formModel = this.formBuilder.group({
      targetDay : [' ', Validators.required],
      items : this.formBuilder.array([this.createSchedule()])
    });
  }

  ngOnInit() {
    
  }

  createSchedule() : FormGroup{
    return this.formBuilder.group({
      time : [' ', Validators.required],
      plan : [' ', Validators.required]
    });
  }

  addItem(){
    this.items = this.formModel.get('items') as FormArray;
    this.items.push(this.createSchedule());
  }

  saveSchedule(){
    var scheduleVO = new ScheduleVO();
    var items = this.formModel.get('items') as FormArray;
    var targetDay = this.formModel.get('targetDay').value;
    var planArray = new Array<PlanVO>();

    scheduleVO.setDay(targetDay);
    for(let el of items.controls){
      planArray.push(new PlanVO(
        el.get('time').value,
        el.get('plan').value
      ))
    }
    // Sort Plans by Times
    planArray.sort((a,b) => {
      console.log(a.time + "\t" + b.time);
      return a.time.localeCompare(b.time);
    });
    
    scheduleVO.setPlans(planArray);

    console.log(scheduleVO);
    this.scheduleService.sendNewSchedule(scheduleVO).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
}

export class ScheduleVO{

  private targetDay : Date;
  private plans : Array<PlanVO>;
  private createDay : Date;

  constructor(){
    this.plans = new Array();
    this.createDay = new Date();
  }

  setDay(day : any){
   this.targetDay = day;
  }

  getDay(){ return this.targetDay;}

  setPlans(arr : Array<PlanVO>){
    this.plans = arr;
  }
  pushPlans(time : string, plan : string){
    this.plans.push(new PlanVO(time, plan))
  }

  getPlans() : Array<PlanVO>{return this.plans}
}

export class PlanVO{
  public time : string;
  public plan : string;

  constructor(time, plan){
    this.time = time;
    this.plan = plan;
  }
}