import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExaminationRoutingModule } from './examination-routing.module';
import { ExaminationBodyComponent } from './student/examination-body/examination-body.component';
import { FormsModule } from '@angular/forms';
import { StudentExaminationComponent } from './student/student-examination/student-examination.component';
import { SharedModule } from "../../shared/shared.module";
import { ProctorExaminationComponent } from './proctor/proctor-examination/proctor-examination.component';
import { StudentScoreComponent } from './student/student-score/student-score.component';
import { ComplaintComponent } from './student/complaint/complaint.component';
import { FirstPageComponent } from './first-page/first-page.component';

import { ProctorComponent } from './proctor_test/proctor.component'
import { StartTestComponent } from './start_test/start.component';

@NgModule({
  declarations: [
    ExaminationBodyComponent,
    StudentExaminationComponent,
    ProctorExaminationComponent,
    StudentScoreComponent,
    ComplaintComponent,
    FirstPageComponent,
    StartTestComponent,
    ProctorComponent
  ],
  imports: [
    CommonModule,
    ExaminationRoutingModule,
    FormsModule,
    SharedModule
],
})
export class ExaminationModule { }
