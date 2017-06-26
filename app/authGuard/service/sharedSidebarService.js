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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var authentication_service_1 = require("../../dashboard/authentication/service/authentication.service");
var SharedSidebarService = (function () {
    function SharedSidebarService(AuthenticationService) {
        this.AuthenticationService = AuthenticationService;
        this.UserSignedInMain = new BehaviorSubject_1.BehaviorSubject('notLoggedIn');
        this.signedIn = this.UserSignedInMain.asObservable();
        this.currentUser = new BehaviorSubject_1.BehaviorSubject(false);
        this.isThereACurrentUser = this.currentUser.asObservable();
    }
    SharedSidebarService.prototype.setUserLoggedIn = function (UID) {
        this.UserSignedInMain.next(UID);
    };
    SharedSidebarService.prototype.signUserIn = function () {
        var self = this;
        this.AuthenticationService.staffSignedIn.child("signedIn").child("user").once('value').then(function (snapshot) {
            var num = snapshot.val();
            console.log(num);
            self.setCurrentUser(true);
        });
    };
    SharedSidebarService.prototype.setCurrentUser = function (user) {
        this.currentUser.next(user);
    };
    return SharedSidebarService;
}());
SharedSidebarService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
], SharedSidebarService);
exports.SharedSidebarService = SharedSidebarService;
//# sourceMappingURL=sharedSidebarService.js.map