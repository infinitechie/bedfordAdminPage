import { MenuType, RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', menuType: MenuType.LEFT, icon: 'pe-7s-graph' },
    { path: 'marketing', title: 'Marketing', menuType: MenuType.LEFT, icon:'pe-7s-user' },
    { path: 'bookings', title: 'Bookings', menuType: MenuType.LEFT, icon:'pe-7s-note2' },
    { path: 'stock', title: 'Stock', menuType: MenuType.LEFT, icon:'pe-7s-news-paper' },
    { path: 'customers', title: 'Customers', menuType: MenuType.LEFT, icon:'pe-7s-users' },
    { path: 'portfolio', title: 'Portfolio', menuType: MenuType.LEFT, icon:'pe-7s-photo-gallery' },
    { path: 'roster', title: 'Roster', menuType: MenuType.LEFT, icon:'pe-7s-bell' },
    { path: 'toDo', title: 'To Do', menuType: MenuType.LEFT, icon:'pe-7s-rocket' },
    { path: 'staff', title: 'Staff', menuType: MenuType.LEFT, icon: 'pe-7s-note2' },
     { path: 'transaction', title: 'Transactions', menuType: MenuType.LEFT, icon: 'pe-7s-note2' },
     { path: 'services', title: 'Services', menuType: MenuType.LEFT, icon: 'pe-7s-note2' }
];
