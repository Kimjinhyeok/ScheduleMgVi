import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  constructor(
    private userService : UserService,
    private router : Router
  ) { }
  private infomation;
  ngOnInit() {
    var id = sessionStorage.getItem('id');
    if(!id){
      this.reTryLogin();
    }
    this.userService.getUserInfomation(id).subscribe(
      data => {
        this.infomation = data.data;
      },
      err => {
        this.errorHandleing("회원 정보 오류", "사용자의 정보를 불러오는 가운데 에러가 발생했습니다.\n"+err);
      }
    );
  }

  reTryLogin(){
    this.router.navigate(['/login']);
  }

  errorHandleing(errName : string, errExplain : string){
    this.router.navigate(['/login'],{
      queryParams : {
        errorname : errName,
        errorExplain : errExplain
      }
    })
  }
}
