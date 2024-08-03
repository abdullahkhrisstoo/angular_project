import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../utils/ApiResponse';
import { API_ENDPOINTS } from '../constants/api.constants';
import { ReservationInvoiceDetailsDTO } from '../DTO/reservation-invoice-details-dto';

@Injectable({
  providedIn: 'root'
})
export class ReservationInvoiceService {

  constructor(private apis:GenericApiHandlerService) {}

 
  getReservationInvoices(): Observable<ApiResponse<ReservationInvoiceDetailsDTO[]>> {
    const endpoint = `${API_ENDPOINTS.GET_ALL_RESRVATION_INVOICES_DETAILS}`;
    return this.apis.get<ApiResponse<ReservationInvoiceDetailsDTO[]>>(endpoint)
  }
}