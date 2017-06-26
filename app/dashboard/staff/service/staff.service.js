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
var StaffService = (function () {
    function StaffService(fire /*, public afAuth: AngularFireAuth*/) {
        // this.user = afAuth.authState;
        this.fire = fire; /*, public afAuth: AngularFireAuth*/
        this.bookingsDbRef = this.fire.database.ref().child('/services');
        this.barbersDBRef = this.fire.database.ref().child('/barbers').child('/barbers');
        this.staffRef = this.fire.database.ref().child('/staff');
        this.auth = this.fire._firebaseAuthRef;
    }
    StaffService.prototype.grabUsersArray = function () {
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
    StaffService.prototype.changedListener = function () {
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
    //   addUser(customer: Staff) {
    //     const newBugRef = this.staffRef.push();
    //     newBugRef.set({
    //             id: customer.id ,
    //             name: customer.name,
    //             email: customer.email,
    //             expenditure:customer.earnings,
    //             credit: customer.credit,
    //             hasApp: customer.hasApp,
    //             notes: customer.notes,
    //             bookingsPaid: customer.bookingsPaid,
    //             phoneNumber: customer.phoneNumber,
    //             bookingsMissed: customer.bookingsMissed
    //     })
    //     .catch(err => console.error("Unable to add bug to Firebase - ", err));
    // }
    StaffService.prototype.updateBug = function (user) {
        var currentBugRef = this.staffRef.child(user.id);
        console.log(user.id);
        user.id = null;
        currentBugRef.update(user);
    };
    // getMissedBookings(user: Staff){
    //     // var bookingsRef = this.customersRef.child(user.id).child("bookingsMissed")
    //      return Observable.create(obs => {
    //                 this.staffRef.child(user.id).child("bookingsMissed").on('child_added', customer => {
    //                         const newBooking= customer.val() as Bookings;
    //                         newBooking.id = customer.key;
    //                             obs.next(newBooking);
    //                 },
    //                 err => {
    //                     obs.throw(err);
    //                 }
    //             );
    //         });
    // }
    StaffService.prototype.getPaidBookings = function (user) {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.staffRef.child(user.id).child("transactions").on('child_added', function (customer) {
                var newBooking = customer.val();
                newBooking.id = Number(customer.key);
                obs.next(newBooking);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    return StaffService;
}());
StaffService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [firebase_config_service_1.FirebaseConfigService /*, public afAuth: AngularFireAuth*/])
], StaffService);
exports.StaffService = StaffService;
//# sourceMappingURL=staff.service.js.map