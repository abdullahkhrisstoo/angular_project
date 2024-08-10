import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../utils/ApiResponse';
import { API_ENDPOINTS } from '../constants/api.constants';
import { ExamProviderLinkDTO } from '../DTO/exam-provider-link-dto';
import { UpdateExamProviderLinkDTO } from '../DTO/update-exam-provider-link-dto';

@Injectable({
  providedIn: 'root'
})
export class ExamProviderLinkService {

  constructor(private apis:GenericApiHandlerService) {}

  getAllExamProviderLinks(): Observable<ApiResponse<ExamProviderLinkDTO[]>> {
    return this.apis.get<ApiResponse<ExamProviderLinkDTO[]>>(API_ENDPOINTS.GET_ALL_EXAM_PROVIDER_LINKS)
  }

  getExamProviderLinkByCompany(companyName:string): Observable<ApiResponse<ExamProviderLinkDTO[]>> {
    const endpoint = `${API_ENDPOINTS.GET_EXAM_PROVIDER_LINK_BY_COMPANY}?companyName=${companyName}`;
    return this.apis.get<ApiResponse<ExamProviderLinkDTO[]>>(endpoint)
  }


  updateExamProviderLink(viewModel: UpdateExamProviderLinkDTO): Observable<any> {
    const endpoint = `${API_ENDPOINTS.UPDATE_EXAM_PROVIDER_LINK}`;
    return this.apis.put<ApiResponse<any>>(endpoint,viewModel)
      .pipe(
        map(response => response)
      );
  }
}
