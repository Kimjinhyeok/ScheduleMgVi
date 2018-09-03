import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Navi Component에게 유저가 로그인한 사실을 알리기 위한 이벤트
  @Output() isLogin: EventEmitter<any> = new EventEmitter();

  private TOKEN_NAME = "token";
  private URL: string = "http://localhost:3000/auth/";
  private jwtHelper : JwtHelperService = null;

  constructor(private http: HttpClient, private router: Router) {
    this.jwtHelper = new JwtHelperService();
  }

  userLogin(name: string, password: string): Observable<any> {
    return this.http.post<any>(this.URL, {
      name: name,
      password: password
    }).pipe(map(
      (res) => {
        return res.token;
      }),
      catchError(err => {
        var errMessage = err.message;
        return throwError(errMessage);
      })
    )
  }

  moveToLogin() {
    this.router.navigate(['/login']);
  }

  userHaveLogined() {
    this.isLogin.emit(true);
  }

  userLogouted() {
    this.isLogin.emit(false);
    this.removeToken();
    this.router.navigate(['/']);
  }

  getEmittedValue() {
    return this.isLogin;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_NAME);
  }

  /*
    token 유효 기간 체크
    The JwtHelper class has several useful methods that can be utilized in your components:

    decodeToken
    getTokenExpirationDate
    isTokenExpired

    npm install angular2-jwt
    https://github.com/auth0/angular2-jwt
  */
  isTokenExpired(token: string) {
    return this.jwtHelper.isTokenExpired(token);
  }

  getUserid(): string {
    return this.jwtHelper.decodeToken(this.getToken()).userID;
  }

  getUserName() : string {
    return this.jwtHelper.decodeToken(this.getToken()).userName;
  }
}
