import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { StudentStep5Component } from './components/student-step-5/student-step-5.component';
import { StudentStepThreeComponent } from './components/student-step-3/student-step-three.component';
import { StudentStepTwoComponent } from './components/student-step-2/student-step-two.component';
import { StudentStep6Component } from './components/student-step-6/student-step-6.component';
import { StudentStep4Component } from './components/student-step-4/student-step-4.component';
import { StudentStepOneComponent } from './components/student-step-1/student-step-one.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IdenImageComponent } from './components/iden-image/iden-image.component';
import { RoomImageComponent } from './components/room-image/room-image.component';
import { MicrophoneTestComponent } from './components/microphone-test/microphone-test.component';


@NgModule({
  declarations: [
    StudentProfileComponent,
    StudentStepOneComponent,
    StudentStepTwoComponent,
    StudentStepThreeComponent,
    StudentStep4Component,
    StudentStep5Component,
    StudentStep6Component,
    IdenImageComponent,
    RoomImageComponent,
    MicrophoneTestComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
