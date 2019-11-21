import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
    console.log(localStorage.getItem('currentUser'));
    if (localStorage. getItem('currentUser') == null) {
        document.getElementById('userCheck').innerHTML = 'You are not logged in.';
        document.getElementById('rejected').innerHTML = 'redirecting to the login, 5 seconds....';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
      }
    if ( localStorage.getItem('currentUser') )  {

    document.getElementById('userCheck').innerHTML = 'You are logged in. Going back to main';
    setTimeout(() => {
      this.router.navigate(['users']);
    }, 5000);
      }

  }
}
