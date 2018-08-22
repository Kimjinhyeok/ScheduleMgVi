import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-register-main',
  templateUrl: './user-register-main.component.html',
  styleUrls: [
    './user-register-main.component.css',
    '../../../assets/css/form.css'
  ]
})
export class UserRegisterMainComponent implements OnInit {

  private formModel : FormGroup;
  private selectorChecked : boolean;
  constructor() {
    this.selectorChecked = true;

    this.formModel = new FormGroup({
      type : new FormControl('privacy'),
      name : new FormControl(),
      pw : new FormControl(),
      confirm : new FormControl(),
      email : new FormControl()
    })
   }

  ngOnInit() {
  }

  onRegister(){
    // event.preventDefault();
    console.log(this.formModel.value);
  }
}
