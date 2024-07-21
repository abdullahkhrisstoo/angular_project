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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserProfileRoutingModule } from './user-profile/user-profile-routing.module';
import { UpdateEmailComponent } from './user-profile/update-email/update-email.component';
import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';
import { UpdatePhoneComponent } from './user-profile/update-phone/update-phone.component';
import { UpdateNameComponent } from './user-profile/update-name/update-name.component';
import { UpdatePasswordComponent } from './user-profile/update-password/update-password.component';
import { MyAccountComponent } from './user-profile/my-account/my-account.component';
import { AuthService } from '../core/services/auth.service';
import { TokenInterceptor } from '../core/interceptors/auth-interceptor';


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
    InputComponent,
    MyAccountComponent,
    UserProfileComponent,
    UpdateEmailComponent,
    UpdatePhoneComponent,
    UpdateNameComponent,
    UpdatePasswordComponent,



  ],
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,HttpClientModule, FormsModule   , UserProfileRoutingModule //
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
    FormsModule ,
    UserProfileComponent,
    UpdateEmailComponent,
    UpdatePhoneComponent,
    UpdateNameComponent,
    UpdatePasswordComponent,
    MyAccountComponent,
    UserProfileRoutingModule,

     ],
     providers:[AuthService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      },
     ]
})
export class SharedModule {}
