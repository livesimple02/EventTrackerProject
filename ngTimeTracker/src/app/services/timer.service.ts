import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task';
import { Timer } from '../models/timer';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  baseUrl = environment.baseUrl;
  url = this.baseUrl + 'api/timers';

  constructor(private http: HttpClient) { }

  indexForTaskId(taskId: number): Observable<Timer[]> {
    return this.http.get<Timer[]>(`${this.url}/search/task/${taskId}`, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError("Error getting timers for task id: " + taskId);
      })
    );
  }

  show(id: any): Observable<Timer> {
    return this.http.get<Timer>(`${this.url}/${id}`, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError("Error retrieving Timer by Id");
      })
    );
  }

  create(timer: Timer): Observable<Timer> {
    return this.http.post<Timer>(this.url, timer, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error creating Timer');
      })
    );
  }

  update(timer: Timer): Observable<Timer> {
    return this.http.put<Timer>(this.url + "/" + timer.id, timer, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error updating requested Timer');
      })
    );
  }

  destroy(id: number) {
    return this.http.delete<any>(this.url + "/" + id, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error deleting requested Timer');
      })
    );
  }

  getHttpOptions() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
  }
}
