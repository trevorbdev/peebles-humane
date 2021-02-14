import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pet } from 'src/app/core/models/pet';

@Component({
  selector: 'app-adoption-roster',
  templateUrl: './adoption-roster.component.html',
  styleUrls: ['./adoption-roster.component.scss']
})
export class AdoptionRosterComponent implements OnInit {
  petsCollection: AngularFirestoreCollection<Pet>;
  pets: Observable<Pet[]>;
  petarr!: Pet[];

  constructor(private afs: AngularFirestore) {
    this.petsCollection = afs.collection<Pet>('adoptionroster');
    this.pets = this.petsCollection.valueChanges();
  }

  ngOnInit(): void {
  }

}
