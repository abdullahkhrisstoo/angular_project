import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamProviderRoutingModule } from './exam-provider-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ExamComponent } from './components/exam/exam.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { ApiDetailsComponent } from './components/api-details/api-details.component';

@NgModule({
  declarations: [

    ExamComponent,
    TestimonialComponent,
    ApiDetailsComponent,
    // Add more exam provider components here
  ],
  imports: [
    CommonModule,
    ExamProviderRoutingModule,
    SharedModule
  ]
})
export class ExamProviderModule { }
