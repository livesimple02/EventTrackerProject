import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobs: Job[] = [];

  constructor(private jobSvc: JobService) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobSvc.index().subscribe(
      (data) => {
        this.jobs = data;
      },
      (error) => {
        console.log("JobListComponeent . loadJobs(): error retreiving all Jobs" + error);
      }
    );
  }
}
