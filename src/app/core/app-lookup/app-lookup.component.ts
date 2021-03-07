import { Component, OnInit } from '@angular/core';
import { App } from 'src/app/core/models/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Pet } from 'src/app/core/models/pet';

@Component({
  selector: 'app-app-lookup',
  templateUrl: './app-lookup.component.html',
  styleUrls: ['./app-lookup.component.scss']
})
export class AppLookupComponent implements OnInit {

  correctindex: any = 0;
  dataSource!: MatTableDataSource<App>;
  dataSourceArchive!: MatTableDataSource<App>;
  apparr!: App[];
  apparchivearr!: App[];
  appsCollection: AngularFirestoreCollection<App>;
  appsArchiveCollection: AngularFirestoreCollection<App>;
  apps: Observable<App[]>;
  appsarchive: Observable<App[]>;
  showTables: boolean = false;
  petarr!: Pet[];
  petarchivearr!: Pet[];
  petsCollection: AngularFirestoreCollection<Pet>;
  petsArchiveCollection: AngularFirestoreCollection<Pet>;
  pets: Observable<Pet[]>;
  petsarchive: Observable<Pet[]>;
  email: any;

  constructor(private afs: AngularFirestore, private _snackBar: MatSnackBar) {
    this.petsCollection = afs.collection<Pet>('adoptionroster');
    this.petsArchiveCollection = afs.collection<Pet>('petarchive');
    this.pets = this.petsCollection.valueChanges();
    this.pets.subscribe((data) => {
      this.petarr = data;
    });
    this.petsarchive = this.petsArchiveCollection.valueChanges();
    this.petsarchive.subscribe((data) => {
      this.petarchivearr = data;
    })
    this.appsCollection = afs.collection<App>('applications');
    this.appsArchiveCollection = afs.collection<App>('apparchive');
    this.apps = this.appsCollection.valueChanges();
    this.appsarchive = this.appsArchiveCollection.valueChanges();
    this.apps.subscribe((data) => {
      this.apparr = data;
    });
    this.appsarchive.subscribe((data) => {
      this.apparchivearr = data;
    })
  }

  ngOnInit(): void {
  }

  lookupByEmail() {
    var tempapparr = [];
    var tempapparchivearr = [];
    for (var i = 0; i < this.apparr.length; i++) {
      if (this.apparr[i].email == this.email) {
        tempapparr.push(this.apparr[i]);
      }
    }
    for (var k = 0; k < this.apparchivearr.length; k++) {
      if (this.apparchivearr[k].email == this.email) {
        tempapparchivearr.push(this.apparchivearr[k]);
      }
    }
    this.dataSource = new MatTableDataSource(tempapparr);
    this.dataSourceArchive = new MatTableDataSource(tempapparchivearr);
    this.showTables = true;
  }

  lookupPetName(id: any): any {
    for (var i = 0; i < this.petarr.length; i++) {
      if (this.petarr[i].id = id) {
        return this.petarr[i].name;
      }
    }
    for (var k = 0; k < this.petarchivearr.length; k++) {
      if (this.petarchivearr[k].id = id) {
        return this.petarchivearr[k].name;
      }
    }
  }
}
