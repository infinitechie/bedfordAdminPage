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
var common_1 = require("@angular/common");
var sharedSidebarService_1 = require("./authGuard/service/sharedSidebarService");
var authentication_service_1 = require("./dashboard/authentication/service/authentication.service");
var AppComponent = (function () {
    function AppComponent(location, sidebarSvc, authService) {
        this.sidebarSvc = sidebarSvc;
        this.authService = authService;
        this.location = location;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        $.getScript('../assets/js/light-bootstrap-dashboard.js');
        this.sidebarSvc.signedIn.subscribe(function (message) { return _this.signedIn = message; });
        // var d = new Date();
        // d.getHours();
        // console.log(d.getHours()* 100);
    };
    AppComponent.prototype.isMaps = function (path) {
        var title = this.location.prepareExternalUrl(this.location.path());
        title = title.slice(1);
        if (path === title) {
            return true;
        }
        else {
            return false;
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/app.component.html'
    }),
    __metadata("design:paramtypes", [common_1.Location, sharedSidebarService_1.SharedSidebarService, authentication_service_1.AuthenticationService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map