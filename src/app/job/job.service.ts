import { Injectable } from '@angular/core';
import { AuthService } from '../login/auth.service';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Job } from './job';
import { Observable, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class JobService {

  private urlEndPoint: string = 'http://localhost:8090/job';
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
      this.router.navigate(['/jobinterface']);
      swal.fire('Acceso denegado', 'Este apartado solamente está disponible para administradores', 'warning');
      return true;
    }

    return false;

  }

   //Listar jobs
   getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.urlEndPoint, {headers: this.addHeaderAuthorization()}).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        return throwError(e);
      })
    )
  };

  //Añadir job
  addJob(job: Job): Observable<Job> {
    console.log(job);
    return this.http.post<Job>(this.urlEndPoint, job, { headers: this.addHeaderAuthorization() }).pipe(
      catchError((e) => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        console.error(e);
        this.validaciones = e.error.valids;
        Swal.fire('Error al crear empleo', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Encontrar un job por id
  getJob(idJob): Observable<Job> {
    return this.http.get<Job>(`${this.urlEndPoint}/${idJob}`, { headers: this.addHeaderAuthorization()}).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        this.router.navigate(['/job']);
        console.error(e.error.message);
        Swal.fire('Error al editar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  //Modificar un job
  modifyJob(job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.urlEndPoint}/${job.idJob}`, job, { headers: this.addHeaderAuthorization() } ).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        console.error(e.error.message);
        console.error(e.error.valids);
        this.validaciones = e.error.valids;
        Swal.fire('Error al editar oferta', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Eliminar job
  deleteJob(idJob: number): Observable<Job> {
    return this.http.delete<Job>(`${this.urlEndPoint}/${idJob}`, { headers: this.addHeaderAuthorization() } ).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        console.error(e);
        Swal.fire('Error al eliminar oferta', "Error", 'error');
        return throwError(e)
      })
    );
  }
}
