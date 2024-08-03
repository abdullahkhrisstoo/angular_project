import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';
import { map, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../utils/ApiResponse';
import { API_ENDPOINTS } from '../constants/api.constants';
import { CreateAboutDTO } from '../DTO/create-about-us-view-model';
import {ComplementDTO} from "../DTO/complement-dto";
import {CreateComplementDTO} from "../DTO/create-complement-dto";
import {UpdateComplementDTO} from "../DTO/update-complement-dto";
import {ExamInfoDTO} from "../DTO/exam-info-dto.model";
import {CreateExamInfoDTO} from "../DTO/create-exam-info-dto";
import {UpdateExamInfoDTO} from "../DTO/update-exam-info-dto";
import { ExamInfoStructureDTO } from '../DTO/exam-info-structure-dto';

@Injectable({
  providedIn: 'root'
})
export class ExamInfoService {

  constructor(private apis:GenericApiHandlerService) {}

  getAllExams(): Observable<ApiResponse<ExamInfoDTO[]>> {
    return this.apis.get<ApiResponse<ExamInfoDTO[]>>(API_ENDPOINTS.GET_ALL_EXAMS)
  }

  getAllExamsByExamProviderId(id: number): Observable<ExamInfoDTO[]> {
    const endpoint = `${API_ENDPOINTS.GET_ALL_EXAMS_BY_EXAM_PROVIDER}/${id}`;
    return this.apis.get<ApiResponse<ExamInfoDTO[]>>(endpoint)
      .pipe(
        map(response => response.data)
      );
  }

  getExamById(id: number): Observable<ExamInfoDTO> {
    const endpoint = `${API_ENDPOINTS.GET_EXAM_BY_ID}/${id}`;
    return this.apis.get<ApiResponse<ExamInfoDTO>>(endpoint)
      .pipe(
        map(response => response.data)
      );
  }

  deleteExam(id: number): Observable<any> {
    const endpoint = `${API_ENDPOINTS.DELETE_EXAM}/${id}`;
    return this.apis.delete<any>(endpoint);
  }

  createExam(viewModel: CreateExamInfoDTO): Observable<any> {
    return this.apis.post<ApiResponse<any>>(API_ENDPOINTS.CREATE_EXAM, viewModel)
      .pipe();
  }

  updateExam(viewModel: UpdateExamInfoDTO): Observable<any> {
    const endpoint = `${API_ENDPOINTS.UPDATE_EXAM}`;
    return this.apis.put<ApiResponse<any>>(endpoint,viewModel)
      .pipe(
        map(response => response.data)
      );
  }

  getExamByName(name:string): Observable<ApiResponse<ExamInfoStructureDTO>> {

    const token = localStorage.getItem('auth-token');
    if (!token) {
      // If the token is missing, throw an error
      return throwError(() => new Error('Authorization token is missing.'));
    }
    return this.apis.get<ApiResponse<ExamInfoStructureDTO>>(API_ENDPOINTS.GET_EXAM_BY_NAME,{
      'examName':name
    }
    ,
    // {
    //       'Authorization': `Bearer ${token}`
    // }
  
  
  );
  }
}
