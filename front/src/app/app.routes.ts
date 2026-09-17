import { Routes } from '@angular/router';
import { Home } from './features/shop/home/home';
import { Main } from './core/layout/main/main';
import { Admin } from './core/layout/admin/admin';
import { authGuard } from './core/auth/auth.guard';
import { Error } from './core/layout/error/error';
import { LoginComponent } from './features/login/login';
import { RegisterComponent } from './features/register/register';
import { OrderList } from './features/orders/order-list/order-list';
import { Cart } from './features/cart/cart';

export const routes: Routes = [
    {
        path: '', component: Main, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: Home },
            { path: 'orders', component: OrderList },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'cart', component: Cart }
        ]
    },
    {
        path: 'admin', component: Admin, canActivate: [authGuard], children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Home },
            { path: 'users', component: Home },
            { path: 'products', component: Home },
        ]
    },
    { path: '**', component: Error },
];
