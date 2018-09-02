import { Component, OnInit} from '@angular/core';
import { isUndefined } from 'util';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  private isLogin : boolean;
  constructor(private auth : AuthService) { 
    this.isLogin = false;
  }

  ngOnInit() {
    if(this.auth.isAuthenticated()){
      this.isLogin = true;
    }else{
      this.changingLoginState();
    }
  }

  logout(){
    if(this.auth.isAuthenticated()){
      sessionStorage.clear();
      this.auth.userLogouted();
    }
  }

  changingLoginState(){
    this.auth.getEmittedValue().subscribe(
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
