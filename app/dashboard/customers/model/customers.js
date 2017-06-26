"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Customers = (function () {
    function Customers(id, name, email, expenditure, credit, hasApp, notes, bookingsPaid, //Epoch date number of when ordered
        phoneNumber, bookingsMissed) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.expenditure = expenditure;
        this.credit = credit;
        this.hasApp = hasApp;
        this.notes = notes;
        this.bookingsPaid = bookingsPaid;
        this.phoneNumber = phoneNumber;
        this.bookingsMissed = bookingsMissed;
    }
    return Customers;
}());
exports.Customers = Customers;
//# sourceMappingURL=customers.js.map