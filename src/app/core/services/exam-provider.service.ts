import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../utils/ApiResponse';
import { API_ENDPOINTS } from '../constants/api.constants';

import {CreateComplementDTO} from "../DTO/create-complement-dto";
import {UpdateComplementDTO} from "../DTO/update-complement-dto";
import {ExamProviderDTO} from "../DTO/exam-provider-dto";
import {CreateExamProviderDTO} from "../DTO/create-exam-provider-dto";

@Injectable({
  providedIn: 'root'
})
export class ExamProviderService {

  constructor(private apis:GenericApiHandlerService) {}

  getAllExamProviders(): Observable<ApiResponse<ExamProviderDTO[]>> {
    return this.apis.get<ApiResponse<ExamProviderDTO[]>>(API_ENDPOINTS.GET_ALL_EXAM_PROVIDER)
  }

  createExamProvider(viewModel: CreateExamProviderDTO): Observable<any> {
    return this.apis.post<ApiResponse<any>>(API_ENDPOINTS.CREATE_EXAM_PROVIDER, viewModel)
      .pipe();
  }

  updateStateExamProvider(viewModel: UpdateComplementDTO): Observable<any> {
    const endpoint = `${API_ENDPOINTS.UPDATE_COMPLEMENT}`;
    return this.apis.put<ApiResponse<any>>(endpoint,viewModel)
      .pipe(
        map(response => response.data)
      );
  }
}
