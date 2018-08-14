import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '../../../node_modules/@angular/http';
import { Observable } from '../../../node_modules/rxjs';
import { map } from '../../../node_modules/rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ScheduleSaverService {

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
}
