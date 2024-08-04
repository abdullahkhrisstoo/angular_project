import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';
import { ApiResponse } from '../utils/ApiResponse';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { UpdateProctorWorkTimeDTO } from '../DTO/update-proctor-work-time-dto';
import { ProctorWorkTimeDTO } from '../DTO/proctor-work-time-dto';

@Injectable({
  providedIn: 'root'
})
export class ProctorWorkTimeService {

  constructor(private apiHandler: GenericApiHandlerService) { }

  getProctorWorkTimeById(proctorWorkTimesId : number): Observable<ApiResponse<ProctorWorkTimeDTO>> {
    const endpoint = `${API_ENDPOINTS.GET_PROCTOR_WORK_TIMES}/${proctorWorkTimesId}`;
    return this.apiHandler.get<ApiResponse<ProctorWorkTimeDTO>>(endpoint);
  }



  updateProctorTimeWorkById(proctorWorkTimesId  : number , update:UpdateProctorWorkTimeDTO): Observable<ApiResponse<any>> {
    const endpoint = `${API_ENDPOINTS.UPDATE_PROCTOR_ANSWER}/${proctorWorkTimesId}`;
    return this.apiHandler.put<ApiResponse<any>>(endpoint ,update );
  }


}