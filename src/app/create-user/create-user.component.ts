

import { User } from './../../user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {

  user: User = new User();
  submitted = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

  save() {

    this.userService.createUser(this.user).subscribe(data => console.log(data), error => console.log(error));
    this.user = new User();
  }
  onSubmit() {
    var userInput = ((document.getElementById("userName") as HTMLInputElement).value); // Get user Input
    var passInput = ((document.getElementById("password") as HTMLInputElement).value); // Get user Input

    if (userInput.length >= 8 && passInput.length >= 8)
    {
      this.submitted = true;
      this.save();
    }
    if (userInput.length <= 8)
    {
      document.getElementById("div1").innerHTML = "Please input a username more than 8 letters";
    }
    if (passInput.length <= 8)
    {
      document.getElementById("div2").innerHTML = "Please input a password more than 8 letters";
    }
  }

}
