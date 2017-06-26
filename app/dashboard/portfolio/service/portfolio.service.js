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
var PortfolioService = (function () {
    function PortfolioService(fire) {
        this.fire = fire;
        this.portfolioRef = this.fire.database.ref().child("portfolio");
        this.stockStorageRef = this.fire.storage.ref();
    }
    PortfolioService.prototype.grabStockArray = function () {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.portfolioRef.on('child_added', function (transaction) {
                var newTransaction = transaction.val();
                newTransaction.id = transaction.key;
                obs.next(newTransaction);
                console.log("juice");
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    PortfolioService.prototype.changedListener = function () {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.portfolioRef.on('child_changed', function (upDatedCustomer) {
                var updatedUserDetails = upDatedCustomer.val();
                updatedUserDetails.id = upDatedCustomer.key;
                obs.next(updatedUserDetails);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    return PortfolioService;
}());
PortfolioService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [firebase_config_service_1.FirebaseConfigService])
], PortfolioService);
exports.PortfolioService = PortfolioService;
//# sourceMappingURL=portfolio.service.js.map