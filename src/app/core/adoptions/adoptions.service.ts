import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Pet } from 'src/app/core/models/pet';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdoptionsService {
  petsCollection: AngularFirestoreCollection<Pet>;
  pets: Observable<Pet[]>;
  pet!: Pet;

  constructor(private afs: AngularFirestore, private router: Router) {
    this.petsCollection = afs.collection<Pet>('adoptionroster');
    this.pets = this.petsCollection.valueChanges();
  }

  petDetail(pet: any) {
    this.pet = pet;
    this.router.navigate(['/petdetail']);
  }
}
