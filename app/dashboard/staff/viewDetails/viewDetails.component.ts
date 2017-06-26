import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { StaffService } from '../../staff/service/staff.service';
import { TransactionService } from '../../transaction/service/transaction.service';


import { Staff } from '../../staff/model/staff';

import { Customers } from '../../customers/model/customers';
import { BookingsMissed } from '../../bookings/model/bookingsMissed/bookingsMissed';
import { Bookings } from '../../bookings/model/bookings/bookings';

@Component({
    moduleId: module.id,
    selector: 'viewDetails',
    templateUrl: 'viewDetails.component.html',
    styleUrls: [ 'viewDetails.component.css' ]
})
export class ViewDetailsComponent implements OnInit {
    private modalId = "bugModal";
    private userForm: FormGroup;
    // private statuses = STATUS;
    // private severities = SEVERITY;
    private hasBookings:boolean;
    private statusArr: string[] = [];
    private severityArr: string[] = [];
    private totalIncomeSum: number;
    private totalIncome: number[] = [];
    private currentUser = new Staff(null, null, null, null, null, null, null, null,null, null,null,null,null,null,null,null);

    private BookingsMissed: BookingsMissed[] = [];
    private Bookings: Bookings[] = [];
    

    constructor(private formB: FormBuilder, private staffService: StaffService, private transactionService: TransactionService) { }

    ngOnInit() {
        // this.statusArr = Object.keys(this.statuses).filter(Number);
        // this.severityArr = Object.keys(this.severities).filter(Number);
        this.configureForm();
        this.totalIncomeSum = 0;
    }

    configureForm(user?: Staff) {
        this.Bookings = [];

        if (user) {
            
            this.currentUser = new Staff(
                user.id,
                user.name,
                user.email,
                user.earnings ,
                user.credit,
                user.notes,
                user.phoneNumber,
                user.imageUrl,
                user.imageStorageRef,
                user.unitsSold,
                user.dates, 
                user.productsSold, 
                user.transactions,
                user.servicesList, 
                
            );
            this.getTransactions(user);

            this.getPaidBookings();
            
            // this.getMissedBookings();

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
                this.staffService.staffRef.child(customer.id).update({
                    hasApp: "Loyal"
                });
        } else {
            this.staffService.staffRef.child(customer.id).update({
                    hasApp: "Yes"
                });
        }
        
    }

    deleteUser(customer: Staff){
        if (customer.credit > 0) {
                alert("Cannot Delete User with Money in Account");
        } else {
            
            this.staffService.staffRef.child(customer.id).remove();
        }
        
    }

    submitForm() {
    
        this.currentUser.name = this.userForm.value["name"];
        this.currentUser.email = this.userForm.value["email"];
        this.currentUser.credit = this.userForm.value["credit"];
        this.currentUser.notes = this.userForm.value["notes"];
        this.currentUser.phoneNumber = this.userForm.value["phoneNumber"];
        // this.currentUser.hasApp = "No"
        // this.currentUser.expenditure = 0
        // this.currentUser
        

        if (this.currentUser.id) {
            this.updateUser();
        } else {
            this.addUser();
        }
    }

    addUser() {
        // this.staffService.addUser(this.currentUser);
    }

    updateUser() {
        this.staffService.updateBug(this.currentUser);
    }

    getTransactions(staff?: Staff){
        this.transactionService.grabTransactionArray()
        .subscribe(user => {

        if(staff.email == user.customerId){
            console.log(user);
                this.Bookings.push(user);
                this.hasBookings = true;

                this.totalIncome.push(user.cost);
                this.get();
                

                console.log(this.Bookings);

            } else {

                console.log("WWWWWWW");

        }

            

        },
        err => {
            console.error("unable to add bug -", err);
        });
       
    }

     get(){
        this.totalIncomeSum = 0;
    this.totalIncome.forEach(function (value) {
        this.totalIncomeSum += value;
    }, this);
    // console.log(this.totalIncomeSum);
    // this.sharedService.setIncome(this.totalIncomeSum);
    return this.totalIncomeSum;
    
  }

    freshForm() {
        // this.userForm.reset({  });
        this.cleanUserForm();
    }
    
    cleanUserForm() {
        this.currentUser = new Staff(null, null, null, null, null, null, null, null,null, null,null,null,null,null,null,null);
        this.totalIncomeSum = 0;
        this.totalIncome = [];
        this.hasBookings = false;
    }

    getPaidBookings(){
        
        this.staffService.getPaidBookings(this.currentUser)
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