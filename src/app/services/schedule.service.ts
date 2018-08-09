import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from '../../../node_modules/rxjs/';
import { map } from 'rxjs/operators/';
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http : Http) { }

  getSchedules() : Observable<any>{
    
    return this.http.get('./assets/data/schedule.json')
    .pipe(map((res : Response) => {
      return res.json();
    }))
  }
}
