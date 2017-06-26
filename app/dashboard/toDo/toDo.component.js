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
var toDo_service_1 = require("./service/toDo.service");
var ToDoComponent = (function () {
    function ToDoComponent(toDoSvc) {
        this.toDoSvc = toDoSvc;
    }
    ToDoComponent.prototype.ngOnInit = function () {
        this.tasks = [];
        this.getUpdatedUser();
        this.getUser();
        // this.getUserIfEmpty();
    };
    // getUserIfEmpty(){
    //     if (this.tasks == [null]) {
    //         this.getUser();
    //     } else {
    //         console.log("already called");
    //     }
    // }
    ToDoComponent.prototype.getUser = function () {
        var _this = this;
        this.tasks = [];
        this.toDoSvc.grabUsersArray()
            .subscribe(function (user) {
            console.log(user);
            _this.tasks.push(user);
            console.log(_this.tasks);
        }, function (err) {
            console.error("unable to add bug -", err);
        });
    };
    ToDoComponent.prototype.getUpdatedUser = function () {
        var _this = this;
        this.toDoSvc.changedListener()
            .subscribe(function (updatedUser) {
            var userIndex = _this.tasks.map(function (index) { return index.id; }).indexOf(updatedUser['id']);
            _this.tasks[userIndex] = updatedUser;
        }, function (err) {
            console.error("Unable to get updated bug - ", err);
        });
    };
    ToDoComponent.prototype.deleteUser = function (task) {
        console.log(task);
        this.toDoSvc.deleteUser(task);
        this.tasks = [];
        this.getUser();
    };
    return ToDoComponent;
}());
ToDoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'toDo-cmp',
        templateUrl: 'toDo.component.html',
        styleUrls: ['toDo.component.css'],
        animations: [
            core_1.trigger('cardupgrade', [
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
    __metadata("design:paramtypes", [toDo_service_1.ToDoService])
], ToDoComponent);
exports.ToDoComponent = ToDoComponent;
//# sourceMappingURL=toDo.component.js.map