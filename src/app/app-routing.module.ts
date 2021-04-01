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
import { PetDetailComponent } from './core/pet-detail/pet-detail.component';
import { AdminAppComponent } from './core/admin-dashboard/admin-app/admin-app.component';
import { AppArchiveComponent } from './core/admin-dashboard/app-archive/app-archive.component';
import { RosterArchiveComponent } from './core/admin-dashboard/roster-archive/roster-archive.component';
import { AppLookupComponent } from './core/app-lookup/app-lookup.component';
import { HomeComponent } from './core/home/home.component';
import { ServicesComponent } from './core/services/services.component';

const redirectLoggedInToAdmin = () => redirectLoggedInTo(['admin']);

const routes: Routes = [
{path: '', component: HomeComponent},
{path: 'services', component: ServicesComponent},
{path: 'admin', component: AdminDashboardComponent, children: [
  {path: '', redirectTo: 'roster', pathMatch: 'full'},
  {path: 'roster', component: AdminRosterComponent},
  {path: 'admins', component: AdminControlComponent},
  {path: 'apps', component: AdminAppComponent},
  {path: 'app-archive', component: AppArchiveComponent},
  {path: 'roster-archive', component: RosterArchiveComponent}
]},
{path: 'petdetail', component: PetDetailComponent},
{path: 'app-lookup', component: AppLookupComponent},
{path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToAdmin}},
{path: 'adoptions', component: AdoptionsComponent,
children: [{path: '', redirectTo: 'adoption-roster', pathMatch: 'full'},
{path: 'adoption-roster', component: AdoptionRosterComponent}]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
