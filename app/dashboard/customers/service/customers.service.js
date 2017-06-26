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
var Observable_1 = require("rxjs/Observable");
var firebase_config_service_1 = require("../../../core/services/firebase-config.service");
var CustomerService = (function () {
    function CustomerService(fire /*, public afAuth: AngularFireAuth*/) {
        // this.user = afAuth.authState;
        this.fire = fire; /*, public afAuth: AngularFireAuth*/
        this.bookingsDbRef = this.fire.database.ref().child('/services');
        this.barbersDBRef = this.fire.database.ref().child('/barbers').child('/barbers');
        this.customersRef = this.fire.database.ref().child('/users');
        this.auth = this.fire._firebaseAuthRef;
    }
    CustomerService.prototype.grabUsersArray = function () {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.customersRef.on('child_added', function (customer) {
                var newCustomer = customer.val();
                newCustomer.id = customer.key;
                obs.next(newCustomer);
                console.log("juice");
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    CustomerService.prototype.changedListener = function () {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.customersRef.on('child_changed', function (upDatedCustomer) {
                var updatedUserDetails = upDatedCustomer.val();
                updatedUserDetails.id = upDatedCustomer.key;
                obs.next(updatedUserDetails);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    CustomerService.prototype.addUser = function (customer) {
        var newBugRef = this.customersRef.push();
        newBugRef.set({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            expenditure: customer.expenditure,
            credit: customer.credit,
            hasApp: customer.hasApp,
            notes: customer.notes,
            bookingsPaid: customer.bookingsPaid,
            phoneNumber: customer.phoneNumber,
            bookingsMissed: customer.bookingsMissed
        })
            .catch(function (err) { return console.error("Unable to add bug to Firebase - ", err); });
    };
    CustomerService.prototype.updateBug = function (user) {
        var currentBugRef = this.customersRef.child(user.id);
        console.log(user.id);
        user.id = null;
        currentBugRef.update(user);
    };
    CustomerService.prototype.getMissedBookings = function (user) {
        // var bookingsRef = this.customersRef.child(user.id).child("bookingsMissed")
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.customersRef.child(user.id).child("bookingsMissed").on('child_added', function (customer) {
                var newBooking = customer.val();
                newBooking.id = customer.key;
                obs.next(newBooking);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    CustomerService.prototype.getMissedBookingsCashOut = function (userId) {
        // var bookingsRef = this.customersRef.child(user.id).child("bookingsMissed")
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.customersRef.child(userId).child("bookingsMissed").on('child_added', function (customer) {
                var newBooking = customer.val();
                newBooking.id = customer.key;
                obs.next(newBooking);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    CustomerService.prototype.getPaidBookings = function (user) {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.customersRef.child(user.id).child("bookingsPaid").on('child_added', function (customer) {
                var newBooking = customer.val();
                newBooking.id = customer.key;
                obs.next(newBooking);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    CustomerService.prototype.getPaidBookingsCashOut = function (userId) {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.customersRef.child(userId).child("bookingsPaid").on('child_added', function (customer) {
                var newBooking = customer.val();
                newBooking.id = customer.key;
                obs.next(newBooking);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    return CustomerService;
}());
CustomerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [firebase_config_service_1.FirebaseConfigService /*, public afAuth: AngularFireAuth*/])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customers.service.js.map