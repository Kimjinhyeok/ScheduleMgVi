import { Component, OnInit } from '@angular/core';
import { isUndefined } from 'util';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  private isLogin : boolean;
  constructor() { 
    this.isLogin = false;
  }

  ngOnInit() {
    var userID = sessionStorage.getItem('id');
    if(userID){
      this.isLogin = true;
    }
  }

  logout(){
    if(sessionStorage.getItem('id')){
      sessionStorage.clear();
      this.isLogin = false;
    }
  }
}
