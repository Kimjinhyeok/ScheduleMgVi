import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ScheduleManagerService } from '../../services/schedule-manage.service';
import { ScheduleVO } from '../schedule-write/schedule-write.component';
import { DatePipe } from '@angular/common';
import { LoaderService } from '../../services/loader.service';

import { ScheduleEditComponent } from '../schedule-edit/schedule-edit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-manage',
  templateUrl: './schedule-manage.component.html',
  styleUrls: [
    './schedule-manage.component.css',
    '../../../assets/css/loader.css'
  ]
})
export class ScheduleManageComponent implements OnInit {

  private formModel : FormGroup;
  private schedules : FormArray;
  private scheduleArray;

  constructor(private fb : FormBuilder, 
    private scheduleMgService : ScheduleManagerService,
    private loaderService : LoaderService,
    private router : Router) {
    this.formModel = this.fb.group({
      schedules : this.fb.array([])
    });
    this.loaderService.display(true);
  }

  ngOnInit() {
    this.loadSchedules();
  }

  createScheduleUnit(schedule) : FormGroup{
    var dp = new DatePipe('en-US')
    return this.fb.group({
      targetDay : [dp.transform(schedule.targetDay, "yyyy-MM-dd")],
      createDay : [dp.transform(schedule.createDay, "yyyy-MM-dd")],
      descript : [schedule.descript]
    });
  }

  loadSchedules(){
    this.scheduleMgService.getSchedules().subscribe(
      (data) => {
        this.scheduleArray = data.schedules.value;
        this.scheduleArray.forEach(sc => {
          this.addItem(sc);
        });
        
      },
      (err) => {
       
      },
      ()=>{
        this.loaderService.display(false);
      }
    )
  }

  addItem(data){
    this.schedules = this.formModel.get('schedules') as FormArray;
    this.schedules.push(this.createScheduleUnit(data));
  }

  onClickEdit(groupName){
    var schedule = this.scheduleArray[groupName];
    this.router.navigate(['/schedule/edit', {
      schedule : JSON.stringify(schedule)
    }])
  }

  onClickRemove(groupName){
    var scheduleID = this.scheduleArray[groupName]._id;
    
    this.scheduleMgService.removeSchedule(scheduleID)
      .subscribe( (res) => {
        console.log('삭제 성공');

        this.dynamicRemoveFromControl(groupName);
      }, (err) => {
        console.log('실패...?' + err);
      });
  }

  dynamicRemoveFromControl(groupName){
    var scheduleItems = this.formModel.get('schedules') as FormArray;
    scheduleItems.removeAt(groupName);
    delete this.scheduleArray[groupName];
  }
}
