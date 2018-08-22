import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
      },
      (err) => {
        throw Error(err);
      }
    ))
  }
}
