import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-register-main',
  templateUrl: './user-register-main.component.html',
  styleUrls: ['./user-register-main.component.css']
})
export class UserRegisterMainComponent implements OnInit {

  private selectorChecked : boolean;
  constructor() {
    this.selectorChecked = true;
   }

  ngOnInit() {
  }

}
