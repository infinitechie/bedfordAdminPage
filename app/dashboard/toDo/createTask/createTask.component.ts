import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// import { CustomerService } from '../../customers/service/customers.service';
import { ToDoService } from '../../toDo/service/toDo.service';

// import { Customers } from '../../customers/model/customers';
import { ToDo } from '../../toDo/model/toDo';

@Component({
    moduleId: module.id,
    selector: 'createTask',
    templateUrl: 'createTask.component.html',
    styleUrls: ['createTask.component.css']
})

export class CreateTaskComponent { 

    private modalId = "bugModal";
    private userForm: FormGroup;
    
    // private statuses = STATUS;
    // private severities = SEVERITY;
    // private statusArr: string[] = [];
    // private severityArr: string[] = [];

    date = new Date()
    
    buttonState = "Save"
    


    private currentTask = new ToDo(null, null, "false", this.date.toDateString(), null);

    private tasks: ToDo[] = [];
    
    

    constructor(private formB: FormBuilder, private toDoSvc: ToDoService ) { }

    ngOnInit() {
        // this.statusArr = Object.keys(this.statuses).filter(Number);
        // this.severityArr = Object.keys(this.severities).filter(Number);
        this.configureForm();
    }

    configureForm(task?: ToDo) {
        this.tasks = [];
   
        if (task) {
            // this.printButton();
            var j = Number(task.dateCompleted)
            var date = new Date(j).toDateString()

            

            this.currentTask = new ToDo(
                  task.id,
                  task.name,
                  task.completed,
                  task.dateCompleted,
                  task.staffMemberAssigned
                
            );

         

        } else {
            // this.saveButton();
        }
        this.userForm = this.formB.group({
            // id: [this.currentTransaction.id, Validators.required],
            name: [this.currentTask.name, Validators.required],
            completed: [this.currentTask.completed, Validators.required],
            dateCompleted: [this.currentTask.dateCompleted, Validators.required],
            staffMember: [this.currentTask.staffMemberAssigned, Validators.required],
            

            


        });
    }

    submitForm() {
        // this.currentBug.title = this.bugForm.value["title"];
        // this.currentBug.status = this.bugForm.value["status"];
        // this.currentBug.severity = this.bugForm.value["severity"];
        // this.currentBug.description = this.bugForm.value["description"];

        this.currentTask.name = this.userForm.value["name"];
        this.currentTask.completed = this.userForm.value["completed"];
        this.currentTask.dateCompleted = this.userForm.value["dateCompleted"];
        this.currentTask.staffMemberAssigned = this.userForm.value["staffMember"];

        // this.currentTransaction.serviceType = this.userForm.value["serviceType"];
        // this.currentTransaction.customerId = this.userForm.value["customerId"];
        // this.currentTransaction.date = this.date.toDateString();
        // this.currentTransaction.id = this.currentTransaction.id;
        
        this.addUser();

        // if (this.currentTransaction.name) {
        //     this.printButton();
        // } else {
            
        // }
        this.cleanUserForm();
    }

    addUser() {
        this.toDoSvc.addUser(this.currentTask);
    }

    updateUser() {
        this.toDoSvc.updateBug(this.currentTask);
    }

    freshForm() {
        // this.userForm.reset({  });
        this.cleanUserForm();
    }
    
    cleanUserForm() {
        this.currentTask = new ToDo(null, null, "false", this.date.toDateString(), null);
    }

    completeTask(task: ToDo){
        if (task.completed == "false") {
            
                this.toDoSvc.toDoRef.child(task.id).update({
                    completed: "true",
                    dateCompleted: this.date.toDateString()

                });
        } else {
            this.toDoSvc.toDoRef.child(task.id).update({
                    completed: "false"
                });
        }
        
    }
    
   
    // printButton(){
    //     this.buttonState = "Print";
    // }

    // saveButton(){
    //     this.buttonState = "Save";
    // }


printMe(){
   window.print();
}

  

}
