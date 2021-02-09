import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adoptions',
  templateUrl: './adoptions.component.html',
  styleUrls: ['./adoptions.component.scss']
})
export class AdoptionsComponent implements OnInit {

  routes: any[];

  constructor() {
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
