import {Component, OnInit,trigger,state,style,transition,animate,keyframes, group} from '@angular/core';
import initDemo = require('../../../assets/js/charts.js');
import initNotify = require('../../../assets/js/notify.js');
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { HomeService } from '../../dashboard/home/service/home.service';
import { Views } from './model/views';
import { BarChartData } from './model/views';


import { StaffService } from '../../dashboard/staff/service/staff.service';



import { Transaction } from '../transaction/model/transaction';
import { HomeSharedService } from './home.sharedService';


declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'home-cmp',
    templateUrl: 'home.component.html',
    styleUrls: ["home.component.css"]
    // ,
    // animations: [
    //     trigger('cardemail', [
    //         state('*', style({
    //             '-ms-transform': 'translate3D(0px, 0px, 0px)',
    //             '-webkit-transform': 'translate3D(0px, 0px, 0px)',
    //             '-moz-transform': 'translate3D(0px, 0px, 0px)',
    //             '-o-transform':'translate3D(0px, 0px, 0px)',
    //             transform:'translate3D(0px, 0px, 0px)',
    //             opacity: 1})),
    //             transition('void => *', [
    //                 style({opacity: 0,
    //                     '-ms-transform': 'translate3D(0px, 150px, 0px)',
    //                     '-webkit-transform': 'translate3D(0px, 150px, 0px)',
    //                     '-moz-transform': 'translate3D(0px, 150px, 0px)',
    //                     '-o-transform':'translate3D(0px, 150px, 0px)',
    //                     transform:'translate3D(0px, 150px, 0px)',
    //                 }),
    //                 animate('0.3s 0s ease-out')
    //             ])
    //     ]),
    //     trigger('carduser', [
    //         state('*', style({
    //             '-ms-transform': 'translate3D(0px, 0px, 0px)',
    //             '-webkit-transform': 'translate3D(0px, 0px, 0px)',
    //             '-moz-transform': 'translate3D(0px, 0px, 0px)',
    //             '-o-transform':'translate3D(0px, 0px, 0px)',
    //             transform:'translate3D(0px, 0px, 0px)',
    //             opacity: 1})),
    //             transition('void => *', [
    //                 style({opacity: 0,
    //                     '-ms-transform': 'translate3D(0px, 150px, 0px)',
    //                     '-webkit-transform': 'translate3D(0px, 150px, 0px)',
    //                     '-moz-transform': 'translate3D(0px, 150px, 0px)',
    //                     '-o-transform':'translate3D(0px, 150px, 0px)',
    //                     transform:'translate3D(0px, 150px, 0px)',
    //                 }),
    //                 animate('0.3s 0.25s ease-out')
    //             ])
    //     ]),
    //     trigger('card2014sales', [
    //         state('*', style({
    //             '-ms-transform': 'translate3D(0px, 0px, 0px)',
    //             '-webkit-transform': 'translate3D(0px, 0px, 0px)',
    //             '-moz-transform': 'translate3D(0px, 0px, 0px)',
    //             '-o-transform':'translate3D(0px, 0px, 0px)',
    //             transform:'translate3D(0px, 0px, 0px)',
    //             opacity: 1})),
    //             transition('void => *', [
    //                 style({opacity: 0,
    //                     '-ms-transform': 'translate3D(0px, 150px, 0px)',
    //                     '-webkit-transform': 'translate3D(0px, 150px, 0px)',
    //                     '-moz-transform': 'translate3D(0px, 150px, 0px)',
    //                     '-o-transform':'translate3D(0px, 150px, 0px)',
    //                     transform:'translate3D(0px, 150px, 0px)',
    //                 }),
    //                 animate('0.3s 0.5s ease-out')
    //             ])
    //     ]),
    //     trigger('cardtasks', [
    //         state('*', style({
    //             '-ms-transform': 'translate3D(0px, 0px, 0px)',
    //             '-webkit-transform': 'translate3D(0px, 0px, 0px)',
    //             '-moz-transform': 'translate3D(0px, 0px, 0px)',
    //             '-o-transform':'translate3D(0px, 0px, 0px)',
    //             transform:'translate3D(0px, 0px, 0px)',
    //             opacity: 1})),
    //             transition('void => *', [
    //                 style({opacity: 0,
    //                     '-ms-transform': 'translate3D(0px, 150px, 0px)',
    //                     '-webkit-transform': 'translate3D(0px, 150px, 0px)',
    //                     '-moz-transform': 'translate3D(0px, 150px, 0px)',
    //                     '-o-transform':'translate3D(0px, 150px, 0px)',
    //                     transform:'translate3D(0px, 150px, 0px)',
    //                 }),
    //                 animate('0.3s 0.75s ease-out')
    //             ])
    //     ])
    // ]


})

export class HomeComponent implements OnInit{


private transactions: Transaction[]  = [];
private totalIncome: number[] = [];
private totalIncomeSum: number;
private totalTransactions: number;
private totalViews: number;
private unitsSold: Transaction[]=[];
private unitsSoldTotal: number;
private staffArray: string[]=[];
public barChartData:BarChartData[] = [];
public transactionsInLastMonth: Transaction[]=[];
public transactionsTwoMonthsAgo: Transaction[]=[];
public transactionfThreeMonthsAgo: Transaction[]=[];
public transactionfFourMonthsAgo: Transaction[]=[];
public transactionfFiveMonthsAgo: Transaction[]=[];
public transactionfSixMonthsAgo: Transaction[]=[];

// private currentMonth: string;
// private lastMonth:string;
// private twoMonthsAgo:string;
// private threeMonthsAgo:string;
// private fourMonthsAgo:string;
// private fiveMonths: string;
private lastSixMonthsArray: string[]=[];

constructor(private homeService: HomeService, private sharedService: HomeSharedService,private staffService: StaffService) { }

// Bookings Counter
// Total Income
// Units Sold
// Top Barber
// Sales based weekly
// Views Counter
// Instagram Likes/ facebook Likes
// Social Media data
// Reach (Messages/Audience)
// Firebase Analytics Data



    ngOnInit() {
        this.getStaff();

        this.getLastSixMonths();
        // $.getScript('../../../assets/js/bootstrap-checkbox-radio-switch.js');
        // $.getScript('../../../assets/js/light-bootstrap-dashboard.js');
         this.sharedService.totalIncome.subscribe(message => this.totalIncomeSum = message);
         this.sharedService.totalTransactions.subscribe(message => this.totalTransactions = message);
         this.sharedService.totalUnitsSold.subscribe(message => this.unitsSoldTotal = message);
         this.sharedService.lastSixMonths.subscribe(message => this.barChartLabels = message);
         this.sharedService.barChartData.subscribe(message => this.barChartData = message);


        this.getViews();
        this.getTransaction();
        this.totalViews = 0;
        // this.unitsSoldTotal = 0;

        // $('[data-toggle="checkbox"]').each(function () {
        //     if($(this).data('toggle') == 'switch') return;

        //     var $checkbox = $(this);
        //     $checkbox.checkbox();
        // });
        // initDemo();
        // initNotify();
    }
//PIE CHART
  public doughnutChartLabels:string[] = ['Email', 'Messaging App', 'Push Notifications'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  //PIE CHART NOT HOLLOW

    public pieChartLabels:string[] = ['iOS App', 'Android App', 'Website', 'In Store'];
    public pieChartData:number[] = [300, 200, 500, 100];
    public pieChartType:string = 'pie';



    public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  
 
  // events
  public chartClicked(e:any):void {
      
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

  getStaff(){
    this.staffArray = []
    var barChartInfo: BarChartData;
    this.staffService.grabUsersArray()
        .subscribe(staff => {
            // console.log(staff);
            // this.grabImageUrl(staff);
            this.staffArray.push(staff.name);
            // console.log(this.staffArray);
            
            this.barChartData.push({data: [65, 59, 80, 81, 56, 55, 40], label: staff.name})
        
            

        },
        err => {
            console.error("unable to add bug -", err);
        });
       
           this.sharedService.setBarChartData(this.barChartData);
  }

  getTransaction(){
     var date = new Date().getTime()
    this.transactions = []
    this.homeService.grabTransactionArray()
        .subscribe(transaction => {
            // console.log(transaction);
            this.transactions.push(transaction);
            // console.log(this.transactions);
            this.getNumberOfTransactions();
            this.totalIncome.push(transaction.cost);
            // console.log(this.totalIncome);
            this.sharedService.setTotalTransactions(this.transactions.length);
            this.get();

            if (transaction.serviceType == "product") {
                this.unitsSold.push(transaction);
                // this.unitsSoldTotal = this.unitsSold.length;
                this.sharedService.setTotalUnitsSold(this.unitsSold.length);
            } else {
                // console.log("booking");
            }

            var withinOneMonth = date - Number(transaction.id)
            // console.log(withinOneMonth);


//Transactions within the last month
            if (withinOneMonth < 2629746000) {
                    this.transactionsInLastMonth.push(transaction);
                    return
            } else {
                // console.log("beyond One Month")
            }
//Transactions from 2 months ago
             if (withinOneMonth < 5259492000 && withinOneMonth > 2629746000) {
                console.log("Too long ago");
                this.transactionsTwoMonthsAgo.push(transaction);
                return
            } else {
                // console.log("beyond Two Months")
            }

//Transactions from 3 months ago
            if (withinOneMonth < 7889238000 && withinOneMonth > 5259492000) {
                    console.log("Too long ago");
                    this.transactionfThreeMonthsAgo.push(transaction);
                    return
                } else {
                    // console.log("beyond Three Months")
                }

//Transactions from 4 months ago
            if (withinOneMonth < 10518984000 && withinOneMonth > 7889238000) {
                    console.log("Too long ago");
                    this.transactionfFourMonthsAgo.push(transaction);
                    return
                } else {
                    // console.log("beyond Four Months")
                }

//Transactions from 5 months ago

             if (withinOneMonth < 13148730000 && withinOneMonth > 10518984000) {
                    console.log("Too long ago");
                    this.transactionfFiveMonthsAgo.push(transaction);
                    return
                } else {
                    // console.log("beyond Five Months")
                }

//Transactions from 6 months ago

             if (withinOneMonth < 15778476000 && withinOneMonth > 13148730000) {
                    console.log("Too long ago");
                    this.transactionfSixMonthsAgo.push(transaction);
                    return
                } else {
                    console.log(transaction);
                }




        },
        err => {
            console.error("unable to add bug -", err);
        });
        
    }

    getNumberOfTransactions(){
        // console.log(this.transactions.length);
    }

    setViews(){
          this.homeService.viewCounterRef.update({
                count: ""
                
            })
    }



    grabIncomeForBarberForEachMonth(barber: string, transactions: Transaction[]){
       
        // Grab Transactions based on barbers name
        // if Epoch(id) is within 1month in miliseconds/seconds append to each barber's transactions
        // Create an array of barbers here also (total income)
        // and barber's transactions (total income)
        // and barber's transactios for each month (total income)

    }



    getLastSixMonths(){
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var today = new Date();
        var d;
        var e;
        var month;
        var currentMonth;
        var lastSixMonth: string[] = [];

        for(var i = 5; i > 0; i -= 1) {
        e = new Date(today.getFullYear(), today.getMonth(), 1);
        d = new Date(today.getFullYear(), today.getMonth()-i, 1);
        month = monthNames[d.getMonth()];
        console.log(month);
        this.barChartLabels.push(month);
        
        
    }
    currentMonth = monthNames[e.getMonth()];
    this.barChartLabels.push(currentMonth);
    // console.log(currentMonth);
    

    // console.log(this.barChartLabels);
    this.sharedService.setBarChartArray(this.barChartLabels);
    }

    getViews(){
        var self = this;
        this.homeService.viewCounterRef.once('value').then(function(snapshot) { 
            var username = snapshot.val() as Views;
            self.totalViews = username.counter
            // console.log(username.counter);
        })
        
    }

  get(){
        this.totalIncomeSum = 0;
    this.totalIncome.forEach(function (value) {
        this.totalIncomeSum += value;
    }, this);
    // console.log(this.totalIncomeSum);
    this.sharedService.setIncome(this.totalIncomeSum);
    return this.totalIncomeSum;
    
  }

}
