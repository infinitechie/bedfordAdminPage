import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


import { CreateTaskComponent } from './createTask/createTask.component';
import { FirebaseConfigService } from '../../core/services/firebase-config.service';

// Services
import { ToDoService } from '../toDo/service/toDo.service';

// import {CapitalizePipe} from "../../dashboard/pipes/capitalize.pipe";


@NgModule ({ 

    imports: [CoreModule, CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [ CreateTaskComponent ],
    exports: [ CreateTaskComponent ],
    providers: [ ToDoService, FirebaseConfigService ]


})

export class ToDoModule { }