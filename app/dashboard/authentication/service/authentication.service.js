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
var AuthenticationService = (function () {
    function AuthenticationService(fire /*, public afAuth: AngularFireAuth*/) {
        // this.user = afAuth.authState;
        this.fire = fire; /*, public afAuth: AngularFireAuth*/
        this.servicesDbRef = this.fire.database.ref().child('/services');
        this.customersDbRef = this.fire.database.ref().child('/users');
        this.barbersDBRef = this.fire.database.ref().child('/barbers').child('/barbers');
        this.staffRef = this.fire.database.ref().child('/staff');
        this.auth = this.fire._firebaseAuthRef;
        this.staffSignedIn = this.fire.database.ref();
    }
    AuthenticationService.prototype.grabUsersArray = function () {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.staffRef.on('child_added', function (staff) {
                var newStaff = staff.val();
                newStaff.id = staff.key;
                obs.next(newStaff);
                console.log("juice");
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    AuthenticationService.prototype.changedListener = function () {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.staffRef.on('child_changed', function (upDatedStaff) {
                var updatedStaffDetails = upDatedStaff.val();
                updatedStaffDetails.id = upDatedStaff.key;
                obs.next(updatedStaffDetails);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    //   addBooking(customer: Staff) {
    //     const newBugRef = this.staffRef.push();
    //     newBugRef.set({
    //     })
    //     .catch(err => console.error("Unable to add bug to Firebase - ", err));
    // }
    AuthenticationService.prototype.updateBooking = function (staffMember, date, time, customerName, serviceSelected, customerEmail, paid) {
        var bookingRef = this.staffRef.child(staffMember).child("dates").child(date).child("times").child(time);
        // console.log(user.id);
        // user.id = null;
        bookingRef.set({
            booked: paid,
            customer: customerName,
            service: serviceSelected,
            id: customerEmail,
            time: "10:30am"
        });
    };
    AuthenticationService.prototype.getServiceCost = function () {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.servicesDbRef.on('child_added', function (serviceCost) {
                var newService = serviceCost.val();
                newService.name = serviceCost.key;
                obs.next(newService);
                // console.log(newService);
            });
        });
    };
    AuthenticationService.prototype.getBookings = function (user, date) {
        // var bookingsRef = this.customersRef.child(user.id).child("bookingsMissed")
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.staffRef.child(user.id).child("dates").child(date).child("times").on('child_added', function (customer) {
                var newBooking = customer.val();
                newBooking.key = customer.key;
                obs.next(newBooking);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [firebase_config_service_1.FirebaseConfigService /*, public afAuth: AngularFireAuth*/])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map