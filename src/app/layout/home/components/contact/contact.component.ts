import { Component } from '@angular/core';
import { ContactService } from '../../../../core/services/contact.service';
import { FormGroup } from '@angular/forms';
import { FormControllerService } from '../../../../core/services/form-controller.service';
import { CONTACT_MSG_CONTROL, EMAIL_CONTROL, FULL_NAME_CONTROL, SUBJECT_CONTACT_CONTROL } from '../../../../core/constants/form-control.constant';
import { ToastMsgService } from '../../../../core/services/toast.service';
import { CreateContactMessageViewModel } from '../../../../core/DTO/create-contact-message-view-model';
import { ApiResponse } from '../../../../core/utils/ApiResponse';
import { APP_MESSAGES } from '../../../../core/constants/error-messages.constants';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  address:String="A108 Adam Street, New York, NY 535022";
  callUs:string="+1 2929 2922";
  emailUs:String="exam@gurdian.com";
  contactForm: FormGroup;
  AppMessages = APP_MESSAGES;

  constructor(
    private contactService: ContactService,
    private formController: FormControllerService,
    private toast: ToastMsgService
  ) {
    this.contactForm = formController.createFormGroup({
      email: EMAIL_CONTROL,
      name: FULL_NAME_CONTROL,
      phone: SUBJECT_CONTACT_CONTROL,
      message: CONTACT_MSG_CONTROL,
  });
  }

  createContact(): void {
    let contactViweModel: CreateContactMessageViewModel = <CreateContactMessageViewModel>this.contactForm.value;
    this.contactService.createContact(contactViweModel).subscribe(
      (response: ApiResponse<CreateContactMessageViewModel>) => {
        console.log(response);
        if (response.status === 200) {
          this.toast.showSuccess(this.AppMessages.CONTACT_SUCCESS);
          this.contactForm.reset()
        }
      },
      error => {
        console.error('Login error:', error);
        this.toast.showError(this.AppMessages.CONTACT_ERROR);
      }
    );
  }
}
