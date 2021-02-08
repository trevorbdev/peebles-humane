import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Pet {
  name: string;
  age: string;
  breed: string;
  photos: string[];
  sex: string;
  type: string;
  coverimg: string;
  iconimg: string;
}

@Component({
  selector: 'app-adoption-roster',
  templateUrl: './adoption-roster.component.html',
  styleUrls: ['./adoption-roster.component.scss']
})
export class AdoptionRosterComponent implements OnInit {
  petsCollection: AngularFirestoreCollection<Pet>;
  pets: Observable<Pet[]>;

  constructor(private afs: AngularFirestore) {
    this.petsCollection = afs.collection<Pet>('adoptionroster');
    this.pets = this.petsCollection.valueChanges();
  }

  ngOnInit(): void {
  }

}
