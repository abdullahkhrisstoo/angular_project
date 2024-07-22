import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericApiHandlerService } from './api.service';
import { ApiResponse } from '../utils/ApiResponse';
import { StatisticModel } from '../models/statistic.statistic';
import { API_ENDPOINTS } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  constructor(private apis: GenericApiHandlerService) {}

  getAll(): Observable<ApiResponse<StatisticModel>> {
    return this.apis.get<ApiResponse<StatisticModel>>(API_ENDPOINTS.GET_ALL_STATITIC);
  }
}
