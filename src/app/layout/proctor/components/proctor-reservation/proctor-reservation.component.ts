import {Component, ViewEncapsulation} from '@angular/core';
import {ExamReservationDTO} from "../../../../core/DTO/exam-reservation-dto";
import {ExamReservationService} from "../../../../core/services/exam-reservation.service";
import {SortType} from "@swimlane/ngx-datatable";
import {ExamReservationProctorDTO} from "../../../../core/DTO/exam-reservation-proctor-dto";
import {ComplementService} from "../../../../core/services/complement.service";
import {ComplementDTO} from "../../../../core/DTO/complement-dto";

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
              private  complementService:ComplementService) {
  }
  columnsExamReservation = [
    { name: 'Link Exam',      prop: 'proctorTokenEmail' },
    { name: 'Start Date', prop: 'startDate' },
    { name: 'End Date',   prop: 'endDate' },
    { name: 'Created At', prop: 'createdAt' },
    { name: 'Student Name', prop: 'studentName' },

  ];
  ngOnInit(): void {
    this.getExamReservationsByProctorId(240);
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

  protected readonly SortType = SortType;
}
