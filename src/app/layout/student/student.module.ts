import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { StudentStepOneComponent } from './components/student-step-1/student-step-one.component';
import { StudentStepTwoComponent } from './components/student-step-2/student-step-two.component';
import { SharedModule } from '../../shared/shared.module';
import { StudentStepThreeComponent } from './components/student-step-3/student-step-three.component';
import { StudentStep4Component } from './components/student-step-4/student-step-4.component';
import { StudentStep5Component } from './components/student-step-5/student-step-5.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StudentDashboardComponent,
    StudentProfileComponent,
    StudentStepOneComponent,
    StudentStepTwoComponent,
    StudentStepThreeComponent,
    StudentStep4Component,
    StudentStep5Component,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
