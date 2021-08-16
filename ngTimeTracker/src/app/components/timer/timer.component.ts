import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Timer } from 'src/app/models/timer';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  startTime: number = 0;
  endTime: number = 0;
  startTimeString: string = '';
  endTimeString: string | Date = '';
  startTimeIso: string = '';
  endTimeIso: string = '';
  duration: number = 0;

  timer: Timer = new Timer();

  constructor(private timerSvc: TimerService, public app: AppComponent) { }

  ngOnInit(): void {
    this.timer = this.app.timerToEdit;
  }

  startTimer() {
    this.startTime = Date.now();
    this.startTimeString = new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString();
    let date = new Date();
    this.startTimeIso = date.toISOString();
  }

  stopTimer() {
    this.endTime = Date.now();
    this.endTimeString = new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString();
    this.endTimeIso = new Date().toISOString();
    this.duration = Number.parseInt(((this.endTime - this.startTime) / 1000 / 60).toFixed(0));

  }

  resetTimer() {
    this.startTime = 0;
    this.endTime = 0;
    this.startTimeString = '';
    this.endTimeString = '';
    this.duration = 0;
  }

  saveTime() {
    let timer = new Timer();
    timer.start = this.startTimeIso;
    timer.end = this.endTimeIso;
    timer.duration = this.duration;
    timer.task = this.app.taskToEdit;
    this.timerSvc.create(timer).subscribe(
      data => {
        this.resetTimer();
      },
      err => {
        console.log("error creating timer");
      }
    );
  }

  updateTimer(timer: Timer) {
    this.timerSvc.update(timer).subscribe(
      data => {

      },
      err => {
        console.log("error updating timer");
      }
    );
  }

}
