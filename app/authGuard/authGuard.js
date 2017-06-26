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
var router_1 = require("@angular/router");
require("rxjs/Rx");
require("rxjs/add/operator/map");
// Statics
require("rxjs/add/observable/throw");
// Operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
// import 'rxjs/add/operator/map';
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/toPromise");
// import 'rxjs/add/operator/take';
var firebase_config_service_1 = require("../core/services/firebase-config.service");
var sharedSidebarService_1 = require("./service/sharedSidebarService");
var bookings_service_1 = require("../dashboard/bookings/service/bookings.service");
var AuthGuard = (function () {
    function AuthGuard(authService, router, sharedSvc, bookingSvc) {
        this.authService = authService;
        this.router = router;
        this.sharedSvc = sharedSvc;
        this.bookingSvc = bookingSvc;
    }
    // canActivate(){
    //     if(this.authService.getUserLoggedIn()){
    //         this.router.navigateByUrl('authentication')
    //         return false;
    //     } else {
    //         return true;
    //     }
    AuthGuard.prototype.setUserSignedIn = function () {
        this.bookingSvc.staffSignedIn.child("signedIn").set({
            user: true
        });
    };
    AuthGuard.prototype.setUserSignedOut = function () {
        this.bookingSvc.staffSignedIn.child("signedIn").set({
            user: false
        });
    };
    AuthGuard.prototype.getUserLoggedIn = function () {
        this.userLoggedIn = true;
        var val;
        var self = this;
        var callback;
        this.authService.auth.onAuthStateChanged(function (user) {
            if (user) {
                self.userLoggedIn = true;
                console.log("POIUN^TY");
                console.log(self.userLoggedIn);
                //   self.router.navigate(['/dashboard']);
                console.log(user);
            }
            else {
                console.log("No one signed Ihhhhn");
                console.log(self.userLoggedIn);
                self.router.navigate(['/authentication']);
                self.userLoggedIn = false;
                console.log("No one signed In");
            }
        });
        //  this.authService.auth.onAuthStateChanged(address, function(location){
        //   console.log(location); // this is where you get the return value
        // });
        console.log(self.userLoggedIn);
        console.log("Some one signed In");
        return self.userLoggedIn;
    };
    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //     return this.authService.auth.currentUser.map((currentUser) => {
    //         if (!currentUser) {
    //           this.router.navigateByUrl('login');
    //           return false;
    //         }
    //         return true;
    //     }).take(1);
    //      signUserIn(){
    //       this.bookingSvc.staffSignedIn.child("signedIn").once('value').then(function(snapshot) {
    //         this.currentUser = snapshot.val() as boolean;
    //         console.log(currentUser);
    //   });
    //   }
    AuthGuard.prototype.canActivate = function (route, state) {
        // this.authService.getUserLoggedIn();
        // var str = this.authService.getUserLoggedIn();
        // console.log(str);
        console.log("this.getUserLoggedIn())");
        console.log(this.getUserLoggedIn());
        return this.getUserLoggedIn();
        // return true
        // if(this.noReturnedUser()){
        //     console.log("LLLLL")
        //     return true
        // } else if (this.returnedUser()){
        //     return false
        // }
    };
    AuthGuard.prototype.returnedUser = function () {
        var self = this;
        this.authService.auth.onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                self.router.navigate(['/dashboard']);
                return;
            }
        });
        return true;
    };
    AuthGuard.prototype.noReturnedUser = function () {
        var self = this;
        this.authService.auth.onAuthStateChanged(function (user) {
            if (!user) {
                //User is not signed In
                alert("Please Login");
                console.log("KKKDKDKDKDKDDK");
                self.router.navigate(['/authentication']);
                return;
            }
        });
        return true;
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [firebase_config_service_1.FirebaseConfigService, router_1.Router, sharedSidebarService_1.SharedSidebarService, bookings_service_1.BookingService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=authGuard.js.map