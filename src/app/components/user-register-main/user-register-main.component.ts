import { Component, OnInit, Directive } from '@angular/core';
import { FormGroup, NG_VALIDATORS, FormControl, Validators, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
      'name' : new FormControl(null,[
        Validators.max(20), Validators.minLength(2)
      ]),
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
    console.log(this.formModel.valid);
    var userInfo = new Object({
      type : this.formModel.value.type,
      name : this.formModel.value.name,
      password : this.formModel.value.passwordsGroup.pw,
      email : this.formModel.value.email
    });
    this.userService.userRegister(userInfo)
      .subscribe(
        (result) => {
          if(result){
            this.router.navigate(['/user/login']);
          }
        },
        (err) => {
          console.error(err);
        }
      )
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

  checkDuplcationID(){
    var name = this.formModel.value.name;

    this.userService.checkDuplicationID(name).subscribe(
      (isDuplicated) => {
        this.formModel.get('name').setErrors({isDuplicated : {isDuplicated : true}})
      },
      (err) => {
      }
    );
  }
  
  equalValidator({value} : FormGroup) : {[key : string] : any}{
    
    const [first, ...rest] = Object.keys(value || {});
    const valid = rest.every(v => value[v] === value[first]);
    return valid ? null : { equal : true };
  }

  existingEmailValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return userService.checkDuplicationID(control.value).pipe(
       map( res => {
        return res ? null : {duplicated : true};
      })
      );
    };
  } 
}