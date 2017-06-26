import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
// import { AngularFireModule } from 'angularfire2';

//Components
import { CustomerEditComponent } from '../customers/customerEdit/customerEdit.component';
import { DeleteUserConfirm } from '../customers/deleteUserConfirm/deleteUserConfirm.component';

// import { HomePageComponent } from '../../homePage/homePage.component';
import { FirebaseConfigService } from '../../core/services/firebase-config.service';

// Services
import { CustomerService } from '../customers/service/customers.service';

// import {CapitalizePipe} from "../../shared/pipes/capitalize.pipe";

@NgModule ({ 

    imports: [CoreModule, CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [ CustomerEditComponent, DeleteUserConfirm ],
    exports: [ CustomerEditComponent, DeleteUserConfirm ],
    providers: [ CustomerService, FirebaseConfigService ]


})

export class CustomerModule { }