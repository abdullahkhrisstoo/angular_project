import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../utils/ApiResponse';
import { API_ENDPOINTS } from '../constants/api.constants';
import { CreateAboutDTO } from '../DTO/create-about-us-view-model';
import {ComplementDTO} from "../DTO/complement-dto";
import {CreateComplementDTO} from "../DTO/create-complement-dto";
import {UpdateComplementDTO} from "../DTO/update-complement-dto";

@Injectable({
  providedIn: 'root'
})
export class ComplementService {

  constructor(private apis:GenericApiHandlerService) {}

  getAllComplements(): Observable<ApiResponse<ComplementDTO[]>> {
    return this.apis.get<ApiResponse<ComplementDTO[]>>(API_ENDPOINTS.GET_ALL_ABOUT_US)
  }

  getComplementByExamReservationId(id: number): Observable<ComplementDTO> {
    const endpoint = `${API_ENDPOINTS.COMPLEMENT_TABLE+"GetComplementByExamReservationId"}/${id}`;
    return this.apis.get<ApiResponse<ComplementDTO>>(endpoint)
      .pipe(
        map(response => response.data)
      );
  }

  getComplementById(id: number): Observable<ComplementDTO> {
    const endpoint = `${API_ENDPOINTS.GET_COMPLEMENT_BY_ID}/${id}`;
    return this.apis.get<ApiResponse<ComplementDTO>>(endpoint)
      .pipe(
        map(response => response.data)
      );
  }

  deleteComplement(id: number): Observable<any> {
    const endpoint = `${API_ENDPOINTS.DELETE_COMPLEMENT}/${id}`;
    return this.apis.delete<any>(endpoint);
  }

  createComplement(viewModel: CreateComplementDTO): Observable<any> {
    return this.apis.post<ApiResponse<any>>(API_ENDPOINTS.CREATE_COMPLEMENT, viewModel)
      .pipe();
  }

  updateComplement(viewModel: UpdateComplementDTO): Observable<any> {
    const endpoint = `${API_ENDPOINTS.UPDATE_COMPLEMENT}`;
    return this.apis.put<ApiResponse<any>>(endpoint,viewModel)
      .pipe(
        map(response => response.data)
      );
  }
}
