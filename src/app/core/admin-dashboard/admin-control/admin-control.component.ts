import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Admin {
  uid: string | undefined;
  email: string | null | undefined;
}

@Component({
  selector: 'app-admin-control',
  templateUrl: './admin-control.component.html',
  styleUrls: ['./admin-control.component.scss']
})
export class AdminControlComponent implements OnInit {

  adminCollection: AngularFirestoreCollection<Admin>;
  admins: Observable<Admin[]>;
  dataSource!: MatTableDataSource<Admin>;
  adminarr!: Admin[];
  correctindex: any = 0;
  newadmin: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public auth: AngularFireAuth, private afs: AngularFirestore, private _snackBar: MatSnackBar) {
    this.adminCollection = afs.collection<Admin>('admins');
    this.admins = this.adminCollection.valueChanges();
    this.admins.subscribe((data) => {
      this.adminarr = data;
      this.dataSource = new MatTableDataSource(this.adminarr);
    });
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  correctIndex(size: any, index: any) {
    this.correctindex = size * index;
  }

  prepareNewAdmin() {
    this.newadmin = !this.newadmin;
  }

  createNewAdmin(email: string, password: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      this.auth.createUserWithEmailAndPassword(email, password).then((data) => {
        this.adminCollection.doc(data.user?.uid).set({ uid: data.user?.uid, email: data.user?.email });
        this._snackBar.open("Admin added", "", {
          duration: 5000,
        });
      });
  }
  else {
  this._snackBar.open("Please enter a valid email", "", {
    duration: 5000,
  });
}
  }

deleteAdmin(index: any) {
  index = index + this.correctindex;
  this.adminCollection.doc(this.adminarr[index].uid).delete().then((success) => {
    this._snackBar.open("Admin deleted", "", {
      duration: 5000,
    })
  }, (reason) => {
    this._snackBar.open("Error deleting admin", "", {
      duration: 5000,
    })
  });
}
}