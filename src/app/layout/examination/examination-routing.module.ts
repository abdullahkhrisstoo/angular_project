import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExaminationLayoutComponent } from './examination-layout/examination-layout.component';
import { StudentExaminationComponent } from './student/student-examination/student-examination.component';
import { ProctorExaminationComponent } from './proctor/proctor-examination/proctor-examination.component';
import { StudentScoreComponent } from './student/student-score/student-score.component';
import { ComplaintComponent } from './student/complaint/complaint.component';
import { FirstPageComponent } from './first-page/first-page.component';

import { ProctorComponent } from './proctor_test/proctor.component';
import { StartTestComponent } from './start_test/start.component';


const routes: Routes = [
  {
    path: '',
    component: ExaminationLayoutComponent,
    children: [
      { path: 'student', component: StudentExaminationComponent },
      { path: 'proctor', component: ProctorExaminationComponent },
      { path: 'score', component: StudentScoreComponent },
      { path: 'complaint', component: ComplaintComponent },
      // { path: 'first', component: FirstPageComponent },
      // { path: 'test-start', component: StartTestComponent },
      { path: 'test-proctor', component: ProctorComponent },



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


