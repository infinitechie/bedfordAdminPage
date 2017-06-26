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
// import { AngularFireModule } from 'angularfire2';
//Components
// import { CustomerEditComponent } from '../customers/customerEdit/customerEdit.component';
// import { DeleteUserConfirm } from '../customers/deleteUserConfirm/deleteUserConfirm.component';
// import { StockComponent } from '../stock/stock.component';
// import { Ng2ImgToolsModule  } from 'ng2-img-tools'
// import { Ng2FileInputModule } from 'ng2-file-input';
// import { HomePageComponent } from '../../homePage/homePage.component';
var firebase_config_service_1 = require("../../core/services/firebase-config.service");
// Services
var portfolio_service_1 = require("../portfolio/service/portfolio.service");
// import { Ng2PicaModule } from 'ng2-pica'; // <-- import the module
var PortfolioModule = (function () {
    function PortfolioModule() {
    }
    return PortfolioModule;
}());
PortfolioModule = __decorate([
    core_1.NgModule({
        imports: [core_module_1.CoreModule, common_1.CommonModule, forms_1.FormsModule, forms_2.ReactiveFormsModule],
        declarations: [],
        exports: [],
        providers: [portfolio_service_1.PortfolioService, firebase_config_service_1.FirebaseConfigService]
    })
], PortfolioModule);
exports.PortfolioModule = PortfolioModule;
//# sourceMappingURL=portfolio.module.js.map