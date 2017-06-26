import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RosterService } from '../dashboard/roster/service/roster.service';
import { ScheduleModule, InputTextModule, DataTableModule,ButtonModule,DialogModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';

import {AccordionModule} from 'primeng/primeng';     //accordion and accordion tab

import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard.routes';
// import { CoreModule } from '../core/core.module';

// import { FirebaseConfigService } from '../core/services/firebase-config.service';

// // Services
// import { CustomerService } from '../dashboard/customers/service/customers.service';


//MadeModules
import { CustomerModule } from '../dashboard/customers/customers.module';
import { TransactionModule } from '../dashboard/transaction/transaction.module';
import { StockModule } from '../dashboard/stock/stock.module';
import { RosterModule } from '../dashboard/roster/roster.module';
import { StaffModule } from '../dashboard/staff/staff.module';
import { PortfolioModule } from '../dashboard/portfolio/portfolio.module';
import { ToDoModule } from '../dashboard/toDo/todo.module'
import { BookingModule } from '../dashboard/bookings/bookings.module';
import { HomeModule } from '../dashboard/home/home.module';
import { ServicesModule } from '../dashboard/services/services.module'
import {AuthenticationModule} from '../dashboard/authentication/authentication.module';

import { ChartsModule } from 'ng2-charts';
import { AuthGuard } from '../authGuard/authGuard';



//Services
import { UploadImageService } from '../dashboard/uploadImages/service/uploadImages.service';


import {CapitalizePipe} from "../dashboard/pipes/capitalize.pipe";

@NgModule({
    imports: [ AuthenticationModule,HomeModule, ChartsModule, ScheduleModule,HttpModule, CommonModule, BrowserModule, CustomerModule, BookingModule, ToDoModule, StaffModule, StockModule,PortfolioModule, TransactionModule,RosterModule, ServicesModule,
    InputTextModule, DataTableModule, ButtonModule, DialogModule, FormsModule, CalendarModule, AccordionModule,  
        RouterModule.forChild(MODULE_ROUTES)
    ],
    declarations: [ MODULE_COMPONENTS, CapitalizePipe ],
    providers: [ RosterService, UploadImageService, AuthGuard ]
})

export class DashboardModule{}
