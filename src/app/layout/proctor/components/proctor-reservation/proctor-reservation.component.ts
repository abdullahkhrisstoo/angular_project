import {Component, ViewEncapsulation} from '@angular/core';
import {ExamReservationDTO} from "../../../../core/DTO/exam-reservation-dto";
import {ExamReservationService} from "../../../../core/services/exam-reservation.service";
import {SortType} from "@swimlane/ngx-datatable";
import {ExamReservationProctorDTO} from "../../../../core/DTO/exam-reservation-proctor-dto";
import {ComplementService} from "../../../../core/services/complement.service";
import {ComplementDTO} from "../../../../core/DTO/complement-dto";
import { IdentificationImageService } from '../../../../core/services/identification-image.service';
import { RoomImageService } from '../../../../core/services/room-image.service';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { CurrentUserData } from '../../../../core/models/current-user-data';
import { IdentificationImageDTO } from '../../../../core/DTO/identification-image-dto';
import { API_ENDPOINTS } from '../../../../core/constants/api.constants';
import { RoomReservationImageDTO } from '../../../../core/DTO/room-rservation-image-dto';
import { throwIfEmpty } from 'rxjs';

@Component({
  selector: 'app-proctor-reservation',
  templateUrl: './proctor-reservation.component.html',
  styleUrl: './proctor-reservation.component.css',
  encapsulation:ViewEncapsulation.None
})
export class ProctorReservationComponent {
  reservations: ExamReservationProctorDTO[] = [];
  complement: ComplementDTO | null = null;
  reservationsFilter: ExamReservationProctorDTO[] = [];
  constructor(private examReservationService: ExamReservationService,
              private  complementService:ComplementService,
              private identificationService:IdentificationImageService,
              private roomService:RoomImageService,
              private localStorageService :LocalStorageService) {
  }
  columnsExamReservation = [
    { name: 'Link Exam', prop: 'proctorTokenEmail' },
    { name: 'Start Date', prop: 'startDate' },
    { name: 'End Date',   prop: 'endDate' },
    { name: 'Created At', prop: 'createdAt' },
    { name: 'Student Name', prop: 'studentName' },

  ];
  baseUrl!:string;
  ngOnInit(): void {
  
    this.baseUrl=API_ENDPOINTS.baseUrlImage;
    //let userId=localStorage.getItem("userId");
    let userData=this.localStorageService.getItem(this.localStorageService.USER_SESSION_KEY) as CurrentUserData;
    this.getExamReservationsByProctorId(userData.userId);
  }
  getComplementByExamReservationId(id:number){
    this.complementService.getComplementByExamReservationId(id).subscribe(
      response => {
        this.complement = response;
        console.log(response);
      },
      error => {
        console.error('Error fetching complement by ExamReservationId:', error);
      }
    );
  }
  loadComplement(id:number): void {
    this.getComplementByExamReservationId(id);
  }
  getExamReservationsByProctorId(examId: number): void {
    this.examReservationService.getExamReservationsByProctorId(examId).subscribe(
      response => {
        this.reservations=response;
        this.reservationsFilter=this.reservations;
        console.log(`Exam Reservations by Exam ID ${examId}:`, response);
      },
      error => {
        
        this.reservations=[]
        console.error(`Error fetching exam reservations by exam ID ${examId}:`, error);
      }
    );
  }

  iden:IdentificationImageDTO| null=null;
  loadIden(id:number){
    
   this.identificationService.getIdentificationImageBy(id).subscribe(
    response => {
      //this.reservations=response;
      this.iden=response.data;
      console.log(response)
      console.log(`Exam Reservations by Exam ID `, response);
    },
    error => {
     // this.reservations=[]
      console.error(`Error fetching exam reservations by exam ID `, error);
    }
  );
  }
  roomImages!:RoomReservationImageDTO[];
  loadRoomImages(id:number){
    
    this.roomService.getRoomImagesBy(id).subscribe(
     response => {
       //this.reservations=response;
       this.roomImages=response.data;
       console.log(response.data)
       console.log(`Exam Reservations by Exam ID `, response);
     },
     error => {
      // this.reservations=[]
       console.error(`Error fetching exam reservations by exam ID `, error);
     }
   );
   }

  protected readonly SortType = SortType;
}
