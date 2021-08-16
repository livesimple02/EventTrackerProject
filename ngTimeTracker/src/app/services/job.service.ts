import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { Job } from '../models/job';
import { catchError } from 'rxjs/operators';
import { JobListComponent } from '../components/job-list/job-list.component';
import { JobFormComponent } from '../components/job-form/job-form.component';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { Timer } from '../models/timer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  baseUrl = environment.baseUrl;;
  url = this.baseUrl + 'api/jobs/';

  private updateJobListRequestSource = new Subject<boolean>();
  updateJobListRequest$ = this.updateJobListRequestSource.asObservable();

  private showJobDetailRequestSource = new Subject<Job>();
  showJobDetailRequest$ = this.showJobDetailRequestSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private app: AppComponent
  ) {}

  index(): Observable<Job[]> {
    return this.http.get<Job[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error getting all Jobs');
      })
    );
  }

  show(id: any): Observable<Job> {
    return this.http.get<Job>(this.url + id, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error retrieving Job by Id');
      })
    );
  }

  create(job: Job): Observable<Job> {
    return this.http.post<Job>(this.url, job, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error creating Job');
      })
    );
  }

  update(job: Job): Observable<Job> {
    return this.http
      .put<Job>(this.url + job.id, job, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Error updating requested Job');
        })
      );
  }

  destroy(id: number) {
    return this.http.delete<any>(this.url + id, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error deleting requested Job');
      })
    );
  }

  getHttpOptions() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return httpOptions;
  }

  sendUpdateListRequest(request: boolean) {
    this.updateJobListRequestSource.next(request);
  }

  showJobDetail(job: Job) {
    this.showJobDetailRequestSource.next(job);
    this.app.result = '';
    this.app.workingPaneView = 'jobDetail';
    this.app.timerWindowView = '';
    this.app.timerToEdit = new Timer();
  }
}
