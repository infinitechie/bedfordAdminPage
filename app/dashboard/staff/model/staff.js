"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Staff = (function () {
    function Staff(id, name, email, earnings, credit, notes, phoneNumber, imageUrl, imageStorageRef, unitsSold, dates, productsSold, transactions, //Epoch date number of when ordered
        servicesList, bookingsMissed, highlighted) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.earnings = earnings;
        this.credit = credit;
        this.notes = notes;
        this.phoneNumber = phoneNumber;
        this.imageUrl = imageUrl;
        this.imageStorageRef = imageStorageRef;
        this.unitsSold = unitsSold;
        this.dates = dates;
        this.productsSold = productsSold;
        this.transactions = transactions;
        this.servicesList = servicesList;
        this.bookingsMissed = bookingsMissed;
        this.highlighted = highlighted;
    }
    return Staff;
}());
exports.Staff = Staff;
//# sourceMappingURL=staff.js.map