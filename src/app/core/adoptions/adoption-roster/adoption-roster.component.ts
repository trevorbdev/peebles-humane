import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pet } from 'src/app/core/models/pet';
import { AdoptionsService } from 'src/app/core/adoptions/adoptions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adoption-roster',
  templateUrl: './adoption-roster.component.html',
  styleUrls: ['./adoption-roster.component.scss']
})
export class AdoptionRosterComponent implements OnInit {
  petsCollection: AngularFirestoreCollection<Pet>;
  pets: Observable<Pet[]>;
  petarr!: Pet[];

  constructor(private afs: AngularFirestore, private adoption_service: AdoptionsService, private router: Router) {
    this.petsCollection = afs.collection<Pet>('adoptionroster');
    this.pets = this.petsCollection.valueChanges();
    this.pets.subscribe((data) => {
      this.petarr = data;
    })
  }

  ngOnInit(): void {
  }

  petDetails(id: any) {
    this.adoption_service.petDetail(this.petarr[id - 1]);
  }

}
