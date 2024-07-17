import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControllerService } from '../../../../core/services/form-controller.service';
import { AuthService } from '../../../../core/services/auth.service';
import { GetUserByCredential } from '../../../../core/DTO/get-user-by-credential';
import { CurrentUserData } from '../../../../core/models/current-user-data';
import { ApiResponse } from '../../../../core/utils/ApiResponse';
import { Router } from '@angular/router';
import { EMAIL_CONTROL, PASSWORD_CONTROL } from '../../../../core/constants/form-control.constant';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { ToastMsgService } from '../../../../core/services/toast.service';
import { APP_MESSAGES } from '../../../../core/constants/error-messages.constants';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  loginForm: FormGroup;
  rememberMe: boolean = false; 
  AppMessages = APP_MESSAGES;



  constructor(
    private formController: FormControllerService,
    private authService: AuthService,
    private router: Router,
    private cache : LocalStorageService,
    private toast:ToastMsgService,
  ) {
    this.loginForm = formController.createFormGroup({
      email: EMAIL_CONTROL,
      password: PASSWORD_CONTROL
    });
  }


  login(): void {
    let credentials: GetUserByCredential = <GetUserByCredential>this.loginForm.value;
    this.authService.login(credentials).subscribe(
      (response: ApiResponse<CurrentUserData>) => {
        if (response.status === 200) {
          console.log(response);
          if (this.rememberMe) {  
            this.cache.setItem(this.cache.USER_SESSION_KEY, response.data);
          }
          this.router.navigate(['/home/homepage']);
        } 
      },
      error => {
        console.error('Login error:', error);
        this.toast.showError(this.AppMessages.CHECK_EMAIL_PASSWORD); 
      }
    );
  }
}