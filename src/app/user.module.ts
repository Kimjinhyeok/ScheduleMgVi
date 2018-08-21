import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserRoutingModule } from "./routers/user-routing.module";
import { UserRegisterMainComponent } from "./components/user-register/user-register-main/user-register-main.component";
import { UserRegisterPrivacyComponent } from "./components/user-register/user-register-privacy/user-register-privacy.component";
import { UserRegisterPublicComponent } from "./components/user-register/user-register-public/user-register-public.component";
import { HttpModule } from "@angular/http";
import { HttpClient } from "selenium-webdriver/http";

@NgModule({
    imports : [
        CommonModule,
        UserRoutingModule,
        HttpClient
    ],
    declarations : [
        UserRegisterMainComponent,
        UserRegisterPrivacyComponent,
        UserRegisterPublicComponent
    ],
    providers : []
})

export class UserModule{}