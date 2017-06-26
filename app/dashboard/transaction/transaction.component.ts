import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';

import { TransactionService } from '../transaction/service/transaction.service';

import { Transaction } from '../transaction/model/transaction';

@Component({
    moduleId: module.id,
    selector: 'transaction-cmp',
    templateUrl: 'transaction.component.html',
    styleUrls: ['transaction.component.css']
})

export class TransactionComponent implements OnInit {

    private transactions: Transaction[]  = [];

    constructor(private transactionService: TransactionService) { }

    ngOnInit(){
        this.getTransaction();
        // this.getUpdatedUser();

 }


getTransaction(){
    this.transactions = []
    this.transactionService.grabTransactionArray()
        .subscribe(transaction => {
            console.log(transaction);
            this.transactions.push(transaction);
            console.log(this.transactions);

        },
        err => {
            console.error("unable to add bug -", err);
        });
    }





    // getUpdatedUser() {
    //     this.customerService.changedListener()
    //         .subscribe(updatedUser => {
    //             const userIndex = this.users.map(index => index.id).indexOf(updatedUser['id']);
    //             this.users[userIndex] = updatedUser;
    //         },
    //         err => {
    //             console.error("Unable to get updated bug - ", err);
    //         });
    // }
}

 
