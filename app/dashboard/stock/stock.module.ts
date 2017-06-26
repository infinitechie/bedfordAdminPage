import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
// import { AngularFireModule } from 'angularfire2';

//Components
// import { CustomerEditComponent } from '../customers/customerEdit/customerEdit.component';
// import { DeleteUserConfirm } from '../customers/deleteUserConfirm/deleteUserConfirm.component';
// import { StockComponent } from '../stock/stock.component';

import { EditStockComponent } from '../stock/editStockComponent/editStockComponent.component';

// import { HomePageComponent } from '../../homePage/homePage.component';
import { FirebaseConfigService } from '../../core/services/firebase-config.service';

// Services
import { StockService } from '../stock/service/stock.service';

// import {CapitalizePipe} from "../../dashboard/pipes/capitalize.pipe";


@NgModule ({ 

    imports: [CoreModule, CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [ EditStockComponent ],
    exports: [ EditStockComponent ],
    providers: [ StockService, FirebaseConfigService ]


})

export class StockModule { }