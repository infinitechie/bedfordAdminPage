import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Transaction } from '../model/transaction';
import { Bookings } from '../../bookings/model/bookings/bookings';

import { FirebaseConfigService } from '../../../core/services/firebase-config.service';


@Injectable()
export class TransactionService { 

public transactionsRef = this.fire.database.ref().child('/transactions');

    email: string;
    password:string;
    errorMessage: string;

    constructor(private fire: FirebaseConfigService) { }


grabTransactionArray():Observable<any> {
         return Observable.create(obs => {
            
                this.transactionsRef.on('child_added', transaction => {
                        const newTransaction = transaction.val() as Transaction;
                        newTransaction.id = Number(transaction.key);
                            obs.next(newTransaction);
                            console.log("juice");
                            
                },
                err => {
                    obs.throw(err);
                }
            );
        });
    }

  addUser(transaction: Transaction) {
        this.transactionsRef.child(String(transaction.id)).set({
                id: transaction.id,
                name: transaction.name,
                cost: transaction.cost,
                date: transaction.date,
                customerId: transaction.customerId,
                customer: transaction.customer,
                serviceType: transaction.serviceType
        })
        .catch(err => console.error("Unable to add Transaction to Firebase - ", err));
    }



}