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

 
  getReservationInvoices(page:number, size:number): Observable<any> {
    const endpoint = `${API_ENDPOINTS.GET_ALL_RESRVATION_INVOICES_DETAILS}?page=${page}&size=${size}`;
    return this.apis.get(endpoint)
  }
}