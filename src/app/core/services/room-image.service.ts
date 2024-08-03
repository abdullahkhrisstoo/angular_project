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
import { RoomReservationImageDTO } from '../DTO/room-rservation-image-dto';
import { CreateRoomReservationImageDTO } from '../DTO/create-room-image-dto';
import { UpdateRoomReservationImageDTO } from '../DTO/update-room-image-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomImageService {

  constructor(private apis:GenericApiHandlerService,private http: HttpClient) {}

 
  getRoomImagesBy(reservationId:number): Observable<ApiResponse<RoomReservationImageDTO[]>> {
    const endpoint = `${API_ENDPOINTS.GET_ROOM_RESERVATION_IMAGES_BY}?reservationId=${reservationId}`;
    return this.apis.get<ApiResponse<RoomReservationImageDTO[]>>(endpoint)
  }


  createRoomImage(createRoomReservationImageDTOs: CreateRoomReservationImageDTO[]): Observable<any> {
    const formData: FormData = new FormData();
  
    createRoomReservationImageDTOs.forEach((dto, index) => {
      formData.append(`image`, dto.image as Blob);
      formData.append(`path`, dto.path || '');
      formData.append(`examReservationId`,'1');
      formData.append(`place`, dto.place || '');
    });
  
    return this.http.post(`${API_ENDPOINTS.baseUrl}${API_ENDPOINTS.CREATE_ROOM_RESERVATION_IMAGE}`, formData);
  }



  
  // createRoomImage(createRoomReservationImageDTO: CreateRoomReservationImageDTO): Observable<any> {

  //   const formData: FormData = new FormData();
  //   const appendFormData = (key: string, value: any) => {
  //     if (value !== undefined && value !== null) {
  //       formData.append(key, value);
  //     }
  //   };
  //   appendFormData('image', createRoomReservationImageDTO.image);
  //   appendFormData('examReservationId', createRoomReservationImageDTO.examReservationId);
  //   appendFormData('place', createRoomReservationImageDTO.place);



  //   return this.apis.post<ApiResponse<any>>(API_ENDPOINTS.CREATE_ROOM_RESERVATION_IMAGE, createRoomReservationImageDTO)
  //     .pipe();
  // }

  updateRoomImage(updateRoomReservationImageDTO: UpdateRoomReservationImageDTO): Observable<any> {
    const formData: FormData = new FormData();
    const appendFormData = (key: string, value: any) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    };
    appendFormData('image', updateRoomReservationImageDTO.image);
    appendFormData('examReservationId', updateRoomReservationImageDTO.examReservationId);
    appendFormData('place', updateRoomReservationImageDTO.place);
    appendFormData('roomReservationImageId', updateRoomReservationImageDTO.roomReservationImageId);

    return this.apis.put<ApiResponse<any>>(API_ENDPOINTS.UPDATE_ROOM_RESERVATION_IMAGE,updateRoomReservationImageDTO)
      .pipe(
        map(response => response)
      );
  }
}
