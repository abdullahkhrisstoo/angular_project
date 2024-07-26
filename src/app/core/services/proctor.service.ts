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
import {ProctorDTO} from "../DTO/proctor-dto";
import {ProctorModel} from "../models/proctor-model";
import {CreateAccountViewModel} from "../DTO/create-account-view-model";
import {UpdateAccountDTO} from "../DTO/update-account-dto";

@Injectable({
  providedIn: 'root'
})
export class ProctorService {

  constructor(private apiHandler: GenericApiHandlerService) { }
  getAll(): Observable<ApiResponse<ProctorModel[]>> {
    return this.apiHandler.get<ApiResponse<ProctorModel[]>>(API_ENDPOINTS.GET_ALL_PROCTOR)
  }
  update(id: number,viewModel: UpdateAccountDTO): Observable<any> {
    const endpoint = `${API_ENDPOINTS.UPDATE_PROCTOR}`;
    return this.apiHandler.put<ApiResponse<any>>(endpoint,viewModel)
  }

  //todo: get by id
  getById(id: number): Observable<ApiResponse<ProctorModel>> {
    const endpoint = `${API_ENDPOINTS.GET_PROCTOR_by_id}/${id}`;
    return this.apiHandler.get<ApiResponse<ProctorModel>>(endpoint);

  }

  getProctorByExamReservationId(id: number): Observable<ProctorDTO> {
    const endpoint = `${API_ENDPOINTS.GET_PROCTOR_BY_EXAM_RESERVATION_ID}/${id}`;
    return this.apiHandler.get<ApiResponse<ProctorDTO>>(endpoint)
      .pipe(
        map(response => response.data)
      );
  }


}
