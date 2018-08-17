import { Component, OnInit, Input } from '@angular/core';
import { ScheduleVO, PlanVO } from '../schedule-write/schedule-write.component';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ScheduleManagerService } from '../../services/schedule-manage.service';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: '../schedule-write/schedule-write.component.html',
  styleUrls: ['../schedule-write/schedule-write.component.css']
})
export class ScheduleEditComponent implements OnInit {

  private formModel : FormGroup;
  private items : FormArray;

  private schedule;

  constructor(private fb : FormBuilder, router : ActivatedRoute, private scheduleService : ScheduleManagerService) {
    this.formModel = this.fb.group({
      targetDay : ['', Validators.required],
      items : this.fb.array([])
    });
    this.schedule = router.snapshot.paramMap.get('schedule');
    this.schedule = JSON.parse(this.schedule) as ScheduleVO;
  }
 
  ngOnInit() {
    var dp = new DatePipe('en-US');
    this.formModel.setValue({
      targetDay : dp.transform(this.schedule.targetDay, 'yyyy-MM-dd'),
      items : [] 
    });

    this.schedule.plans.forEach(el => {
      this.addItem(el);
    });
  }

  createSchedule(vo?) : FormGroup{
    var el = this.fb.group({
      time : ['', Validators.required],
      plan : ['', Validators.required]
    });
    if(vo != null){
      el.setValue({
        time : vo.time,
        plan : vo.plan
      })
    }
    return el;
  }

  addItem(data?){
    this.items = this.formModel.get('items') as FormArray;
    this.items.push(this.createSchedule(data));
  }

  saveSchedule(){
    var formValues = this.formModel.value;
    var arr = formValues.items;
    arr.sort((a, b) => {
      return a.time.localeCompare(b.time);
    });

    this.schedule.targetDay = formValues.targetDay;
    this.schedule.plans = new Array<PlanVO>();
    formValues.items.forEach(el => {
      this.schedule.plans.push(new PlanVO(el.time, el.plan));
    });
    this.scheduleService.updateSchedule(this.schedule).subscribe(
      (res) => {
        console.log('수정 성공')
      },
      (err) => {

      }
    );
  }
}
