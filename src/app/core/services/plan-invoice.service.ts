import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../utils/ApiResponse';
import { API_ENDPOINTS } from '../constants/api.constants';
import { CreateAboutDTO } from '../DTO/create-about-us-view-model';
import {ComplementDTO} from "../DTO/complement-dto";
import {CreateComplementDTO} from "../DTO/create-complement-dto";
import {UpdateComplementDTO} from "../DTO/update-complement-dto";
import {ExamInfoDTO} from "../DTO/exam-info-dto.model";
import {CreateExamInfoDTO} from "../DTO/create-exam-info-dto";
import {UpdateExamInfoDTO} from "../DTO/update-exam-info-dto";
import { ExamProviderLinkDTO } from '../DTO/exam-provider-link-dto';
import { UpdateExamProviderLinkDTO } from '../DTO/update-exam-provider-link-dto';
import { IdentificationImageDTO } from '../DTO/identification-image-dto';
import { CreateIdentificationImageDTO } from '../DTO/create-identification-image-dto';
import { UpdateIdentificationImageDTO } from '../DTO/update-identification-image-dto';
import { PlanInvoiceDetailsDTO } from '../DTO/plan-invoice-details-dto';

@Injectable({
  providedIn: 'root'
})
export class PlanInvoiceService {

  constructor(private apis:GenericApiHandlerService) {}

 
  getPlanInvoices(): Observable<ApiResponse<PlanInvoiceDetailsDTO[]>> {
    const endpoint = `${API_ENDPOINTS.GET_ALL_PLAN_INVOICES_DETAILS}`;
    return this.apis.get<ApiResponse<PlanInvoiceDetailsDTO[]>>(endpoint)
  }
}