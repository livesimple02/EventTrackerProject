import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppModule } from 'src/app/app.module';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';
import { Timer } from 'src/app/models/timer';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit{

  constructor(private jobSvc: JobService, public app: AppComponent, private taskSvc: TaskService) {}

  job: Job = new Job();

  taskList: Task[] = [];

  ngOnInit(): void {
    this.jobSvc.showJobDetailRequest$.subscribe(
      job => {
        this.job = job;
        this.getTasksForJobId(job.id);
      },
      err => {
        console.log("error showing job");
      }
    );
  }

  showEditJob() {
    this.app.result = '';
    this.app.workingPaneView = 'jobForm';
    this.app.formAction = 'update';
    this.app.jobToEdit = this.job;
    this.app.timerWindowView = '';
    this.app.timerToEdit = new Timer();
  }

  deleteJob() {
    this.jobSvc.destroy(this.job.id).subscribe(
      (data) => {
        this.app.result = 'Successfully Deleted Job';
        this.jobSvc.sendUpdateListRequest(true);
        this.job = new Job();
      },
      (err) => {
        this.app.result = 'Unable to delete requested Job';
      }
    );
  }

  getTasksForJobId(jobId: number) {
    this.taskSvc.indexForJobId(jobId).subscribe(
      tasks => {
        this.taskList = tasks;
      },
      err => {
        this.app.result = "Unable to retrieve tasks for this job";
      }
    )
  }

  showTaskCreateForm() {
    this.app.taskToEdit = new Task();
    this.app.result = '';
    this.app.workingPaneView = 'taskForm';
    this.app.formAction = 'create';
    this.app.jobToEdit = this.job;

  }

  showEditTask(task: Task) {
    this.app.taskToEdit = task;
    this.app.result = '';
    this.app.workingPaneView = 'taskForm';
    this.app.formAction = 'update';
    this.app.timerWindowView = '';
    this.app.timerToEdit = new Timer();
  }

  deleteTask(task: Task) {
    this.taskSvc.destroy(task.id).subscribe(
      (data) => {
        this.app.result = '';
        this.app.workingPaneView = 'jobDetail';
        this.jobSvc.showJobDetail(task.job);
        this.app.taskToEdit = new Task();
      },
      (err) => {
        this.app.result = 'Unable to delete requested Job';
      }
    );
  }

  showTimers(task: Task) {
    this.app.taskToEdit = task;
    this.app.jobToEdit = task.job;
    this.app.result = '';
    this.app.workingPaneView = 'timerList';
    this.app.formAction = '';
  }

}
