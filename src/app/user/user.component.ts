import { Component, OnInit } from '@angular/core';
import { User } from './user';
import  swal  from 'sweetalert2'
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 
  constructor(private userService: UserService ) { }

  users: User[];
  occupations = ["Jardinero", "Abogada","Ingeniero", "Diseñador", "Dependienta", "Panadera", "Mecánico"];

  ngOnInit(): void {
    this.userService.getUsers().subscribe (
      users => this.users = users
    );

  }

   //Borrar usuario
   deleteUser( user: User) :void{

    swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el usuario ${user.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, eliminar!',
      cancelButtonText: '¡No, cancelar!',
      cancelButtonColor: '#DC3545',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(user.idUser).subscribe(
          response => {
            this.users = this.users.filter(us => us !== user)
            swal.fire(
              '¡Eliminado!',
              `El usuario ${user.name} ha sido eliminado con éxito`,
              'success'
            )
          } 
        )
      }
    })
    
  }
  
}
