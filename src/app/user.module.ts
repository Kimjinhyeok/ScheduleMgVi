import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserRoutingModule } from "./routers/user-routing.module";
import { UserRegisterMainComponent } from "./components/user-register-main/user-register-main.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AuthService } from "./services/auth.service";
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserService } from "./services/user.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AddTokenInterceptor } from "./guard/AddTokenInterceptor";

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UserRoutingModule,
        HttpClientModule
    ],
    declarations : [
        UserRegisterMainComponent,
        UserViewComponent
    ],
    providers : [
        AuthService,
        UserService,
        {provide : HTTP_INTERCEPTORS, useClass : AddTokenInterceptor, multi : true}
    ]
})

export class UserModule{}