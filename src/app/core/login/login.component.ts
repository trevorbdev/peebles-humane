import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginerror: boolean = false;

  constructor(private auth: AngularFireAuth, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login(email: any, password: any) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
    this.auth.signInWithEmailAndPassword(email, password).then((success) => {
      this.loginerror = false;
      this.router.navigate(['/admin']);
    }, (reason) => {
      this.loginerror = true;
    })
  }
  else {
    this._snackBar.open("Please enter a valid email", "", {
      duration: 5000,
    });
  }
  }

  forgot(email: any) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
    this.auth.sendPasswordResetEmail(email);
    }
    else {
      this._snackBar.open("Please enter a valid email", "", {
        duration: 5000,
      });
    }
  }

}
