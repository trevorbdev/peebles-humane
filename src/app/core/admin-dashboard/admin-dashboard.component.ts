import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/admin-dashboard/admin.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface Admin {
  uid: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  adminCollection: AngularFirestoreCollection<Admin>;
  admins: Observable<Admin[]>;
  uid: any;
  admin: boolean = false;

  constructor(private admin_service: AdminService, public auth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.adminCollection = afs.collection<Admin>('admins');
    this.admins = this.adminCollection.valueChanges();
  }

  ngOnInit(): void {
    this.admins.forEach((admin) => {
    this.auth.currentUser.then((user) => {
      admin.forEach((administrator) => {
      if (administrator.uid == user?.uid) {
        this.admin = true;
      }
      else {
        this.admin = false;
        this.router.navigate(['/login']);
      }
    })
    })
  });
  }

  logout() {
    this.auth.signOut();
  }

}
