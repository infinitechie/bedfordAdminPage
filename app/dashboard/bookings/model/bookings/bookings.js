"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bookings = (function () {
    function Bookings(id, customer, time, service, date, cost, type, booked, key) {
        this.id = id;
        this.customer = customer;
        this.time = time;
        this.service = service;
        this.date = date;
        this.cost = cost;
        this.type = type;
        this.booked = booked;
        this.key = key;
    }
    return Bookings;
}());
exports.Bookings = Bookings;
var ServiceCost = (function () {
    function ServiceCost(cost, name, description, deal, barbers) {
        this.cost = cost;
        this.name = name;
        this.description = description;
        this.deal = deal;
        this.barbers = barbers;
    }
    return ServiceCost;
}());
exports.ServiceCost = ServiceCost;
//# sourceMappingURL=bookings.js.map