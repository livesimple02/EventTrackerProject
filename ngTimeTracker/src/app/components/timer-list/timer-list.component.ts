import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Job } from 'src/app/models/job';
import { Task } from 'src/app/models/task';
import { Timer } from 'src/app/models/timer';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.css']
})
export class TimerListComponent implements OnInit {

  constructor(public app: AppComponent, private timerSvc: TimerService) { }

  job: Job = new Job();

  task: Task = new Task();

  timerList: Timer[] = [];

  ngOnInit(): void {
    this.job = this.app.jobToEdit;
    this.task = this.app.taskToEdit;
    this.loadTimersForTask(this.task.id);
  }

  loadTimersForTask(taskId: number) {
    this.timerSvc.indexForTaskId(taskId).subscribe(
      timers => {
        this.timerList = timers;
      },
      err => {
        this.app.result = "Unable to retrieve timers for this task";
      }
    )
  }

  deleteTimer(timer: Timer) {
    this.timerSvc.destroy(timer.id).subscribe(
      (data) => {
        this.app.result = '';
        this.app.workingPaneView = 'taskDetail';
      },
      (err) => {
        this.app.result = 'Unable to delete requested Job';
      }
    );
  }

  showNewTimer() {
    this.app.timerWindowView = "newTimer";
    this.app.timerToEdit = new Timer();
    this.app.formAction = '';
  }

  showEditTimer(timer: Timer) {
    this.app.timerToEdit = timer;
    this.app.formAction = 'update';
  }
}
