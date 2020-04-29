import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { User } from './user';
import { UserService } from './user.service';
import { Rol } from './rol';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public user: User = new User();
  public validadores: string[];
  public roles: Rol[];
  public showEye: boolean;

  constructor(public userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadUser();
    this.loadRoles();
  }


  //Añadir usuario
  public addUser(): void {

    this.userService.addUser(this.user).subscribe(
      user => {
        this.router.navigate(['/user'])
        swal.fire('Nuevo usuario', `Nuevo usuario creado con éxito!`, 'success');
      }
    )
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

  private loadRoles(): void {
    this.userService.getRoles().subscribe(roles => this.roles = roles);
  }

  modifyUser(): void {
    this.userService.modifyUser(this.user).subscribe(
      user => {
        this.router.navigate(['/user'])
        swal.fire('Usuario Actualizado', `Usuario ${this.user.name} actualizado con éxito`, 'success')
      }
    )
  }

  return(): void {
    this.router.navigate(['/user']);
  }

  public compareRoles(o1: Rol, o2: Rol): boolean {
    return o1 == null || o2 == null ? false : o1.name == o2.name;
  }

  togglePwd(): void {
    let inputNombre: HTMLInputElement = document.querySelector('#toggle');
    if(inputNombre.type == 'password') {
      inputNombre.type = 'text';
    } else {
      inputNombre.type = 'password';
    }
    this.showEye = !this.showEye;
  }

}
