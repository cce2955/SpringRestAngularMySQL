import { HttpClient } from '@angular/common/http';
import { UserService } from './../user.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/user';
import { data } from 'jquery';
import { Router } from '@angular/router';
import { longStackSupport } from 'q';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})


@Input()
export class LoginComponent implements OnInit {
  user: User = new User();
  userLogin: User = new User();
  result: string;

  submitted = false;
  i = 0;
  x = 0;
  size: number;
  element: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
  }

  onSubmit() {

    // This entire setup kind of goes around angular, I could just pull user.username but this logic is already done and I want to keep it
    // In the future I'll actually pull from the database(and actually now I mmight do it for IDs), but for now this janky setup works
    // Kind of




    let datasource: string; //Hold user ID in a string
    let passsource: string;
    let splitString: string[]; //Split userID into an array
    let splitPassWord: string[];
    let dump: string; //Dump uneccesary data in this string, used to condense the array

    //Get user input
    const userInput = ((document.getElementById('userName') as HTMLInputElement).value); // Get user Input
    const passInput = ((document.getElementById('passWord') as HTMLInputElement).value); // Get user Input

    this.userService.getUserList().subscribe((data: Array<any>) =>{ //This gets the legnth of the array to aid in logging in
    //Gigantic for loop to calculate if a user is in in the system or not, I apologize but it works
    for (this.i = 1; this.i <= data.length; this.i++) {

      this.userService.getUser(this.i).subscribe((data) => { // Get the user data and turn it into a string
       datasource = JSON.stringify(data);
       passsource = JSON.stringify(data);
       // console.log(datasource);//Debug Line

       // Do stuff to find the username
       // -----------------
       splitString = datasource.split(''); // Split it in an array
       for (this.x = 0; this.x <= 19; this.x++) {
          dump = splitString.shift(); // Dump everything before the username into this variable
          dump = ''; // Clear dump so it can't be read
        }
       this.x = 0;
       if (userInput.length >= 8) {
          while (this.x < splitString.length - userInput.length) {
            dump = splitString.pop(); // Dump everything out of the array except the user input if the password is longer than 8 letters
          }
        }
        // End User


        // --------------------
        // Do stuff to find the password
        // ---------------
       splitPassWord = passsource.split('');
        // Get rid of the last two values, because they're worthless
       dump = splitPassWord.pop();
       dump = splitPassWord.pop();

       this.x = 0;
       while (this.x < splitPassWord.length - passInput.length) {
          dump = splitPassWord.shift();
        }
        // -----------------

       const datasourceUser = splitString.join(''); // Put it back together, it should be "{username}"
       const datasourcePass = splitPassWord.join('');

        // Debug stuff, ignore
       console.log('input user ' + userInput); // Check what user did
       console.log('input pass ' + passInput); // Check the pass the user gave
       // console.log(splitString); // Check that I calculated it correctly (breaks if the password is under 8 characters)
       // console.log(splitPassWord);// Check password (same as above)
       console.log('username: ' + datasourceUser); // Check the resulting string from the above split
       console.log('Password: ' + datasourcePass); // If string is over 8 characters it will work perfectly

       if (userInput.match(datasourceUser) && passInput.match(datasourcePass)) {

          this.submitted = true; //Unshow hidden data on the htm page
          localStorage.setItem('currentUser', JSON.stringify({ token: 'test-token' , name: datasourceUser }));//Set a user to be persistent across pages, uses localstorage as opposed to JWT
          setTimeout(() => {
            this.router.navigate(['/landing']);
          }, 5000);  //Redirect to landing page, if user is logged in, they'll be redirected after this to main
        }

        //Stop user from making a U/P under 8 letters
       if (userInput.length <= 8) {
          document.getElementById('div1').innerHTML = 'Usernames are over 8 letters';
        }
        else{
          document.getElementById('div1').innerHTML = '';
        }
       if (passInput.length <= 8) {
          document.getElementById('div2').innerHTML = 'Passwords are over 8 letters';
        }
        else{
          document.getElementById('div2').innerHTML = '';
        }
      });
    }
  });
  };
  logOut(){
      localStorage.clear;
      localStorage.removeItem('currentUser');
      console.log(localStorage.getItem('currentUser'));

  }
}
