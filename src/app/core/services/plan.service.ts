import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';
import { ApiResponse } from '../utils/ApiResponse';
import {map, Observable} from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { Plan } from '../models/plan-model';
import {ComplementDTO} from "../DTO/complement-dto";
import {CreateComplementDTO} from "../DTO/create-complement-dto";
import {UpdateComplementDTO} from "../DTO/update-complement-dto";
import {PlanDTO} from "../DTO/plan-dto";
import {CreatePlanDTO} from "../DTO/create-plan-dto";
import {UpdatePlanDTO} from "../DTO/update-plan-dto";

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

  getAllPlans(): Observable<ApiResponse<PlanDTO[]>> {
    return this.apiHandler.get<ApiResponse<PlanDTO[]>>(API_ENDPOINTS.GET_ALL_PLANS)
  }

  getPlanByExamProviderId(id: number): Observable<PlanDTO> {
    const endpoint = `${API_ENDPOINTS.GET_PLAN_BY_EXAM_PROVIDER}/${id}`;
    return this.apiHandler.get<ApiResponse<PlanDTO>>(endpoint)
      .pipe(
        map(response => response.data)
      );
  }

  getPlanById(id: number): Observable<PlanDTO> {
    const endpoint = `${API_ENDPOINTS.GET_PLAN_BY_ID}/${id}`;
    return this.apiHandler.get<ApiResponse<PlanDTO>>(endpoint)
      .pipe(
        map(response => response.data)
      );
  }

  deletePlan(id: number): Observable<any> {
    const endpoint = `${API_ENDPOINTS.DELETE_PLAN}/${id}`;
    return this.apiHandler.delete<any>(endpoint);
  }

  createPlan(viewModel: CreatePlanDTO): Observable<any> {
    return this.apiHandler.post<ApiResponse<any>>(API_ENDPOINTS.CREATE_PLAN, viewModel)
      .pipe();
  }

  updatePlan(viewModel: UpdatePlanDTO): Observable<any> {
    const endpoint = `${API_ENDPOINTS.UPDATE_PLAN}`;
    return this.apiHandler.put<ApiResponse<any>>(endpoint,viewModel)
      .pipe(
        map(response => response.data)
      );
  }
}
