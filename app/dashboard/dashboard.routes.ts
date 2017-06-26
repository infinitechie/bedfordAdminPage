import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { MarketingComponent } from './marketing/marketing.component';
import { CustomersComponent } from './customers/customers.component';
import { BookingsComponent } from './bookings/bookings.component';
import { RosterComponent } from './roster/roster.component';
import { StockComponent } from './stock/stock.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ToDoComponent } from './toDo/toDo.component';
import { StaffComponent } from './staff/staff.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ServicesComponent } from './services/services.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuard } from '../authGuard/authGuard';

export const MODULE_ROUTES: Route[] =[
    { path: '', redirectTo: 'dashboard', pathMatch: 'full',canActivate: [AuthGuard] },
    { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'marketing', component: MarketingComponent, canActivate: [AuthGuard] },
    { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard] },
    { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
    { path: 'roster', component: RosterComponent, canActivate: [AuthGuard] },
    { path: 'stock', component: StockComponent, canActivate: [AuthGuard] },
    { path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuard] },
    { path: 'toDo', component: ToDoComponent, canActivate: [AuthGuard] },
    { path: 'staff', component: StaffComponent, canActivate: [AuthGuard]},
    { path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard] },
    { path: 'services', component: ServicesComponent, canActivate: [AuthGuard] },
    { path: 'authentication', component: AuthenticationComponent },
    { path: '**', redirectTo: '', canActivate: [AuthGuard] }
    

]

export const MODULE_COMPONENTS = [
    HomeComponent,
    MarketingComponent,
    BookingsComponent,
    CustomersComponent,
    RosterComponent,
    StockComponent,
    PortfolioComponent,
    ToDoComponent, 
    StaffComponent,
    TransactionComponent,
    ServicesComponent,
    AuthenticationComponent
]
