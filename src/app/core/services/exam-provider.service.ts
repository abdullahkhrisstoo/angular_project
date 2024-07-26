import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanService } from './plan.service';
import { Plan } from '../models/plan-model';
import { ApiResponse } from '../utils/ApiResponse';
import { CreateExamProviderViewModel } from '../DTO/create-exam-provider-view-model';
import { GenericApiHandlerService } from './api.service';
import { API_ENDPOINTS } from '../constants/api.constants';
import { GetExamProviderByUserIdDto } from '../DTO/get-exam-provider-by-user-id-view-model';

@Injectable({
  providedIn: 'root',
})
export class ExamProviderService {
  planSelected?: Plan;

  constructor(private plansApis: PlanService , private apis:GenericApiHandlerService) {}

  fetchAllPlan(): Observable<ApiResponse<Plan[]>> {
    return this.plansApis.GetAllPlan();
  }

  selectPlan(plan: Plan) {
    this.planSelected = plan;
    console.log('Selected plan:', this.planSelected);
  }

  createExamProvider(examProiverViewModel: CreateExamProviderViewModel): Observable<ApiResponse<CreateExamProviderViewModel>> {
    return this.apis.post<ApiResponse<CreateExamProviderViewModel>>(API_ENDPOINTS.CREATE_EXAM_PROVIDER, examProiverViewModel);
  }

  getExamProviderByUserId(userID:number):Observable<ApiResponse<GetExamProviderByUserIdDto>>{
    const endpoint = `${API_ENDPOINTS.GET_EXAM_PROVIDER_BY_USER_ID}/${userID}`;
    return this.apis.get<ApiResponse<GetExamProviderByUserIdDto>>(endpoint);
  }
}









