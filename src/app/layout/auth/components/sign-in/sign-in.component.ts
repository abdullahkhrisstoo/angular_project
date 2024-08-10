import { ExamProviderService } from './../../../../core/services/exam-provider.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'; // Add FormControl import
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
import { jwtDecode } from "jwt-decode";
import { ADMIN_ROLE, EXAM_PROVIDER_ROLE, PROCTOR_ROLE } from '../../../../core/constants/app.constants';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  loginForm: FormGroup;
  AppMessages = APP_MESSAGES;

  constructor(
    private formController: FormControllerService,
    private authService: AuthService,
    private router: Router,
    private cache: LocalStorageService,
    private toast: ToastMsgService,
    private examProviderService:ExamProviderService
  ) {
    this.loginForm = new FormGroup({
      email: EMAIL_CONTROL,
      password: PASSWORD_CONTROL,
      rememberMe: new FormControl(false)
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials: GetUserByCredential = <GetUserByCredential>this.loginForm.value;

    this.authService.login(credentials).subscribe(
      (response: ApiResponse<CurrentUserData>) => {
        if (response.status === 200) {

          const roleId = response.data.roleId;
          switch (roleId) {
            case EXAM_PROVIDER_ROLE:
              this.examProviderService.getExamProviderByUserId(response.data.userId)
              .subscribe(
                response=>{

                console.log(response);
                localStorage.setItem('examProviderId',response.data.examProviderId.toString())

              },error=>{


              });
              this.router.navigate(['/exam-provider/profile']);
              break;
            case PROCTOR_ROLE:
              this.router.navigate(['/proctor/profile']);
              break;
            case ADMIN_ROLE:
              this.router.navigate(['/admin/profile']);
              break;
            default:
              console.warn('Unknown role:', roleId);
              break;
          }

      //    localStorage.setItem('userId',response.data.userId.toString());
          if (this.loginForm.get('rememberMe')?.value) {
            // Implement remember me logic here if needed
          }

          this.loginForm.reset();
        } else {
        }
      },
      error => {
        console.error('Login error:', error);
      }
    );
  }

}
