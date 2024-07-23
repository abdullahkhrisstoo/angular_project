import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { ReadAllAboutUsComponent } from './components/about-us/read-all-about-us.component';
import { ProctorManageComponent } from './components/proctor-manage/proctor-manage.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
@NgModule({
  declarations: [
    AdminDashboardComponent,

    ReadAllAboutUsComponent,
      ProctorManageComponent,
      ContactUsComponent,

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
