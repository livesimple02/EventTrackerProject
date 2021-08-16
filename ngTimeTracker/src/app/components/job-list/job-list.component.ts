import { ChangeDetectorRef, Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';
import { AppComponent } from 'src/app/app.component';
import { JobFormComponent } from '../job-form/job-form.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Timer } from 'src/app/models/timer';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobs: Job[] = [];
  jobsByCustomer = new Map();
  expandedCustomers: string[]= [];

  constructor(private jobSvc: JobService, private app: AppComponent, private router: Router) {}

  ngOnInit(): void {
    this.loadJobs();
    this.jobSvc.updateJobListRequest$.subscribe(
      request => {
        if (request) {
          this.jobsByCustomer = new Map();
          this.loadJobs();
        }
      }
    );
  }

  loadJobs() {
    this.jobSvc.index().subscribe(
      (data) => {
        this.jobs = data;
        this.groupByCustomer();
      },
      (error) => {
        console.log("JobListComponeent . loadJobs(): error retreiving all Jobs" + error);
      }
    );
  }

  groupByCustomer() {
    for (let i = 0; i < this.jobs.length; i++) {
      let customerName = this.jobs[i].customer;
      if (!this.jobsByCustomer.has(customerName)) {
        this.jobsByCustomer.set(customerName, []);
      }
      this.jobsByCustomer.get(customerName).push(this.jobs[i]);
    }
  }

  expandCustomer(customer: string) : boolean {
    if (this.expandedCustomers.includes(customer)) {
      let index = this.expandedCustomers.indexOf(customer);
      this.expandedCustomers.splice(index, 1);
      return false;
    }
    else {
      this.expandedCustomers.push(customer);
      return true;
    }
  }

  showJobCreateForm() {
    this.app.jobToEdit = new Job();
    this.app.result = '';
    this.app.workingPaneView = 'jobForm';
    this.app.formAction = 'create';

  }

  showJobDetail(jobId: number) {
    this.app.result = '';
    this.app.workingPaneView = 'jobDetail';
    this.jobSvc.show(jobId).subscribe(
      job => {
        this.jobSvc.showJobDetail(job);
        this.app.timerWindowView = '';
        this.app.timerToEdit = new Timer();
      },
      err => {
        this.app.result = 'Error retreiving request Job with ID#: ' + jobId;
      }
    );
  }

}
