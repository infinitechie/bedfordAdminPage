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
var forms_1 = require("@angular/forms");
var customers_service_1 = require("../../customers/service/customers.service");
var customers_1 = require("../../customers/model/customers");
var bookings_service_1 = require("../../bookings/service/bookings.service");
var bookingSharedService_1 = require("../bookingSharedService");
var transaction_service_1 = require("../../transaction/service/transaction.service");
var transaction_1 = require("../../transaction/model/transaction");
var BookingCashOutComponent = (function () {
    function BookingCashOutComponent(bookingService, formB, customerService, sharedService, transactionService) {
        this.bookingService = bookingService;
        this.formB = formB;
        this.customerService = customerService;
        this.sharedService = sharedService;
        this.transactionService = transactionService;
        this.Bookings = [];
        this.customerEmail = "";
        this.costOfService = 0;
        // private service = "";
        this.currentUser = new customers_1.Customers(null, null, null, 0, 0, "No", null, [111111], null, [111111]);
        this.countries = [];
        this.filteredCountriesSingle = [];
        this.email = "";
        this.servicesArray = [];
        this.filteredServicesSingle = [];
    }
    BookingCashOutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.customerEmail = "";
        this.getServices();
        this.grabCustomers();
        this.sharedService.customerEmailSelected.subscribe(function (message) { return _this.customerEmail = message; });
        this.sharedService.costSelected.subscribe(function (message) { return _this.costSelected = message; });
        this.sharedService.customerId.subscribe(function (message) { return _this.customerId = message; });
        this.sharedService.emailSelected.subscribe(function (message) { return _this.emailSelected = message; });
        this.sharedService.bookingService.subscribe(function (message) { return _this.serviceSelected = message; });
        this.sharedService.customerName.subscribe(function (message) { return _this.customerName = message; });
        this.sharedService.customerExpenditure.subscribe(function (message) { return _this.expenditure = message; });
        this.sharedService.customerCredit.subscribe(function (message) { return _this.customerCredit = message; });
        this.sharedService.customerNotes.subscribe(function (message) { return _this.customerNotes = message; });
        this.sharedService.transactionPassed.subscribe(function (message) { return _this.transaction = message; });
        this.sharedService.staffUID.subscribe(function (message) { return _this.staffUID = message; });
        this.sharedService.dateSelectedMain.subscribe(function (message) { return _this.dateSelectedToBePassed = message; });
        this.isThereBookings = false;
        this.notBookedForm = this.formB.group({
            country: [this.country],
            customerEmail: [this.customerEmail],
            service: [this.service],
            costOfService: [this.costOfService],
        });
        this.userForm = this.formB.group({
            name: [this.serviceSelected],
            email: [this.emailSelected],
            credit: [this.customerCredit],
            notes: [this.customerNotes],
            phoneNumber: [this.costSelected],
            expenditure: [this.expenditure],
            customerName: [this.customerName]
            // ,
            // bookingTime: [this.bookingTime]
        });
    };
    BookingCashOutComponent.prototype.grabCustomers = function () {
        var _this = this;
        this.customerService.grabUsersArray()
            .subscribe(function (countries) {
            console.log(countries.name);
            _this.countries.push(countries);
            console.log(_this.countries);
        }, function (err) {
            console.error("unable to add bug -", err);
        });
    };
    BookingCashOutComponent.prototype.getServices = function () {
        var _this = this;
        this.bookingService.getServiceCost()
            .subscribe(function (service) {
            console.log(service.name);
            _this.servicesArray.push(service);
            console.log(_this.servicesArray);
        }, function (err) {
            console.error("unable to add bug -", err);
        });
    };
    BookingCashOutComponent.prototype.filteredServiceSingle = function (event) {
        console.log(event);
        var query = event.query;
        this.results = [];
        console.log("DSDSSDSDSDDSSDDSSDSDSDSDDSDSDS");
        console.log(this.servicesArray);
        this.filteredServicesSingle = this.filterService(query, this.servicesArray);
    };
    BookingCashOutComponent.prototype.filterService = function (query, services) {
        console.log(services);
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        var filtered = [];
        for (var i = 0; i < services.length; i++) {
            var country = services[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country.name);
                // console.log(countries[i]);
                this.onChangeService(services[i]);
            }
        }
        return filtered;
    };
    BookingCashOutComponent.prototype.onChangeService = function (event) {
        if (event.cost != null) {
            // this.sharedService.setService(event.name);
            this.sharedService.setCost(event.cost);
            this.notBookedForm.controls['service'].setValue(event.name);
            this.notBookedForm.controls['costOfService'].setValue(event.cost);
        }
        else {
            console.log("WWWWWWWWWWWWWWWWWWWWWW");
            // this.sharedService.setCustomerEmail(null);
        }
    };
    BookingCashOutComponent.prototype.filterCountrySingle = function (event) {
        console.log(event);
        var query = event.query;
        this.results = [];
        this.filteredCountriesSingle = this.filterCountry(query, this.countries);
        // this.onChange(event);
    };
    BookingCashOutComponent.prototype.onChange = function (event) {
        if (event.email != null) {
            this.sharedService.setCustomerEmail(event.email);
            this.notBookedForm.controls['customerEmail'].setValue(event.email);
            //           this.notBookedForm = this.formB.group({
            //             customerEmail: [event.email]
            // });
            // this.onChange(event);
        }
        else {
            // this.sharedService.setCustomerEmail(null);
        }
    };
    BookingCashOutComponent.prototype.filterCountry = function (query, countries) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        var filtered = [];
        for (var i = 0; i < countries.length; i++) {
            var country = countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country.name);
                // console.log(countries[i]);
                this.onChange(countries[i]);
            }
        }
        return filtered;
    };
    BookingCashOutComponent.prototype.handleDropdown = function (event) {
        console.log("IIIIIIIIFIFIFI");
    };
    BookingCashOutComponent.prototype.loggUser = function (booking, staffArray) {
        this.customer = null;
        console.log("booking.id");
        console.log(booking);
        this.timeKeyTapped = booking.key;
        this.bookingTime = booking.time;
        if (booking.service != null && booking.id != null) {
            this.isThereBookings = true;
            this.alreadyBooked = true;
            this.getPaidBookings(booking.id);
            this.getMissedBookings(booking.id);
            this.getUser(booking.id);
            var youth = true;
            var self = this;
            $('td').click(function () {
                var index = $(this).index();
                if (youth) {
                    console.log(staffArray[index - 1]);
                    var staffId = staffArray[index - 1].email;
                    console.log(staffId);
                    youth = false;
                    self.date = new Date();
                    var usableDate = self.date.toDateString();
                    self.bookingService.servicesDbRef.child(booking.service).once('value').then(function (snapshot) {
                        var num = snapshot.val().cost;
                        console.log(num);
                        var transaction = new transaction_1.Transaction(655656, usableDate, booking.customer, booking.service, booking.id, num, "Booking");
                        self.sharedService.setTransaction(transaction);
                        console.log(self.transaction);
                        console.log("KKKKKKKKKKKKKKKK");
                        console.log(booking.customer);
                        self.sharedService.setCost(num);
                        self.sharedService.setCustomerId(booking.id);
                        self.sharedService.setService(booking.service);
                        // self.sharedService.setStaffIndex(staffId);
                        self.sharedService.setEmail(staffId);
                        console.log(self.costSelected);
                        self.userForm = self.formB.group({
                            name: [self.serviceSelected],
                            email: [self.emailSelected],
                            credit: [self.customerCredit],
                            notes: [self.customerNotes],
                            phoneNumber: [self.costSelected],
                            // country: [self.country],
                            // customerEmail: [self.customerEmail],
                            // service: [self.service],
                            expenditure: [self.expenditure],
                            customerName: [self.customerName]
                            // bookingTime: [self.bookingTime]
                            //             All goes in one form (UserForm)
                            //             Cost of booking
                            //             Type of booking
                            //             Time selected*
                            //             Customer for booking
                            // All goes in dropdown box
                            //             Customer's name
                            //             Customer's number + email
                            //             Customer's bookings
                            //             Customer Credit
                            //             Notes
                            //             Expenditure
                            //             Loyalty
                        });
                    });
                }
                else {
                }
            });
        }
        else {
            this.alreadyBooked = false;
            console.log("We gots no id");
            this.date = new Date();
            var usableDate = this.date.toDateString();
            //  var transaction = new Transaction(655656, usableDate, booking.customer, booking.service, booking.id, num, "Booking");
            this.isThereBookings = false;
            var self = this;
            this.notBookedForm = this.formB.group({
                country: [this.country],
                customerEmail: [this.customerEmail],
                service: [this.service],
                costOfService: [this.costOfService],
            });
            $('td').click(function () {
                var index = $(this).index();
                console.log(staffArray[index - 1]);
                var staffId = staffArray[index - 1].email;
                console.log(staffId);
                self.sharedService.setEmail(staffId);
                var staffUID = staffArray[index - 1].id;
                console.log(staffUID);
                self.sharedService.setStaffUID(staffUID);
            });
        }
        console.log(booking);
    };
    BookingCashOutComponent.prototype.cashOut = function () {
        this.date = new Date();
        var usableDate = this.date.toDateString();
        var epochTime = this.date.getTime();
        console.log(this.alreadyBooked);
        if (this.alreadyBooked == true) {
            this.transaction.cost = Number(this.userForm.value["phoneNumber"]);
            this.transaction.customer = this.userForm.value["customerName"];
            this.transaction.customerId = this.userForm.value["email"];
            this.transaction.date = usableDate;
            this.transaction.id = epochTime;
            this.transaction.name = this.userForm.value["name"];
            this.transaction.serviceType = "Booking";
            // console.log(this.transaction);
            this.addUser(this.transaction);
            // this.sharedService.setTransaction()
        }
        else {
            var newTransaction = new transaction_1.Transaction(epochTime, usableDate, this.notBookedForm.value["country"], this.notBookedForm.value["service"], this.notBookedForm.value["customerEmail"], Number(this.notBookedForm.value["costOfService"]), "Booking");
            console.log(this.dateSelectedToBePassed);
            console.log(this.staffUID, this.dateSelectedToBePassed, this.timeKeyTapped, this.notBookedForm.value["country"], this.notBookedForm.value["service"], this.notBookedForm.value["customerEmail"], "booked");
            console.log(this.staffUID, this.dateSelectedToBePassed, this.timeKeyTapped, "Aoife Rhatigan", "Wash & Cut", "qj4un", "booked");
            //HAVE TO CHANGE BOOKING DATA IN DATABASE TO BOOKED
            this.bookingService.updateBooking(this.staffUID, this.dateSelectedToBePassed, this.timeKeyTapped, "Aoife Rhatigan", "Wash & Cut", "qj4un", "booked");
            this.addUser(newTransaction);
        }
        this.customerEmail = "";
        this.userForm = this.formB.group({
            customerName: [""],
            name: [""],
            email: [""],
            credit: [null],
            notes: [""],
            phoneNumber: [""],
            // country: [""],
            // customerEmail: [""],
            // service: [""],
            // costOfService: [null],
            expenditure: [null]
            // ,
            // bookingTime: [""]
        });
        this.bookingTime = "";
        this.Bookings = [];
        this.transaction = null;
        this.notBookedForm = this.formB.group({
            country: [""],
            customerEmail: [""],
            service: [""],
            costOfService: [null],
        });
        this.sharedService.setCost(null);
        this.sharedService.setCustomerId(null);
        this.sharedService.setCustomerName(null);
        // this.sharedService.setDate(null);
        this.sharedService.setEmail(null);
        this.sharedService.setService(null);
        this.sharedService.setStaffIndex(null);
    };
    BookingCashOutComponent.prototype.getUser = function (userId) {
        var self = this;
        this.bookingService.customersDbRef.child(userId).once('value').then(function (snapshot) {
            var username = snapshot.val();
            self.customer = username;
            self.sharedService.setCustomerExpenditure(self.customer.expenditure);
            self.sharedService.setCustomerCredit(self.customer.credit);
            self.sharedService.setCustomerNotes(self.customer.notes);
            self.sharedService.setCustomerName(self.customer.name);
            console.log(username);
        });
        // this.customers = []
        // this.customerService.grabUsersArray()
        //     .subscribe(user => {
        //         console.log(user);
        //         this.customers.push(user);
        //         console.log(this.customers);
        //     },
        //     err => {
        //         console.error("unable to add bug -", err);
        //     });
        // }
    };
    BookingCashOutComponent.prototype.cancelTransaction = function () {
        this.customerEmail = "";
        this.sharedService.setCost(null);
        this.sharedService.setCustomerId(null);
        this.sharedService.setCustomerName(null);
        // this.sharedService.setDate(null);
        this.sharedService.setEmail(null);
        this.sharedService.setService(null);
        this.sharedService.setStaffIndex(null);
        this.userForm = this.formB.group({
            customerName: [""],
            name: [""],
            email: [""],
            credit: [null],
            notes: [""],
            phoneNumber: [""],
            // country: [""],
            // customerEmail: [""],
            // service: [""],
            // costOfService: [null],
            expenditure: [null]
            // ,
            // bookingTime: [""]
        });
        this.bookingTime = "";
        this.Bookings = [];
        this.transaction = null;
        this.notBookedForm = this.formB.group({
            country: [""],
            customerEmail: [""],
            service: [""],
            costOfService: [null],
        });
    };
    BookingCashOutComponent.prototype.addUser = function (transaction) {
        this.transactionService.addUser(transaction);
    };
    BookingCashOutComponent.prototype.getUserNow = function () {
        console.log("fsfffddfdfdf");
    };
    BookingCashOutComponent.prototype.getPaidBookings = function (userId) {
        var _this = this;
        this.customerService.getPaidBookingsCashOut(userId)
            .subscribe(function (user) {
            console.log(user);
            _this.Bookings.push(user);
            console.log(_this.Bookings);
        }, function (err) {
            console.error("unable to add bug -", err);
        });
    };
    BookingCashOutComponent.prototype.getMissedBookings = function (userId) {
        var _this = this;
        this.customerService.getMissedBookingsCashOut(userId)
            .subscribe(function (user) {
            console.log(user);
            _this.Bookings.push(user);
            console.log(_this.Bookings);
        }, function (err) {
            console.error("unable to add bug -", err);
        });
    };
    return BookingCashOutComponent;
}());
BookingCashOutComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        styleUrls: ['bookingCashOut.component.css'],
        selector: 'bookingCashOut',
        templateUrl: 'bookingCashOut.component.html',
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
    __metadata("design:paramtypes", [bookings_service_1.BookingService, forms_1.FormBuilder, customers_service_1.CustomerService, bookingSharedService_1.BookingSharedService, transaction_service_1.TransactionService])
], BookingCashOutComponent);
exports.BookingCashOutComponent = BookingCashOutComponent;
//# sourceMappingURL=bookingCashOut.component.js.map