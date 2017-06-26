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
var transaction_service_1 = require("../transaction/service/transaction.service");
var TransactionComponent = (function () {
    function TransactionComponent(transactionService) {
        this.transactionService = transactionService;
        this.transactions = [];
    }
    TransactionComponent.prototype.ngOnInit = function () {
        this.getTransaction();
        // this.getUpdatedUser();
    };
    TransactionComponent.prototype.getTransaction = function () {
        var _this = this;
        this.transactions = [];
        this.transactionService.grabTransactionArray()
            .subscribe(function (transaction) {
            console.log(transaction);
            _this.transactions.push(transaction);
            console.log(_this.transactions);
        }, function (err) {
            console.error("unable to add bug -", err);
        });
    };
    return TransactionComponent;
}());
TransactionComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'transaction-cmp',
        templateUrl: 'transaction.component.html',
        styleUrls: ['transaction.component.css']
    }),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionComponent);
exports.TransactionComponent = TransactionComponent;
//# sourceMappingURL=transaction.component.js.map