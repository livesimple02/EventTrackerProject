import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { JobListComponent } from './components/job-list/job-list.component';

const routes: Routes = [
  { path: '', component: JobListComponent, outlet: 'jobList' },
  { path: 'home', component: JobListComponent, outlet: 'jobList' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
