import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Transaction } from '../transaction/model/transaction';

import { BarChartData } from './model/views';


@Injectable()
export class HomeSharedService {

    private barChartDataMain = new BehaviorSubject<BarChartData[]>([{data: [65, 59, 80, 81, 56, 55, 40], label: 'James'}]);
    barChartData =  this.barChartDataMain.asObservable();

    private totalIncomeMain = new BehaviorSubject<number>(0);
    totalIncome = this.totalIncomeMain.asObservable();

    private totalTransactionsMain = new BehaviorSubject<number>(0);
    totalTransactions = this.totalTransactionsMain.asObservable();

    private totalUnitsSoldMain = new BehaviorSubject<number>(0);
    totalUnitsSold = this.totalUnitsSoldMain.asObservable();

     private lastSixMonthsMain = new BehaviorSubject<string[]>(null);
    lastSixMonths = this.lastSixMonthsMain.asObservable();

    constructor() {}

    setBarChartData(array: BarChartData[]){
        this.barChartDataMain.next(array);
    }

    setBarChartArray(lastSixMonths: string[]){
        this.lastSixMonthsMain.next(lastSixMonths);
    }

    setIncome(income: number) {
        this.totalIncomeMain.next(income);
    }

    setTotalTransactions(transactions: number) {
        this.totalTransactionsMain.next(transactions);
    }

    setTotalUnitsSold(units: number) {
        this.totalUnitsSoldMain.next(units);
    }




}