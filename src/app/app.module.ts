import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/application/app.component';
import { NaviComponent } from './components/navi/navi.component';
import { FooterComponent } from './components/footer/footer.component';
import { routing } from './app.routing';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { HomeComponent } from './components/home/home.component';
import { AgmCoreModule } from '@agm/core';
import { LiveScheduleComponent } from './components/live-schedule/live-schedule.component';
import { ScheduleService } from './services/schedule.service';
import { Http, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SetTimeComponent } from './components/set-time/set-time.component';
@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    FooterComponent,
    ScheduleComponent,
    HomeComponent,
    LiveScheduleComponent,
    SetTimeComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyB5NG0YrVVjUxMVJ8JihnZYhV7ClcIPiss'
    }),
    HttpModule
  ],
  providers: [
    ScheduleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
