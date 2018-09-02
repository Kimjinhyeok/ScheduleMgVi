import { NgModule } from "@angular/core";
import { ScheduleComponent } from "./components/schedule/schedule.component";
import { ScheduleWriteComponent } from "./components/schedule-write/schedule-write.component";
import { ScheduleManageComponent } from "./components/schedule-manage/schedule-manage.component";
import { ScheduleEditComponent } from "./components/schedule-edit/schedule-edit.component";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ScheduleRoutingModule } from "./routers/schedule-routing.module";
import { CommonModule } from "@angular/common";
import { ScheduleManagerService } from "./services/schedule-manage.service";
import { AuthService } from "./services/auth.service";

@NgModule({
    imports : [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpModule,
        ScheduleRoutingModule,
    ],
    declarations : [
        ScheduleComponent,
        ScheduleWriteComponent,
        ScheduleManageComponent,
        ScheduleEditComponent
    ],
    providers : [
        ScheduleManagerService,
        AuthService
    ]
})

export class ScheduleModule{}