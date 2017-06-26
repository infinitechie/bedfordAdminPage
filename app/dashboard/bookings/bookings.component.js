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
var staff_service_1 = require("../staff/service/staff.service");
var bookings_service_1 = require("../bookings/service/bookings.service");
var transaction_1 = require("../transaction/model/transaction");
var bookingSharedService_1 = require("./bookingSharedService");
var BookingsComponent = (function () {
    function BookingsComponent(staffService, bookingSvc, sharedService) {
        this.staffService = staffService;
        this.bookingSvc = bookingSvc;
        this.sharedService = sharedService;
        this.costOfService = 0;
        this.dateDisplayed = "";
        this.staffArray = [];
        this.bookingArray0900 = [];
        this.bookingArray0930 = [];
        this.bookingArray1000 = [];
        this.bookingArray1030 = [];
        this.bookingArray1100 = [];
        this.bookingArray1130 = [];
        this.bookingArray1200 = [];
        this.bookingArray1230 = [];
        this.bookingArray1300 = [];
        this.bookingArray1330 = [];
        this.bookingArray1400 = [];
        this.bookingArray1430 = [];
        this.bookingArray1500 = [];
        this.bookingArray1530 = [];
        this.bookingArray1600 = [];
        this.bookingArray1630 = [];
        this.bookingArray1700 = [];
        this.bookingArray1730 = [];
        this.bookingArray1800 = [];
        this.bookingArray1830 = [];
        this.bookingArray1900 = [];
        this.bookingArray1930 = [];
        this.bookingArray2000 = [];
        this.daySelected = "Today";
    }
    BookingsComponent.prototype.onChange = function (changedDate) {
        var myDate = new Date(changedDate);
        var parsedDate = myDate.toLocaleDateString();
        this.sharedService.setDate(parsedDate);
        this.getUser(parsedDate);
    };
    BookingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getTime();
        this.sharedService.costSelected.subscribe(function (message) { return _this.costSelected = message; });
        this.sharedService.dateSelectedMain.subscribe(function (message) { return _this.dateSelectedToBePassed = message; });
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        var date = year + "-" + month + "-" + day;
        this.sharedService.setDate(date);
        this.dateDisplayed = day + "/" + month + "/" + year;
        this.getUser(date);
        this.getUpdatedUser();
        this.currentDate = date;
        this.meanTimeDate = date;
        console.log(this.currentDate);
        var tommorowsDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var tommorowsDay = tommorowsDate.getDate();
        var tommorowsMonth = tommorowsDate.getMonth() + 1;
        var tommorowsYear = tommorowsDate.getFullYear();
        var tomorowDate = tommorowsDay + "-" + tommorowsMonth + "-" + tommorowsYear;
    };
    BookingsComponent.prototype.tap = function () {
        console.log("jam");
        $('td').map(function () {
            var index = $(this).index();
            console.log(this.staffArray[index - 1]);
            var staffId = this.staffArray[index - 1].email;
            console.log(staffId);
        });
    };
    BookingsComponent.prototype.loggUser = function (booking) {
        if (booking.service != null && booking.id != null) {
            var youth = true;
            var self = this;
            $('td').click(function () {
                var index = $(this).index();
                if (youth) {
                    console.log(self.staffArray[index - 1]);
                    var staffId = self.staffArray[index - 1].email;
                    console.log(staffId);
                    youth = false;
                    self.date = new Date();
                    var usableDate = self.date.toDateString();
                    self.bookingSvc.servicesDbRef.child(booking.service).once('value').then(function (snapshot) {
                        var num = snapshot.val().cost;
                        console.log(num);
                        self.cashOutBooking = new transaction_1.Transaction(655656, usableDate, booking.customer, booking.service, booking.id, num, "Booking");
                        console.log(self.cashOutBooking);
                        console.log("KKKKKKKKKKKKKKKK");
                        console.log(booking.customer);
                        self.sharedService.setCost(num);
                        self.sharedService.setCustomerId(booking.id);
                        self.sharedService.setCustomerName(booking.customer);
                        self.sharedService.setService(booking.service);
                        // self.sharedService.setStaffIndex(staffId);
                        self.sharedService.setEmail(staffId);
                        console.log(self.costSelected);
                    });
                }
                else {
                }
            });
        }
        else {
            console.log("We gots no id");
        }
        console.log(booking);
    };
    BookingsComponent.prototype.getServiceCost = function (service, cost) {
        this.bookingSvc.servicesDbRef.child("Wash & Cut").once('value').then(function (snapshot) {
            var username = snapshot.val().cost;
            console.log(username);
            cost = username;
        });
    };
    BookingsComponent.prototype.getTime = function () {
        var hours = new Date().getHours();
        var minutes = new Date().getMinutes();
        var percentageTime;
        var timeString = "";
        console.log(hours);
        console.log(minutes);
        if (minutes > 30) {
            percentageTime = 5;
            timeString = String(hours) + "." + String(percentageTime);
            console.log(timeString);
        }
        else {
            percentageTime = 0;
            timeString = String(hours);
            console.log(timeString);
        }
        if (timeString == "9") {
            this.nineAm = true;
        }
        else if (timeString == "9.5") {
            this.nine30Am = true;
        }
        else if (timeString == "10") {
            this.tenAm = true;
        }
        else if (timeString == "10.5") {
            this.ten30am = true;
        }
        else if (timeString == "11") {
            this.elevenAm = true;
        }
        else if (timeString == "11.5") {
            this.eleven30am = true;
        }
        else if (timeString == "12") {
            this.twelveAm = true;
        }
        else if (timeString == "12.5") {
            this.twelve30pm = true;
        }
        else if (timeString == "13") {
            this.onePm = true;
        }
        else if (timeString == "13.5") {
            this.one30pm = true;
        }
        else if (timeString == "14") {
            this.twoPm = true;
        }
        else if (timeString == "14.5") {
            this.two30pm = true;
        }
        else if (timeString == "15") {
            this.threePm = true;
        }
        else if (timeString == "15.5") {
            this.three30pm = true;
        }
        else if (timeString == "16") {
            this.fourPm = true;
        }
        else if (timeString == "16.5") {
            this.four30pm = true;
        }
        else if (timeString == "17") {
            this.fivePm = true;
        }
        else {
            console.log("Not between working hours");
        }
    };
    BookingsComponent.prototype.setClass = function (booking) {
        var classes = {
            blue: booking.booked == "booked",
            lightGreen: booking.booked == "paid",
            plain: booking.booked == "notBooked" || booking.booked == null,
            red: booking.booked == "missed"
        };
        return classes;
    };
    BookingsComponent.prototype.getTomorrowBooking = function () {
        if (this.daySelected == "Yesterday") {
            var todaycurrentDate = new Date();
            var tday = todaycurrentDate.getDate();
            var tmonth = todaycurrentDate.getMonth() + 1;
            var tyear = todaycurrentDate.getFullYear();
            var tdate = tyear + "-" + tmonth + "-" + tday;
            this.dateDisplayed = tday + "/" + tmonth + "/" + tyear;
            this.daySelected = "Today";
            this.getUser(tdate);
        }
        else {
            var tommorowsDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
            var tommorowsDay = tommorowsDate.getDate();
            var tommorowsMonth = tommorowsDate.getMonth() + 1;
            var tommorowsYear = tommorowsDate.getFullYear();
            var tomorowDate = tommorowsYear + "-" + tommorowsMonth + "-" + tommorowsDay;
            this.dateDisplayed = tommorowsDay + "/" + tommorowsMonth + "/" + tommorowsYear;
            this.daySelected = "Tomorrow";
            console.log(tomorowDate);
            this.getUser(tomorowDate);
        }
    };
    BookingsComponent.prototype.getYesterdayBooking = function () {
        if (this.daySelected == "Tomorrow") {
            var currentDate = new Date();
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            var date = year + "-" + month + "-" + day;
            this.dateDisplayed = day + "/" + month + "/" + year;
            this.daySelected = "Today";
            this.getUser(date);
        }
        else {
            var yesterdayDate = new Date();
            yesterdayDate.setDate(yesterdayDate.getDate() - 1);
            var ydate = yesterdayDate.getFullYear() + '-' + (yesterdayDate.getMonth() + 1) + '-' + yesterdayDate.getDate();
            this.dateDisplayed = yesterdayDate.getDate() + '/' + (yesterdayDate.getMonth() + 1) + '/' + yesterdayDate.getFullYear();
            this.daySelected = "Yesterday";
            console.log(ydate);
            this.getUser(ydate);
        }
    };
    BookingsComponent.prototype.getUser = function (date) {
        var _this = this;
        this.staffArray = [];
        this.bookingArray0900 = [];
        this.bookingArray0930 = [];
        this.bookingArray1000 = [];
        this.bookingArray1030 = [];
        this.bookingArray1100 = [];
        this.bookingArray1130 = [];
        this.bookingArray1200 = [];
        this.bookingArray1230 = [];
        this.bookingArray1300 = [];
        this.bookingArray1330 = [];
        this.bookingArray1400 = [];
        this.bookingArray1430 = [];
        this.bookingArray1500 = [];
        this.bookingArray1530 = [];
        this.bookingArray1600 = [];
        this.bookingArray1630 = [];
        this.bookingArray1700 = [];
        this.bookingArray1730 = [];
        this.bookingArray1800 = [];
        this.bookingArray1830 = [];
        this.bookingArray1900 = [];
        this.bookingArray1930 = [];
        this.bookingArray2000 = [];
        this.staffService.grabUsersArray()
            .subscribe(function (staff) {
            // console.log(staff);
            _this.staffArray.push(staff);
            _this.getBookingsFromSvc0900(staff, date);
        }, function (err) {
            console.error("unable to add bug -", err);
        });
    };
    BookingsComponent.prototype.getBookingsFromSvc0900 = function (staff, date) {
        var _this = this;
        this.bookingSvc.getBookings(staff, date)
            .subscribe(function (booking) {
            // console.log(booking.time);
            if (booking.time == "9:00am") {
                _this.bookingArray0900.push(booking);
            }
            else if (booking.time == "9:30am") {
                _this.bookingArray0930.push(booking);
            }
            else if (booking.time == "10:00am") {
                _this.bookingArray1000.push(booking);
            }
            else if (booking.time == "10:30am") {
                _this.bookingArray1030.push(booking);
            }
            else if (booking.time == "11:00am") {
                _this.bookingArray1100.push(booking);
            }
            else if (booking.time == "11:30am") {
                _this.bookingArray1130.push(booking);
            }
            else if (booking.time == "12:00pm") {
                _this.bookingArray1200.push(booking);
            }
            else if (booking.time == "12:30pm") {
                _this.bookingArray1230.push(booking);
            }
            else if (booking.time == "12:30pm") {
                _this.bookingArray1230.push(booking);
            }
            else if (booking.time == "13:00pm") {
                _this.bookingArray1300.push(booking);
            }
            else if (booking.time == "13:30pm") {
                _this.bookingArray1330.push(booking);
            }
            else if (booking.time == "14:00pm") {
                _this.bookingArray1400.push(booking);
            }
            else if (booking.time == "14:30pm") {
                _this.bookingArray1430.push(booking);
            }
            else if (booking.time == "15:00pm") {
                _this.bookingArray1500.push(booking);
            }
            else if (booking.time == "15:30pm") {
                _this.bookingArray1530.push(booking);
            }
            else if (booking.time == "16:00pm") {
                _this.bookingArray1600.push(booking);
            }
            else if (booking.time == "16:30pm") {
                _this.bookingArray1630.push(booking);
            }
            else if (booking.time == "17:00pm") {
                _this.bookingArray1700.push(booking);
            }
            else if (booking.time == "17:30pm") {
                _this.bookingArray1730.push(booking);
            }
            else if (booking.time == "18:00pm") {
                _this.bookingArray1800.push(booking);
            }
            else if (booking.time == "18:30pm") {
                _this.bookingArray1830.push(booking);
            }
            else if (booking.time == "19:00pm") {
                _this.bookingArray1900.push(booking);
            }
            else if (booking.time == "19:30pm") {
                _this.bookingArray1930.push(booking);
            }
            else if (booking.time == "20:00pm") {
                _this.bookingArray2000.push(booking);
            }
        });
    };
    BookingsComponent.prototype.getUpdatedUser = function () {
        var _this = this;
        this.staffService.changedListener()
            .subscribe(function (updatedUser) {
            var userIndex = _this.staffArray.map(function (index) { return index.id; }).indexOf(updatedUser['id']);
            _this.staffArray[userIndex] = updatedUser;
        }, function (err) {
            console.error("Unable to get updated bug - ", err);
        });
    };
    BookingsComponent.prototype.getUserNow = function () {
        console.log("fsfffddfdfdf");
    };
    return BookingsComponent;
}());
BookingsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'bookings-cmp',
        templateUrl: 'bookings.component.html',
        styleUrls: ['bookings.component.css'],
        animations: [
            core_1.trigger('cardtable1', [
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
            ]),
            core_1.trigger('cardtable2', [
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
                    core_1.animate('0.3s 0.25s ease-out')
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [staff_service_1.StaffService, bookings_service_1.BookingService, bookingSharedService_1.BookingSharedService])
], BookingsComponent);
exports.BookingsComponent = BookingsComponent;
//# sourceMappingURL=bookings.component.js.map