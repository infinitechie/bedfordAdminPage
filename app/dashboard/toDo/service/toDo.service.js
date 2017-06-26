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
var ToDoService = (function () {
    function ToDoService(fire) {
        this.fire = fire;
        this.toDoRef = this.fire.database.ref().child('/toDo');
    }
    ToDoService.prototype.grabUsersArray = function () {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.toDoRef.on('child_added', function (customer) {
                var newCustomer = customer.val();
                newCustomer.id = customer.key;
                obs.next(newCustomer);
                console.log("juice");
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    ToDoService.prototype.changedListener = function () {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.toDoRef.on('child_changed', function (upDatedCustomer) {
                var updatedUserDetails = upDatedCustomer.val();
                updatedUserDetails.id = upDatedCustomer.key;
                obs.next(updatedUserDetails);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    ToDoService.prototype.addUser = function (customer) {
        var newBugRef = this.toDoRef.push();
        newBugRef.set({
            id: customer.id,
            name: customer.name,
            completed: customer.completed,
            staffMemberAssigned: customer.staffMemberAssigned,
            dateCompleted: customer.dateCompleted
        })
            .catch(function (err) { return console.error("Unable to add bug to Firebase - ", err); });
    };
    ToDoService.prototype.updateBug = function (user) {
        var currentBugRef = this.toDoRef.child(user.id);
        console.log(user.id);
        user.id = null;
        currentBugRef.update(user);
    };
    ToDoService.prototype.deleteUser = function (task) {
        var deleteTaskRef = this.toDoRef.child(task.id);
        deleteTaskRef.remove();
    };
    return ToDoService;
}());
ToDoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [firebase_config_service_1.FirebaseConfigService])
], ToDoService);
exports.ToDoService = ToDoService;
//# sourceMappingURL=toDo.service.js.map