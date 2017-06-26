import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingCashOutComponent } from './bookingCashOut/bookingCashOut.component';
import {AutoCompleteModule, SharedModule, DropdownModule} from 'primeng/primeng';






// import { DatepickerModule } from 'ngx-bootstrap';
// import { AngularFireModule } from 'angularfire2';

//Components
// import { CustomerEditComponent } from '../customers/customerEdit/customerEdit.component';
// import { DeleteUserConfirm } from '../customers/deleteUserConfirm/deleteUserConfirm.component';

// import { HomePageComponent } from '../../homePage/homePage.component';
import { FirebaseConfigService } from '../../core/services/firebase-config.service';

// Services
import { BookingService } from '../bookings/service/bookings.service';

import {BookingSharedService} from './bookingSharedService';

import {CapitalizePipes} from "./pipes/capitalize.pipe";


@NgModule ({ 

    imports: [CoreModule, CommonModule, FormsModule, ReactiveFormsModule, SharedModule, AutoCompleteModule, DropdownModule],
    declarations: [ BookingCashOutComponent, CapitalizePipes ],
    exports: [ BookingCashOutComponent, CapitalizePipes ],
    providers: [ BookingService, FirebaseConfigService, BookingSharedService ]


})

export class BookingModule { }