import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private isLogin = false;
  constructor(private auth : AuthService) { }

  ngOnInit() {
    if(this.auth.isAuthenticated()){
      this.isLogin = true;
    }
  }
}
