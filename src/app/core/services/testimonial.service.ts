import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';
import {map, Observable} from 'rxjs';
import { ApiResponse } from '../utils/ApiResponse';
import { Testimonial } from '../models/testimonal';
import { API_ENDPOINTS } from '../constants/api.constants';
import {PlanDTO} from "../DTO/plan-dto";
import {CreatePlanDTO} from "../DTO/create-plan-dto";
import {UpdatePlanDTO} from "../DTO/update-plan-dto";
import {TestimonialDTO} from "../DTO/testimonial-dto";
import {CreateTestimonialDTO} from "../DTO/create-testimonial-dto";
import {TestimonialWithExamProviderDTO} from "../DTO/testimonial-with-exam-provider-dto";

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

constructor(private apis:GenericApiHandlerService) { }

getApproved(): Observable<ApiResponse<Testimonial[]>>
{
  return this.apis.get<ApiResponse<Testimonial[]>>(API_ENDPOINTS.GET_ALL_APPROVED_TESTIMONAL);
}


  getAllTestimonials(): Observable<ApiResponse<TestimonialDTO[]>> {
    return this.apis.get<ApiResponse<TestimonialDTO[]>>(API_ENDPOINTS.GET_ALL_TESTIMONIALS)
  }

  getTestimonialsByExamProviderId(id: number): Observable<TestimonialDTO[]> {
    const endpoint = `${API_ENDPOINTS.GET_TESTIMONIALS_BY_EXAM_PROVIDER}/${id}`;
    return this.apis.get<ApiResponse<TestimonialDTO[]>>(endpoint)
      .pipe(
        map(response => response.data)
      );
  }
  getTestimonialsByStateId(id: number): Observable<TestimonialWithExamProviderDTO[]> {
    const endpoint = `${API_ENDPOINTS.GET_TESTIMONIALS_BY_STATE_ID}/${id}`;
    return this.apis.get<ApiResponse<TestimonialWithExamProviderDTO[]>>(endpoint)
      .pipe(
        map(response => response.data)
      );
  }
  getTestimonialById(id: number): Observable<TestimonialDTO> {
    const endpoint = `${API_ENDPOINTS.GET_TESTIMONIAL_BY_ID}/${id}`;
    return this.apis.get<ApiResponse<TestimonialDTO>>(endpoint)
      .pipe(
        map(response => response.data)
      );
  }

  deleteTestimonial(id: number): Observable<any> {
    const endpoint = `${API_ENDPOINTS.DELETE_TESTIMONIAL}/${id}`;
    return this.apis.delete<any>(endpoint);
  }

  createTestimonial(viewModel: CreateTestimonialDTO): Observable<any> {
    return this.apis.post<ApiResponse<any>>(API_ENDPOINTS.CREATE_TESTIMONIAL, viewModel)
      .pipe();
  }

  updateTestimonialState(testimonialId: number, stateId: number): Observable<any> {
    const endpoint = `${API_ENDPOINTS.UPDATE_TESTIMONIAL_STATE}?testimonialId=${testimonialId}&stateId=${stateId}`;
    return this.apis.put<ApiResponse<any>>(endpoint, {})
      .pipe(
        map(response => response.data)
      );
  }






}
