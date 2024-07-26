import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericApiHandlerService } from './api.service';
import { ApiResponse } from '../utils/ApiResponse';
import { API_ENDPOINTS } from '../constants/api.constants';
import { StatisticModel } from '../models/statistic-model';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  constructor(private apis: GenericApiHandlerService) {}

  // todo: Get ALL Statistic
  getAll(): Observable<ApiResponse<StatisticModel>> {
    return this.apis.get<ApiResponse<StatisticModel>>(API_ENDPOINTS.GET_ALL_STATITIC);
  }
}
