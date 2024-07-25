import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProctorLayoutComponent } from './proctor-layout/proctor-layout.component';
import { ProctorDashboardComponent } from './components/proctor-dashboard/proctor-dashboard.component';
import { UserProfileComponent } from '../../shared/user-profile/user-profile/user-profile.component';
import { UpdateEmailComponent } from '../../shared/user-profile/update-email/update-email.component';
import { UpdatePhoneComponent } from '../../shared/user-profile/update-phone/update-phone.component';
import { UpdateNameComponent } from '../../shared/user-profile/update-name/update-name.component';
import { UpdatePasswordComponent } from '../../shared/user-profile/update-password/update-password.component';
import { MyAccountComponent } from '../../shared/user-profile/my-account/my-account.component';

const routes: Routes = [
  {
    path: '',
    component: ProctorLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ProctorDashboardComponent },
      { path: 'profile', redirectTo: 'profile/my-account', pathMatch: 'full' },
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
export class ProctorRoutingModule { }
