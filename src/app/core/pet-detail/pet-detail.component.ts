import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { AdoptionsService } from 'src/app/core/adoptions/adoptions.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Pet } from 'src/app/core/models/pet';
import { Count } from 'src/app/core/models/count';
import { App } from 'src/app/core/models/app';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { visitAll } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.scss']
})
export class PetDetailComponent implements OnInit {

  petsCollection: AngularFirestoreCollection<Pet>;
  countCollection: AngularFirestoreCollection<Count>;
  appCollection: AngularFirestoreCollection<App>;
  pets: Observable<Pet[]>;
  petarr!: Pet[];
  pet: Pet;
  calendlyview: boolean = false;
  countdata: Count | undefined;

  @ViewChild('container') container!: ElementRef;

  AppForm = this.formBuilder.group({
    firstname: '',
    lastname: '',
    email: '',
    dln: '',
    birthday: '',
    spousefirst: '',
    spouselast: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    home: 'Own',
    landlord: '',
    hometype: 'House',
    moving: '',
    residents: '',
    children: '',
    animals: '',
    laws: false,
    adjust: false,
    behavior: false,
    accept: false
  });

  constructor(private adoptions_service: AdoptionsService, private afs: AngularFirestore, private route: ActivatedRoute, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private auth: AngularFireAuth) {
    this.petsCollection = afs.collection<Pet>('adoptionroster');
    this.pets = this.petsCollection.valueChanges();
    this.pets.subscribe((data) => {
      this.petarr = data;
    });
    this.pet = this.adoptions_service.pet;
    this.countCollection = afs.collection<Count>('counts');
    this.countCollection.doc("applicationcount").get().subscribe((doc) => {
      this.countdata = doc.data();
    })
    this.appCollection = afs.collection<App>('applications');
  }

  ngOnInit(): void {
    window.addEventListener('message', (e) => {
      if (e.data.event === 'calendly.event_scheduled') {
        this.submitForm(e.data.payload.event.uri);
      }
    })
  }

  openCalendly() {
    this.calendlyview = true;
    // @ts-ignore
    Calendly.initInlineWidget({
      url: 'https://calendly.com/trevor-138/30min',
      parentElement: document.querySelector('.calendly-inline-widget'),
      prefill: {
        name: this.AppForm.controls['firstname'].value +  ' ' + this.AppForm.controls['lastname'].value,
        email: this.AppForm.controls['email'].value,
        customAnswers: {
          a1: this.pet.name,
        }
      }
    });
  }
  
  submitForm(url: any) {
    this.appCollection.doc(String(Number(this.countdata!.count) + 1)).set({
      id: String(Number(this.countdata!.count) + 1),
      petid: this.pet.id,
      event_url: url,
      firstname: this.AppForm.controls['firstname'].value,
      lastname: this.AppForm.controls['lastname'].value,
      email: this.AppForm.controls['email'].value,
      dln: this.AppForm.controls['dln'].value,
      birthday: this.AppForm.controls['birthday'].value,
      spousefirst: this.AppForm.controls['spousefirst'].value,
      spouselast: this.AppForm.controls['spouselast'].value,
      phone: this.AppForm.controls['phone'].value,
      address: this.AppForm.controls['address'].value,
      city: this.AppForm.controls['city'].value,
      state: this.AppForm.controls['state'].value,
      zip: this.AppForm.controls['zip'].value,
      home: this.AppForm.controls['home'].value,
      landlord: this.AppForm.controls['landlord'].value,
      hometype: this.AppForm.controls['hometype'].value,
      moving: this.AppForm.controls['moving'].value,
      residents: this.AppForm.controls['residents'].value,
      children: this.AppForm.controls['children'].value,
      animals: this.AppForm.controls['animals'].value
    }).then((success) => {
      this._snackBar.open("Application submitted", "", {
        duration: 5000
      });
    }, (reason) => {
      this._snackBar.open("Application submit failed", "", {
        duration: 5000
      });
    });
    this.countCollection.doc("applicationcount").set({
      count: String(Number(this.countdata!.count) + 1)
    })
  }
}
