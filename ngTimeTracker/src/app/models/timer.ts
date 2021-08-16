import { Timestamp } from "rxjs/internal/operators/timestamp";
import { Task } from "./task";

export class Timer {
  id: number;
  start: string;
  end: string;
  duration: number;
  task: Task;

  constructor(
    id: number = 0,
    start: string = '',
    end: string = '',
    duration: number = 0,
    task: Task = new Task()

  ) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.task = task;
  }
}
