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
var RosterService = (function () {
    function RosterService(fire) {
        this.fire = fire;
        this.rosterDatesRef = this.fire.database.ref().child('/rosterDates');
    }
    RosterService.prototype.grabUsersArray = function () {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.rosterDatesRef.on('child_added', function (rosterDate) {
                var dates = rosterDate.val();
                // dates.id = rosterDate.val().key
                var arrayOfDicts = { "title": dates.title, "start": dates.start, "end": dates.end, "id": dates.id, "backgroundColor": dates.backgroundColor };
                obs.next(arrayOfDicts);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    return RosterService;
}());
RosterService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [firebase_config_service_1.FirebaseConfigService])
], RosterService);
exports.RosterService = RosterService;
//# sourceMappingURL=roster.service.js.map