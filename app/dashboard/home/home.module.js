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
// import {AutoCompleteModule, SharedModule} from 'primeng/primeng';
// import { DatepickerModule } from 'ngx-bootstrap';
// import { AngularFireModule } from 'angularfire2';
//Components
// import { CustomerEditComponent } from '../customers/customerEdit/customerEdit.component';
// import { DeleteUserConfirm } from '../customers/deleteUserConfirm/deleteUserConfirm.component';
// import { HomePageComponent } from '../../homePage/homePage.component';
var firebase_config_service_1 = require("../../core/services/firebase-config.service");
// Services
var home_service_1 = require("../home/service/home.service");
var home_sharedService_1 = require("./home.sharedService");
// import {CapitalizePipes} from "./pipes/capitalize.pipe";
var HomeModule = (function () {
    function HomeModule() {
    }
    return HomeModule;
}());
HomeModule = __decorate([
    core_1.NgModule({
        imports: [core_module_1.CoreModule, common_1.CommonModule, forms_1.FormsModule, forms_2.ReactiveFormsModule],
        declarations: [],
        exports: [],
        providers: [firebase_config_service_1.FirebaseConfigService, home_service_1.HomeService, home_sharedService_1.HomeSharedService]
    })
], HomeModule);
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map