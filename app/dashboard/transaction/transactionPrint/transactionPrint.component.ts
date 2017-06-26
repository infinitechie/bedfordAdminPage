import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// import { CustomerService } from '../../customers/service/customers.service';
import { TransactionService } from '../../transaction/service/transaction.service';

// import { Customers } from '../../customers/model/customers';
import { Transaction } from '../../transaction/model/transaction';

@Component({
    moduleId: module.id,
    selector: 'transactionPrint',
    templateUrl: 'transactionPrint.component.html',
    styleUrls: ['transactionPrint.component.css']
})

export class TransactionPrintComponent{ 

    private modalId = "bugModal";
    private userForm: FormGroup;
    
    // private statuses = STATUS;
    // private severities = SEVERITY;
    // private statusArr: string[] = [];
    // private severityArr: string[] = [];

    date = new Date()
    
    buttonState = "Save"
    


    private currentTransaction = new Transaction(this.date.getTime(), this.date.toDateString(), null, null, null, null, null);

    private transactions: Transaction[] = [];
    
    

    constructor(private formB: FormBuilder, private transactionService: TransactionService) { }

    ngOnInit() {
        // this.statusArr = Object.keys(this.statuses).filter(Number);
        // this.severityArr = Object.keys(this.severities).filter(Number);
        this.configureForm();
    }

    configureForm(transaction?: Transaction) {
        this.transactions = [];
    //     // this.bugForm = new FormGroup({
    //     //     title: new FormControl(this.currentBug.title, [Validators.required, forbiddenStringValidator(/puppy/i)]),
    //     //     status: new FormControl(this.currentBug.status, Validators.required),
    //     //     severity: new FormControl(this.currentBug.severity, Validators.required),
    //     //     description: new FormControl(this.currentBug.description, Validators.required)
    //     // });
        if (transaction) {
            // this.printButton();
            var j = Number(transaction.date)
            var date = new Date(j).toDateString()

            

            this.currentTransaction = new Transaction(
                  transaction.id,
                 date,
                 transaction.customer,
                 transaction.name,
                 transaction.customerId,
                 transaction.cost,
                 transaction.serviceType
                 
            );

            // this.getPaidBookings();
            // this.getMissedBookings();

        } else {
            // this.saveButton();
        }
        this.userForm = this.formB.group({
            // id: [this.currentTransaction.id, Validators.required],
            date: [this.currentTransaction.date, Validators.required],
            customer: [this.currentTransaction.customer, Validators.required],
            name: [this.currentTransaction.name, Validators.required],
            customerId: [this.currentTransaction.customerId, Validators.required],
            cost: [this.currentTransaction.cost, Validators.required],
            serviceType: [this.currentTransaction.serviceType, Validators.required],

            


        });
    }

    submitForm() {
        // this.currentBug.title = this.bugForm.value["title"];
        // this.currentBug.status = this.bugForm.value["status"];
        // this.currentBug.severity = this.bugForm.value["severity"];
        // this.currentBug.description = this.bugForm.value["description"];

        this.currentTransaction.name = this.userForm.value["name"];
        this.currentTransaction.customer = this.userForm.value["customer"];
        this.currentTransaction.cost = this.userForm.value["cost"];
        this.currentTransaction.serviceType = this.userForm.value["serviceType"];
        this.currentTransaction.customerId = this.userForm.value["customerId"];
        this.currentTransaction.date = this.date.toDateString();
        this.currentTransaction.id = this.currentTransaction.id;
        
        this.addUser();

        // if (this.currentTransaction.name) {
        //     this.printButton();
        // } else {
            
        // }
        this.cleanUserForm();
    }

    addUser() {
        this.transactionService.addUser(this.currentTransaction);
    }

    // updateUser() {
    //     this.customerService.updateBug(this.currentUser);
    // }

    freshForm() {
        // this.userForm.reset({  });
        this.cleanUserForm();
    }
    
    cleanUserForm() {
        this.currentTransaction = new Transaction(null, this.date.toDateString(), null, null, null, null, null);
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
