import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ScheduleManagerService {

  private URL = "http://localhost:3000/schedule";
  constructor(private http : Http) { }

  sendNewSchedule(schedule) : Observable<any>{
    return this.http.put(this.URL,{
      params : schedule
    }).pipe(
      map(
        (data)=>{
        data.json();
      },
      err => {
        throw Error('Error while send schedule : ' + err)
      }
    ))
  }

  getRecentSchedule() : Observable<any>{
    return this.http.get(this.URL).pipe(
      map((res) => {
        console.log("service : " + res.json());
        return res.json();
      },(err) => {
        throw Error('Error while get Recent schedule' + err.message);
      })
    )
  }
}
