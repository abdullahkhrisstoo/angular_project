import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExaminationLayoutComponent } from './examination-layout/examination-layout.component';
import { StudentExaminationComponent } from './student/student-examination/student-examination.component';
import { ProctorExaminationComponent } from './proctor/proctor-examination/proctor-examination.component';
import { StudentScoreComponent } from './student/student-score/student-score.component';

const routes: Routes = [
  {
    path: '',
    component: ExaminationLayoutComponent,
    children: [
      { path: 'student', component: StudentExaminationComponent },
      { path: 'proctor', component: ProctorExaminationComponent },
      { path: 'score', component: StudentScoreComponent },


      {
        path: 'student-test',
        loadChildren: () => import('./student-test/student-test.module').then(m => m.StudentTestModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExaminationRoutingModule { }


