import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSideBarComponent } from './admin/admin-side-bar/admin-side-bar.component';
import { HomeFooterComponent } from './home/home-footer/home-footer.component';
import { ProctorSideBarComponent } from './proctor/proctor-side-bar/proctor-side-bar.component';
import { ExamProviderSideBarComponent } from './exam-provider/exam-provider-side-bar/exam-provider-side-bar.component';
import { StudentNavBarComponent } from './student/student-nav-bar/student-nav-bar.component';
import { HomeNavBarComponent } from './home/home-nav-bar/home-nav-bar.component';
import { StudentFooterComponent } from './student/student-footer/student-footer.component';
import { DashNavBarComponent } from './dash/dash-nav-bar/dash-nav-bar.component';
import { DashbardAssetsComponent } from './dash/dashbard-assets/dashbard-assets.component';
import { HomeAssetsComponent } from './dash/home-assets/home-assets.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { InputComponent } from './components/input/input.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AdminSideBarComponent,
    HomeNavBarComponent,
    HomeFooterComponent,
    ProctorSideBarComponent,
    ExamProviderSideBarComponent,
    StudentNavBarComponent,
    StudentFooterComponent,
    DashNavBarComponent,
    DashbardAssetsComponent,
    HomeAssetsComponent,
    InputComponent
  
  ],
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,HttpClientModule, FormsModule   ,
    
    ],
  exports: [
    AdminSideBarComponent,
    HomeNavBarComponent,
    HomeFooterComponent,
    ProctorSideBarComponent,
    ExamProviderSideBarComponent,
    StudentNavBarComponent,
    StudentFooterComponent,
    DashNavBarComponent,
    ReactiveFormsModule,
    InputComponent,
    HttpClientModule,   
    FormsModule   ],
})
export class SharedModule {}
