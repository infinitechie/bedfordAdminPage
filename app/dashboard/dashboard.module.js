"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var roster_service_1 = require("../dashboard/roster/service/roster.service");
var primeng_1 = require("primeng/primeng");
var primeng_2 = require("primeng/primeng");
var primeng_3 = require("primeng/primeng"); //accordion and accordion tab
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var dashboard_routes_1 = require("./dashboard.routes");
// import { CoreModule } from '../core/core.module';
// import { FirebaseConfigService } from '../core/services/firebase-config.service';
// // Services
// import { CustomerService } from '../dashboard/customers/service/customers.service';
//MadeModules
var customers_module_1 = require("../dashboard/customers/customers.module");
var transaction_module_1 = require("../dashboard/transaction/transaction.module");
var stock_module_1 = require("../dashboard/stock/stock.module");
var roster_module_1 = require("../dashboard/roster/roster.module");
var staff_module_1 = require("../dashboard/staff/staff.module");
var portfolio_module_1 = require("../dashboard/portfolio/portfolio.module");
var todo_module_1 = require("../dashboard/toDo/todo.module");
var bookings_module_1 = require("../dashboard/bookings/bookings.module");
var home_module_1 = require("../dashboard/home/home.module");
var services_module_1 = require("../dashboard/services/services.module");
var authentication_module_1 = require("../dashboard/authentication/authentication.module");
var ng2_charts_1 = require("ng2-charts");
var authGuard_1 = require("../authGuard/authGuard");
//Services
var uploadImages_service_1 = require("../dashboard/uploadImages/service/uploadImages.service");
var capitalize_pipe_1 = require("../dashboard/pipes/capitalize.pipe");
var DashboardModule = (function () {
    function DashboardModule() {
    }
    return DashboardModule;
}());
DashboardModule = __decorate([
    core_1.NgModule({
        imports: [authentication_module_1.AuthenticationModule, home_module_1.HomeModule, ng2_charts_1.ChartsModule, primeng_1.ScheduleModule, http_1.HttpModule, common_1.CommonModule, platform_browser_1.BrowserModule, customers_module_1.CustomerModule, bookings_module_1.BookingModule, todo_module_1.ToDoModule, staff_module_1.StaffModule, stock_module_1.StockModule, portfolio_module_1.PortfolioModule, transaction_module_1.TransactionModule, roster_module_1.RosterModule, services_module_1.ServicesModule,
            primeng_1.InputTextModule, primeng_1.DataTableModule, primeng_1.ButtonModule, primeng_1.DialogModule, forms_1.FormsModule, primeng_2.CalendarModule, primeng_3.AccordionModule,
            router_1.RouterModule.forChild(dashboard_routes_1.MODULE_ROUTES)
        ],
        declarations: [dashboard_routes_1.MODULE_COMPONENTS, capitalize_pipe_1.CapitalizePipe],
        providers: [roster_service_1.RosterService, uploadImages_service_1.UploadImageService, authGuard_1.AuthGuard]
    })
], DashboardModule);
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map