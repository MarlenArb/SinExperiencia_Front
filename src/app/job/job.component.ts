import { Component, OnInit } from '@angular/core';
import { JobService } from './job.service';
import { Job } from './job';
import  swal  from 'sweetalert2'

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  constructor(private jobService: JobService) { }

  jobs: Job[] = [];

  ngOnInit(): void {
    this.jobService.getJobs().subscribe (
      jobs => this.jobs = jobs
    );
  }

    //Borrar empleo
    deleteJob(job: Job) :void{

      swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar la oferta de ${job.occupation}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, eliminar!',
        cancelButtonText: '¡No, cancelar!',
        cancelButtonColor: '#DC3545',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.jobService.deleteJob(job.idJob).subscribe(
            response => {
              this.jobs = this.jobs.filter(jb => jb !== job)
              swal.fire(
                '¡Eliminado!',
                `La oferta de ${job.occupation} ha sido eliminada con éxito`,
                'success'
              )
            } 
          )
        }
      })
      
    }
}
