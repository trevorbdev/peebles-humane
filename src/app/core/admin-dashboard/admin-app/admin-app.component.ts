import { Component, OnInit } from '@angular/core';
import { App } from 'src/app/core/models/app';
import { Pet } from 'src/app/core/models/pet';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Count } from 'src/app/core/models/count';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/core/admin-dashboard/admin.service';

@Component({
  selector: 'app-admin-app',
  templateUrl: './admin-app.component.html',
  styleUrls: ['./admin-app.component.scss']
})
export class AdminAppComponent implements OnInit {

  correctindex: any = 0;
  dataSource!: MatTableDataSource<App>;
  apparr!: App[];
  appsCollection: AngularFirestoreCollection<App>;
  petarr!: Pet[];
  pets: Observable<Pet[]>;
  petsCollection: AngularFirestoreCollection<Pet>;
  appsArchiveCollection: AngularFirestoreCollection<App>;
  countCollection: AngularFirestoreCollection<Count>;
  countdata!: Count | undefined;
  apps: Observable<App[]>;

  constructor(private afs: AngularFirestore, private _snackBar: MatSnackBar, private admin_service: AdminService) {
    this.petsCollection = afs.collection<Pet>('adoptionroster');
    this.appsCollection = afs.collection<App>('applications');
    this.appsArchiveCollection = afs.collection<App>('apparchive');
    this.pets = this.petsCollection.valueChanges();
    this.pets.subscribe((data) => {
      this.petarr = data;
    });
    this.apps = this.appsCollection.valueChanges();
    this.apps.subscribe((data) => {
      this.apparr = data;
      this.dataSource = new MatTableDataSource(this.apparr);
    });
    this.countCollection = afs.collection<Count>('counts');
    this.countCollection.doc("applicationcount").get().subscribe((doc) => {
      this.countdata = doc.data();
    })
  }

  ngOnInit(): void {
  }

  correctIndex(size: any, index: any) {
    this.correctindex = size * index;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  archiveApp(index: any) {
    index = index + this.correctindex;
    var confirm = window.confirm("Confirm archive");
    if (confirm == true) {
      this.appsArchiveCollection.doc(this.apparr[index].id).set({
        id: this.apparr[index].id,
        petid: this.apparr[index].petid,
        event_uuid: this.apparr[index].event_uuid,
        firstname: this.apparr[index].firstname,
        lastname: this.apparr[index].lastname,
        email: this.apparr[index].email,
        dln: this.apparr[index].dln,
        birthday: this.apparr[index].birthday,
        spousefirst: this.apparr[index].spousefirst,
        spouselast: this.apparr[index].spouselast,
        phone: this.apparr[index].phone,
        address: this.apparr[index].address,
        city: this.apparr[index].city,
        state: this.apparr[index].state,
        zip: this.apparr[index].zip,
        home: this.apparr[index].home,
        landlord: this.apparr[index].landlord,
        hometype: this.apparr[index].hometype,
        moving: this.apparr[index].moving,
        residents: this.apparr[index].residents,
        children: this.apparr[index].children,
        animals: this.apparr[index].animals,
        status: this.apparr[index].status,
        appdate: this.apparr[index].appdate,
        reason: "",
      })
      this.appsCollection.doc(this.apparr[index].id).delete();
    }
  }

  approveApp(index: any) {
    index = index + this.correctindex;
    this.appsCollection.doc(this.apparr[index].id).set({
      id: this.apparr[index].id,
      petid: this.apparr[index].petid,
      event_uuid: this.apparr[index].event_uuid,
      firstname: this.apparr[index].firstname,
      lastname: this.apparr[index].lastname,
      email: this.apparr[index].email,
      dln: this.apparr[index].dln,
      birthday: this.apparr[index].birthday,
      spousefirst: this.apparr[index].spousefirst,
      spouselast: this.apparr[index].spouselast,
      phone: this.apparr[index].phone,
      address: this.apparr[index].address,
      city: this.apparr[index].city,
      state: this.apparr[index].state,
      zip: this.apparr[index].zip,
      home: this.apparr[index].home,
      landlord: this.apparr[index].landlord,
      hometype: this.apparr[index].hometype,
      moving: this.apparr[index].moving,
      residents: this.apparr[index].residents,
      children: this.apparr[index].children,
      animals: this.apparr[index].animals,
      status: "Approved",
      appdate: this.apparr[index].appdate,
      reason: "",
    })
    var petindex = Number(this.apparr[index].petid) - 1;
    this.petsCollection.doc(String(this.apparr[index].petid)).set({
      id: this.petarr[petindex].id,
      name: this.petarr[petindex].name,
      age: this.petarr[petindex].age,
      breed: this.petarr[petindex].breed,
      photos: this.petarr[petindex].photos,
      sex: this.petarr[petindex].sex,
      type: this.petarr[petindex].type,
      status: "Adopted",
      coverimg: this.petarr[petindex].coverimg,
      iconimg: this.petarr[petindex].iconimg,
      description: this.petarr[petindex].description,
      weight: this.petarr[petindex].weight,
      price: this.petarr[petindex].price,
      detailedage: this.petarr[petindex].detailedage,
      adoptedby: this.apparr[index].firstname + " " + this.apparr[index].lastname,
    })
  }

  payRequestApp(index: any) {
    index = index + this.correctindex;
    this.appsCollection.doc(this.apparr[index].id).set({
      id: this.apparr[index].id,
      petid: this.apparr[index].petid,
      event_uuid: this.apparr[index].event_uuid,
      firstname: this.apparr[index].firstname,
      lastname: this.apparr[index].lastname,
      email: this.apparr[index].email,
      dln: this.apparr[index].dln,
      birthday: this.apparr[index].birthday,
      spousefirst: this.apparr[index].spousefirst,
      spouselast: this.apparr[index].spouselast,
      phone: this.apparr[index].phone,
      address: this.apparr[index].address,
      city: this.apparr[index].city,
      state: this.apparr[index].state,
      zip: this.apparr[index].zip,
      home: this.apparr[index].home,
      landlord: this.apparr[index].landlord,
      hometype: this.apparr[index].hometype,
      moving: this.apparr[index].moving,
      residents: this.apparr[index].residents,
      children: this.apparr[index].children,
      animals: this.apparr[index].animals,
      status: "Payment Requested",
      appdate: this.apparr[index].appdate,
      reason: "",
    })
    var petindex = Number(this.apparr[index].petid) - 1;
    this.petsCollection.doc(String(this.apparr[index].petid)).set({
      id: this.petarr[petindex].id,
      name: this.petarr[petindex].name,
      age: this.petarr[petindex].age,
      breed: this.petarr[petindex].breed,
      photos: this.petarr[petindex].photos,
      sex: this.petarr[petindex].sex,
      type: this.petarr[petindex].type,
      status: "Pending Adoption",
      coverimg: this.petarr[petindex].coverimg,
      iconimg: this.petarr[petindex].iconimg,
      description: this.petarr[petindex].description,
      weight: this.petarr[petindex].weight,
      price: this.petarr[petindex].price,
      detailedage: this.petarr[petindex].detailedage,
      adoptedby: this.apparr[index].firstname + " " + this.apparr[index].lastname,
    })
  }

  denyApp(index: any) {
    var reason = prompt("Give reason for denied application");
    if (reason != null || reason != "") {
    index = index + this.correctindex;
    this.appsCollection.doc(this.apparr[index].id).set({
      id: this.apparr[index].id,
      petid: this.apparr[index].petid,
      event_uuid: this.apparr[index].event_uuid,
      firstname: this.apparr[index].firstname,
      lastname: this.apparr[index].lastname,
      email: this.apparr[index].email,
      dln: this.apparr[index].dln,
      birthday: this.apparr[index].birthday,
      spousefirst: this.apparr[index].spousefirst,
      spouselast: this.apparr[index].spouselast,
      phone: this.apparr[index].phone,
      address: this.apparr[index].address,
      city: this.apparr[index].city,
      state: this.apparr[index].state,
      zip: this.apparr[index].zip,
      home: this.apparr[index].home,
      landlord: this.apparr[index].landlord,
      hometype: this.apparr[index].hometype,
      moving: this.apparr[index].moving,
      residents: this.apparr[index].residents,
      children: this.apparr[index].children,
      animals: this.apparr[index].animals,
      status: "Denied",
      appdate: this.apparr[index].appdate,
      reason: reason,
    })
  }
  if (reason == null || reason == "") {
    this._snackBar.open("Deny request denied: need reason", "", {
      duration: 5000,
    })
  }
}

}
