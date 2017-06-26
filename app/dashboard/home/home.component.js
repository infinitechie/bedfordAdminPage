"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var home_service_1 = require("../../dashboard/home/service/home.service");
var staff_service_1 = require("../../dashboard/staff/service/staff.service");
var home_sharedService_1 = require("./home.sharedService");
var HomeComponent = (function () {
    function HomeComponent(homeService, sharedService, staffService) {
        this.homeService = homeService;
        this.sharedService = sharedService;
        this.staffService = staffService;
        this.transactions = [];
        this.totalIncome = [];
        this.unitsSold = [];
        this.staffArray = [];
        this.barChartData = [];
        this.transactionsInLastMonth = [];
        this.transactionsTwoMonthsAgo = [];
        this.transactionfThreeMonthsAgo = [];
        this.transactionfFourMonthsAgo = [];
        this.transactionfFiveMonthsAgo = [];
        this.transactionfSixMonthsAgo = [];
        // private currentMonth: string;
        // private lastMonth:string;
        // private twoMonthsAgo:string;
        // private threeMonthsAgo:string;
        // private fourMonthsAgo:string;
        // private fiveMonths: string;
        this.lastSixMonthsArray = [];
        //PIE CHART
        this.doughnutChartLabels = ['Email', 'Messaging App', 'Push Notifications'];
        this.doughnutChartData = [350, 450, 100];
        this.doughnutChartType = 'doughnut';
        //PIE CHART NOT HOLLOW
        this.pieChartLabels = ['iOS App', 'Android App', 'Website', 'In Store'];
        this.pieChartData = [300, 200, 500, 100];
        this.pieChartType = 'pie';
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = [];
        this.barChartType = 'bar';
        this.barChartLegend = true;
    }
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
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getStaff();
        this.getLastSixMonths();
        // $.getScript('../../../assets/js/bootstrap-checkbox-radio-switch.js');
        // $.getScript('../../../assets/js/light-bootstrap-dashboard.js');
        this.sharedService.totalIncome.subscribe(function (message) { return _this.totalIncomeSum = message; });
        this.sharedService.totalTransactions.subscribe(function (message) { return _this.totalTransactions = message; });
        this.sharedService.totalUnitsSold.subscribe(function (message) { return _this.unitsSoldTotal = message; });
        this.sharedService.lastSixMonths.subscribe(function (message) { return _this.barChartLabels = message; });
        this.sharedService.barChartData.subscribe(function (message) { return _this.barChartData = message; });
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
    };
    // events
    HomeComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    HomeComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    HomeComponent.prototype.randomize = function () {
        // Only Change 3 values
        var data = [
            Math.round(Math.random() * 100),
            59,
            80,
            (Math.random() * 100),
            56,
            (Math.random() * 100),
            40
        ];
        var clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    };
    HomeComponent.prototype.getStaff = function () {
        var _this = this;
        this.staffArray = [];
        var barChartInfo;
        this.staffService.grabUsersArray()
            .subscribe(function (staff) {
            // console.log(staff);
            // this.grabImageUrl(staff);
            _this.staffArray.push(staff.name);
            // console.log(this.staffArray);
            _this.barChartData.push({ data: [65, 59, 80, 81, 56, 55, 40], label: staff.name });
        }, function (err) {
            console.error("unable to add bug -", err);
        });
        this.sharedService.setBarChartData(this.barChartData);
    };
    HomeComponent.prototype.getTransaction = function () {
        var _this = this;
        var date = new Date().getTime();
        this.transactions = [];
        this.homeService.grabTransactionArray()
            .subscribe(function (transaction) {
            // console.log(transaction);
            _this.transactions.push(transaction);
            // console.log(this.transactions);
            _this.getNumberOfTransactions();
            _this.totalIncome.push(transaction.cost);
            // console.log(this.totalIncome);
            _this.sharedService.setTotalTransactions(_this.transactions.length);
            _this.get();
            if (transaction.serviceType == "product") {
                _this.unitsSold.push(transaction);
                // this.unitsSoldTotal = this.unitsSold.length;
                _this.sharedService.setTotalUnitsSold(_this.unitsSold.length);
            }
            else {
                // console.log("booking");
            }
            var withinOneMonth = date - Number(transaction.id);
            // console.log(withinOneMonth);
            //Transactions within the last month
            if (withinOneMonth < 2629746000) {
                _this.transactionsInLastMonth.push(transaction);
                return;
            }
            else {
                // console.log("beyond One Month")
            }
            //Transactions from 2 months ago
            if (withinOneMonth < 5259492000 && withinOneMonth > 2629746000) {
                console.log("Too long ago");
                _this.transactionsTwoMonthsAgo.push(transaction);
                return;
            }
            else {
                // console.log("beyond Two Months")
            }
            //Transactions from 3 months ago
            if (withinOneMonth < 7889238000 && withinOneMonth > 5259492000) {
                console.log("Too long ago");
                _this.transactionfThreeMonthsAgo.push(transaction);
                return;
            }
            else {
                // console.log("beyond Three Months")
            }
            //Transactions from 4 months ago
            if (withinOneMonth < 10518984000 && withinOneMonth > 7889238000) {
                console.log("Too long ago");
                _this.transactionfFourMonthsAgo.push(transaction);
                return;
            }
            else {
                // console.log("beyond Four Months")
            }
            //Transactions from 5 months ago
            if (withinOneMonth < 13148730000 && withinOneMonth > 10518984000) {
                console.log("Too long ago");
                _this.transactionfFiveMonthsAgo.push(transaction);
                return;
            }
            else {
                // console.log("beyond Five Months")
            }
            //Transactions from 6 months ago
            if (withinOneMonth < 15778476000 && withinOneMonth > 13148730000) {
                console.log("Too long ago");
                _this.transactionfSixMonthsAgo.push(transaction);
                return;
            }
            else {
                console.log(transaction);
            }
        }, function (err) {
            console.error("unable to add bug -", err);
        });
    };
    HomeComponent.prototype.getNumberOfTransactions = function () {
        // console.log(this.transactions.length);
    };
    HomeComponent.prototype.setViews = function () {
        this.homeService.viewCounterRef.update({
            count: ""
        });
    };
    HomeComponent.prototype.grabIncomeForBarberForEachMonth = function (barber, transactions) {
        // Grab Transactions based on barbers name
        // if Epoch(id) is within 1month in miliseconds/seconds append to each barber's transactions
        // Create an array of barbers here also (total income)
        // and barber's transactions (total income)
        // and barber's transactios for each month (total income)
    };
    HomeComponent.prototype.getLastSixMonths = function () {
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var today = new Date();
        var d;
        var e;
        var month;
        var currentMonth;
        var lastSixMonth = [];
        for (var i = 5; i > 0; i -= 1) {
            e = new Date(today.getFullYear(), today.getMonth(), 1);
            d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            month = monthNames[d.getMonth()];
            console.log(month);
            this.barChartLabels.push(month);
        }
        currentMonth = monthNames[e.getMonth()];
        this.barChartLabels.push(currentMonth);
        // console.log(currentMonth);
        // console.log(this.barChartLabels);
        this.sharedService.setBarChartArray(this.barChartLabels);
    };
    HomeComponent.prototype.getViews = function () {
        var self = this;
        this.homeService.viewCounterRef.once('value').then(function (snapshot) {
            var username = snapshot.val();
            self.totalViews = username.counter;
            // console.log(username.counter);
        });
    };
    HomeComponent.prototype.get = function () {
        this.totalIncomeSum = 0;
        this.totalIncome.forEach(function (value) {
            this.totalIncomeSum += value;
        }, this);
        // console.log(this.totalIncomeSum);
        this.sharedService.setIncome(this.totalIncomeSum);
        return this.totalIncomeSum;
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
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
    }),
    __metadata("design:paramtypes", [home_service_1.HomeService, home_sharedService_1.HomeSharedService, staff_service_1.StaffService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map