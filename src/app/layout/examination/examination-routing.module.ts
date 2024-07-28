import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExaminationLayoutComponent } from './examination-layout/examination-layout.component';
import { ExaminationBodyComponent } from './components/examination-body/examination-body.component';

const routes: Routes = [
  {
    path: '',
    component: ExaminationLayoutComponent,
    children: [
      // { path: 'body', component: ExaminationBodyComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExaminationRoutingModule { }
