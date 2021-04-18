import { Component, OnInit } from '@angular/core';
import { App } from 'src/app/core/models/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Count } from 'src/app/core/models/count';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-app-archive',
  templateUrl: './app-archive.component.html',
  styleUrls: ['./app-archive.component.scss']
})
export class AppArchiveComponent implements OnInit {

  correctindex: any = 0;
  dataSource!: MatTableDataSource<App>;
  apparr!: App[];
  appsCollection: AngularFirestoreCollection<App>;
  appsArchiveCollection: AngularFirestoreCollection<App>;
  countCollection: AngularFirestoreCollection<Count>;
  countdata!: Count | undefined;
  apps: Observable<App[]>;

  constructor(private afs: AngularFirestore, private _snackBar: MatSnackBar) {
    this.appsCollection = afs.collection<App>('applications');
    this.appsArchiveCollection = afs.collection<App>('apparchive');
    this.apps = this.appsArchiveCollection.valueChanges();
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

  unarchiveApp(index: any) {
    index = index + this.correctindex;
    var confirm = window.confirm("Confirm unarchive");
    if (confirm == true) {
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
        status: this.apparr[index].status,
        appdate: this.apparr[index].appdate,
        reason: "",
      })
      this.appsArchiveCollection.doc(this.apparr[index].id).delete();
    }
  }

}
