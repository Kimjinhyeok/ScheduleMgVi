import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms'
import { ScheduleManagerService } from '../../services/schedule-manage.service';

@Component({
  selector: 'app-write-schedule',
  templateUrl: './schedule-write.component.html',
  styleUrls: ['./schedule-write.component.css']
})
export class ScheduleWriteComponent implements OnInit {

  formModel : FormGroup;
  items : FormArray;

  constructor(private formBuilder : FormBuilder, private scheduleService : ScheduleManagerService) {
    this.formModel = this.formBuilder.group({
      targetDay : [null, Validators.required],
      descript : [null, Validators.required],
      items : this.formBuilder.array([this.createSchedule()])
    });
  }

  ngOnInit() {
    
  }

  createSchedule() : FormGroup{
    return this.formBuilder.group({
      time : [null, Validators.required],
      plan : [null, Validators.required]
    });
  }

  addItem(){
    this.items = this.formModel.get('items') as FormArray;
    this.items.push(this.createSchedule());
  }

  saveSchedule(event){
    // event.preventDefault();

    if(this.formModel.valid){
      console.log('good')
    }else{
      console.log('what the....'); return;
    }
    var formValue = this.formModel.value;
    var scheduleVO = new ScheduleVO(formValue);

    var planArray = new Array<PlanVO>();
    var items = formValue.items;

    for(let el of items){
      planArray.push(new PlanVO(
        el.time,
        el.plan
      ))
    }
    // Sort Plans by Times
    planArray.sort((a,b) => {
      console.log(a.time + "\t" + b.time);
      return a.time.localeCompare(b.time);
    });

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

  private id;
  private targetDay : Date;
  private descript : String;
  private plans : Array<PlanVO>;

  constructor(obj? : ScheduleVO){
    this.targetDay = obj.targetDay;
    this.descript = obj.descript;
    this.id = obj.id;
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

  getID(){
    return this.id;
  }

  getDescript(){
    this.descript;
  }
}

export class PlanVO{
  public time : string;
  public plan : string;

  constructor(time, plan){
    this.time = time;
    this.plan = plan;
  }
}