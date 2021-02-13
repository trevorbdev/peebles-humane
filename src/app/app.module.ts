import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

//Angular Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AdoptionRosterComponent } from './core/adoptions/adoption-roster/adoption-roster.component';
import { AdoptionsComponent } from './core/adoptions/adoptions.component';
import { AdminDashboardComponent } from './core/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './core/login/login.component';
import { AdminRosterComponent } from './core/admin-dashboard/admin-roster/admin-roster.component';
import { AdminControlComponent } from './core/admin-dashboard/admin-control/admin-control.component';
import {PhotosDialog} from './core/admin-dashboard/admin-roster/admin-roster.component';

@NgModule({
  declarations: [
    AppComponent,
    AdoptionRosterComponent,
    AdoptionsComponent,
    AdminDashboardComponent,
    LoginComponent,
    AdminRosterComponent,
    AdminControlComponent,
    PhotosDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatInputModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    FormsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
