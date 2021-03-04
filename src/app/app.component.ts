import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public auth: AngularFireAuth) {
  }
  title = 'peebles-humane';

  logout() {
    this.auth.signOut();
  }
}
