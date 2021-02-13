import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pet } from 'src/app/core/models/pet';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  photos: any[];
  index: any;
}

@Component({
  selector: 'app-admin-roster',
  templateUrl: './admin-roster.component.html',
  styleUrls: ['./admin-roster.component.scss']
})
export class AdminRosterComponent implements OnInit {

  correctindex: any = 0;
  dataSource!: MatTableDataSource<Pet>;
  petarr!: Pet[];
  petsCollection: AngularFirestoreCollection<Pet>;
  pets: Observable<Pet[]>;
  newpet: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private afs: AngularFirestore, public dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.petsCollection = afs.collection<Pet>('adoptionroster');
    this.pets = this.petsCollection.valueChanges();
    this.pets.subscribe((data) => {
      this.petarr = data;
      this.dataSource = new MatTableDataSource(this.petarr);
    })
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

  editPet(index: any) {
    index = index + this.correctindex;
  }

  archivePet(index: any) {
    index = index + this.correctindex;
  }

  viewDialog(index: any) {
    index = index + this.correctindex;
    this.dialog.open(PhotosDialog, {
      data: {
        photos: this.petarr[index].photos,
        index: index,
      }
    });
  }

}


@Component({
  selector: 'photos-dialog',
  templateUrl: 'photos-dialog.html',
})
export class PhotosDialog {
  petsCollection: AngularFirestoreCollection<Pet>;
  petarr!: Pet[];
  pets: Observable<Pet[]>;


  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private afs: AngularFirestore, private _snackBar: MatSnackBar) {
    this.petsCollection = afs.collection<Pet>('adoptionroster');
    this.pets = this.petsCollection.valueChanges();
    this.pets.subscribe((data) => {
      this.petarr = data;
    });
  }

  deletePhoto(index: any) {
    this.data.photos[index] = null;
    this.petsCollection.doc(this.petarr[this.data.index].id).update({photos: this.data.photos}).then((success) => {
      this._snackBar.open("Photo deleted", "", {
        duration: 5000,
      })
    }, (reason) => {
      console.log(reason);
      this._snackBar.open("Error deleting photo", "", {
        duration: 5000,
      })
    })
  }
}
