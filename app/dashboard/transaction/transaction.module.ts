import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


//Components
import { TransactionPrintComponent } from '../transaction/transactionPrint/transactionPrint.component';

// import { HomePageComponent } from '../../homePage/homePage.component';
import { FirebaseConfigService } from '../../core/services/firebase-config.service';

// Services
import { TransactionService } from '../transaction/service/transaction.service';

// import {CapitalizePipe} from "../../shared/pipes/capitalize.pipe";

@NgModule ({ 

    imports: [CoreModule, CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [ TransactionPrintComponent ],
    exports: [ TransactionPrintComponent ],
    providers: [ TransactionService, FirebaseConfigService ]


})

export class TransactionModule { }