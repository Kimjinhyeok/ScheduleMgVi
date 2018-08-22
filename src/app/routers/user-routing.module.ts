import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserRegisterMainComponent } from '../components/user-register-main/user-register-main.component';
import { UserLoginComponent } from "../components/user-login/user-login.component";

const userRoutes : Routes = [
    {path : 'register', component : UserRegisterMainComponent},
    {path : 'login', component : UserLoginComponent}
]

@NgModule({
    imports : [ RouterModule.forChild(userRoutes)],
    exports : [RouterModule]
})
export class UserRoutingModule{}