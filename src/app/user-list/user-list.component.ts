import { UserService } from './../user.service';
import { User } from './../../user';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Observable<User[]>;

   constructor(private userService: UserService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.users = this.userService.getUserList();
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
          console.log(data);
          this.reloadData();
          },
      error => console.log(error));
  }
}
