import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChoosePlanComponent } from './user-profile/choose-plan/choose-plan.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChatSectionComponent } from './components/input/chat-section/chat-section.component';
import { DisableRightClickDirective } from '../core/directive/disable-right-click.directive';
import { RestrictedScreenComponent } from './components/restricted-screen/restricted-screen.component';
import { UnsavedChangesDirective } from '../core/directive/unsaved-changes.directive';
import { DraggableComponent } from './components/draggable/draggable.component';
@NgModule({
  declarations: [
    InputComponent,
    MyAccountComponent,
    UserProfileComponent,
    UpdateEmailComponent,
    UpdatePhoneComponent,
    UpdateNameComponent,
    UpdatePasswordComponent,
    ChoosePlanComponent,
    ChatSectionComponent,
    DisableRightClickDirective,
    RestrictedScreenComponent,
    UnsavedChangesDirective,
    DraggableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    UserProfileRoutingModule,
    NgxDatatableModule,
    FontAwesomeModule,

  ],
  exports: [
    ReactiveFormsModule,
    InputComponent,
    HttpClientModule,
    FormsModule,
    UserProfileComponent,
    UpdateEmailComponent,
    UpdatePhoneComponent,
    UpdateNameComponent,
    UpdatePasswordComponent,
    MyAccountComponent,
    UserProfileRoutingModule,
    NgxDatatableModule,
    CommonModule,
    FontAwesomeModule,
    ChatSectionComponent,
    DisableRightClickDirective,
    UnsavedChangesDirective,
    DraggableComponent

  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
