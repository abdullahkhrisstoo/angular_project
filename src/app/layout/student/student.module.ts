import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';


@NgModule({
  declarations: [
    StudentDashboardComponent,
    StudentProfileComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
