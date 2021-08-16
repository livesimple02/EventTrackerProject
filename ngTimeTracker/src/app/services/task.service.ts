import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl = 'http://localhost:8084/';
  url = this.baseUrl + 'api/tasks';

  constructor(private http: HttpClient) { }

  indexForJobId(jobId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}/search/job/${jobId}`, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError("Error getting tasks for job id: " + jobId);
      })
    );
  }

  show(id: any): Observable<Task> {
    return this.http.get<Task>(`${this.url}/${id}`, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError("Error retrieving Task by Id");
      })
    );
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error creating Task');
      })
    );
  }

  update(task: Task): Observable<Task> {
    return this.http.put<Task>(this.url + "/" + task.id, task, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error updating requested Task');
      })
    );
  }

  destroy(id: number) {
    return this.http.delete<any>(this.url + "/" + id, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error deleting requested Task');
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
