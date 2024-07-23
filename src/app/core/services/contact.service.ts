import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';

import { Observable } from 'rxjs';
import { CreateContactMessageViewModel } from '../DTO/create-contact-message-view-model';
import { ApiResponse } from '../utils/ApiResponse';
import { API_ENDPOINTS } from '../constants/api.constants';
import { ContactModel } from '../models/contact-us-model';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

constructor(private apis:GenericApiHandlerService) {}

//todo:create
create(contactmessageViewModel: CreateContactMessageViewModel): Observable<ApiResponse<CreateContactMessageViewModel>> {
  return this.apis.post<ApiResponse<CreateContactMessageViewModel>>(API_ENDPOINTS.CREATE_CONTACT, contactmessageViewModel).pipe();
}


//todo:get All
getAll(): Observable<ApiResponse<ContactModel[]>> {
  return this.apis.get<ApiResponse<ContactModel[]>>(API_ENDPOINTS.GET_ALL_CONTACT);
}

//todo:get by id
getById(id:number): Observable<ApiResponse<ContactModel>> {
  const endpoint = `${API_ENDPOINTS.GET_CONTACT_BY_ID}/${id}`;
  return this.apis.get<ApiResponse<ContactModel>>(endpoint);
}

//todo:delete
delete(id:number): Observable<ApiResponse<ContactModel>> {
  const endpoint = `${API_ENDPOINTS.DELETE_CONTACT}/${id}`;
  return this.apis.delete<ApiResponse<ContactModel>>(endpoint);
}
}
