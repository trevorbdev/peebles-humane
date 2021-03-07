import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pet } from 'src/app/core/models/pet';
import { Count } from 'src/app/core/models/count';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireStorage } from '@angular/fire/storage';

export interface PhotosDialogData {
  photos: any[];
  index: any;
}

export interface PhotosEditDialogData {
  photos: any[];
  index: any;
  id: any;
  name: any;
}

export interface DescDialogData {
  description: any;
  index: any;
}

@Component({
  selector: 'app-roster-archive',
  templateUrl: './roster-archive.component.html',
  styleUrls: ['./roster-archive.component.scss']
})
export class RosterArchiveComponent implements OnInit {

  correctindex: any = 0;
  dataSource!: MatTableDataSource<Pet>;
  petarr!: Pet[];
  petsCollection: AngularFirestoreCollection<Pet>;
  petsArchiveCollection: AngularFirestoreCollection<Pet>;
  countCollection: AngularFirestoreCollection<Count>;
  countdata!: Count | undefined;
  pets: Observable<Pet[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private afs: AngularFirestore, public dialog: MatDialog, private _snackBar: MatSnackBar, private storage: AngularFireStorage) {
    this.petsCollection = afs.collection<Pet>('adoptionroster');
    this.petsArchiveCollection = afs.collection<Pet>('petarchive');
    this.pets = this.petsArchiveCollection.valueChanges();
    this.pets.subscribe((data) => {
      this.petarr = data;
      this.dataSource = new MatTableDataSource(this.petarr);
    });
    this.countCollection = afs.collection<Count>('counts');
    this.countCollection.doc("adoptionrostercount").get().subscribe((doc) => {
      this.countdata = doc.data();
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

  unarchivePet(index: any) {
    index = index + this.correctindex;
    var confirm = window.confirm("Confirm unarchive");
    if (confirm == true) {
    this.petsCollection.doc(this.petarr[index].id).set({
      id: this.petarr[index].id,
      name: this.petarr[index].name,
      age: this.petarr[index].age,
      breed: this.petarr[index].breed,
      photos: this.petarr[index].photos,
      sex: this.petarr[index].sex,
      type: this.petarr[index].type,
      status: this.petarr[index].status,
      coverimg: this.petarr[index].coverimg,
      iconimg: this.petarr[index].iconimg,
      description: this.petarr[index].description,
      weight: this.petarr[index].weight,
      price: this.petarr[index].price,
      detailedage: this.petarr[index].detailedage,
      adoptedby: this.petarr[index].adoptedby
    })
    this.petsArchiveCollection.doc(this.petarr[index].id).delete();
  }
  }

  viewPhotosDialog(index: any) {
    index = index + this.correctindex;
    this.dialog.open(PhotosDialog, {
      data: {
        photos: this.petarr[index].photos,
        index: index,
      }
    });
  }

  viewDescDialog(index: any) {
    index = index + this.correctindex;
    this.dialog.open(DescriptionDialog, {
      data: {
        description: this.petarr[index].description,
        index: index,
      }
    })
  }

}


@Component({
  selector: 'photos-dialog',
  templateUrl: 'photos-dialog.html',
})
export class PhotosDialog {
  petsArchiveCollection: AngularFirestoreCollection<Pet>;
  petarr!: Pet[];
  pets: Observable<Pet[]>;


  constructor(@Inject(MAT_DIALOG_DATA) public data: PhotosDialogData, private afs: AngularFirestore, private _snackBar: MatSnackBar) {
    this.petsArchiveCollection = afs.collection<Pet>('petarchive');
    this.pets = this.petsArchiveCollection.valueChanges();
    this.pets.subscribe((data) => {
      this.petarr = data;
    });
  }
}

@Component({
  selector: 'description-dialog',
  templateUrl: 'description-dialog.html',
})
export class DescriptionDialog {

  petdescription: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DescDialogData, private afs: AngularFirestore) {
    this.petdescription = this.data.description;
  }
}
