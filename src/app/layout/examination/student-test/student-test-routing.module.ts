import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentTestLayoutComponent } from './student-test-layout/student-test-layout.component';
import { MicrophoneTestComponent } from './components/microphone-test/microphone-test.component';
import { RoomImageComponent } from './components/room-image/room-image.component';
import { IdenImageComponent } from './components/iden-image/iden-image.component';
import { CheckInProcessComponent } from './components/check-in-process/check-in-process.component';
import { ExamRulesComponent } from './components/exam-rules/exam-rules.component';
import { CameraTestComponent } from './components/camera-test/camera-test.component';
import { StartComponent } from './components/start/start.component';


const routes: Routes = [
  {
    path: '',
    component: StudentTestLayoutComponent,

    children: [
      { path: 'check', component: CheckInProcessComponent },
      { path: 'iden-test', component: IdenImageComponent },
      { path: 'room-test', component: RoomImageComponent },
      { path: 'mic-test', component: MicrophoneTestComponent },
      { path: 'exam-rules', component: ExamRulesComponent },
      { path: 'cam-test', component: CameraTestComponent },
      { path: 'start', component: StartComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentTestRoutingModule { }
