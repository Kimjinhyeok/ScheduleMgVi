import { RouterModule, Routes } from "@angular/router";
import { UserRegisterMainComponent } from '../components/user-register/user-register-main/user-register-main.component';
import { NgModule } from "@angular/core";

const userRoutes : Routes = [
    {path : 'register', component : UserRegisterMainComponent}
]

@NgModule({
    imports : [ RouterModule.forChild(userRoutes)],
    exports : [RouterModule]
})
export class UserRoutingModule{}