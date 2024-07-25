import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProctorRoutingModule } from './proctor-routing.module';
import { ProctorDashboardComponent } from './components/proctor-dashboard/proctor-dashboard.component';
import { ProctorProfileComponent } from './components/proctor-profile/proctor-profile.component';
import { ExamMonitorComponent } from './components/exam-monitor/exam-monitor.component';


@NgModule({
  declarations: [
    ProctorDashboardComponent,
    ProctorProfileComponent,
    ExamMonitorComponent
  ],
  imports: [
    CommonModule,
    ProctorRoutingModule
  ]
})
export class ProctorModule { }
