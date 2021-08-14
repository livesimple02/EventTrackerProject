import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Job } from '../models/job';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  baseUrl = 'http://localhost:8084/';
  url = this.baseUrl + 'api/jobs/';

  constructor( private http: HttpClient ) { }


  index(): Observable<Job[]> {
    return this.http.get<Job[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError("Error getting all Jobs");
      })
    );
  }


}
