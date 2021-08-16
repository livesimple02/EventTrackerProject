import { Job } from "./job";

export class Task {

  id: number;
  title: string;
  description: string;
  totalTimeMin: number;
  job: Job;

  constructor(
    id: number = 0,
    title: string = '',
    description: string = '',
    totalTimeMin: number = 0,
    job: Job = new Job()

  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.totalTimeMin = totalTimeMin;
    this.job = job;
  }
}
