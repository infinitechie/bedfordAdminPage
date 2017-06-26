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
var roster_service_1 = require("./service/roster.service");
var rosterDates_1 = require("./model/rosterDates");
var RosterComponent = (function () {
    function RosterComponent(rosterService, cd) {
        this.rosterService = rosterService;
        this.cd = cd;
        this.events = [];
        this.dialogVisible = false;
        this.idGen = 100;
        this.date = new Date().toDateString();
    }
    RosterComponent.prototype.ngOnInit = function () {
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        document.getElementById('title');
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        this.date = year + "-" + month + "-" + day;
        console.log(this.date);
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
        this.getUser();
        // this.getUser();
        // {
        //     "title": "All Day Event",
        //     "start": "2017-22-05"
        // },
        // {
        //     "title": "Paul Mercer",
        //     "start": "2017-05-24",
        //     "end": "2017-05-27"
        // },
        // {
        //     "title": "Repeating Event",
        //     "start": "2017-05-09T16:00:00"
        // },
        // {
        //     "title": "Repeating Event",
        //     "start": "2017-05-16T16:00:00"
        // },
        // {
        //     "title": "Conference",
        //     "start": "2017-05-11",
        //     "end": "2017-05-13"
        // }
    };
    RosterComponent.prototype.getUser = function () {
        var _this = this;
        // this.events = null
        this.rosterService.grabUsersArray()
            .subscribe(function (rosterDate) {
            console.log(rosterDate);
            _this.events.push(rosterDate);
        }, function (err) {
            console.error("unable to add bug -", err);
        });
    };
    RosterComponent.prototype.handleDayClick = function (event) {
        this.event = new rosterDates_1.RosterDates();
        this.event.start = event.date.format();
        // console.log(this.event.start);
        this.dialogVisible = true;
        //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
        this.cd.detectChanges();
    };
    RosterComponent.prototype.handleEventClick = function (e) {
        this.event = new rosterDates_1.RosterDates();
        this.event.title = e.calEvent.title;
        var start = e.calEvent.start;
        var end = e.calEvent.end;
        if (e.view.name === 'month') {
            start.stripTime();
        }
        if (end) {
            end.stripTime();
            this.event.end = end.format();
        }
        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
        console.log(this.event);
        // console.log(this.event.start);
        // console.log(this.event.allDay);
        // console.log(this.event.title);
        // console.log(end._i);
    };
    RosterComponent.prototype.saveEvent = function () {
        //update
        if (this.event.id) {
            var index = this.findEventIndexById(this.event.id);
            console.log(this.event.id);
            //  this.rosterService.rosterDatesRef.child(this.event.id).update({
            //     title: this.event.title,
            //     start: this.event.start, 
            //     end: this.event.end,
            //     id: randomUid
            // })
            if (index >= 0) {
                this.events[index] = this.event;
            }
        }
        else {
            this.event.id = this.idGen++;
            // this.events.push(this.event);
            var self = this;
            var randomUid = Math.random().toString(36).substring(7);
            var randomColor = Math.floor(Math.random() * 16777215).toString(16);
            this.rosterService.rosterDatesRef.child(randomUid).update({
                title: this.event.title,
                start: this.event.start,
                end: this.event.end,
                id: randomUid,
                backgroundColor: "#" + randomColor
            });
            console.log(this.event);
            this.event = null;
        }
        this.dialogVisible = false;
    };
    RosterComponent.prototype.deleteEvent = function () {
        var index = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.events.splice(index, 1);
            this.rosterService.rosterDatesRef.child(this.event.id).remove();
        }
        this.dialogVisible = false;
    };
    RosterComponent.prototype.findEventIndexById = function (id) {
        var index = -1;
        for (var i = 0; i < this.events.length; i++) {
            if (id == this.events[i].id) {
                index = i;
                break;
            }
        }
        return index;
    };
    return RosterComponent;
}());
RosterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'roster-cmp',
        templateUrl: 'roster.component.html',
        styleUrls: ['roster.component.css'],
        animations: [
            core_1.trigger('cardnotifications', [
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
    __metadata("design:paramtypes", [roster_service_1.RosterService, core_1.ChangeDetectorRef])
], RosterComponent);
exports.RosterComponent = RosterComponent;
//# sourceMappingURL=roster.component.js.map