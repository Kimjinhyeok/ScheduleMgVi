import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/application/app.component';
import { NaviComponent } from './components/navi/navi.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './routers/app.routing';
import { HomeComponent } from './components/home/home.component';
import { AgmCoreModule } from '@agm/core';
import { LiveScheduleComponent } from './components/live-schedule/live-schedule.component';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ErrorHandleComponent } from './components/error-handle/error-handle.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    FooterComponent,
    HomeComponent,
    LiveScheduleComponent,
    ErrorHandleComponent,
    NotfoundComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyB5NG0YrVVjUxMVJ8JihnZYhV7ClcIPiss'
    })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
