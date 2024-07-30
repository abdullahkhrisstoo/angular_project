import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';
import { map, Observable } from 'rxjs';
import { About } from '../models/about-us-model';
import { ApiResponse } from '../utils/ApiResponse';
import { API_ENDPOINTS } from '../constants/api.constants';
import { CreateAboutDTO } from '../DTO/create-about-us-dto';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  constructor(private apis:GenericApiHandlerService) {}
  //todo: get all
  getAll(): Observable<ApiResponse<About[]>> {
    return this.apis.get<ApiResponse<About[]>>(API_ENDPOINTS.GET_ALL_ABOUT_US)
  }

  //todo: get by id
  getById(id: number): Observable<ApiResponse<About>> {
    const endpoint = `${API_ENDPOINTS.GET_ABOUT_US_BY_ID}/${id}`;
    return this.apis.get<ApiResponse<ApiResponse<About>>>(endpoint)
      .pipe(
        map(response => response.data)
      );
  }
// todo: delete
  delete(id: number): Observable<any> {
    const endpoint = `${API_ENDPOINTS.DELETE_ABOUT_US_BY_ID}/${id}`;
    return this.apis.delete<any>(endpoint);
  }
  // todo: create
  create(viewModel: CreateAboutDTO): Observable<any> {
    return this.apis.post<ApiResponse<any>>(API_ENDPOINTS.CREATE_ABOUT, viewModel)

  }
  // todo: update
  update(id: number,viewModel: CreateAboutDTO): Observable<any> {
    const endpoint = `${API_ENDPOINTS.UPDATE_ABOUT_US_BY_ID}/${id}`;
    return this.apis.put<ApiResponse<any>>(endpoint,viewModel)
  }
}
