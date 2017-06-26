import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import {AutoCompleteModule, SharedModule, DropdownModule} from 'primeng/primeng';






// import { DatepickerModule } from 'ngx-bootstrap';
// import { AngularFireModule } from 'angularfire2';

//Components
// import { CustomerEditComponent } from '../customers/customerEdit/customerEdit.component';
// import { DeleteUserConfirm } from '../customers/deleteUserConfirm/deleteUserConfirm.component';

// import { HomePageComponent } from '../../homePage/homePage.component';
import { FirebaseConfigService } from '../../core/services/firebase-config.service';

// Services
import { AuthenticationService } from './service/authentication.service';

// import {BookingSharedService} from './bookingSharedService';




@NgModule ({ 

    imports: [CoreModule, CommonModule, FormsModule, ReactiveFormsModule, SharedModule, AutoCompleteModule, DropdownModule],
    declarations: [   ],
    exports: [  ],
    providers: [ AuthenticationService, FirebaseConfigService ]


})

export class AuthenticationModule { }