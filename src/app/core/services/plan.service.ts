import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';
import { ApiResponse } from '../utils/ApiResponse';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { Plan } from '../models/plan-model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private apiHandler: GenericApiHandlerService) { }

  GetAllPlanWithFeatures(): Observable<ApiResponse<Plan[]>> {
    return this.apiHandler.get<ApiResponse<Plan[]>>(API_ENDPOINTS.GET_ALL_PLANS_WITH_FEATURES).pipe();
  }

  GetAllPlan(): Observable<ApiResponse<Plan[]>> {
    return this.apiHandler.get<ApiResponse<Plan[]>>(API_ENDPOINTS.GET_ALL_PLANS).pipe();
  }
}
