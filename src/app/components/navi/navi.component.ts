import { Component, OnInit} from '@angular/core';
import { isUndefined } from 'util';
import { AuthService } from '../../services/auth.service';
import { LoginManagerService } from '../../services/login-manager.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  private isLogin : boolean;
  constructor(private lm : LoginManagerService) { 
    this.isLogin = false;
  }

  ngOnInit() {
    if(this.lm.checkLogin()){
      this.isLogin = true;
    }else{
      this.changingLoginState();
    }
  }

  logout(){
    if(this.lm.checkLogin()){
      sessionStorage.clear();
      this.lm.userLogouted();
    }
  }

  changingLoginState(){
    this.lm.getEmittedValue().subscribe(
      is => {
        this.isLogin = is;
      },
      err =>{

      },
      () => {
        this.changingLoginState();
      }
    )
  }
}
