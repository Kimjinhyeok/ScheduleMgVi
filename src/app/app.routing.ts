import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './components/application/app.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { HomeComponent } from './components/home/home.component';
import { SetTimeComponent } from './components/set-time/set-time.component';

const routes : Routes = [
    {path : '', component : HomeComponent},
    {path : 'schedule', component : ScheduleComponent},
    {path : 'setday', component : SetTimeComponent},
]

export const routing = RouterModule.forRoot(routes);