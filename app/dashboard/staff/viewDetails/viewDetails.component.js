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
var forms_1 = require("@angular/forms");
var staff_service_1 = require("../../staff/service/staff.service");
var transaction_service_1 = require("../../transaction/service/transaction.service");
var staff_1 = require("../../staff/model/staff");
var ViewDetailsComponent = (function () {
    function ViewDetailsComponent(formB, staffService, transactionService) {
        this.formB = formB;
        this.staffService = staffService;
        this.transactionService = transactionService;
        this.modalId = "bugModal";
        this.statusArr = [];
        this.severityArr = [];
        this.totalIncome = [];
        this.currentUser = new staff_1.Staff(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this.BookingsMissed = [];
        this.Bookings = [];
    }
    ViewDetailsComponent.prototype.ngOnInit = function () {
        // this.statusArr = Object.keys(this.statuses).filter(Number);
        // this.severityArr = Object.keys(this.severities).filter(Number);
        this.configureForm();
        this.totalIncomeSum = 0;
    };
    ViewDetailsComponent.prototype.configureForm = function (user) {
        this.Bookings = [];
        if (user) {
            this.currentUser = new staff_1.Staff(user.id, user.name, user.email, user.earnings, user.credit, user.notes, user.phoneNumber, user.imageUrl, user.imageStorageRef, user.unitsSold, user.dates, user.productsSold, user.transactions, user.servicesList);
            this.getTransactions(user);
            this.getPaidBookings();
            // this.getMissedBookings();
        }
        this.userForm = this.formB.group({
            name: [this.currentUser.name, forms_1.Validators.required],
            email: [this.currentUser.email, forms_1.Validators.required],
            credit: [{ value: this.currentUser.credit, disabled: true }, forms_1.Validators.required],
            notes: [this.currentUser.notes, forms_1.Validators.required],
            phoneNumber: [this.currentUser.phoneNumber, forms_1.Validators.required],
        });
    };
    ViewDetailsComponent.prototype.makeCustomerLoyal = function (customer) {
        if (customer.hasApp == "Yes" || customer.hasApp == "No") {
            this.staffService.staffRef.child(customer.id).update({
                hasApp: "Loyal"
            });
        }
        else {
            this.staffService.staffRef.child(customer.id).update({
                hasApp: "Yes"
            });
        }
    };
    ViewDetailsComponent.prototype.deleteUser = function (customer) {
        if (customer.credit > 0) {
            alert("Cannot Delete User with Money in Account");
        }
        else {
            this.staffService.staffRef.child(customer.id).remove();
        }
    };
    ViewDetailsComponent.prototype.submitForm = function () {
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
        }
        else {
            this.addUser();
        }
    };
    ViewDetailsComponent.prototype.addUser = function () {
        // this.staffService.addUser(this.currentUser);
    };
    ViewDetailsComponent.prototype.updateUser = function () {
        this.staffService.updateBug(this.currentUser);
    };
    ViewDetailsComponent.prototype.getTransactions = function (staff) {
        var _this = this;
        this.transactionService.grabTransactionArray()
            .subscribe(function (user) {
            if (staff.email == user.customerId) {
                console.log(user);
                _this.Bookings.push(user);
                _this.hasBookings = true;
                _this.totalIncome.push(user.cost);
                _this.get();
                console.log(_this.Bookings);
            }
            else {
                console.log("WWWWWWW");
            }
        }, function (err) {
            console.error("unable to add bug -", err);
        });
    };
    ViewDetailsComponent.prototype.get = function () {
        this.totalIncomeSum = 0;
        this.totalIncome.forEach(function (value) {
            this.totalIncomeSum += value;
        }, this);
        // console.log(this.totalIncomeSum);
        // this.sharedService.setIncome(this.totalIncomeSum);
        return this.totalIncomeSum;
    };
    ViewDetailsComponent.prototype.freshForm = function () {
        // this.userForm.reset({  });
        this.cleanUserForm();
    };
    ViewDetailsComponent.prototype.cleanUserForm = function () {
        this.currentUser = new staff_1.Staff(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this.totalIncomeSum = 0;
        this.totalIncome = [];
        this.hasBookings = false;
    };
    ViewDetailsComponent.prototype.getPaidBookings = function () {
        var _this = this;
        this.staffService.getPaidBookings(this.currentUser)
            .subscribe(function (user) {
            console.log(user);
            _this.Bookings.push(user);
            console.log(_this.Bookings);
        }, function (err) {
            console.error("unable to add bug -", err);
        });
    };
    return ViewDetailsComponent;
}());
ViewDetailsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'viewDetails',
        templateUrl: 'viewDetails.component.html',
        styleUrls: ['viewDetails.component.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, staff_service_1.StaffService, transaction_service_1.TransactionService])
], ViewDetailsComponent);
exports.ViewDetailsComponent = ViewDetailsComponent;
//# sourceMappingURL=viewDetails.component.js.map