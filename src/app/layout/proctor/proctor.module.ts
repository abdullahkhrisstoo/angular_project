import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProctorRoutingModule } from './proctor-routing.module';
import { ProctorDashboardComponent } from './components/proctor-dashboard/proctor-dashboard.component';
import { ProctorProfileComponent } from './components/proctor-profile/proctor-profile.component';


@NgModule({
  declarations: [
    ProctorDashboardComponent,
    ProctorProfileComponent
  ],
  imports: [
    CommonModule,
    ProctorRoutingModule
  ]
})
export class ProctorModule { }
