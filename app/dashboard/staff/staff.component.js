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
// import {CalendarComponent} from "node_modules";
var staff_service_1 = require("../staff/service/staff.service");
var stock_service_1 = require("../stock/service/stock.service");
var StaffComponent = (function () {
    function StaffComponent(staffService, stockService) {
        this.staffService = staffService;
        this.stockService = stockService;
        this.staffArray = [];
    }
    StaffComponent.prototype.ngOnInit = function () {
        this.getUser();
        this.getUpdatedUser();
    };
    StaffComponent.prototype.getUser = function () {
        var _this = this;
        this.staffArray = [];
        this.staffService.grabUsersArray()
            .subscribe(function (staff) {
            console.log(staff);
            _this.grabImageUrl(staff);
            _this.staffArray.push(staff);
            console.log(_this.staffArray);
        }, function (err) {
            console.error("unable to add bug -", err);
        });
    };
    StaffComponent.prototype.grabImageUrl = function (currentStock) {
        this.stockService.stockStorageRef.child(currentStock.imageUrl).getDownloadURL().then(function (url) {
            // console.log(url)
            return currentStock.imageStorageRef = url;
        }
        // stock.imageUrl = url
        ).catch(function (error) {
            // Handle any errors
            console.log(error);
        });
        // this.getStock();
        // this.stockService.stockStorageRef.child(stock.imageUrl).getDownloadURL().then(function(url) {
        //         // `url` is the download URL for 'images/stars.jpg'
        //         console.log(url);
        //         this.imageSrc = url;
        //         // // This can be downloaded directly:
        //         // var xhr = new XMLHttpRequest();
        //         // xhr.responseType = 'blob';
        //         // xhr.onload = function(event) {
        //         //     var blob = xhr.response;
        //         // };
        //         // xhr.open('GET', url);
        //         // xhr.send();
        //         // var imgUsed = stock.imageUrl;
        //         // // Or inserted into an <img> element:
        //         // var imgs = document.getElementById('stockImage');
        //         // imgs.id = imgUsed;
        //         }).catch(function(error) {
        //         // Handle any errors
        //         console.log(error);
        //         });
    };
    StaffComponent.prototype.getUpdatedUser = function () {
        var _this = this;
        this.staffService.changedListener()
            .subscribe(function (updatedUser) {
            var userIndex = _this.staffArray.map(function (index) { return index.id; }).indexOf(updatedUser['id']);
            _this.staffArray[userIndex] = updatedUser;
        }, function (err) {
            console.error("Unable to get updated bug - ", err);
        });
    };
    return StaffComponent;
}());
StaffComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'staff-cmp',
        styleUrls: ['staff.component.css'],
        templateUrl: 'staff.component.html',
        animations: [
            core_1.trigger('calendar', [
                core_1.transition('void => *', [
                    core_1.style({ opacity: 0,
                        '-ms-transform': 'translate3D(0px, 150px, 0px)',
                        '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                        '-moz-transform': 'translate3D(0px, 150px, 0px)',
                        '-o-transform': 'translate3D(0px, 150px, 0px)',
                        transform: 'translate3D(0px, 150px, 0px)',
                    }),
                    core_1.animate('0.3s 0s ease-out', core_1.style({ opacity: 1,
                        '-ms-transform': 'translate3D(0px, 0px, 0px)',
                        '-webkit-transform': 'translate3D(0px, px, 0px)',
                        '-moz-transform': 'translate3D(0px, 0px, 0px)',
                        '-o-transform': 'translate3D(0px, 0px, 0px)',
                        transform: 'translate3D(0px, 0px, 0px)',
                    }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [staff_service_1.StaffService, stock_service_1.StockService])
], StaffComponent);
exports.StaffComponent = StaffComponent;
//# sourceMappingURL=staff.component.js.map