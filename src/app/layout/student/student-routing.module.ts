import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLayoutComponent } from './student-layout/student-layout.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { StudentStepTwoComponent } from './components/student-step-2/student-step-two.component';
import { StudentStep4Component } from './components/student-step-4/student-step-4.component';
import { StudentStep5Component } from './components/student-step-5/student-step-5.component';
import { StudentStep6Component } from './components/student-step-6/student-step-6.component';
import { StudentStepThreeComponent } from './components/student-step-3/student-step-three.component';
import { StudentStepOneComponent } from './components/student-step-1/student-step-one.component';
import { IdenImageComponent } from './components/iden-image/iden-image.component';
import { RoomImageComponent } from './components/room-image/room-image.component';
import { MicrophoneTestComponent } from './components/microphone-test/microphone-test.component';

const routes: Routes = [
  {
    path: '',
    component: StudentLayoutComponent,
    children: [
      // { path: '', redirectTo: 'dash', pathMatch: 'full' },
      { path: 'step-1', component: StudentStepOneComponent },
      { path: 'step-2', component: StudentStepTwoComponent },
      { path: 'step-3', component: StudentStepThreeComponent },
      { path: 'step-4', component: StudentStep4Component },
      { path: 'step-5', component: StudentStep5Component },
      { path: 'step-6', component: StudentStep6Component },
      { path: 'iden', component: IdenImageComponent },
      { path: 'room', component: RoomImageComponent },
      { path: 'mic', component: MicrophoneTestComponent },
      { path: 'profile', component: StudentProfileComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
