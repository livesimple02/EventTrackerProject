import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';       // Manual Add Import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobService } from './services/job.service';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobFormComponent } from './components/job-form/job-form.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TimerListComponent } from './components/timer-list/timer-list.component';
import { TaskService } from './services/task.service';
import { TimerService } from './services/timer.service';
import { TimerComponent } from './components/timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    JobListComponent,
    JobFormComponent,
    JobDetailComponent,
    TaskFormComponent,
    TimerListComponent,
    TimerComponent
  ],
  imports: [       // Things that live in Angular by default
    BrowserModule,
    AppRoutingModule,
    FormsModule,     // Allows ng Databinding
    HttpClientModule  // Allows http requests
  ],
  providers: [        // Things we want to inject into constructors
    JobService,       // All Services get added to providers
    TaskService,
    TimerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
