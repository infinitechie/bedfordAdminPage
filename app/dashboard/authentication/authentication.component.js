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
var router_1 = require("@angular/router");
var staff_service_1 = require("../staff/service/staff.service");
var bookings_service_1 = require("../bookings/service/bookings.service");
var uploadImages_service_1 = require("../uploadImages/service/uploadImages.service");
var sharedSidebarService_1 = require("../../authGuard/service/sharedSidebarService");
var upload_1 = require("../uploadImages/model/upload");
var AuthenticationComponent = (function () {
    function AuthenticationComponent(sharedSvc, route, router, staffService, bookingSvc, formB, uploadSvc) {
        this.sharedSvc = sharedSvc;
        this.route = route;
        this.router = router;
        this.staffService = staffService;
        this.bookingSvc = bookingSvc;
        this.formB = formB;
        this.uploadSvc = uploadSvc;
    }
    AuthenticationComponent.prototype.ngOnInit = function () {
        // this.setUserSignedOut();
        this.signUserIn();
        this.sharedSvc.signUserIn();
        // this.grabCurrentUser();
        console.log(this.staffService.auth.currentUser);
        this.signUpForm = this.formB.group({
            name: [],
            email: [],
            phoneNumber: [],
            password: [],
            companyCode: []
        });
    };
    // grabCurrentUser(){
    //     console.log(this.staffService.auth.currentUser);
    // }
    AuthenticationComponent.prototype.detectFiles = function (event) {
        this.selectedFiles = event.target.files;
    };
    AuthenticationComponent.prototype.signUserIn = function () {
        this.bookingSvc.staffSignedIn.child("signedIn").child("user").once('value').then(function (snapshot) {
            var num = snapshot.val();
            console.log(num);
        });
    };
    AuthenticationComponent.prototype.setUserSignedIn = function () {
        this.bookingSvc.staffSignedIn.child("signedIn").set({
            user: true
        });
    };
    AuthenticationComponent.prototype.setUserSignedOut = function () {
        this.bookingSvc.staffSignedIn.child("signedIn").set({
            user: false
        });
    };
    AuthenticationComponent.prototype.uploadSingle = function (currentImage) {
        var file = this.selectedFiles.item(0);
        // this.resizeImage(file, 200, 200);
        this.currentUpload = new upload_1.Upload(file);
        this.uploadSvc.uploadPortfolio(this.currentUpload, "portfolio");
        // window.location.reload();
    };
    AuthenticationComponent.prototype.registerButton = function () {
        var self = this;
        this.returnUrl = this.route.snapshot.queryParams['dashboard'] || '';
        this.staffService.auth.createUserWithEmailAndPassword(this.signUpForm.value["email"], this.signUpForm.value["password"])
            .then(function (firebaseUser) {
            // Success 
            // self._sharedService.setEmail(email);
            // alert("successfully signed up ");
            // self._sharedService.passData("stripe");
            console.log("JJJJJJJJJJJ");
            self.staffService.auth.signInWithEmailAndPassword(self.signUpForm.value["email"], self.signUpForm.value["password"]);
            console.log(self.staffService.auth.currentUser);
            self.setUserSignedIn();
            self.sharedSvc.setUserLoggedIn("loggedIn");
            self.router.navigate(['/dashboard']);
            // self.sharedSvc.setCurrentUser(true);
            // self.writeUserData(Math.random().toString(36).slice(2),email);
            // self.openCheckout();
        })
            .catch(function (error) {
            // Error Handling
            var errorMessage1 = error.message;
            alert(errorMessage1);
        });
    };
    return AuthenticationComponent;
}());
AuthenticationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'authentication-cmp',
        templateUrl: 'authentication.component.html',
        styleUrls: ['authentication.component.css'],
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
    __metadata("design:paramtypes", [sharedSidebarService_1.SharedSidebarService, router_1.ActivatedRoute, router_1.Router, staff_service_1.StaffService, bookings_service_1.BookingService, forms_1.FormBuilder, uploadImages_service_1.UploadImageService])
], AuthenticationComponent);
exports.AuthenticationComponent = AuthenticationComponent;
//# sourceMappingURL=authentication.component.js.map