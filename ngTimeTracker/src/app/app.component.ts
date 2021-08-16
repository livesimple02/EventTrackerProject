import { Component } from '@angular/core';
import { Job } from './models/job';
import { Task } from './models/task';
import { Timer } from './models/timer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngTimeTracker';

  workingPaneView: string = '';
  result: string = '';
  reload: boolean = true;
  formAction: string = '';
  jobToEdit: Job = new Job();
  taskToEdit: Task = new Task();
  timerToEdit: Timer = new Timer();
  timerWindowView: string = '';
  routedHome: boolean = true;

}
