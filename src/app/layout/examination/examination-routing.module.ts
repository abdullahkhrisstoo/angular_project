import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExaminationLayoutComponent } from './examination-layout/examination-layout.component';
import { StudentExaminationComponent } from './student/student-examination/student-examination.component';
import { ProctorExaminationComponent } from './proctor/proctor-examination/proctor-examination.component';

const routes: Routes = [
  {
    path: '',
    component: ExaminationLayoutComponent,
    children: [
      { path: 'student', component: StudentExaminationComponent },
      { path: 'proctor', component: ProctorExaminationComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExaminationRoutingModule { }


