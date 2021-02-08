import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adoptions',
  templateUrl: './adoptions.component.html',
  styleUrls: ['./adoptions.component.scss']
})
export class AdoptionsComponent implements OnInit {
  links = ['Adoption Roster', 'Second', 'Third'];
  activeLink = this.links[0];

  constructor() { }

  ngOnInit(): void {
  }

}
