import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControllerService } from '../../../core/services/form-controller.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastMsgService } from '../../../core/services/toast.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { CONFIRM_PASSWORD_CONTROL, NEW_PASSWORD_CONTROL, PASSWORD_CONTROL } from '../../../core/constants/form-control.constant';
import { CurrentUserData } from '../../../core/models/current-user-data';
import { UpdatePasswordDTO } from '../../../core/DTO/update-password-dto';
import { ApiResponse } from '../../../core/utils/ApiResponse';
import { APP_MESSAGES } from '../../../core/constants/error-messages.constants';
import { matchPasswordValidator } from '../../../core/constants/regex-patterns.constants';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  updatePasswordForm: FormGroup;
  AppMessages = APP_MESSAGES;
  userData: CurrentUserData | null = null;

  constructor(
    private formController: FormControllerService,
    private authService: AuthService,
    private toast: ToastMsgService,
    private cache: LocalStorageService
  ) {

    this.updatePasswordForm = this.formController.createFormGroup({
      lastPassword: PASSWORD_CONTROL,
      newPassword: NEW_PASSWORD_CONTROL,
      confirmPassword: CONFIRM_PASSWORD_CONTROL,
    });
    this.updatePasswordForm.setValidators(matchPasswordValidator());

  }

  ngOnInit(): void {
    this.userData = this.cache.getItem(this.cache.USER_SESSION_KEY);
    console.log('User Data in ngOnInit:', this.userData);
  }

  resetForm(): void {
    this.updatePasswordForm.reset();
  }

  UpdatePassword(): void {
    if (this.updatePasswordForm.invalid) {
      return;

    }


    let user: UpdatePasswordDTO = <UpdatePasswordDTO>this.updatePasswordForm.value;
    user.credentialId = this.userData!.credentialId;
    this.authService.updatePassword(user).subscribe(
      (response: ApiResponse<any>) => {
        if (response.status === 200) {
          this.toast.showSuccess(this.AppMessages.UPDATE_PASSWORD_SUCCESS);
          console.log('UpdatePassword successful:', response);
          this.resetForm();
        }
      },
      error => {
        console.error('UpdatePassword error:', error);
        this.toast.showError(this.AppMessages.ERROR_TO_UPDATE_PASSWORD);
      }
    );
  }

  getPasswordMismatchError(): string | null {
    const formErrors = this.updatePasswordForm.errors as { [key: string]: any } | null;
    if (formErrors?.['passwordMismatch']) {
      return 'Passwords do not match.';
    }
    return null;
  }
}
