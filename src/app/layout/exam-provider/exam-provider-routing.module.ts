import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamProviderLayoutComponent } from './exam-provider-layout/exam-provider-layout.component';
import { ExamProviderDashboardComponent } from './components/exam-provider-dashboard/exam-provider-dashboard.component';
import { ExamProviderProfileComponent } from './components/exam-provider-profile/exam-provider-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ExamProviderLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ExamProviderDashboardComponent },
      { path: 'profile', component: ExamProviderProfileComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamProviderRoutingModule { }
