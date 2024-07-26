import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';
import { map, Observable } from 'rxjs';
import { About } from '../models/about-us-model';
import { ApiResponse } from '../utils/ApiResponse';
import { API_ENDPOINTS } from '../constants/api.constants';
import { CreateAboutDTO } from '../DTO/create-about-us-view-model';
import {ComplementDTO} from "../DTO/complement-dto";
import {CreateComplementDTO} from "../DTO/create-complement-dto";
import {UpdateComplementDTO} from "../DTO/update-complement-dto";
import {CreatePlanFeatureDTO} from "../DTO/create-plan-feature-dto";
import {UpdatePlanDTO} from "../DTO/update-plan-dto";
import {UpdatePlanFeatureDTO} from "../DTO/update-plan-feature-dto";
import {PlanFeatureDTO} from "../DTO/plan-feature-dto";

@Injectable({
  providedIn: 'root'
})
export class PlanFeatureService {

  constructor(private apis:GenericApiHandlerService) {}

  getAllPlanFeatures(): Observable<ApiResponse<PlanFeatureDTO[]>> {
    return this.apis.get<ApiResponse<PlanFeatureDTO[]>>(API_ENDPOINTS.GET_ALL_PLAN_FEATURES)
  }

  getPlanFeaturesByPlanId(id: number): Observable<PlanFeatureDTO[]> {
    const endpoint = `${API_ENDPOINTS.GET_PLAN_FEATURES_BY_PLAN_ID}/${id}`;
    return this.apis.get<ApiResponse<PlanFeatureDTO[]>>(endpoint)
      .pipe(
        map(response => response.data)
      );
  }

  getPlanFeatureById(id: number): Observable<PlanFeatureDTO> {
    const endpoint = `${API_ENDPOINTS.GET_PLAN_FEATURE_BY_ID}/${id}`;
    return this.apis.get<ApiResponse<PlanFeatureDTO>>(endpoint)
      .pipe(
        map(response => response.data)
      );
  }

  deletePlanFeature(id: number): Observable<any> {
    const endpoint = `${API_ENDPOINTS.DELETE_PLAN_FEATURE}/${id}`;
    return this.apis.delete<any>(endpoint);
  }

  createPlanFeature(viewModel: CreatePlanFeatureDTO): Observable<any> {
    return this.apis.post<ApiResponse<any>>(API_ENDPOINTS.CREATE_PLAN_FEATURE, viewModel)
      .pipe();
  }

  updatePlanFeature(viewModel: UpdatePlanFeatureDTO): Observable<any> {
    const endpoint = `${API_ENDPOINTS.UPDATE_PLAN_FEATURE}`;
    return this.apis.put<ApiResponse<any>>(endpoint,viewModel)
      .pipe(
        map(response => response.data)
      );
  }
}
