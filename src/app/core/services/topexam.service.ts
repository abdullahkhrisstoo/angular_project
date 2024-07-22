import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';
import { ApiResponse } from '../utils/ApiResponse';
import { API_ENDPOINTS } from '../constants/api.constants';
import { Observable } from 'rxjs';  // تأكد من الاستيراد الصحيح لـ Observable
import { TopExamModle } from '../models/TopExamModle'; // تأكد من استيراد النموذج الصحيح

@Injectable({
  providedIn: 'root'
})
export class TopexamService {
  constructor(private apis: GenericApiHandlerService) { }

  getAll(): Observable<ApiResponse<TopExamModle[]>> {
    return this.apis.get<ApiResponse<TopExamModle[]>>(API_ENDPOINTS.GET_TOP_EXAM);
  }
}
