import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-adoptions',
  templateUrl: './adoptions.component.html',
  styleUrls: ['./adoptions.component.scss']
})
export class AdoptionsComponent implements OnInit {

  routes: any[];

  constructor(private auth: AngularFireAuth) {
    this.routes = [
      {
        label: 'Adoption Roster',
        link: 'adoption-roster'
      }
    ]
   }

  ngOnInit(): void {
  }

}
