import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL : string = "http://localhost:3000/auth/";
  constructor(private http : Http) { }

  userLogin(name : string, password : string) : Observable<any>{
    return this.http.post(this.URL, {
      name : name,
      password : password  
    }).pipe(map(
      (res) => {
        return res.json().id.id;
      }),
      catchError(err => {
        var errMessage = err.json().message;
        return throwError(errMessage);
      })
    )
  }

}
