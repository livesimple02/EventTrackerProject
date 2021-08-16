import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';
import { JobListComponent } from '../job-list/job-list.component';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css'],
})
export class JobFormComponent implements OnInit {

  job: Job = new Job();

  constructor(private jobSvc: JobService, public app: AppComponent) { }

  ngOnInit(): void {
    this.job = this.app.jobToEdit;
   }

  jobMethodPicker(job: Job) {
    if (this.app.formAction === 'create') {
      this.createJob(job);
    }
    else if (this.app.formAction === 'update') {
      this.updateJob(job);
    }
  }

  createJob(job: Job) {
    this.jobSvc.create(job).subscribe(
      (data) => {
        this.app.result = 'Successfully Added New Job';
        this.jobSvc.sendUpdateListRequest(true);
        this.job = new Job();
      },
      (err) => {
        this.app.result = 'Unable to add requested Job';
      }
    );
  }

  updateJob(job: Job) {
    this.jobSvc.update(job).subscribe(
      (data) => {
        this.app.result = 'Successfully Updated Job ' + job.jobNumber;
        this.jobSvc.sendUpdateListRequest(true);
        this.job = new Job();
      },
      (err) => {
        this.app.result = 'Unable to update requested Job';
      }
    );
  }
}
