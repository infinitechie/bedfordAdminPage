import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { StockService } from '../../stock/service/stock.service';

import { UploadImageService } from '../../uploadImages/service/uploadImages.service';
import { Upload } from '../../uploadImages/model/upload';
import * as _ from "lodash";

import { Transaction } from '../../transaction/model/transaction';

import { TransactionService } from '../../transaction/service/transaction.service';


import { Stock } from '../../stock/model/stock';
// import { BookingsMissed } from '../../bookings/model/bookingsMissed/bookingsMissed';
// import { Bookings } from '../../bookings/model/bookings/bookings';

@Component({
    moduleId: module.id,
    selector: 'editStockComponent',
    templateUrl: 'editStockComponent.component.html',
    styleUrls: [ 'editStockComponent.component.css' ]
})
export class EditStockComponent implements OnInit {

    private transactions: Transaction[] = [];
    private modalId = "modalId";
    private userForm: FormGroup;
    private hasPurchases: boolean;

    private purchases: Transaction[]=[];
    // private statuses = STATUS;
    // private severities = SEVERITY;
    // private statusArr: string[] = [];
    // private severityArr: string[] = [];
    private currentUser = new Stock(null, null, null, null, null, null, null, null, null, null, null, null);

    // private BookingsMissed: BookingsMissed[] = [];
    private StockList: Stock[] = [];

    selectedFiles: FileList;
    currentUpload: Upload;
    

    constructor(private formB: FormBuilder, private customerService: StockService, private uploadService: UploadImageService, private transactionSvc: TransactionService) { }

    ngOnInit() {
        // this.statusArr = Object.keys(this.statuses).filter(Number);
        // this.severityArr = Object.keys(this.severities).filter(Number);
        this.configureForm();
        this.hasPurchases = false;
    }


    configureForm(product?: Stock) {
        this.StockList = [];
    //     // this.bugForm = new FormGroup({
    //     //     title: new FormControl(this.currentBug.title, [Validators.required, forbiddenStringValidator(/puppy/i)]),
    //     //     status: new FormControl(this.currentBug.status, Validators.required),
    //     //     severity: new FormControl(this.currentBug.severity, Validators.required),
    //     //     description: new FormControl(this.currentBug.description, Validators.required)
    //     // });
        if (product) {



            var j = Number(product.dateEntered)
            var dateEntered = new Date(j).toDateString()

            var k = Number(product.dateLastTransaction)
            var dateLastTransaction = new Date(k).toDateString()

            this.currentUser = new Stock(
                product.id,
                product.name,
                product.quantity,
                product.cost,
                product.vat,
                product.unitsSold,
                product.imageUrl,
                product.currentStock,
                dateEntered,
                dateLastTransaction,
                product.productDescription,
                product.stockTransactions,
                
            );

            // this.getPaidBookings();
            // this.getMissedBookings();\
            this.getTransactions(product);

        }
        this.userForm = this.formB.group({
            id: [this.currentUser.id, Validators.required],
            name: [this.currentUser.name, Validators.required],
            quantity: [this.currentUser.quantity, Validators.required],
            cost: [this.currentUser.cost, Validators.required],
            vat: [this.currentUser.vat, Validators.required],
            unitsSold: [this.currentUser.unitsSold, Validators.required],
            imageUrl: [this.currentUser.imageUrl, Validators.required],
            currentStock: [this.currentUser.currentStock, Validators.required],
            dateEntered: [this.currentUser.dateEntered, Validators.required],
            dateLastTransaction: [this.currentUser.dateLastTransaction, Validators.required],
            productDescription: [this.currentUser.productDescription, Validators.required],
            


        });
        
    }

  

        detectFiles(event) {
      this.selectedFiles = event.target.files;
  }

  uploadSingle() {
      
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.uploadService.pushUpload(this.currentUpload, this.currentUser.id, "/staff");
  }

   getTransactions(stock?: Stock){
     this.transactions = []
    this.transactionSvc.grabTransactionArray()
        .subscribe(transaction => {
            // console.log(transaction);
            // this.transactions.push(transaction);
            // console.log(this.transactions);

                  if(stock.name == transaction.name){
            console.log(transaction);
                this.purchases.push(transaction);
                // this.hasBookings = true;
                this.hasPurchases = true;
                // this.totalIncome.push(user.cost);
                // this.get();
                

                console.log(this.purchases);

            } else {

                // console.log("WWWWWWW");
                // console.log(transaction);

        }

        },
        err => {
            console.error("unable to add bug -", err);
        });

 }

  

    // makeCustomerLoyal(customer: Stock){
    //     if (customer.hasApp == "Yes" ||  customer.hasApp == "No") {
    //             this.customerService.customersRef.child(customer.id).update({
    //                 hasApp: "Loyal"
    //             });
    //     } else {
    //         this.customerService.customersRef.child(customer.id).update({
    //                 hasApp: "Yes"
    //             });
    //     }
        
    // }

    // deleteUser(customer: Stock){
    //     if (customer.credit > 0) {
    //             alert("Cannot Delete User with Money in Account");
    //     } else {
            
    //         this.customerService.customersRef.child(customer.id).remove();
    //     }
        
    // }

    submitForm() {

        //  name: [this.currentUser.name, Validators.required],
        //     quantity: [this.currentUser.quantity, Validators.required],
        //     cost: [this.currentUser.cost, Validators.required],
        //     vat: [this.currentUser.vat, Validators.required],
        //     unitsSold: [this.currentUser.unitsSold, Validators.required],
        //     imageUrl: [this.currentUser.imageUrl, Validators.required],
        //     currentStock: [this.currentUser.currentStock, Validators.required],
        //     dateEntered: [this.currentUser.dateEntered, Validators.required],
        //     dateLastTransaction: [this.currentUser.dateLastTransaction, Validators.required],
            // unitsSold: [this.currentUser.unitsSold, Validators.required],


       

        this.currentUser.name = this.userForm.value["name"];
        this.currentUser.quantity = this.userForm.value["quantity"];
        this.currentUser.cost = this.userForm.value["cost"];
        this.currentUser.vat = this.userForm.value["vat"];
        this.currentUser.unitsSold = this.userForm.value["unitsSold"];
        this.currentUser.currentStock = this.userForm.value["currentStock"];
        this.currentUser.dateEntered = this.userForm.value["dateEntered"];
        this.currentUser.imageUrl = this.userForm.value["imageUrl"];
        this.currentUser.dateLastTransaction = this.userForm.value["dateLastTransaction"];
        this.currentUser.productDescription = this.userForm.value["productDescription"];


        

        // if (this.currentUser.id) {
        //     // this.updateUser();
        // } else {
        //     // this.addUser();
        // }
    }

    // addUser() {
    //     this.customerService.addUser(this.currentUser);
    // }

    updateUser() {
        // this.customerService.updateBug(this.currentUser);
    }

    freshForm() {
        // this.userForm.reset({  });
        this.cleanUserForm();
    }
    
    cleanUserForm() {
        this.currentUser = new Stock(null, null, null, null, null, null, null, null, null, null, null, null);
        this.purchases = [];
        this.hasPurchases = false;
    }

    // getPaidBookings(){
        
    //     this.customerService.getPaidBookings(this.currentUser)
    //      .subscribe(user => {
    //         console.log(user);
    //         this.StockList.push(user);
    //         console.log(this.StockList);

    //     },
    //     err => {
    //         console.error("unable to add bug -", err);
    //     });
    // }




    // getMissedBookings(){
        
    //     this.customerService.getMissedBookings(this.currentUser)
    //     .subscribe(user => {
    //         console.log(user);
    //         this.Bookings.push(user);
    //         console.log(this.Bookings);

    //     },
    //     err => {
    //         console.error("unable to add bug -", err);
    //     });
    // }

}