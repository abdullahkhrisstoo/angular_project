import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../utils/ApiResponse';
import { Testimonial } from '../models/testimonal';
import { API_ENDPOINTS } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class TestimonalService {

constructor(private apis:GenericApiHandlerService) { }
// todo: get All
// todo: get by Id
// todo: get pending
// todo: get rejected

// todo: get approved
getApproved(): Observable<ApiResponse<Testimonial[]>>
{
  return this.apis.get<ApiResponse<Testimonial[]>>(API_ENDPOINTS.GET_ALL_APPROVED_TESTIMONAL);
}




// todo: delete
// todo: get by id
// todo: get create



}
