import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdoptionRosterComponent} from 'src/app/core/adoptions/adoption-roster/adoption-roster.component';
import {AdoptionsComponent} from 'src/app/core/adoptions/adoptions.component';

const routes: Routes = [{path: '', redirectTo: 'adoptions', pathMatch: 'full'}, {path: 'adoptions', component: AdoptionsComponent, children: [{path: '', redirectTo: 'adoption-roster', pathMatch: 'full'}, {path: 'adoption-roster', component: AdoptionRosterComponent}]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
