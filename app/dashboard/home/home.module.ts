import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

// import {AutoCompleteModule, SharedModule} from 'primeng/primeng';
// import { DatepickerModule } from 'ngx-bootstrap';
// import { AngularFireModule } from 'angularfire2';

//Components
// import { CustomerEditComponent } from '../customers/customerEdit/customerEdit.component';
// import { DeleteUserConfirm } from '../customers/deleteUserConfirm/deleteUserConfirm.component';

// import { HomePageComponent } from '../../homePage/homePage.component';
import { FirebaseConfigService } from '../../core/services/firebase-config.service';

// Services
import { HomeService } from '../home/service/home.service';
import {HomeSharedService} from './home.sharedService';

// import {CapitalizePipes} from "./pipes/capitalize.pipe";


@NgModule ({ 

    imports: [CoreModule, CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [  ],
    exports: [  ],
    providers: [ FirebaseConfigService, HomeService, HomeSharedService ]


})

export class HomeModule { }