import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';

import { ExamProviderComponent } from './components/exam-provider/exam-provider.component';
import { PlanComponent } from './components/plan/plan.component';

import {CustomDateFormatPipe} from "../../core/pipes/custom-date-format.pipe";
import {ProctorManageComponent} from "./components/proctor-manage/proctor-manage.component";
import {ContactUsComponent} from "./components/contact-us/contact-us.component";
import {ReadAllAboutUsComponent} from "./components/about-us/read-all-about-us.component";
import { PlanInvoiceComponent } from './components/plan-invoice/plan-invoice.component';
import { ReservationInvoiceComponent } from './components/reservation-invoice/reservation-invoice.component';
@NgModule({
  declarations: [

    ReadAllAboutUsComponent,
    ExamProviderComponent,
    PlanComponent,
    ProctorManageComponent,
    ContactUsComponent,

    CustomDateFormatPipe,
    PlanInvoiceComponent,
    ReservationInvoiceComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    SharedModule
  ],
  exports:[


  ]

})
export class AdminModule { }
