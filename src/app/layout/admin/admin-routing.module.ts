import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserProfileComponent } from '../../shared/user-profile/user-profile/user-profile.component';
import { UpdateEmailComponent } from '../../shared/user-profile/update-email/update-email.component';
import { UpdatePhoneComponent } from '../../shared/user-profile/update-phone/update-phone.component';
import { UpdateNameComponent } from '../../shared/user-profile/update-name/update-name.component';
import { UpdatePasswordComponent } from '../../shared/user-profile/update-password/update-password.component';
import { MyAccountComponent } from '../../shared/user-profile/my-account/my-account.component';
import { ReadAllAboutUsComponent } from './components/about-us/read-all-about-us.component';
import { ProctorManageComponent } from './components/proctor-manage/proctor-manage.component';
import { ContactComponent } from '../home/components/contact/contact.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'profile', redirectTo: 'profile/my-account', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'about-us', component: ReadAllAboutUsComponent },
      { path: 'manage-proctor', component: ProctorManageComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'profile', component: UserProfileComponent, children: [
        { path: 'update-email', component: UpdateEmailComponent },
        { path: 'update-phone', component: UpdatePhoneComponent },
        { path: 'update-name', component: UpdateNameComponent },
        { path: 'update-password', component: UpdatePasswordComponent },
        { path: 'my-account', component: MyAccountComponent }
      ]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
