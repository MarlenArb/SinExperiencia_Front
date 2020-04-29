import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent implements OnInit {

  constructor(private userService: UserService ) { }

  users: User[];
  occupations = ["Jardinero", "Abogada","Ingeniero", "Diseñador", "Dependienta", "Panadera", "Mecánico"];
  filterOccupation = '';
  filterName = '';
  filterExperience = '';
  showFilters: boolean = false;
  showNameBar: boolean = false;
  showExperienceOptions: boolean = false;
  years: number[] = [1, 2, 3, 4, 5, 10, 15, 20, 30];
  forYear = '';
  toYear = '';

  ngOnInit(): void {
    this.userService.getUsers().subscribe (
      users => this.users = users
    );

  }
}
