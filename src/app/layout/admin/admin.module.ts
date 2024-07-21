import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { CreateAboutUsComponent } from './components/about-us/create-about-us/add-about-us.component';
import { ReadAllAboutUsComponent } from './components/about-us/read-all-about-us/read-all-about-us.component';
@NgModule({
  declarations: [
    AdminDashboardComponent,
    CreateAboutUsComponent,
    ReadAllAboutUsComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    SharedModule
  ],
  exports:[
    AdminDashboardComponent,

  ]

})
export class AdminModule { }
