import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserRegisterMainComponent } from '../components/user-register-main/user-register-main.component';
import { UserLoginComponent } from "../components/user-login/user-login.component";
import { UserViewComponent } from "../components/user-view/user-view.component";

const userRoutes : Routes = [
    {path : 'register', component : UserRegisterMainComponent},
    {path : 'info', component : UserViewComponent}
]

@NgModule({
    imports : [ RouterModule.forChild(userRoutes)],
    exports : [RouterModule]
})
export class UserRoutingModule{}