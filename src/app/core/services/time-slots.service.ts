import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';
import { ApiResponse } from '../utils/ApiResponse';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { AvailableTimeDTO } from '../DTO/available-time-dto';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotsService {

  constructor(private apis: GenericApiHandlerService) { }

  getAvaliableTime(dateTime: string, duration: number, is24HourFormat: boolean): Observable<ApiResponse<AvailableTimeDTO[]>> {
    const dateObj = new Date(dateTime);
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date value');
    }
    const formattedDate = dateObj.toISOString(); // Convert the Date object to an ISO string
    const endpoint = `${API_ENDPOINTS.GET_TIME_SLOTS}?dateTime=${encodeURIComponent(formattedDate)}&duration=${duration}&is24HourFormat=${is24HourFormat}`;
    return this.apis.get<ApiResponse<AvailableTimeDTO[]>>(endpoint);
  }
}
