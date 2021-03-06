import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = "http://localhost:3000/users";
  constructor(private http : HttpClient) { }

  userRegister(formValue) : Observable<any>{
    return this.http.put<any>(this.URL,{
      formValue
    }).pipe(map(
      (res) => {
        res.result;
      }),catchError((err)=>{
        return throwError(err.message);
      })
    )
  }

  checkDuplicationID(name) : Observable<any>{
    return this.http.get(`${this.URL}/${name}`);
  }

  getUserInfomation(id) : Observable<any>{
    return this.http.get(`${this.URL}/${id}`).pipe(
      map( (rs) => {
        rs;
      })
    )
  }
}
