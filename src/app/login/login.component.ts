import { UserListComponent } from './../user-list/user-list.component';
import { UserDetailsComponent } from './../user-details/user-details.component';
import { RouterModule, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from './../user.service';
import { Component, OnInit, Output, EventEmitter, Injectable, Input } from '@angular/core';
import { User } from 'src/user';
import { data, valueOf } from 'jquery';
import { map } from 'rxjs/operators';




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
  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit() {

  }

  onSubmit() {



    // ----------------
    // Do not delete, this is what I need to calculate the length of the array, which basically solves the problem I was looking for
    this.userService.getUserList().subscribe((data: Array<any>) =>  data.length);
    // ----------------------
    // this.userService.getUserList().subscribe((data: Array<any>) =>  console.log(data));




    let test: String;
    var datasource: String;
    var passsource: String;
    var splitString: String[];
    var splitPassWord: String[];
    var dump: String;

    var userInput = ((document.getElementById("userName") as HTMLInputElement).value); // Get user Input
    var passInput = ((document.getElementById("passWord") as HTMLInputElement).value); // Get user Input

    for (this.i = 1; this.i <= data.length; this.i++){
      const id = this.i;

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
       if (userInput.length >= 8){
          while (this.x < splitString.length - userInput.length)
          {
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

       var datasourceUser = splitString.join(''); // Put it back together, it should be "{username}"
       var datasourcePass = splitPassWord.join('')

        //Debug stuff, ignore
       console.log("input user " + userInput); // Check what user did
       console.log("input pass " + passInput); //Check the pass the user gave
       //console.log(splitString); // Check that I calculated it correctly (breaks if the password is under 8 characters)
       //console.log(splitPassWord);// Check password (same as above)
       console.log("username: " + datasourceUser); //Check the resulting string from the above split
       console.log("Password: " + datasourcePass); //If string is over 8 characters it will work perfectly

       if (userInput.match(datasourceUser) && passInput.match(datasourcePass))
        {
          this.submitted = true;

        }
       if (userInput.length <= 8)
        {
          document.getElementById("div1").innerHTML = "Usernames are over 8 letters";
        }
       if (passInput.length <= 8)
        {
          document.getElementById("div2").innerHTML = "Passwords are over 8 letters";
        }



      });

    }



  }
}
