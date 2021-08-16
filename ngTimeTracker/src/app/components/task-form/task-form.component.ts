import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Task } from 'src/app/models/task';
import { JobService } from 'src/app/services/job.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  task: Task = new Task();

  constructor(private taskSvc: TaskService, public app: AppComponent, private jobSvc: JobService) { }

  ngOnInit(): void {
    this.task = this.app.taskToEdit;
  }

  taskMethodPicker(task: Task) {
    if (this.app.formAction === 'create') {
      this.createTask(task);
    }
    else if (this.app.formAction === 'update') {
      this.updateTask(task);
    }
  }

  createTask(task: Task) {
    task.job = this.app.jobToEdit;
    this.taskSvc.create(task).subscribe(
      data => {
        this.app.result = '';
        this.app.workingPaneView = 'jobDetail';
        this.jobSvc.showJobDetail(task.job);
        this.app.taskToEdit = new Task();
      },
      err => {
        console.log("fail");
      }
    );
  }

  updateTask(task: Task) {
    this.taskSvc.update(task).subscribe(
      data => {
        this.app.result = '';
        this.app.workingPaneView = 'jobDetail';
        this.jobSvc.showJobDetail(task.job);
        this.app.taskToEdit = new Task();
      },
      err => {
        console.log("fail");
      }
    );
  }

}
