import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProctorLayoutComponent } from './proctor-layout/proctor-layout.component';
import { ProctorDashboardComponent } from './components/proctor-dashboard/proctor-dashboard.component';
import { ProctorProfileComponent } from './components/proctor-profile/proctor-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProctorLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ProctorDashboardComponent },
      { path: 'profile', component: ProctorProfileComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProctorRoutingModule { }
