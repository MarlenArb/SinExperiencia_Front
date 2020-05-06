import { Component, OnInit } from '@angular/core';
import { JobService } from '../job/job.service';
import { Job } from '../job/job';

@Component({
  selector: 'app-job-interface',
  templateUrl: './job-interface.component.html',
  styleUrls: ['./job-interface.component.css']
})
export class JobInterfaceComponent implements OnInit {

  jobs: Job[] = [];
  constructor(public jobService: JobService) { }

  ngOnInit(): void {

    this.jobService.getJobs().subscribe (
      jobs => this.jobs = jobs
    );


  }

}
