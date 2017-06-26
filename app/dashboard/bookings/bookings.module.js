"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_module_1 = require("../../core/core.module");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var bookingCashOut_component_1 = require("./bookingCashOut/bookingCashOut.component");
var primeng_1 = require("primeng/primeng");
// import { DatepickerModule } from 'ngx-bootstrap';
// import { AngularFireModule } from 'angularfire2';
//Components
// import { CustomerEditComponent } from '../customers/customerEdit/customerEdit.component';
// import { DeleteUserConfirm } from '../customers/deleteUserConfirm/deleteUserConfirm.component';
// import { HomePageComponent } from '../../homePage/homePage.component';
var firebase_config_service_1 = require("../../core/services/firebase-config.service");
// Services
var bookings_service_1 = require("../bookings/service/bookings.service");
var bookingSharedService_1 = require("./bookingSharedService");
var capitalize_pipe_1 = require("./pipes/capitalize.pipe");
var BookingModule = (function () {
    function BookingModule() {
    }
    return BookingModule;
}());
BookingModule = __decorate([
    core_1.NgModule({
        imports: [core_module_1.CoreModule, common_1.CommonModule, forms_1.FormsModule, forms_2.ReactiveFormsModule, primeng_1.SharedModule, primeng_1.AutoCompleteModule, primeng_1.DropdownModule],
        declarations: [bookingCashOut_component_1.BookingCashOutComponent, capitalize_pipe_1.CapitalizePipes],
        exports: [bookingCashOut_component_1.BookingCashOutComponent, capitalize_pipe_1.CapitalizePipes],
        providers: [bookings_service_1.BookingService, firebase_config_service_1.FirebaseConfigService, bookingSharedService_1.BookingSharedService]
    })
], BookingModule);
exports.BookingModule = BookingModule;
//# sourceMappingURL=bookings.module.js.map