import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamProviderRoutingModule } from './exam-provider-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ExamProviderDashboardComponent } from './components/exam-provider-dashboard/exam-provider-dashboard.component';
import { ExamProviderProfileComponent } from './components/exam-provider-profile/exam-provider-profile.component';
import { ExamComponent } from './components/exam/exam.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';

@NgModule({
  declarations: [
    ExamProviderDashboardComponent,
    ExamProviderProfileComponent,
    ExamComponent,
    TestimonialComponent,
    // Add more exam provider components here
  ],
  imports: [
    CommonModule,
    ExamProviderRoutingModule,
    SharedModule
  ]
})
export class ExamProviderModule { }
