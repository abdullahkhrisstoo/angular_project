import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { APP_MESSAGES } from '../../../core/constants/error-messages.constants';
import { CurrentUserData } from '../../../core/models/current-user-data';
import { FormControllerService } from '../../../core/services/form-controller.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastMsgService } from '../../../core/services/toast.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { PASSWORD_CONTROL, PHONE_CONTROL } from '../../../core/constants/form-control.constant';
import { UpdatePhoneDTO } from '../../../core/DTO/Update-Phone-dto';
import { ApiResponse } from '../../../core/utils/ApiResponse';

@Component({
  selector: 'app-update-phone',
  templateUrl: './update-phone.component.html',
  styleUrl: './update-phone.component.css'
})
export class UpdatePhoneComponent implements OnInit{
  updatePhoneForm: FormGroup;
  AppMessages = APP_MESSAGES;
  userData: CurrentUserData|null=null;

  constructor(
    private formController: FormControllerService,
    private authService: AuthService,
    private toast: ToastMsgService,
    private cache: LocalStorageService,

  ) {
    this.updatePhoneForm = this.formController.createFormGroup({
      phoneNo: PHONE_CONTROL,
      password: PASSWORD_CONTROL,
    });
  }
  ngOnInit(): void {
    this.userData = this.cache.getItem(this.cache.USER_SESSION_KEY);
    console.log('User Data in ngOnInit:', this.userData);
  }
  resetForm():void{
    this.updatePhoneForm.reset();
  }

  UpdatePhone(): void {
    if (this.updatePhoneForm.invalid) {
      return;
    }
    let user: UpdatePhoneDTO = <UpdatePhoneDTO>this.updatePhoneForm.value;
    user.userId = this.userData?.userId;
    console.log(user);
    this.authService.updatePhone(user).subscribe(
      (response: ApiResponse<any>) => {
        if (response.status === 200) {
          this.toast.showSuccess(this.AppMessages.UPDATE_EMAIL_SUCCESS);
          this.userData!.phonenum = user.phoneNo??"";

          this.cache.setItem(this.cache.USER_SESSION_KEY,this.userData);
          console.log('updatePhone successful:', response);
          this.resetForm();

        }
      },
      error => {
        console.error('updatePhone error:', error);
        this.toast.showError(this.AppMessages.ERROR_TO_UPDATE_PHONE);

      }
    );
  }
}
