import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
import { NgModule } from "@angular/core";
const routes : Routes = [
    {path : '', component : HomeComponent},
    {path : 'schedule', loadChildren : '../schedule.module#ScheduleModule'},
    {path : 'user', loadChildren : '../user.module#UserModule'}
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