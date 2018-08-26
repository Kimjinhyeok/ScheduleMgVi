import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = "http://localhost:3000/users";
  constructor(private http : Http) { }

  userRegister(formValue) : Observable<any>{
    return this.http.put(this.URL,{
      formValue
    }).pipe(map(
      (res) => {
        return res.json().result;
      }),catchError((err)=>{
        return throwError(err.json().message);
      })
    )
  }

  checkDuplicationID(name) : Observable<any>{
    return this.http.get(`${this.URL}/${name}`);
  }

  getUserInfomation(id) : Observable<any>{
    return this.http.get(`${this.URL}/${id}`).pipe(
      map( (rs) => {
        rs.json().data;
      })
    )
  }
}
