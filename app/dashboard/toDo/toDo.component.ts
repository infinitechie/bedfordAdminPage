import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';

import { ToDoService } from './service/toDo.service';

import { ToDo } from './model/toDo';

@Component({
    moduleId: module.id,
    selector: 'toDo-cmp',
    templateUrl: 'toDo.component.html',
    styleUrls: ['toDo.component.css'],
    animations: [
        trigger('cardupgrade', [
            state('*', style({
                '-ms-transform': 'translate3D(0px, 0px, 0px)',
                '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                '-moz-transform': 'translate3D(0px, 0px, 0px)',
                '-o-transform':'translate3D(0px, 0px, 0px)',
                transform:'translate3D(0px, 0px, 0px)',
                opacity: 1})),
                transition('void => *', [
                    style({opacity: 0,
                        '-ms-transform': 'translate3D(0px, 150px, 0px)',
                        '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                        '-moz-transform': 'translate3D(0px, 150px, 0px)',
                        '-o-transform':'translate3D(0px, 150px, 0px)',
                        transform:'translate3D(0px, 150px, 0px)',
                    }),
                    animate('0.3s 0s ease-out')
                ])
        ])
    ]
})

export class ToDoComponent implements OnInit{ 

    private tasks: ToDo[];
    
    
    constructor(private toDoSvc: ToDoService) { }

    ngOnInit(){
        this.tasks= [];
         this.getUpdatedUser();
        this.getUser();
        // this.getUserIfEmpty();
       

 }

// getUserIfEmpty(){
//     if (this.tasks == [null]) {
//         this.getUser();
//     } else {
//         console.log("already called");
//     }

// }


getUser(){
    this.tasks = []
    this.toDoSvc.grabUsersArray()
        .subscribe(user => {
            console.log(user);
            this.tasks.push(user);
            console.log(this.tasks);

        },
        err => {
            console.error("unable to add bug -", err);
        });
        
    }

    getUpdatedUser() {
        this.toDoSvc.changedListener()
            .subscribe(updatedUser => {
                const userIndex = this.tasks.map(index => index.id).indexOf(updatedUser['id']);
                this.tasks[userIndex] = updatedUser;
            },
            err => {
                console.error("Unable to get updated bug - ", err);
            });
    }

      deleteUser(task: ToDo){
          
        console.log(task);
        this.toDoSvc.deleteUser(task);
        this.tasks = [];
        this.getUser();
        
    }

}

 
