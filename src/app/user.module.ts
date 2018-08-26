import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserRoutingModule } from "./routers/user-routing.module";
import { UserRegisterMainComponent } from "./components/user-register-main/user-register-main.component";
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from "@angular/forms";
import { UserLoginComponent } from './components/user-login/user-login.component';
import { AuthService } from "./services/auth.service";
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserService } from "./services/user.service";

@NgModule({
    imports : [
        CommonModule,
        ReactiveFormsModule,
        UserRoutingModule,
        HttpModule
    ],
    declarations : [
        UserRegisterMainComponent,
        UserLoginComponent,
        UserViewComponent
    ],
    providers : [
        AuthService,
        UserService
    ]
})

export class UserModule{}