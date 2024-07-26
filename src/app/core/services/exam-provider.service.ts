import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../utils/ApiResponse';
import { API_ENDPOINTS } from '../constants/api.constants';

import {CreateComplementDTO} from "../DTO/create-complement-dto";
import {UpdateComplementDTO} from "../DTO/update-complement-dto";
import {ExamProviderDTO} from "../DTO/exam-provider-dto";
import {CreateExamProviderDTO} from "../DTO/create-exam-provider-dto";
import {GetExamProviderByUserIdDto} from "../DTO/get-exam-provider-by-user-id-view-model";
import {PlanService} from "./plan.service";
import {Plan} from "../models/plan-model";

@Injectable({
  providedIn: 'root'
})
export class ExamProviderService {
  planSelected?: Plan;
  constructor(private plansApis: PlanService ,private apis:GenericApiHandlerService) {}

  getAllExamProviders(): Observable<ApiResponse<ExamProviderDTO[]>> {
    return this.apis.get<ApiResponse<ExamProviderDTO[]>>(API_ENDPOINTS.GET_ALL_EXAM_PROVIDER)
  }
  fetchAllPlan(): Observable<ApiResponse<Plan[]>> {
    return this.plansApis.GetAllPlan();
  }

  selectPlan(plan: Plan) {
    this.planSelected = plan;
    console.log('Selected plan:', this.planSelected);
  }
  createExamProvider(examProiverViewModel: CreateExamProviderDTO): Observable<ApiResponse<CreateExamProviderDTO>> {
    return this.apis.post<ApiResponse<CreateExamProviderDTO>>(API_ENDPOINTS.CREATE_EXAM_PROVIDER, examProiverViewModel);
  }

  getExamProviderByUserId(userID:number):Observable<ApiResponse<GetExamProviderByUserIdDto>>{
    const endpoint = `${API_ENDPOINTS.GET_EXAM_PROVIDER_BY_USER_ID}/${userID}`;
    return this.apis.get<ApiResponse<GetExamProviderByUserIdDto>>(endpoint);
  }
  updateStateExamProvider(viewModel: UpdateComplementDTO): Observable<any> {
    const endpoint = `${API_ENDPOINTS.UPDATE_COMPLEMENT}`;
    return this.apis.put<ApiResponse<any>>(endpoint,viewModel)
      .pipe(
        map(response => response.data)
      );
  }
}
