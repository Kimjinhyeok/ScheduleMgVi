import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScheduleVO } from '../components/schedule-write/schedule-write.component';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ScheduleManagerService {

  private URL = "http://localhost:3000/schedule";
  constructor(private http : HttpClient) { }

  sendNewSchedule(schedule) : Observable<any>{
    return this.http.put(this.URL,{
      params : schedule
    }).pipe(
      map(
        (data)=>{
      },
      err => {
        throw Error('Error while send schedule : ' + err)
      }
    ))
  }

  getRecentSchedule() : Observable<any>{
    return this.http.get(this.URL).pipe(
      map((res) => {
        console.log("service : " + res);
        res;
      },(err) => {
        throw Error('Error while get Recent schedule' + err.message);
      })
    )
  }

  getSchedules() : Observable<any>{
    return this.http.get(this.URL+"/all").pipe(
      map( res => {
        return res as Array<ScheduleVO>;
      }, err => {
        throw Error('Error while get All Schedules');
      })
    )
  }

  updateSchedule(schedule) : Observable<any>{
    return this.http.put(this.URL+`/${schedule._id}`, {
      params : schedule
    }).pipe(map( 
      (res : any) => {
        return res;
      },
      (err) => {
        throw Error(err);
      })
    )
  }

  removeSchedule(id) : Observable<any>{
    return this.http.delete(`${this.URL}/${id}`).pipe(
      map(
        (res) => {
          return res;
        },
        (err) => {
          throw Error(err);
        }
      )
    )
  }
  
  getActivateSchedules(id : string) : Observable<any>{
    return this.http.get(`${this.URL}/activate/${id}`)
    .pipe(map(
      (res, idx) => {
        return res;
      },
      (err) => {
        throw Error(err);
      }
    ))
  }
}
