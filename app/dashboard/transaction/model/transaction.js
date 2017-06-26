"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction = (function () {
    function Transaction(id, date, customer, name, customerId, cost, serviceType) {
        this.id = id;
        this.date = date;
        this.customer = customer;
        this.name = name;
        this.customerId = customerId;
        this.cost = cost;
        this.serviceType = serviceType;
    }
    return Transaction;
}());
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.js.map