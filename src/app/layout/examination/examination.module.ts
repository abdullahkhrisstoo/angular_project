import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExaminationRoutingModule } from './examination-routing.module';
import { ExaminationBodyComponent } from './student/examination-body/examination-body.component';
import { FormsModule } from '@angular/forms';
import { StudentExaminationComponent } from './student/student-examination/student-examination.component';
import { SharedModule } from "../../shared/shared.module";
import { ProctorExaminationComponent } from './proctor/proctor-examination/proctor-examination.component';

@NgModule({
  declarations: [
    ExaminationBodyComponent,
    StudentExaminationComponent,
    ProctorExaminationComponent,


  ],
  imports: [
    CommonModule,
    ExaminationRoutingModule,
    FormsModule,
    SharedModule
],
})
export class ExaminationModule { }
