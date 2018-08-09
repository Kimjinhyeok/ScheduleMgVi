import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-write-schedule',
  templateUrl: './write-schedule.component.html',
  styleUrls: ['./write-schedule.component.css']
})
export class WriteScheduleComponent implements OnInit {

  formModel : FormGroup;
  items : FormArray;

  constructor(private formBuilder : FormBuilder) {
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

  showData(){
    var targetDay = this.formModel.get('targetDay');
    console.log('시간 : ' + targetDay.value);
    var items = this.formModel.get('items') as FormArray;
    for(let el of items.controls){
      console.log(el.get('time').value + "\t" + el.get('plan').value);
    }
  }
}
