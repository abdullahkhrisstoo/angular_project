import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamProviderLayoutComponent } from './exam-provider-layout/exam-provider-layout.component';
import { ExamProviderDashboardComponent } from './components/exam-provider-dashboard/exam-provider-dashboard.component';
import { ExamProviderProfileComponent } from './components/exam-provider-profile/exam-provider-profile.component';
import { UserProfileComponent } from '../../shared/user-profile/user-profile/user-profile.component';
import { UpdateEmailComponent } from '../../shared/user-profile/update-email/update-email.component';
import { UpdatePhoneComponent } from '../../shared/user-profile/update-phone/update-phone.component';
import { UpdateNameComponent } from '../../shared/user-profile/update-name/update-name.component';
import { UpdatePasswordComponent } from '../../shared/user-profile/update-password/update-password.component';
import { MyAccountComponent } from '../../shared/user-profile/my-account/my-account.component';
import { ChoosePlanComponent } from '../../shared/user-profile/choose-plan/choose-plan.component';

const routes: Routes = [
  {
    path: '',
    component: ExamProviderLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'profile', redirectTo: 'profile/my-account', pathMatch: 'full' },
      { path: 'dashboard', component: ExamProviderDashboardComponent },
      { path: 'profile', component: UserProfileComponent, children: [
        { path: 'update-email', component: UpdateEmailComponent },
        { path: 'update-phone', component: UpdatePhoneComponent },
        { path: 'update-name', component: UpdateNameComponent },
        { path: 'update-password', component: UpdatePasswordComponent },
        { path: 'my-account', component: MyAccountComponent },
        { path: 'choose-plan', component: ChoosePlanComponent },
      ]}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamProviderRoutingModule { }
