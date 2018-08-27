import { Router } from "@angular/router";
import { Injectable, EventEmitter, Output } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoginManagerService {
    @Output() isLogin : EventEmitter<any> = new EventEmitter();
  
    constructor(private router : Router){}

    checkLogin(){
        if(!sessionStorage.getItem('id')){
            return false;
        }
        return true;
    }

    proveLogin() : {id : string, name : string}{
        if(this.checkLogin()){
            let id = sessionStorage.getItem('id');
            let name = sessionStorage.getItem('name');
            return {id,name};
        }
    }

    moveToLogin(){
        this.router.navigate(['/login']);
    }

    userLogined(){
      this.isLogin.emit(true);
    }
  
    userLogouted(){
      this.isLogin.emit(false);
      this.router.navigate(['/']);
    }
    getEmittedValue(){
      return this.isLogin;
    }
}
