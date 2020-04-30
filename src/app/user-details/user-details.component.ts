import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public user: User;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.loadUser();
    
  }

  //Buscar usuario por id
  loadUser(): void {
    this.activatedRoute.params.subscribe(params => {
      let idUser = params['idUser']
      if (idUser) {
        this.userService.getUser(idUser).subscribe((user) => this.user = user)
      }
    })
  }


}
 