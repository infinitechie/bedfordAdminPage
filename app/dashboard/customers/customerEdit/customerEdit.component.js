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
var customers_service_1 = require("../../customers/service/customers.service");
var transaction_service_1 = require("../../transaction/service/transaction.service");
var customers_1 = require("../../customers/model/customers");
var CustomerEditComponent = (function () {
    function CustomerEditComponent(formB, customerService, transactionSvc) {
        this.formB = formB;
        this.customerService = customerService;
        this.transactionSvc = transactionSvc;
        this.modalId = "bugModal";
        // private statuses = STATUS;
        // private severities = SEVERITY;
        this.statusArr = [];
        this.severityArr = [];
        this.currentUser = new customers_1.Customers(null, null, null, 0, 0, "No", null, [null], null, [null]);
        this.BookingsMissed = [];
        this.Bookings = [];
        // getPaidBookings(){
        //     this.customerService.getPaidBookings(this.currentUser)
        //      .subscribe(user => {
        //          this.hasbookings = true;
        //         console.log(user);
        //         this.Bookings.push(user);
        //         console.log(this.Bookings);
        //     },
        //     err => {
        //         console.error("unable to add bug -", err);
        //     });
        // }
        this.transactions = [];
    }
    CustomerEditComponent.prototype.ngOnInit = function () {
        // this.statusArr = Object.keys(this.statuses).filter(Number);
        // this.severityArr = Object.keys(this.severities).filter(Number);
        this.configureForm();
        this.hasbookings = false;
    };
    CustomerEditComponent.prototype.configureForm = function (user) {
        this.Bookings = [];
        if (user) {
            this.currentUser = new customers_1.Customers(user.id, user.name, user.email, user.expenditure, user.credit, user.hasApp, user.notes, user.bookingsPaid, user.phoneNumber, user.bookingsMissed);
            this.getPaidBookings(user);
            this.getMissedBookings();
        }
        this.userForm = this.formB.group({
            name: [this.currentUser.name, forms_1.Validators.required],
            email: [this.currentUser.email, forms_1.Validators.required],
            credit: [{ value: this.currentUser.credit, disabled: true }, forms_1.Validators.required],
            notes: [this.currentUser.notes, forms_1.Validators.required],
            phoneNumber: [this.currentUser.phoneNumber, forms_1.Validators.required],
        });
    };
    CustomerEditComponent.prototype.makeCustomerLoyal = function (customer) {
        if (customer.hasApp == "Yes" || customer.hasApp == "No") {
            this.customerService.customersRef.child(customer.id).update({
                hasApp: "Loyal"
            });
        }
        else {
            this.customerService.customersRef.child(customer.id).update({
                hasApp: "Yes"
            });
        }
    };
    CustomerEditComponent.prototype.deleteUser = function (customer) {
        if (customer.credit > 0) {
            alert("Cannot Delete User with Money in Account");
        }
        else {
            this.customerService.customersRef.child(customer.id).remove();
        }
    };
    CustomerEditComponent.prototype.submitForm = function () {
        this.currentUser.name = this.userForm.value["name"];
        this.currentUser.email = this.userForm.value["email"];
        this.currentUser.notes = this.userForm.value["notes"];
        this.currentUser.phoneNumber = this.userForm.value["phoneNumber"];
        // this.currentUser.hasApp = "No"
        // this.currentUser.expenditure = 0
        // this.currentUser
        if (this.currentUser.id) {
            this.updateUser();
            this.currentUser.credit = this.userForm.value["credit"];
        }
        else {
            this.addUser();
            this.currentUser.credit = this.userForm.value[0];
        }
    };
    CustomerEditComponent.prototype.addUser = function () {
        this.customerService.addUser(this.currentUser);
    };
    CustomerEditComponent.prototype.updateUser = function () {
        this.customerService.updateBug(this.currentUser);
    };
    CustomerEditComponent.prototype.freshForm = function () {
        // this.userForm.reset({  });
        this.cleanUserForm();
    };
    CustomerEditComponent.prototype.cleanUserForm = function () {
        this.currentUser = new customers_1.Customers(null, null, null, 0, 0, "N/A", "No notes", null, null, null);
        this.hasbookings = false;
    };
    CustomerEditComponent.prototype.getPaidBookings = function (booking) {
        var _this = this;
        this.transactionSvc.grabTransactionArray()
            .subscribe(function (transaction) {
            // console.log(transaction);
            // this.transactions.push(transaction);
            // console.log(this.transactions);
            if (booking.name == transaction.customer) {
                transaction.type = "Paid";
                console.log(transaction);
                _this.Bookings.push(transaction);
                // this.hasBookings = true;
                _this.hasbookings = true;
                // this.totalIncome.push(user.cost);
                // this.get();
                console.log(_this.transactions);
            }
            else {
                // console.log("WWWWWWW");
                // console.log(transaction);
            }
        }, function (err) {
            console.error("unable to add bug -", err);
        });
    };
    CustomerEditComponent.prototype.getMissedBookings = function () {
        var _this = this;
        this.customerService.getMissedBookings(this.currentUser)
            .subscribe(function (user) {
            console.log(user);
            _this.Bookings.push(user);
            console.log(_this.Bookings);
        }, function (err) {
            console.error("unable to add bug -", err);
        });
    };
    return CustomerEditComponent;
}());
CustomerEditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'customerEdit',
        templateUrl: 'customerEdit.component.html',
        styleUrls: ['customerEdit.component.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, customers_service_1.CustomerService, transaction_service_1.TransactionService])
], CustomerEditComponent);
exports.CustomerEditComponent = CustomerEditComponent;
//# sourceMappingURL=customerEdit.component.js.map