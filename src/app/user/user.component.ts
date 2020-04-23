import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { USERS } from './USERS.json';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];
  occupations = ["Jardinero", "Abogada","Ingeniero", "Diseñador", "Dependienta", "Panadera", "Mecánico"];
  constructor(private userService: UserService ) { }
  filterOccupation = '';
  filterName = '';
  filterExperience = '';
  showFilters: boolean = false;
  showNameBar: boolean = false;

  ngOnInit(): void {
    this.userService.getUsers().subscribe (
      users => this.users = users
    );

  }
}
