import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ScheduleManagerService } from '../../services/schedule-manage.service';
import { ScheduleVO } from '../schedule-write/schedule-write.component';
import { DatePipe } from '@angular/common';
import { LoaderService } from '../../services/loader.service';

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
  // private scArray : Array<ScheduleVO>;
  private schedules : FormArray;
  constructor(private fb : FormBuilder, 
    private scheduleMgService : ScheduleManagerService,
    private loaderService : LoaderService) {
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
      annotation : ['']
    });
  }

  loadSchedules(){
    this.scheduleMgService.getSchedules().subscribe(
      (data) => {
        var scArray = data.schedules.value;
        scArray.forEach(sc => {
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

  onClickEdit(event, groupName){
    console.log(event);
  }

  onClickRemove(event, groupName){

  }
}
