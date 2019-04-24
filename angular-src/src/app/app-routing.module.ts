import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {SecureInnerPagesGuard} from './guard/secure-inner-pages.guard';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
  {path: '' , component: HomeComponent , canActivate: [SecureInnerPagesGuard]},
  {path: 'register' , component: RegisterComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'login' , component: LoginComponent , canActivate: [SecureInnerPagesGuard]},
  {path: 'dashboard' , component: DashboardComponent , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    SlimLoadingBarModule
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
