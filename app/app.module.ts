import { NgModule }      from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
// import { RosterModule } from './dashboard/roster/roster.module';

import { AppComponent }   from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {BrowserModule} from '@angular/platform-browser';


import { DashboardModule } from './dashboard/dashboard.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SharedSidebarService } from './authGuard/service/sharedSidebarService';

// import {CalendarComponent} from "angular2-fullcalendar/src/calendar/calendar";

@NgModule({
    imports:      [
        BrowserModule,
        DashboardModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        RouterModule.forRoot([])
    ],
    declarations: [ AppComponent, DashboardComponent ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},SharedSidebarService ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
