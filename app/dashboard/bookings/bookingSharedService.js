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
var BookingSharedService = (function () {
    function BookingSharedService() {
        this.selectedBookingSource = new BehaviorSubject_1.BehaviorSubject('');
        this.bookingService = this.selectedBookingSource.asObservable();
        this.DateSelectedSourceMain = new BehaviorSubject_1.BehaviorSubject('');
        this.dateSelectedMain = this.DateSelectedSourceMain.asObservable();
        this.CustomerNameSelectedSourceMain = new BehaviorSubject_1.BehaviorSubject('');
        this.customerName = this.CustomerNameSelectedSourceMain.asObservable();
        this.CustomerIdSelectedSourceMain = new BehaviorSubject_1.BehaviorSubject('');
        this.customerId = this.CustomerIdSelectedSourceMain.asObservable();
        this.StaffArrayIndex = new BehaviorSubject_1.BehaviorSubject('');
        this.staffIndex = this.StaffArrayIndex.asObservable();
        this.EmailSelectedSourceMain = new BehaviorSubject_1.BehaviorSubject('');
        this.emailSelected = this.EmailSelectedSourceMain.asObservable();
        this.CostSelectedSourceMain = new BehaviorSubject_1.BehaviorSubject(null);
        this.costSelected = this.CostSelectedSourceMain.asObservable();
        this.CustomerExpenditureMain = new BehaviorSubject_1.BehaviorSubject(null);
        this.customerExpenditure = this.CustomerExpenditureMain.asObservable();
        this.CustomerEmailSelectedSourceMain = new BehaviorSubject_1.BehaviorSubject("");
        this.customerEmailSelected = this.CustomerEmailSelectedSourceMain.asObservable();
        this.CustomerCreditMain = new BehaviorSubject_1.BehaviorSubject(null);
        this.customerCredit = this.CustomerCreditMain.asObservable();
        this.CustomerNotesSelectedSourceMain = new BehaviorSubject_1.BehaviorSubject('');
        this.customerNotes = this.CustomerNotesSelectedSourceMain.asObservable();
        this.TransactionToBePassedMain = new BehaviorSubject_1.BehaviorSubject(null);
        this.transactionPassed = this.TransactionToBePassedMain.asObservable();
        this.StaffUIDSelectedMain = new BehaviorSubject_1.BehaviorSubject("");
        this.staffUID = this.StaffUIDSelectedMain.asObservable();
    }
    BookingSharedService.prototype.setStaffUID = function (UID) {
        this.StaffUIDSelectedMain.next(UID);
    };
    BookingSharedService.prototype.setTransaction = function (transaction) {
        this.TransactionToBePassedMain.next(transaction);
    };
    BookingSharedService.prototype.setCustomerNotes = function (notes) {
        this.CustomerNotesSelectedSourceMain.next(notes);
    };
    BookingSharedService.prototype.setCustomerCredit = function (credit) {
        this.CustomerCreditMain.next(credit);
    };
    BookingSharedService.prototype.setCustomerExpenditure = function (expenditure) {
        this.CustomerExpenditureMain.next(expenditure);
    };
    BookingSharedService.prototype.setDate = function (date) {
        this.DateSelectedSourceMain.next(date);
    };
    BookingSharedService.prototype.setCustomerEmail = function (email) {
        this.CustomerEmailSelectedSourceMain.next(email);
    };
    BookingSharedService.prototype.setCustomerName = function (name) {
        this.CustomerNameSelectedSourceMain.next(name);
    };
    BookingSharedService.prototype.setStaffIndex = function (staffIndex) {
        this.StaffArrayIndex.next(staffIndex);
    };
    BookingSharedService.prototype.setCost = function (cost) {
        this.CostSelectedSourceMain.next(cost);
    };
    BookingSharedService.prototype.setCustomerId = function (customerId) {
        this.CustomerIdSelectedSourceMain.next(customerId);
    };
    BookingSharedService.prototype.setService = function (service) {
        this.selectedBookingSource.next(service);
    };
    BookingSharedService.prototype.setEmail = function (email) {
        this.EmailSelectedSourceMain.next(email);
    };
    return BookingSharedService;
}());
BookingSharedService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], BookingSharedService);
exports.BookingSharedService = BookingSharedService;
//# sourceMappingURL=bookingSharedService.js.map