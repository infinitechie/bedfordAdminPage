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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var HomeSharedService = (function () {
    function HomeSharedService() {
        this.barChartDataMain = new BehaviorSubject_1.BehaviorSubject([{ data: [65, 59, 80, 81, 56, 55, 40], label: 'James' }]);
        this.barChartData = this.barChartDataMain.asObservable();
        this.totalIncomeMain = new BehaviorSubject_1.BehaviorSubject(0);
        this.totalIncome = this.totalIncomeMain.asObservable();
        this.totalTransactionsMain = new BehaviorSubject_1.BehaviorSubject(0);
        this.totalTransactions = this.totalTransactionsMain.asObservable();
        this.totalUnitsSoldMain = new BehaviorSubject_1.BehaviorSubject(0);
        this.totalUnitsSold = this.totalUnitsSoldMain.asObservable();
        this.lastSixMonthsMain = new BehaviorSubject_1.BehaviorSubject(null);
        this.lastSixMonths = this.lastSixMonthsMain.asObservable();
    }
    HomeSharedService.prototype.setBarChartData = function (array) {
        this.barChartDataMain.next(array);
    };
    HomeSharedService.prototype.setBarChartArray = function (lastSixMonths) {
        this.lastSixMonthsMain.next(lastSixMonths);
    };
    HomeSharedService.prototype.setIncome = function (income) {
        this.totalIncomeMain.next(income);
    };
    HomeSharedService.prototype.setTotalTransactions = function (transactions) {
        this.totalTransactionsMain.next(transactions);
    };
    HomeSharedService.prototype.setTotalUnitsSold = function (units) {
        this.totalUnitsSoldMain.next(units);
    };
    return HomeSharedService;
}());
HomeSharedService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], HomeSharedService);
exports.HomeSharedService = HomeSharedService;
//# sourceMappingURL=home.sharedService.js.map