import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { StudentLayoutComponent } from './student/student-layout/student-layout.component';
import { HomeLayoutComponent } from './home/home-layout/home-layout.component';
import { ProctorLayoutComponent } from './proctor/proctor-layout/proctor-layout.component';
import { ExamProviderLayoutComponent } from './exam-provider/exam-provider-layout/exam-provider-layout.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { AdminModule } from "./admin/admin.module";
import { ExaminationLayoutComponent } from './examination/examination-layout/examination-layout.component';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    StudentLayoutComponent,
    HomeLayoutComponent,
    ProctorLayoutComponent,
    ExamProviderLayoutComponent,
    AuthLayoutComponent,
    ExaminationLayoutComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    AdminModule,
    NgxSpinnerModule
],
  exports: [
    AdminLayoutComponent,
    StudentLayoutComponent,
    HomeLayoutComponent,
    ProctorLayoutComponent,
    ExamProviderLayoutComponent,
    AuthLayoutComponent


  ],
})
export class LayoutModule { }
