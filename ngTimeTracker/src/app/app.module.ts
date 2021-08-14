import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';       // Manual Add Import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobService } from './services/job.service';
import { JobListComponent } from './components/job-list/job-list.component';

@NgModule({
  declarations: [
    AppComponent,
    JobListComponent
  ],
  imports: [       // Things that live in Angular by default
    BrowserModule,
    AppRoutingModule,
    FormsModule,     // Allows ng Databinding
    HttpClientModule  // Allows http requests
  ],
  providers: [        // Things we want to inject into constructors
    JobService       // All Services get added to providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
