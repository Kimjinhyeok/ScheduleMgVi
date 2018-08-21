import { Routes, RouterModule } from '@angular/router';
import { ScheduleComponent } from '../components/schedule/schedule.component';
import { ScheduleWriteComponent } from '../components/schedule-write/schedule-write.component';
import { ScheduleManageComponent } from '../components/schedule-manage/schedule-manage.component';
import { ScheduleEditComponent } from '../components/schedule-edit/schedule-edit.component';
import { NgModule } from '@angular/core';

const scheduleRoutes : Routes = [
    // {path : '', component : HomeComponent},
    {path : '', component : ScheduleComponent},
    {path : 'write', component : ScheduleWriteComponent},
    {path : 'manage', component : ScheduleManageComponent},
    {path : 'edit', component : ScheduleEditComponent}
]

@NgModule({
    imports : [ RouterModule.forChild(scheduleRoutes)],
    exports : [RouterModule]
})

export class ScheduleRoutingModule{}