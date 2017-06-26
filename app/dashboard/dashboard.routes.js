"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_component_1 = require("./home/home.component");
var marketing_component_1 = require("./marketing/marketing.component");
var customers_component_1 = require("./customers/customers.component");
var bookings_component_1 = require("./bookings/bookings.component");
var roster_component_1 = require("./roster/roster.component");
var stock_component_1 = require("./stock/stock.component");
var portfolio_component_1 = require("./portfolio/portfolio.component");
var toDo_component_1 = require("./toDo/toDo.component");
var staff_component_1 = require("./staff/staff.component");
var transaction_component_1 = require("./transaction/transaction.component");
var services_component_1 = require("./services/services.component");
var authentication_component_1 = require("./authentication/authentication.component");
var authGuard_1 = require("../authGuard/authGuard");
exports.MODULE_ROUTES = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [authGuard_1.AuthGuard] },
    { path: 'dashboard', component: home_component_1.HomeComponent, canActivate: [authGuard_1.AuthGuard] },
    { path: 'marketing', component: marketing_component_1.MarketingComponent, canActivate: [authGuard_1.AuthGuard] },
    { path: 'bookings', component: bookings_component_1.BookingsComponent, canActivate: [authGuard_1.AuthGuard] },
    { path: 'customers', component: customers_component_1.CustomersComponent, canActivate: [authGuard_1.AuthGuard] },
    { path: 'roster', component: roster_component_1.RosterComponent, canActivate: [authGuard_1.AuthGuard] },
    { path: 'stock', component: stock_component_1.StockComponent, canActivate: [authGuard_1.AuthGuard] },
    { path: 'portfolio', component: portfolio_component_1.PortfolioComponent, canActivate: [authGuard_1.AuthGuard] },
    { path: 'toDo', component: toDo_component_1.ToDoComponent, canActivate: [authGuard_1.AuthGuard] },
    { path: 'staff', component: staff_component_1.StaffComponent, canActivate: [authGuard_1.AuthGuard] },
    { path: 'transaction', component: transaction_component_1.TransactionComponent, canActivate: [authGuard_1.AuthGuard] },
    { path: 'services', component: services_component_1.ServicesComponent, canActivate: [authGuard_1.AuthGuard] },
    { path: 'authentication', component: authentication_component_1.AuthenticationComponent },
    { path: '**', redirectTo: '', canActivate: [authGuard_1.AuthGuard] }
];
exports.MODULE_COMPONENTS = [
    home_component_1.HomeComponent,
    marketing_component_1.MarketingComponent,
    bookings_component_1.BookingsComponent,
    customers_component_1.CustomersComponent,
    roster_component_1.RosterComponent,
    stock_component_1.StockComponent,
    portfolio_component_1.PortfolioComponent,
    toDo_component_1.ToDoComponent,
    staff_component_1.StaffComponent,
    transaction_component_1.TransactionComponent,
    services_component_1.ServicesComponent,
    authentication_component_1.AuthenticationComponent
];
//# sourceMappingURL=dashboard.routes.js.map