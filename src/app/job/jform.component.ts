import { Component, OnInit } from '@angular/core';
import { JobService } from './job.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Job } from './job';
import swal from 'sweetalert2';

@Component({
  selector: 'app-jform',
  templateUrl: './jform.component.html',
  styleUrls: ['./jform.component.css']
})
export class JformComponent implements OnInit {

  public job: Job = new Job();
  public validadores: string[];

  constructor(public jobService: JobService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadJob();
  }

    //Añadir oferta
    public addJob(): void {

      this.jobService.addJob(this.job).subscribe(
        job => {
          this.router.navigate(['/job'])
          swal.fire('Nueva Oferta de Empleo', `Nueva oferta de empleo creada con éxito!`, 'success');
        }
      )
    }
  
    //Buscar oferta por id
    loadJob(): void {
      this.activatedRoute.params.subscribe(params => {
        let idJob = params['idJob']
        if (idJob) {
          this.jobService.getJob(idJob).subscribe((job) => this.job = job)
        }
      })
    }
  
    modifyJob(): void {
      this.jobService.modifyJob(this.job).subscribe(
        job => {
          this.router.navigate(['/job'])
          swal.fire('Empleo Actualizado', `Empleo de ${this.job.occupation} actualizado con éxito`, 'success')
        }
      )
    }
  
    return(): void {
      this.router.navigate(['/job']);
    }
  
/*     public compareRoles(o1: Rol, o2: Rol): boolean {
      return o1 == null || o2 == null ? false : o1.name == o2.name;
    } */
}
