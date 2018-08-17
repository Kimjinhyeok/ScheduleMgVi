import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './components/application/app.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { HomeComponent } from './components/home/home.component';
import { SetTimeComponent } from './components/set-time/set-time.component';
import { ScheduleWriteComponent } from './components/schedule-write/schedule-write.component';
import { ScheduleManageComponent } from './components/schedule-manage/schedule-manage.component';

const routes : Routes = [
    {path : '', component : HomeComponent},
    {path : 'schedule', component : ScheduleComponent},
    {path : 'setday', component : SetTimeComponent},
    {path : 'write', component : ScheduleWriteComponent},
    {path : 'manage', component : ScheduleManageComponent}
]

export const routing = RouterModule.forRoot(routes);