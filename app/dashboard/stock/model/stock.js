"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stock = (function () {
    function Stock(id, name, quantity, cost, vat, unitsSold, imageUrl, currentStock, dateEntered, dateLastTransaction, productDescription, stockTransactions, imageStorageRef) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.cost = cost;
        this.vat = vat;
        this.unitsSold = unitsSold;
        this.imageUrl = imageUrl;
        this.currentStock = currentStock;
        this.dateEntered = dateEntered;
        this.dateLastTransaction = dateLastTransaction;
        this.productDescription = productDescription;
        this.stockTransactions = stockTransactions;
        this.imageStorageRef = imageStorageRef;
    }
    return Stock;
}());
exports.Stock = Stock;
//# sourceMappingURL=stock.js.map