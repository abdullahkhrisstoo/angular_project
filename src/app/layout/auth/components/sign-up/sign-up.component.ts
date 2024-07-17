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

      
    });
  }

  get f() { return this.signUpForm.controls; }

  register(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    const user: CreateAccountViewModel = this.signUpForm.value;

    this.authService.register(user).subscribe(
      (response: ApiResponse<CurrentUserData>) => {
        if (response.status === 200) {
          console.log('Registration successful:', response);
          // Optionally navigate to a success page or handle success message
        }
      },
      error => {
        console.error('Registration error:', error);
        this.toast.showError(this.AppMessages.CHECK_EMAIL_PASSWORD);
        // Handle registration error, display toast message, etc.
      }
    );
  }
}
