import { User } from './../../user';
import { UserListComponent } from './../user-list/user-list.component';
import { UserService } from './../user.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() user: User;
  constructor(private userService: UserService, private listComponent: UserListComponent) { }

  ngOnInit() {
  }

}
