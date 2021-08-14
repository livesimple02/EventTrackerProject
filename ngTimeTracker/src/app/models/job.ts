export class Job {

  id: number;
  jobNumber: string;
  customer: string;

  constructor(
    id: number = 0,
    jobNumber: string = '',
    customer: string = ''
  ) {
    this.id = id;
    this.jobNumber = jobNumber;
    this.customer = customer;
  }


}
