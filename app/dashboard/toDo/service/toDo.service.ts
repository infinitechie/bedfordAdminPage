import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ToDo } from '../model/todo';
import { Bookings } from '../../bookings/model/bookings/bookings';

import { FirebaseConfigService } from '../../../core/services/firebase-config.service';


@Injectable()
export class ToDoService { 

// user: Observable<firebase.User>;
    email: string;
    password:string;
    errorMessage: string;

    constructor(private fire: FirebaseConfigService){
     
    }

   
    public toDoRef = this.fire.database.ref().child('/toDo');
    



   grabUsersArray():Observable<any> {
         return Observable.create(obs => {
            
                this.toDoRef.on('child_added', customer => {
                        const newCustomer = customer.val() as ToDo;
                        newCustomer.id = customer.key;
                            obs.next(newCustomer);
                            console.log("juice");
                            
                },
                err => {
                    obs.throw(err);
                }
            );
        });
    }

   changedListener(): Observable<any> {
        return Observable.create(obs => {
            this.toDoRef.on('child_changed', upDatedCustomer => {
                const updatedUserDetails = upDatedCustomer.val() as ToDo;
                updatedUserDetails.id = upDatedCustomer.key;
                obs.next(updatedUserDetails);
            },
            err => {
                obs.throw(err);
            });
        });
    }

      addUser(customer: ToDo) {
        const newBugRef = this.toDoRef.push();
        newBugRef.set({
                id: customer.id ,
                name: customer.name,
                completed: customer.completed,
                staffMemberAssigned: customer.staffMemberAssigned,
                dateCompleted: customer.dateCompleted
               
        })
        .catch(err => console.error("Unable to add bug to Firebase - ", err));
    }


 updateBug(user: ToDo) {
        const currentBugRef = this.toDoRef.child(user.id);
        console.log(user.id);
        user.id = null;
        currentBugRef.update(user);
    }

deleteUser(task: ToDo){
    const deleteTaskRef = this.toDoRef.child(task.id);
    deleteTaskRef.remove();
}

}