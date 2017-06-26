import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import {CalendarComponent} from "angular2-fullcalendar/src/calendar/calendar";
// import { RosterComponent } from './roster.component';
import { RosterService } from './service/roster.service';


@NgModule({
    imports: [ CommonModule ],
    declarations: [  ],
    exports: [  ],
    providers: [ RosterService]
})

export class RosterModule {
    

}