import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-set-time',
  templateUrl: './set-time.component.html',
  styleUrls: ['./set-time.component.css']
})
export class SetTimeComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  onSubmit(values){
    var setDay = new Date(values.setDay);
    var setTime = values.setTime.split(":");
    
    setDay.setHours(0,0,0,0);
    setDay = this.addHour(setDay, setTime[0]);
    setDay = this.addMinute(setDay, setTime[1]);
    

    this.router.navigate(["/schedule"],{queryParams : {
      setDay : setDay
    }})
  }

  private addHour(source : Date, hours){
    return new Date(source.getTime() + hours * 3600000);
  }

  private addMinute(source : Date, minute){
    return new Date(source.getTime() + minute * 60000);
  }
}
