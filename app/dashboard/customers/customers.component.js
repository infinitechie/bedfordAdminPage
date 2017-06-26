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
var customers_service_1 = require("../customers/service/customers.service");
var CustomersComponent = (function () {
    function CustomersComponent(customerService) {
        this.customerService = customerService;
        this.users = [];
    }
    CustomersComponent.prototype.ngOnInit = function () {
        this.getUser();
        this.getUpdatedUser();
    };
    CustomersComponent.prototype.getUser = function () {
        var _this = this;
        this.users = [];
        this.customerService.grabUsersArray()
            .subscribe(function (user) {
            console.log(user);
            _this.users.push(user);
            console.log(_this.users);
        }, function (err) {
            console.error("unable to add bug -", err);
        });
    };
    CustomersComponent.prototype.getUpdatedUser = function () {
        var _this = this;
        this.customerService.changedListener()
            .subscribe(function (updatedUser) {
            var userIndex = _this.users.map(function (index) { return index.id; }).indexOf(updatedUser['id']);
            _this.users[userIndex] = updatedUser;
        }, function (err) {
            console.error("Unable to get updated bug - ", err);
        });
    };
    return CustomersComponent;
}());
CustomersComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        styleUrls: ['customers.component.css'],
        selector: 'customers-cmp',
        templateUrl: 'customers.component.html',
        animations: [
            core_1.trigger('cardicons', [
                core_1.state('*', core_1.style({
                    '-ms-transform': 'translate3D(0px, 0px, 0px)',
                    '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                    '-moz-transform': 'translate3D(0px, 0px, 0px)',
                    '-o-transform': 'translate3D(0px, 0px, 0px)',
                    transform: 'translate3D(0px, 0px, 0px)',
                    opacity: 1
                })),
                core_1.transition('void => *', [
                    core_1.style({ opacity: 0,
                        '-ms-transform': 'translate3D(0px, 150px, 0px)',
                        '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                        '-moz-transform': 'translate3D(0px, 150px, 0px)',
                        '-o-transform': 'translate3D(0px, 150px, 0px)',
                        transform: 'translate3D(0px, 150px, 0px)',
                    }),
                    core_1.animate('0.3s 0s ease-out')
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [customers_service_1.CustomerService])
], CustomersComponent);
exports.CustomersComponent = CustomersComponent;
//# sourceMappingURL=customers.component.js.map