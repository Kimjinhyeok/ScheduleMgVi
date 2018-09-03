import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/application/app.component';
import { NaviComponent } from './components/navi/navi.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './routers/app.routing';
import { HomeComponent } from './components/home/home.component';
import { AgmCoreModule } from '@agm/core';
import { LiveScheduleComponent } from './components/live-schedule/live-schedule.component';
import { CommonModule } from '@angular/common';
import { ErrorHandleComponent } from './components/error-handle/error-handle.component';
import { NotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddTokenInterceptor } from './guard/AddTokenInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    FooterComponent,
    HomeComponent,
    LiveScheduleComponent,
    ErrorHandleComponent,
    NotfoundComponent,
    UserLoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyB5NG0YrVVjUxMVJ8JihnZYhV7ClcIPiss'
    })
  ],
  providers: [
    AuthService,
    {provide : HTTP_INTERCEPTORS, useClass : AddTokenInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
