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
import {ExamReservationDTO} from "../DTO/exam-reservation-dto";
import {CreateExamReservationDTO} from "../DTO/create-exam-reservation-dto";
import {UpdateExamReservationDTO} from "../DTO/update-exam-reservation-dto";

@Injectable({
  providedIn: 'root'
})
export class ExamReservationService {

  constructor(private apiHandler: GenericApiHandlerService) { }

  GetAllExamReservations(): Observable<ApiResponse<ExamReservationDTO[]>> {
    return this.apiHandler.get<ApiResponse<ExamReservationDTO[]>>(API_ENDPOINTS.GET_ALL_EXAM_RESERVATIONS).pipe();
  }





  getExamReservationsByExamId(id: number): Observable<ExamReservationDTO[]> {
    const endpoint = `${API_ENDPOINTS.GET_EXAM_RESERVATIONS_BY_EXAM_ID}/${id}`;
    return this.apiHandler.get<ApiResponse<ExamReservationDTO[]>>(endpoint)
      .pipe(
        map(response => response.data)
      );
  }

  getExamReservationById(id: number): Observable<ExamReservationDTO> {
    const endpoint = `${API_ENDPOINTS.GET_EXAM_RESERVATION_BY_ID}/${id}`;
    return this.apiHandler.get<ApiResponse<ExamReservationDTO>>(endpoint)
      .pipe(
        map(response => response.data)
      );
  }

  deleteExamReservation(id: number): Observable<any> {
    const endpoint = `${API_ENDPOINTS.DELETE_EXAM_RESERVATION}/${id}`;
    return this.apiHandler.delete<any>(endpoint);
  }

  createExamReservation(viewModel: CreateExamReservationDTO): Observable<any> {
    return this.apiHandler.post<ApiResponse<any>>(API_ENDPOINTS.CREATE_EXAM_RESERVATION, viewModel)
      .pipe();
  }

  updateExamReservation(viewModel: UpdateExamReservationDTO): Observable<any> {
    const endpoint = `${API_ENDPOINTS.UPDATE_EXAM_RESERVATION}`;
    return this.apiHandler.put<ApiResponse<any>>(endpoint,viewModel)
      .pipe(
        map(response => response.data)
      );
  }
}
