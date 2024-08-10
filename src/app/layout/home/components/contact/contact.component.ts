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
  address:String="Mika Street 889, Amman, Jordan";
  callUs:string="+971 56 207 1275";
  emailUs:String="system.Guardian2000@gmail.com";


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
      subject: SUBJECT_CONTACT_CONTROL,
      message: CONTACT_MSG_CONTROL,
  });
  }

  createContact(): void {
    let contactViweModel: CreateContactMessageViewModel = <CreateContactMessageViewModel>this.contactForm.value;
    this.contactService.create(contactViweModel).subscribe(
      (response: ApiResponse<CreateContactMessageViewModel>) => {
        console.log(response);
        if (response.status === 200) {
          this.contactForm.reset()
        }
      },
      error => {
        console.error('Login error:', error);
      }
    );
  }
}
