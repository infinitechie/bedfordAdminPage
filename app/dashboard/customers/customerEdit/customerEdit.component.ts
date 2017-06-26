import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CustomerService } from '../../customers/service/customers.service';
import { TransactionService } from '../../transaction/service/transaction.service';
import { Transaction } from '../../transaction/model/transaction';

import { Customers } from '../../customers/model/customers';
import { BookingsMissed } from '../../bookings/model/bookingsMissed/bookingsMissed';
import { Bookings } from '../../bookings/model/bookings/bookings';

@Component({
    moduleId: module.id,
    selector: 'customerEdit',
    templateUrl: 'customerEdit.component.html',
    styleUrls: [ 'customerEdit.component.css' ]
})
export class CustomerEditComponent implements OnInit {
    private modalId = "bugModal";
    private userForm: FormGroup;
    // private statuses = STATUS;
    // private severities = SEVERITY;
    private statusArr: string[] = [];
    private severityArr: string[] = [];
    private currentUser = new Customers(null, null, null, 0, 0, "No", null, [null], null, [null]);

    private BookingsMissed: BookingsMissed[] = [];
    private Bookings: Bookings[] = [];
    private hasbookings: boolean;
    

    constructor(private formB: FormBuilder, private customerService: CustomerService, private transactionSvc: TransactionService) { }

    ngOnInit() {
        // this.statusArr = Object.keys(this.statuses).filter(Number);
        // this.severityArr = Object.keys(this.severities).filter(Number);
        this.configureForm();
        this.hasbookings = false;
    }

    configureForm(user?: Customers) {
        this.Bookings = [];

        if (user) {
            this.currentUser = new Customers(
                user.id,
                user.name,
                user.email,
                user.expenditure,
                user.credit,
                user.hasApp,
                user.notes,
                user.bookingsPaid,
                user.phoneNumber,
                user.bookingsMissed
            );

            this.getPaidBookings(user);
            this.getMissedBookings();

        }

        
        this.userForm = this.formB.group({

            
            name: [this.currentUser.name, Validators.required],
            email: [this.currentUser.email, Validators.required],
            credit: [{value: this.currentUser.credit, disabled: true}, Validators.required],
            notes: [this.currentUser.notes, Validators.required],
            phoneNumber: [this.currentUser.phoneNumber, Validators.required],
            


        });
    }

    makeCustomerLoyal(customer: Customers){
        if (customer.hasApp == "Yes" ||  customer.hasApp == "No") {
                this.customerService.customersRef.child(customer.id).update({
                    hasApp: "Loyal"
                });
        } else {
            this.customerService.customersRef.child(customer.id).update({
                    hasApp: "Yes"
                });
        }
        
    }

    deleteUser(customer: Customers){
        if (customer.credit > 0) {
                alert("Cannot Delete User with Money in Account");
        } else {
            
            this.customerService.customersRef.child(customer.id).remove();
        }
        
    }

    submitForm() {
    
        this.currentUser.name = this.userForm.value["name"];
        this.currentUser.email = this.userForm.value["email"];
        this.currentUser.notes = this.userForm.value["notes"];
        this.currentUser.phoneNumber = this.userForm.value["phoneNumber"];
        // this.currentUser.hasApp = "No"
        // this.currentUser.expenditure = 0
        // this.currentUser
        

        if (this.currentUser.id) {
            this.updateUser();
            this.currentUser.credit = this.userForm.value["credit"];
        } else {
            this.addUser();
            this.currentUser.credit = this.userForm.value[0];
        }
    }

    addUser() {
        this.customerService.addUser(this.currentUser);
    }

    updateUser() {
        this.customerService.updateBug(this.currentUser);
    }

    freshForm() {
        // this.userForm.reset({  });
        this.cleanUserForm();
    }
    
    cleanUserForm() {
        this.currentUser = new Customers(null, null, null, 0, 0, "N/A", "No notes", null, null, null);
        this.hasbookings = false;
    }

    // getPaidBookings(){
        
    //     this.customerService.getPaidBookings(this.currentUser)
    //      .subscribe(user => {
    //          this.hasbookings = true;
    //         console.log(user);
    //         this.Bookings.push(user);
    //         console.log(this.Bookings);

    //     },
    //     err => {
    //         console.error("unable to add bug -", err);
    //     });
    // }

private transactions: Transaction[] = [];

    getPaidBookings(booking?: Customers){
    
    this.transactionSvc.grabTransactionArray()
        .subscribe(transaction => {
            // console.log(transaction);
            // this.transactions.push(transaction);
            // console.log(this.transactions);

                if(booking.name == transaction.customer){
                
                transaction.type = "Paid";

                console.log(transaction);
                this.Bookings.push(transaction);
                // this.hasBookings = true;
                this.hasbookings = true;
                // this.totalIncome.push(user.cost);
                // this.get();
                

                console.log(this.transactions);

            } else {

                // console.log("WWWWWWW");
                // console.log(transaction);

        }

        },
        err => {
            console.error("unable to add bug -", err);
        });
            
    }




    getMissedBookings(){
        
        this.customerService.getMissedBookings(this.currentUser)
        .subscribe(user => {
            console.log(user);
            this.Bookings.push(user);
            console.log(this.Bookings);

        },
        err => {
            console.error("unable to add bug -", err);
        });
    }

}