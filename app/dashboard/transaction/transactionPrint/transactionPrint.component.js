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
// import { CustomerService } from '../../customers/service/customers.service';
var transaction_service_1 = require("../../transaction/service/transaction.service");
// import { Customers } from '../../customers/model/customers';
var transaction_1 = require("../../transaction/model/transaction");
var TransactionPrintComponent = (function () {
    function TransactionPrintComponent(formB, transactionService) {
        this.formB = formB;
        this.transactionService = transactionService;
        this.modalId = "bugModal";
        // private statuses = STATUS;
        // private severities = SEVERITY;
        // private statusArr: string[] = [];
        // private severityArr: string[] = [];
        this.date = new Date();
        this.buttonState = "Save";
        this.currentTransaction = new transaction_1.Transaction(this.date.getTime(), this.date.toDateString(), null, null, null, null, null);
        this.transactions = [];
    }
    TransactionPrintComponent.prototype.ngOnInit = function () {
        // this.statusArr = Object.keys(this.statuses).filter(Number);
        // this.severityArr = Object.keys(this.severities).filter(Number);
        this.configureForm();
    };
    TransactionPrintComponent.prototype.configureForm = function (transaction) {
        this.transactions = [];
        //     // this.bugForm = new FormGroup({
        //     //     title: new FormControl(this.currentBug.title, [Validators.required, forbiddenStringValidator(/puppy/i)]),
        //     //     status: new FormControl(this.currentBug.status, Validators.required),
        //     //     severity: new FormControl(this.currentBug.severity, Validators.required),
        //     //     description: new FormControl(this.currentBug.description, Validators.required)
        //     // });
        if (transaction) {
            // this.printButton();
            var j = Number(transaction.date);
            var date = new Date(j).toDateString();
            this.currentTransaction = new transaction_1.Transaction(transaction.id, date, transaction.customer, transaction.name, transaction.customerId, transaction.cost, transaction.serviceType);
            // this.getPaidBookings();
            // this.getMissedBookings();
        }
        else {
            // this.saveButton();
        }
        this.userForm = this.formB.group({
            // id: [this.currentTransaction.id, Validators.required],
            date: [this.currentTransaction.date, forms_1.Validators.required],
            customer: [this.currentTransaction.customer, forms_1.Validators.required],
            name: [this.currentTransaction.name, forms_1.Validators.required],
            customerId: [this.currentTransaction.customerId, forms_1.Validators.required],
            cost: [this.currentTransaction.cost, forms_1.Validators.required],
            serviceType: [this.currentTransaction.serviceType, forms_1.Validators.required],
        });
    };
    TransactionPrintComponent.prototype.submitForm = function () {
        // this.currentBug.title = this.bugForm.value["title"];
        // this.currentBug.status = this.bugForm.value["status"];
        // this.currentBug.severity = this.bugForm.value["severity"];
        // this.currentBug.description = this.bugForm.value["description"];
        this.currentTransaction.name = this.userForm.value["name"];
        this.currentTransaction.customer = this.userForm.value["customer"];
        this.currentTransaction.cost = this.userForm.value["cost"];
        this.currentTransaction.serviceType = this.userForm.value["serviceType"];
        this.currentTransaction.customerId = this.userForm.value["customerId"];
        this.currentTransaction.date = this.date.toDateString();
        this.currentTransaction.id = this.currentTransaction.id;
        this.addUser();
        // if (this.currentTransaction.name) {
        //     this.printButton();
        // } else {
        // }
        this.cleanUserForm();
    };
    TransactionPrintComponent.prototype.addUser = function () {
        this.transactionService.addUser(this.currentTransaction);
    };
    // updateUser() {
    //     this.customerService.updateBug(this.currentUser);
    // }
    TransactionPrintComponent.prototype.freshForm = function () {
        // this.userForm.reset({  });
        this.cleanUserForm();
    };
    TransactionPrintComponent.prototype.cleanUserForm = function () {
        this.currentTransaction = new transaction_1.Transaction(null, this.date.toDateString(), null, null, null, null, null);
    };
    // printButton(){
    //     this.buttonState = "Print";
    // }
    // saveButton(){
    //     this.buttonState = "Save";
    // }
    TransactionPrintComponent.prototype.printMe = function () {
        window.print();
    };
    return TransactionPrintComponent;
}());
TransactionPrintComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'transactionPrint',
        templateUrl: 'transactionPrint.component.html',
        styleUrls: ['transactionPrint.component.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, transaction_service_1.TransactionService])
], TransactionPrintComponent);
exports.TransactionPrintComponent = TransactionPrintComponent;
//# sourceMappingURL=transactionPrint.component.js.map