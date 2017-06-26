import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {ListboxModule, SharedModule} from 'primeng/primeng';
// import { AngularFireModule } from 'angularfire2';

//Components
// import { CustomerEditComponent } from '../customers/customerEdit/customerEdit.component';
// import { DeleteUserConfirm } from '../customers/deleteUserConfirm/deleteUserConfirm.component';

// import { HomePageComponent } from '../../homePage/homePage.component';
import { FirebaseConfigService } from '../../core/services/firebase-config.service';

// // Services
import { AddServiceService } from '../services/service/services.service';

// import {CapitalizePipe} from "../../shared/pipes/capitalize.pipe";

@NgModule ({ 

    imports: [CoreModule, CommonModule, FormsModule, ReactiveFormsModule, ListboxModule, SharedModule],
    declarations: [ ],
    exports: [ FormsModule, ReactiveFormsModule, ListboxModule ],
    providers: [  FirebaseConfigService, AddServiceService ]


})

export class ServicesModule { }