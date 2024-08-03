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
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IdentificationImageService {

  constructor(private apis:GenericApiHandlerService,private http: HttpClient) {}

 
  getIdentificationImageBy(reservationId:number): Observable<ApiResponse<IdentificationImageDTO>> {
    const endpoint = `${API_ENDPOINTS.GET_IDENTIFICATION_IMAGE_BY}?reservationId=${reservationId}`;
    return this.apis.get<ApiResponse<IdentificationImageDTO>>(endpoint)
  }

  createIdentificationImage(createIdentificationImageDTO: CreateIdentificationImageDTO): Observable<any> {

    const formData: FormData = new FormData();
    const appendFormData = (key: string, value: any) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    };
    appendFormData('ImageBack', createIdentificationImageDTO.imageBack);
    appendFormData('ImageFront', createIdentificationImageDTO.imageFront);
    appendFormData('examReservationId', createIdentificationImageDTO.examReservationId?.toString());


    return this.http.post(`${API_ENDPOINTS.baseUrl}${API_ENDPOINTS.CREATE_IDENTIFICATION_IMAGE}`, formData);
  }

  updateIdentificationImage(updateIdentificationImageDTO: UpdateIdentificationImageDTO): Observable<any> {
    const formData: FormData = new FormData();
    const appendFormData = (key: string, value: any) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    };
    appendFormData('identificationImageId', updateIdentificationImageDTO.identificationImageId);
    appendFormData('pathImageBack', updateIdentificationImageDTO.pathImageBack);
    appendFormData('pathImageFront', updateIdentificationImageDTO.pathImageFront);
    appendFormData('imageBack', updateIdentificationImageDTO.imageBack);
    appendFormData('imageFront', updateIdentificationImageDTO.imageFront);
    appendFormData('examReservationId', updateIdentificationImageDTO.examReservationId?.toString());
  
    return this.apis.put<ApiResponse<any>>(API_ENDPOINTS.UPDATE_IDENTIFICATION_IMAGE,updateIdentificationImageDTO)
      .pipe(
        map(response => response)
      );
  }




  
}
