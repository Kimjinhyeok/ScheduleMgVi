import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Navi Component에게 유저가 로그인한 사실을 알리기 위한 이벤트
  @Output() isLogin: EventEmitter<any> = new EventEmitter();

  private TOKEN_NAME = "token";
  private URL: string = "http://localhost:3000/auth/";
  private jwtHelper : JwtHelperService = null;

  constructor(private http: Http, private router: Router) {
    this.jwtHelper = new JwtHelperService();
  }

  userLogin(name: string, password: string): Observable<any> {
    return this.http.post(this.URL, {
      name: name,
      password: password
    }).pipe(map(
      (res) => {
        return res.json().token;
      }),
      catchError(err => {
        var errMessage = err.json().message;
        return throwError(errMessage);
      })
    )
  }

  proveLogin(): { id: string, name: string } {
    if (this.isAuthenticated()) {
      let id = sessionStorage.getItem('id');
      let name = sessionStorage.getItem('name');
      return { id, name };
    }
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
