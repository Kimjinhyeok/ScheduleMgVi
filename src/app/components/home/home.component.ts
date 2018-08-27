import { Component, OnInit } from '@angular/core';
import { LoginManagerService } from '../../services/login-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private isLogin = false;
  constructor(private lm : LoginManagerService) { }

  ngOnInit() {
    if(this.lm.checkLogin()){
      this.isLogin = true;
    }
  }
}
