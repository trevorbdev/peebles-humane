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
  selector: 'app-admin-roster',
  templateUrl: './admin-roster.component.html',
  styleUrls: ['./admin-roster.component.scss']
})
export class AdminRosterComponent implements OnInit {

  correctindex: any = 0;
  dataSource!: MatTableDataSource<Pet>;
  petarr!: Pet[];
  petsCollection: AngularFirestoreCollection<Pet>;
  petsArchiveCollection: AngularFirestoreCollection<Pet>;
  countCollection: AngularFirestoreCollection<Count>;
  countdata!: Count | undefined;
  pets: Observable<Pet[]>;
  newpet: boolean = false;
  editmode: boolean = false;
  id: string | undefined;
  name: string | undefined;
  age: string | undefined;
  breed: string | undefined;
  photos: string[] | undefined = [];
  sex: string | undefined;
  type: string | undefined;
  status: string | undefined;
  coverimg: string | undefined;
  iconimg: string | undefined;
  description: string | undefined;
  weight: number | undefined;
  price: number | undefined;
  detailedage: string | undefined;
  editindex: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private afs: AngularFirestore, public dialog: MatDialog, private _snackBar: MatSnackBar, private storage: AngularFireStorage) {
    this.petsCollection = afs.collection<Pet>('adoptionroster');
    this.petsArchiveCollection = afs.collection<Pet>('petarchive');
    this.pets = this.petsCollection.valueChanges();
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

  editPet(index: any) {
    this.newpet = false;
    index = index + this.correctindex;
    this.editmode = true;
    this.id = this.petarr[index].id;
    this.name = this.petarr[index].name;
    this.age = this.petarr[index].age;
    this.breed = this.petarr[index].breed;
    this.photos = this.petarr[index].photos;
    this.sex = this.petarr[index].sex;
    this.type = this.petarr[index].type;
    this.status = this.petarr[index].status;
    this.coverimg = this.petarr[index].coverimg;
    this.iconimg = this.petarr[index].iconimg;
    this.description = this.petarr[index].description;
    this.weight = this.petarr[index].weight;
    this.detailedage = this.petarr[index].detailedage;
    this.editindex = index;
  }

  cancelEditOrNew() {
    this.editmode = false;
    this.newpet = false;
  }

  newPet() {
    this.editmode = false;
    this.newpet = true;
    this.id = String(Number(this.countdata!.count) + 1);
    this.name = '';
    this.age = '';
    this.breed = '';
    this.sex = '';
    this.type = '';
    this.status = '';
    this.coverimg = '';
    this.iconimg = '';
    this.description = '';
    this.weight = 0;
    this.detailedage = '';
    this.editindex = Number(this.id);
  }

  savePet(iconimg: any, coverimg: any) {
    if (iconimg != null && coverimg != null) {
    var filePathic = '/pets/' + this.id + '/' + this.name + 'Icon.jpg';
    var gsrefic = 'gs://peebles-humane.appspot.com/' + 'pets/' + this.id + '/' + this.name + 'Icon.jpg';
    this.storage.upload(filePathic, iconimg).then((success) => {
    this.storage.refFromURL(gsrefic).getDownloadURL().subscribe(iurl => {
      var filePathcv = '/pets/' + this.id + '/' + this.name + 'Cover.jpg';
      var gsrefcv = 'gs://peebles-humane.appspot.com/' + 'pets/' + this.id + '/' + this.name + 'Cover.jpg';
      this.storage.upload(filePathcv, coverimg).then((success) => {
      this.storage.refFromURL(gsrefcv).getDownloadURL().subscribe(curl => {
        this.petsCollection.doc(this.id).set({
          id: this.id,
          name: this.name,
          age: this.age,
          breed: this.breed,
          photos: this.photos,
          sex: this.sex,
          type: this.type,
          status: this.status,
          coverimg: curl,
          iconimg: iurl,
          description: this.description,
          weight: this.weight,
          price: this.price,
          detailedage: this.detailedage,
          adoptedby: '',
        })
      });
    }, (reason) => {
      this._snackBar.open("Cover image upload failed", "", {
        duration: 5000
      });
    });
    });
    }, (reason) => {
      this._snackBar.open("Icon image upload failed", "", {
        duration: 5000
      });
    });
  }
  if (iconimg == null && coverimg != null) {
    var filePathcv = '/pets/' + this.id + '/' + this.name + 'Cover.jpg';
    var gsrefcv = 'gs://peebles-humane.appspot.com/' + 'pets/' + this.id + '/' + this.name + 'Cover.jpg';
    this.storage.upload(filePathcv, coverimg).then((success) => {
    this.storage.refFromURL(gsrefcv).getDownloadURL().subscribe(curl => {
      this.petsCollection.doc(this.id).set({
        id: this.id,
        name: this.name,
        age: this.age,
        breed: this.breed,
        photos: this.photos,
        sex: this.sex,
        type: this.type,
        status: this.status,
        coverimg: curl,
        iconimg: this.petarr[this.editindex].iconimg,
        description: this.description,
        weight: this.weight,
        price: this.price,
        detailedage: this.detailedage,
        adoptedby: ''
      })
    });
  }, (reason) => {
    this._snackBar.open("Cover image upload failed", "", {
      duration: 5000
    });
  });
  }
  if (iconimg != null && coverimg == null) {
    var filePathic = '/pets/' + this.id + '/' + this.name + 'Icon.jpg';
    var gsrefic = 'gs://peebles-humane.appspot.com/' + 'pets/' + this.id + '/' + this.name + 'Icon.jpg';
    this.storage.upload(filePathic, iconimg).then((success) =>{
    this.storage.refFromURL(gsrefic).getDownloadURL().subscribe(iurl => {
      this.petsCollection.doc(this.id).set({
        id: this.id,
        name: this.name,
        age: this.age,
        breed: this.breed,
        photos: this.photos,
        sex: this.sex,
        type: this.type,
        status: this.status,
        coverimg: this.petarr[this.editindex].coverimg,
        iconimg: iurl,
        description: this.description,
        weight: this.weight,
        price: this.price,
        detailedage: this.detailedage,
        adoptedby: ''
      })
    });
    }, (reason) => {
      this._snackBar.open("Icon image upload failed", "", {
        duration: 5000
      });
    });
  }
  if (iconimg == null && coverimg == null) {
    this.petsCollection.doc(this.id).set({
      id: this.id,
      name: this.name,
      age: this.age,
      breed: this.breed,
      photos: this.photos,
      sex: this.sex,
      type: this.type,
      status: this.status,
      coverimg: this.petarr[this.editindex].coverimg,
      iconimg: this.petarr[this.editindex].iconimg,
      description: this.description,
      weight: this.weight,
      price: this.price,
      detailedage: this.detailedage,
      adoptedby: ''
    })
  }
    if (this.newpet == true) {
      this.countCollection.doc("adoptionrostercount").set({
        count: this.id
      })
    }
  }

  archivePet(index: any) {
    index = index + this.correctindex;
    var confirm = window.confirm("Confirm archive");
    if (confirm == true) {
    this.petsArchiveCollection.doc(this.petarr[index].id).set({
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
    this.petsCollection.doc(this.petarr[index].id).delete();
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

  editPhotosDialog() {
    if (this.newpet == false) {
      var dialogRef = this.dialog.open(PhotosEditDialog, {
        data: {
          photos: this.petarr[this.editindex].photos,
          index: this.editindex,
          id: this.id,
          name: this.name
        }
      })
      dialogRef.afterClosed().subscribe((result) => {
        this.photos = result.data;
      })
    }
    else {
      var dialogRef = this.dialog.open(PhotosEditDialog, {
        data: {
          photos: [""],
          index: this.editindex,
          id: this.id,
          name: this.name
        }
      })
      dialogRef.afterClosed().subscribe((result) => {
        this.photos = result.data;
      })
    }

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


  constructor(@Inject(MAT_DIALOG_DATA) public data: PhotosDialogData, private afs: AngularFirestore, private _snackBar: MatSnackBar) {
    this.petsCollection = afs.collection<Pet>('adoptionroster');
    this.pets = this.petsCollection.valueChanges();
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

@Component({
  selector: 'photos-edit-dialog',
  templateUrl: 'photos-edit-dialog.html',
})
export class PhotosEditDialog {
  petsCollection: AngularFirestoreCollection<Pet>;
  petarr!: Pet[];
  pets: Observable<Pet[]>;


  constructor(@Inject(MAT_DIALOG_DATA) public data: PhotosEditDialogData, private afs: AngularFirestore, private _snackBar: MatSnackBar, private storage: AngularFireStorage,
    private dialogRef: MatDialogRef<PhotosEditDialog>) {
    this.petsCollection = afs.collection<Pet>('adoptionroster');
    this.pets = this.petsCollection.valueChanges();
    this.pets.subscribe((data) => {
      this.petarr = data;
    });
    if (this.data.photos[0] == "") {
      this.data.photos.pop();
    }
  }

  deletePhoto(index: any) {
    this.data.photos.splice(index, 1);
    this.petsCollection.doc(this.petarr[this.data.index].id).update({ photos: this.data.photos }).then((success) => {
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

  addPhoto(file: any) {
    var filePath = '/pets/' + this.data.id + '/' + this.data.name + this.data.photos.length + '.jpg';
    this.storage.upload(filePath, file).then((file) => {
      var gsref = 'gs://peebles-humane.appspot.com/' + file.metadata.fullPath;
      this.storage.refFromURL(gsref).getDownloadURL().subscribe((url) => {
        this.data.photos.push(url);
      });
    })
  }

  savePhotos() {
    this.dialogRef.close({ data: this.data.photos });
  }
}