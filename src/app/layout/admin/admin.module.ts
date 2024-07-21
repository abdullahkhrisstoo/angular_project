import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [
    AdminDashboardComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule
  ],
  exports:[
    AdminDashboardComponent,
  ]

})
export class AdminModule { }
