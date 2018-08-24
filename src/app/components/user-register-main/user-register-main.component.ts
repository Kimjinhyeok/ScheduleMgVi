import { Component, OnInit, Directive } from '@angular/core';
import { FormGroup, NG_VALIDATORS, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

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

  constructor(private userService : UserService, private router : Router) {
    this.selectorChecked = true;

    this.formModel = new FormGroup({
      'type' : new FormControl('privacy'),
      'name' : new FormControl(),
      'passwordsGroup' : new FormGroup({
        'pw' : new FormControl(),
        'confirm' : new FormControl()
      }, {validators : this.equalValidator}),
      'email' : new FormControl()
    })
   }

  ngOnInit() {
  }

  onRegister(){
    event.preventDefault();
    console.log(this.formModel.valid);/*
    this.userService.userRegister(this.formModel.value)
      .subscribe(
        (result) => {
          if(result){
            this.router.navigate(['/user/login']);
          }
        },
        (err) => {
          console.error(err);
        }
      )*/
  }

  checkEqualPasswords(){
    if(this.formModel.value.pw === this.formModel.value.confirm){
      // this.warning.equalPassword = true;
      return true;
    }else{
      // this.warning.equalPassword = false;
      var el = <HTMLInputElement>document.querySelector('input[name="confirm"]');
      el.focus();
      return false;
    }
  }

  // checkDuplcationID(){
  //   var name = this.formModel.value.name;

  //   this.userService.checkDuplicationID(name).subscribe(
  //     (isDuplicated) => {
  //       this.warning.isDuplicated = true;
  //     },
  //     (err) => {
  //       this.warning.isDuplicated = false;
  //     }
  //   );
  // }
  
  equalValidator({value} : FormGroup) : {[key : string] : any}{
    
    const [first, ...rest] = Object.keys(value || {});
    const valid = rest.every(v => value[v] === value[first]);
    return valid ? null : { equal : true };
  }

}
}
