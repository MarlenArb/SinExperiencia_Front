import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { User } from './user';
import { AuthService } from '../login/auth.service';
import swal from 'sweetalert2';
import { Rol } from './rol';

@Injectable({ providedIn: 'root' })
export class UserService {

  private urlEndPoint: string = 'http://localhost:8090/user';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  public validaciones: string[];

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private addHeaderAuthorization() {
    let token = this.authService.token;
    if(token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isAuthorized(e): boolean {
    
    if(e.status == 401) {
      this.router.navigate(['/login']);
      return true;
    }

    if(e.status == 403) {
      this.router.navigate(['/userinterface']);
      swal.fire('Acceso denegado', 'Este apartado solamente está disponible para administradores', 'warning');
      return true;
    }

    return false;

  }

  //Listar usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.urlEndPoint, {headers: this.addHeaderAuthorization()}).pipe(
      map(response => {
        let users = response as User[];
        return users.map(user => {
          user.birthdate = formatDate(user.birthdate, 'dd/MM/yyyy', 'es');
          return user;
        })
      }),
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        return throwError(e);
      })
    )
  };

  //Listar roles
  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>('http://localhost:8090/roles', {headers: this.addHeaderAuthorization()}).pipe(
      catchError(e => {
        this.isAuthorized(e);
        return throwError(e);
      })
    );
  }

  //Añadir usuario
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlEndPoint, user, { headers: this.addHeaderAuthorization() }).pipe(
      catchError((e) => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        console.log(e);
        console.error(e);
        this.validaciones = e.error.valids;
        Swal.fire('Error al crear usuario', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Encontrar un usuario por id
  getUser(idUser: number): Observable<User> {
    return this.http.get<User>(`${this.urlEndPoint}/${idUser}`, { headers: this.addHeaderAuthorization()}).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        this.router.navigate(['/user']);
        console.error(e.error.message);
        Swal.fire('Error al editar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  //Encontrar un usuario por nombre
  getUserByUserName(name: string): Observable<User> {
    return this.http.get<User>(`${this.urlEndPoint}/checkUser/${name}`).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        console.error(e.error.message);
        Swal.fire('Error al encontrar el usuario', e, 'error');
        return throwError(e);
      })
    );
  }

  //Modificar un usuarios
  modifyUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.urlEndPoint}/${user.idUser}`, user, { headers: this.addHeaderAuthorization() } ).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        console.error(e.error.message);
        console.error(e.error.valids);
        this.validaciones = e.error.valids;
        Swal.fire('Error al editar usuario', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Eliminar usuario
  deleteUser(idUser: number): Observable<User> {
    return this.http.delete<User>(`${this.urlEndPoint}/${idUser}`, { headers: this.addHeaderAuthorization() } ).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        console.error(e.message);
        Swal.fire('Error al eliminar usuario', e.error.message, 'error');
        return throwError(e)
      })
    );
  }
}
