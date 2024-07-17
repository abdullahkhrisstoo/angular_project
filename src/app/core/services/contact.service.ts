import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CreateContactMessageViewModel } from '../DTO/create-contact-message-view-model';
import { ApiResponse } from '../utils/ApiResponse';
import { API_ENDPOINTS } from '../constants/api.constants';
import { ContactMessageModel } from '../models/contact-us-model';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

constructor(private apis:GenericApiHandlerService) {}

//todo:create
createContact(contactmessageViewModel: CreateContactMessageViewModel): Observable<ApiResponse<CreateContactMessageViewModel>> {
  return this.apis.post<ApiResponse<CreateContactMessageViewModel>>(API_ENDPOINTS.CREATE_CONTACT, contactmessageViewModel).pipe();
}


//todo:get All

//todo:get by id

//todo:delete
}
