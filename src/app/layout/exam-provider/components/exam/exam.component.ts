import {Component, ViewEncapsulation} from '@angular/core';
import {ExamProviderDTO} from "../../../../core/DTO/exam-provider-dto";
import {ComplementDTO} from "../../../../core/DTO/complement-dto";
import {ProctorDTO} from "../../../../core/DTO/proctor-dto";
import {ExamInfoDTO} from "../../../../core/DTO/exam-info-dto.model";
import {ExamReservationDTO} from "../../../../core/DTO/exam-reservation-dto";
import {PlanFeatureDTO} from "../../../../core/DTO/plan-feature-dto";
import {TestimonialDTO} from "../../../../core/DTO/testimonial-dto";
import {ComplementService} from "../../../../core/services/complement.service";
import {ExamProviderService} from "../../../../core/services/exam-provider.service";
import {ExamInfoService} from "../../../../core/services/exam-info.service";
import {PlanService} from "../../../../core/services/plan.service";
import {PlanFeatureService} from "../../../../core/services/plan-feature.service";
import {ExamReservationService} from "../../../../core/services/exam-reservation.service";
import {TestimonialService} from "../../../../core/services/testimonial.service";
import {ProctorService} from "../../../../core/services/proctor.service";
import { SortType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
  encapsulation:ViewEncapsulation.None
})
export class ExamComponent {

  complement: ComplementDTO | null = null;



  exams: ExamInfoDTO[] = [];
  columnsExamsTable = [
    { name: 'Title', prop: 'examTitle' },
    { name: 'Created At', prop: 'createdAt' },
  ];

  reservations: ExamReservationDTO[] = [];
  columnsExamReservation = [
    { name: 'Student Name', prop: 'studentName' },
    { name: 'Email', prop: 'email' },
    { name: 'Phone', prop: 'phone' },
    { name: 'Start Date', prop: 'startDate' },
    { name: 'End Date', prop: 'endDate' },
    { name: 'Score', prop: 'score' },
    { name: 'Created At', prop: 'createdAt' },
  ];


  testimonials: TestimonialDTO[] = [];
  columnsTestimonial = [
    { name: 'Text', prop: 'testimonialText', sortable: true },
    { name: 'State', prop: 'testimonialState', sortable: true },
    { name: 'Created At', prop: 'createdAt', sortable: true },
    { name: 'Updated At', prop: 'updatedAt', sortable: true },
  ];
  constructor(private complementService: ComplementService
    ,private examProviderService:ExamProviderService,
              private  examService:ExamInfoService,
              private planService: PlanService,
              private planFeatureService: PlanFeatureService,
              private examReservationService: ExamReservationService,
              private testimonialService: TestimonialService,
              private proctorService: ProctorService) {

  }

  ngOnInit(): void {
    localStorage.setItem('examProviderId','1');
    let examProviderID=localStorage.getItem('examProviderId');
    if(examProviderID)
    this.getExamsByProviderId(Number.parseInt(examProviderID));



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
  getExamsByProviderId(providerId: number): void {
    this.examService.getAllExamsByExamProviderId(providerId).subscribe(
      response => {
        this.exams=response;

        console.log(`Exams by Provider ID ${providerId}:`, response);
      },
      error => {
        //this.exams=[]
        console.error(`Error fetching exams by provider ID ${providerId}:`, error);
      }
    );
  }

  getExamReservationsByExamId(examId: number): void {
    this.examReservationService.getExamReservationsByExamId(examId).subscribe(
      response => {
        this.reservations=response;
        console.log(`Exam Reservations by Exam ID ${examId}:`, response);
      },
      error => {
        this.reservations=[]
        console.error(`Error fetching exam reservations by exam ID ${examId}:`, error);
      }
    );
  }
  getTestimonialsByExamProviderId(providerId: number): void {
    this.testimonialService.getTestimonialsByExamProviderId(providerId).subscribe(
      response => {
        this.testimonials=response;
        console.log(`Testimonials by Provider ID ${providerId}:`, response);
      },
      error => {
        this.testimonials=[];
        console.error(`Error fetching testimonials by provider ID ${providerId}:`, error);
      }
    );
  }



  loadExams(id:number): void {
    this.getExamsByProviderId(id);
  }
  loadExamReservations(id:number): void {
    this.getExamReservationsByExamId(id);
  }
  loadComplement(id:number): void {
    this.getComplementByExamReservationId(id);
  }
  loadTestimonials(id:number): void {
    this.getTestimonialsByExamProviderId(id);
  }


  updateFilter(event: any) {

  }



  protected readonly SortType = SortType;
}
