import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: [
    './user-login.component.css',
    '../../../assets/css/form.css'
  ]
})
export class UserLoginComponent implements OnInit {

  private errMessage = null;
  private formModel: FormGroup;
  constructor(private authService: AuthService, private route: Router, private auth : AuthService) {
    this.formModel = new FormGroup({
      name: new FormControl(),
      pw: new FormControl()
    })
  }

  ngOnInit() {
  }

  onLogin() {
    var name = this.formModel.get('name').value;
    var password = this.formModel.get('pw').value;
    this.authService.userLogin(name, password).subscribe(
      (token) => {
        if (token != null) {
          this.authService.setToken(token);
          this.authService.userHaveLogined();
          this.route.navigate(['/']);
        }
      },
      (err) => {
        this.errMessage = err;
      }
    )
  }
}
