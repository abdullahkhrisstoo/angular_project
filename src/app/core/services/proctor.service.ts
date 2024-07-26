import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';
import { ApiResponse } from '../utils/ApiResponse';
import { Observable } from 'rxjs';
import { ProctorModel } from '../models/proctor-model';
import { API_ENDPOINTS } from '../constants/api.constants';
import { AuthService } from './auth.service';
import { CreateAccountViewModel } from '../DTO/create-account-view-model';
import { CreateComplementByProctor } from '../DTO/create-compleent-view-model';

@Injectable({
  providedIn: 'root'
})


export class ProctorService {

  constructor(private apis:GenericApiHandlerService) {}
  //todo: get all
  getAll(): Observable<ApiResponse<ProctorModel[]>> {
    return this.apis.get<ApiResponse<ProctorModel[]>>(API_ENDPOINTS.GET_ALL_PROCTOR)
  }

  //todo: get by id
  getById(id: number): Observable<ApiResponse<ProctorModel>> {
    const endpoint = `${API_ENDPOINTS.GET_PROCTOR_by_id}/${id}`;
    return this.apis.get<ApiResponse<ProctorModel>>(endpoint);

  }
// todo: delete
  // delete(id: number): Observable<any> {
  //   const endpoint = `${API_ENDPOINTS.DELETE_ABOUT_US_BY_ID}/${id}`;
  //   return this.apis.delete<any>(endpoint);
  // }
  // todo: create
  // create(viewModel: CreateAccountViewModel): Observable<any> {
  //   return

  //   // this.apis.post<ApiResponse<any>>(API_ENDPOINTS.CREATE_ACCOUNT, viewModel)
  //   //   .pipe();
  // }
  // todo: update
  update(id: number,viewModel: CreateAccountViewModel): Observable<any> {
    const endpoint = `${API_ENDPOINTS.UPDATE_PROCTOR}/${id}`;
    return this.apis.put<ApiResponse<any>>(endpoint,viewModel)
  }

  // todo: create complement
  createComplement(id: number,viewModel: CreateComplementByProctor): Observable<any> {
    const endpoint = `${API_ENDPOINTS.CREATE_COMPLEMENT_BY_PROCTOR}/${id}`;
    return this.apis.post<ApiResponse<any>>(endpoint,viewModel)
  }

  // todo: get all Apointment by id
  getAllApointmentByProctorID(id: number,viewModel: CreateComplementByProctor): Observable<ApiResponse<any>> {
    const endpoint = `${API_ENDPOINTS.GET_EXAM_APPOINTMENT}/${id}`;
    return this.apis.post<ApiResponse<any>>(endpoint,viewModel)
  }

}
