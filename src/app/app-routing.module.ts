import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdoptionRosterComponent} from 'src/app/core/adoptions/adoption-roster/adoption-roster.component';
import {AdoptionsComponent} from 'src/app/core/adoptions/adoptions.component';
import { AdminDashboardComponent } from './core/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from  './core/login/login.component';
import { AdminRosterComponent } from './core/admin-dashboard/admin-roster/admin-roster.component';
import { AdminControlComponent } from './core/admin-dashboard/admin-control/admin-control.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, hasCustomClaim, redirectLoggedInTo, AuthPipe, customClaims } from '@angular/fire/auth-guard';
import { canActivate } from '@angular/fire/auth-guard';
import { Observable, of, pipe, UnaryFunction } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

const redirectLoggedInToAdmin = () => redirectLoggedInTo(['admin']);

const routes: Routes = [
{path: 'admin', component: AdminDashboardComponent, children: [
  {path: '', redirectTo: 'roster', pathMatch: 'full'},
  {path: 'roster', component: AdminRosterComponent},
  {path: 'admins', component: AdminControlComponent}
]},
{path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToAdmin}},
{path: 'adoptions', component: AdoptionsComponent,
children: [{path: '', redirectTo: 'adoption-roster', pathMatch: 'full'},
{path: 'adoption-roster', component: AdoptionRosterComponent}]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
