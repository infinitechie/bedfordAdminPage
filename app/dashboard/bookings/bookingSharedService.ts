import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Transaction } from '../transaction/model/transaction';


@Injectable()
export class BookingSharedService {

    private selectedBookingSource = new BehaviorSubject<string>('');
    bookingService = this.selectedBookingSource.asObservable();

    private DateSelectedSourceMain = new BehaviorSubject<string>('');
    dateSelectedMain = this.DateSelectedSourceMain.asObservable();

    private CustomerNameSelectedSourceMain  = new BehaviorSubject<string>('');
    customerName = this.CustomerNameSelectedSourceMain.asObservable();

    private CustomerIdSelectedSourceMain = new BehaviorSubject<string>('');
    customerId = this.CustomerIdSelectedSourceMain.asObservable();

    private StaffArrayIndex = new BehaviorSubject<string>('');
    staffIndex = this.StaffArrayIndex.asObservable();

    private EmailSelectedSourceMain = new BehaviorSubject<string>('');
    emailSelected = this.EmailSelectedSourceMain.asObservable();

    private CostSelectedSourceMain = new BehaviorSubject<number>(null);
    costSelected = this.CostSelectedSourceMain.asObservable();

    private CustomerExpenditureMain = new BehaviorSubject<number>(null);
    customerExpenditure = this.CustomerExpenditureMain.asObservable();

    private CustomerEmailSelectedSourceMain = new BehaviorSubject<string>("");
    customerEmailSelected = this.CustomerEmailSelectedSourceMain.asObservable();

    
    private CustomerCreditMain = new BehaviorSubject<number>(null);
    customerCredit = this.CustomerCreditMain.asObservable();

    private CustomerNotesSelectedSourceMain  = new BehaviorSubject<string>('');
    customerNotes = this.CustomerNotesSelectedSourceMain.asObservable();

    private TransactionToBePassedMain = new BehaviorSubject<Transaction>(null);
    transactionPassed = this.TransactionToBePassedMain.asObservable();

    private StaffUIDSelectedMain = new BehaviorSubject<string>("");
    staffUID = this.StaffUIDSelectedMain.asObservable();

    constructor() {}

    setStaffUID(UID: string){
        this.StaffUIDSelectedMain.next(UID);
    }

    setTransaction(transaction: Transaction){
        this.TransactionToBePassedMain.next(transaction);
    }

    setCustomerNotes(notes: string){
        this.CustomerNotesSelectedSourceMain.next(notes);
    }

    setCustomerCredit(credit: number){
        this.CustomerCreditMain.next(credit);
    }

    setCustomerExpenditure(expenditure: number){
        this.CustomerExpenditureMain.next(expenditure);
    }

    setDate(date: string) {
        this.DateSelectedSourceMain.next(date);
    }

     setCustomerEmail(email: string) {
        this.CustomerEmailSelectedSourceMain.next(email);
    }

    setCustomerName(name: string) {
        this.CustomerNameSelectedSourceMain.next(name);
    }

    setStaffIndex(staffIndex: string) {
        this.StaffArrayIndex.next(staffIndex);
    }

    setCost(cost: number) {
        this.CostSelectedSourceMain.next(cost);
    }

    setCustomerId(customerId: string) {
        this.CustomerIdSelectedSourceMain.next(customerId);
    }

    setService(service: string) {
        this.selectedBookingSource.next(service);
    }

    setEmail(email: string){
        this.EmailSelectedSourceMain.next(email);
    }

//     setTimeKey(timeKey: number){
//         this.TimeKeySelectedSourceMain.next(timeKey);
//     }

//     setDateKey(dateKey: number){
//         this.DateKeySelectedSourceMain.next(dateKey);
//     }


// // Here is bottom cut off

//     passBarberSelectedData(barber: string){
//         this.BarberSelectedSource.next(barber);
//     }

}