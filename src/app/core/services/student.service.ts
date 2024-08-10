import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { GenericApiHandlerService } from './api.service';
import { ApiResponse } from '../utils/ApiResponse';
import { API_ENDPOINTS } from '../constants/api.constants';
import { StatisticModel } from '../models/statistic-model';
import { StudentDTO } from '../DTO/student-dto';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private apis: GenericApiHandlerService) {}

  getStudentInfoById(id:number): Observable<ApiResponse<StudentDTO>> {

    const token = localStorage.getItem('auth-token');
    if (!token) {
      // If the token is missing, throw an error
      return throwError(() => new Error('Authorization token is missing.'));
    }
    return this.apis.get<ApiResponse<StudentDTO>>(API_ENDPOINTS.GET_STUDENT_INFO_BY_ID,{
        'id':id
      },
    //   {
    //     'Authorization': `Bearer ${token}`
    // }
);
  }
  getStudentInfoByEmail(email:string): Observable<ApiResponse<StudentDTO>> {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      // If the token is missing, throw an error
      return throwError(() => new Error('Authorization token is missing.'));
    }
    return this.apis.get<ApiResponse<StudentDTO>>(API_ENDPOINTS.GET_STUDENT_INFO_BY_EMAIL,{
        'email':email
    },
    // {
    //     'Authorization': `Bearer ${token}`
    // }

);
}
}
