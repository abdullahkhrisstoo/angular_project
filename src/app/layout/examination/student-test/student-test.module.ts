import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentTestRoutingModule } from './student-test-routing.module';
import { StudentTestLayoutComponent } from './student-test-layout/student-test-layout.component';
import { CameraTestComponent } from './components/camera-test/camera-test.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RoomImageComponent } from './components/room-image/room-image.component';
import { MicrophoneTestComponent } from './components/microphone-test/microphone-test.component';
import { IdenImageComponent } from './components/iden-image/iden-image.component';
import { CheckInProcessComponent } from './components/check-in-process/check-in-process.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExamRulesComponent } from './components/exam-rules/exam-rules.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { StartComponent } from './components/start/start.component';

@NgModule({
  declarations: [
    StudentTestLayoutComponent,
    CameraTestComponent,
    RoomImageComponent,
    MicrophoneTestComponent,
    IdenImageComponent,
    CheckInProcessComponent,
    ExamRulesComponent,
    StartComponent,
  ],
  imports: [
    CommonModule,
    StudentTestRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxSpinnerModule
  ]
})
export class StudentTestModule { }
