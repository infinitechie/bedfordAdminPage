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
// import { RosterService } from './service/roster.service';
// import { RosterDates } from './model/rosterDates';
var forms_1 = require("@angular/forms");
var services_service_1 = require("./service/services.service");
var bookings_1 = require("../bookings/model/bookings/bookings");
var staff_service_1 = require("../staff/service/staff.service");
var ServicesComponent = (function () {
    function ServicesComponent(formB, addService, StaffService) {
        this.formB = formB;
        this.addService = addService;
        this.StaffService = StaffService;
        this.serviceArray = [];
        this.staffArray = [];
        this.staffSelected = [];
        this.staffIds = [];
        this.currentService = new bookings_1.ServiceCost(null, null, null, null);
        this.service = "nope";
        this.deals = "nope";
        this.dict = [];
        this.staffNames = [];
    }
    ServicesComponent.prototype.ngOnInit = function () {
        this.allSelected = false;
        this.service = "unClicked";
        this.deals = "unClicked";
        // this.dddstaffIds
        // this.cities = [];
        // this.cities.push({label:'New York', value:'New York'});
        // this.cities.push({label:'Rome', value:'Rome'});
        // this.cities.push({label:'London', value:'London'});
        // this.cities.push({label:'Istanbul', value:'Istanbul'});
        // this.cities.push({label:'Paris', value:'Paris'});
        this.getStaff();
        this.getServices();
        this.servicesForm = this.formB.group({
            addService: ["Hair Chop"],
            addDeal: ["One day Deal"],
            addServiceDescription: ["Description for Service"],
            addDealDescription: ["Description"],
            serviceCost: ["€12"],
            dealCost: ["€14"]
            // ,
            // bookingTime: [this.bookingTime]
        });
    };
    ServicesComponent.prototype.cancelButton = function () {
        this.service = "unClicked";
        this.deals = "unClicked";
    };
    ServicesComponent.prototype.setDealsClicked = function () {
        this.deals = "yes";
        this.service = "clicked";
    };
    ServicesComponent.prototype.setServiceClicked = function () {
        this.service = "yes";
        this.deals = "clicked";
    };
    ServicesComponent.prototype.selectedAllUsers = function () {
        if (this.allSelected == true) {
            this.allSelected = false;
            this.staffSelected = [];
        }
        else {
            this.allSelected = true;
            this.staffSelected = this.staffArray;
            console.log(this.staffSelected);
        }
    };
    ServicesComponent.prototype.addToArray = function (staff) {
        this.selectedTrue = true;
        if (staff) {
            var tapped = +1;
            this.staffIds.push(staff.id);
            this.dict.push(staff.id);
            // var dict = []; // create an empty array
            this.staffSelected.indexOf(staff) === -1 ? this.staffSelected.push(staff) && this.changeToHighlighted(staff) : console.log("This item already exists") && this.changeToHighlighted(staff);
            console.log(this.dict);
        }
        else {
            console.log("staff not entered");
        }
    };
    ServicesComponent.prototype.changeToHighlighted = function (staff) {
        if (staff) {
            if (staff.highlighted == true) {
                staff.highlighted = false;
            }
            else if (staff.highlighted == false) {
                staff.highlighted = true;
            }
            else {
                console.log("staff is null");
            }
        }
        else {
        }
    };
    ServicesComponent.prototype.setStaff = function (service) {
        console.log(this.staffSelected);
        var self = this;
        this.addService.servicesDbRef.child(service.name).update({
            name: service.name,
            cost: service.cost,
            description: service.description,
            barbers: this.dict,
            deal: service.deal
        })
            .catch(function (err) { return console.error("Unable to add Transaction to Firebase - ", err); });
    };
    ServicesComponent.prototype.getStaff = function () {
        var _this = this;
        this.addService.grabUsersArray()
            .subscribe(function (staff) {
            // console.log(staff);
            staff.highlighted = false;
            _this.staffNames.push(staff.name);
            _this.staffArray.push(staff);
            console.log(_this.staffNames);
        }, function (err) {
            console.error("unable to add bug -", err);
        });
    };
    ServicesComponent.prototype.submit = function () {
        if (this.service == "yes") {
            this.currentService.name = this.servicesForm.value["addService"];
            this.currentService.description = this.servicesForm.value["addServiceDescription"];
            this.currentService.cost = Number(this.servicesForm.value["serviceCost"]);
            this.currentService.barbers = this.staffIds;
            this.setStaff(this.currentService);
        }
        else if (this.deals == "yes") {
            this.currentService.name = this.servicesForm.value["addDeal"];
            this.currentService.description = this.servicesForm.value["addDealDescription"];
            this.currentService.cost = Number(this.servicesForm.value["dealCost"]);
            this.currentService.deal = "Yes";
            this.currentService.barbers = this.staffIds;
            this.setStaff(this.currentService);
        }
        else {
            console.log("somethings wrong");
        }
    };
    // setBarbersNames(array: string[]){
    //     // console.log(array);
    //     console.log("SSDDSSDSDSDSDDS")
    //     var self = this;
    //     for (var a of array) {
    //         this.StaffService.staffRef.child(a).once('value').then(function(snapshot) {
    //     var num = snapshot.val().name as string;
    //     // console.log(num);
    //     self.arr.push(num);
    //     console.log(self.arr)
    // });
    //     }
    //     // console.log(this.arr);
    //     // return this.arr
    // }
    ServicesComponent.prototype.getServices = function () {
        var self = this;
        this.addService.getServiceCost()
            .subscribe(function (service) {
            // self.arr = [];
            // console.log(service);
            // console.log(service.barbers);
            // self.setBarbersNames(service.barbers);
            console.log("DDDDDDDD");
            // service.barbers = self.arr;
            // console.log(service.barbers);
            // console.log(service.barbers);
            self.serviceArray.push(service);
            // service.barbers = [];
        }, function (err) {
            console.error("unable to add bug -", err);
        });
    };
    return ServicesComponent;
}());
ServicesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'services-cmp',
        templateUrl: 'services.component.html',
        styleUrls: ['services.component.css'],
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
    __metadata("design:paramtypes", [forms_1.FormBuilder, services_service_1.AddServiceService, staff_service_1.StaffService])
], ServicesComponent);
exports.ServicesComponent = ServicesComponent;
//# sourceMappingURL=services.component.js.map