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
  constructor(private authService : AuthService) { 
    this.isLogin = false;
  }

  ngOnInit() {
    this.changingLoginState();
  }

  logout(){
    if(sessionStorage.getItem('id')){
      sessionStorage.clear();
      this.authService.userLogouted();
    }
  }

  changingLoginState(){
    this.authService.getEmittedValue().subscribe(
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
