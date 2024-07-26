import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProctorRoutingModule } from './proctor-routing.module';
import { ProctorDashboardComponent } from './components/proctor-dashboard/proctor-dashboard.component';
import {ProctorReservationComponent} from "./components/proctor-reservation/proctor-reservation.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [



    ProctorReservationComponent
  ],
  imports: [
    CommonModule,
    ProctorRoutingModule,
    NgxDatatableModule,
    FormsModule,
    SharedModule
  ]
})
export class ProctorModule { }
