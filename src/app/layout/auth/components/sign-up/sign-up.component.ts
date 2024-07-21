import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { CreateAccountViewModel } from '../../../../core/DTO/create-account-view-model';
import { ApiResponse } from '../../../../core/utils/ApiResponse';
import { ToastMsgService } from '../../../../core/services/toast.service';
import { APP_MESSAGES } from '../../../../core/constants/error-messages.constants';
import { CurrentUserData } from '../../../../core/models/current-user-data';
import { FormControllerService } from '../../../../core/services/form-controller.service';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { EMAIL_CONTROL, FIRST_NAME_CONTROL, LAST_NAME_CONTROL, PASSWORD_CONTROL, PHONE_CONTROL } from '../../../../core/constants/form-control.constant';
import { EXAM_PROVIDER_ROLE } from '../../../../core/constants/app.constants';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  AppMessages = APP_MESSAGES;

  constructor(
    private formController: FormControllerService,
    private authService: AuthService,
    private toast: ToastMsgService
  ) {
    this.signUpForm = this.formController.createFormGroup({
      firstName: FIRST_NAME_CONTROL,
      lastName: LAST_NAME_CONTROL,
      email: EMAIL_CONTROL,
      phonenum: PHONE_CONTROL,
      password: PASSWORD_CONTROL,


    });
  }

  register(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    let user: CreateAccountViewModel = <CreateAccountViewModel>this.signUpForm.value;
    user.roleId = EXAM_PROVIDER_ROLE;

    this.authService.register(user).subscribe(
      (response: ApiResponse<CurrentUserData>) => {
        if (response.status === 200) {
          this.signUpForm.reset();
          console.log('Registration successful:', response);
        }
      },
      error => {
        console.error('Registration error:', error);
        this.toast.showError(this.AppMessages.CHECK_EMAIL_PASSWORD);
      }
    );
  }
}
