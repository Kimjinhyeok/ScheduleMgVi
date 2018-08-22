import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
import { NgModule } from "@angular/core";
import { ErrorHandleComponent } from "../components/error-handle/error-handle.component";
import { NotfoundComponent } from "../components/pagenotfound/pagenotfound.component";
const routes : Routes = [
    {path : '', component : HomeComponent},
    {path : 'schedule', loadChildren : '../schedule.module#ScheduleModule'},
    {path : 'user', loadChildren : '../user.module#UserModule'},
    {path : '**', component : NotfoundComponent}
]

@NgModule({
    imports : [
        RouterModule.forRoot(routes)
    ],
    exports : [
        RouterModule
    ]
})
export class AppRoutingModule{}