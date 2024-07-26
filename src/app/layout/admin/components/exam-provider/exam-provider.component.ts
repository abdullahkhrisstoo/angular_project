import {Component, ViewEncapsulation} from '@angular/core';
import {SortType} from "@swimlane/ngx-datatable";
import {ComplementService} from "../../../../core/services/complement.service";
import {ExamProviderService} from "../../../../core/services/exam-provider.service";
import {ExamInfoService} from "../../../../core/services/exam-info.service";
import {PlanService} from "../../../../core/services/plan.service";
import {PlanFeatureService} from "../../../../core/services/plan-feature.service";
import {ExamReservationService} from "../../../../core/services/exam-reservation.service";
import {TestimonialService} from "../../../../core/services/testimonial.service";
import {ProctorService} from "../../../../core/services/proctor.service";
import {ExamProviderDTO} from "../../../../core/DTO/exam-provider-dto";
import {ExamInfoDTO} from "../../../../core/DTO/exam-info-dto.model";
import {ExamReservationDTO} from "../../../../core/DTO/exam-reservation-dto";
import {PlanFeatureDTO} from "../../../../core/DTO/plan-feature-dto";
import {TestimonialDTO} from "../../../../core/DTO/testimonial-dto";
import {ComplementDTO} from "../../../../core/DTO/complement-dto";
import {ProctorDTO} from "../../../../core/DTO/proctor-dto";
import {CommonUtils} from "../../../../core/utils/CommonUtils";

interface FakeData {
  id: number;
  name: string;
  email: string;
  plan: string;
  testimonial: string;
  exam: string;
}
@Component({
  selector: 'app-exam-provider',
  templateUrl: './exam-provider.component.html',
  styleUrl: './exam-provider.component.css',
  encapsulation:ViewEncapsulation.None
})
export class ExamProviderComponent {
  rows: ExamProviderDTO[] = [];
  filterRows: ExamProviderDTO[] = [];
  complement: ComplementDTO | null = null;
  proctor: ProctorDTO | null = null;
  selectedPlanName:string=''
  columns = [
    { name: 'Name', prop: 'examProviderName' },
    // { name: 'Unique Key', prop: 'examProviderUniqueKey' },
    // { name: 'Plan ID', prop: 'planId' },
    { name: 'State', prop: 'state' },
    { name: 'Created At', prop: 'createdAt' }
  ];

  exams: ExamInfoDTO[] = [];
  examsFilter: ExamInfoDTO[] = [];
  columnsExamsTable = [
    { name: 'Title', prop: 'examTitle' },
    { name: 'Created At', prop: 'createdAt' },
  ];

  reservations: ExamReservationDTO[] = [];
  reservationsFilter: ExamReservationDTO[] = [];
  columnsExamReservation = [
    { name: 'Student Name', prop: 'studentName' },
    { name: 'Email', prop: 'email' },
    { name: 'Phone', prop: 'phone' },
    { name: 'Start Date', prop: 'startDate' },
    { name: 'End Date', prop: 'endDate' },
    { name: 'Score', prop: 'score' },
    { name: 'Created At', prop: 'createdAt' },
  ];
  planFeatures: PlanFeatureDTO[] = [];
  columnsPlanFeature = [
    { name: 'Feature Name', prop: 'featuresName' },
    { name: 'Created At', prop: 'createdAt' },

  ];

  testimonials: TestimonialDTO[] = [];
  testimonialsFilter: TestimonialDTO[] = [];
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
    this.getAllExamProviders();

  }
  getAllExamProviders(){
    this.examProviderService.getAllExamProviders().subscribe(
      response => {
        this.rows = response.data;
        this.filterRows=this.rows;
        console.log(this.rows)
      },
      error => {
        this.rows =[]
        console.error('Error fetching exam providers:', error);
      }
    );
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
        this.examsFilter=this.exams;
        console.log(`Exams by Provider ID ${providerId}:`, response);
      },
      error => {
        this.exams=[]
        console.error(`Error fetching exams by provider ID ${providerId}:`, error);
      }
    );
  }
  getPlanByExamProviderId(providerId: number): void {
    this.planService.getPlanByExamProviderId(providerId).subscribe(
      response => {
        this.selectedPlanName=response.planName !=null ? response.planName : "";
        this.getPlanFeaturesByPlanId(response.planId);
        console.log(`Plan by Provider ID ${providerId}:`, response);
      },
      error => {
        this.planFeatures=[]
        console.error(`Error fetching plan by provider ID ${providerId}:`, error);
      }
    );
  }
  getExamReservationsByExamId(examId: number): void {
    this.examReservationService.getExamReservationsByExamId(examId).subscribe(
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
  getTestimonialsByExamProviderId(providerId: number): void {
    this.testimonialService.getTestimonialsByExamProviderId(providerId).subscribe(
      response => {
        this.testimonials=response;
        this.testimonialsFilter=this.testimonials;
        console.log(`Testimonials by Provider ID ${providerId}:`, response);
      },
      error => {
        this.testimonials=[];
        console.error(`Error fetching testimonials by provider ID ${providerId}:`, error);
      }
    );
  }
  getProctorByExamProviderId(examReservationId: number): void {
    this.proctorService.getProctorByExamReservationId(examReservationId).subscribe(
      response => {
        this.proctor = response;
        console.log(`Proctor by Provider ID ${examReservationId}:`, response);
      },
      error => {
        console.error(`Error fetching proctor by provider ID ${examReservationId}:`, error);
      }
    );
  }
  getPlanFeaturesByPlanId(planId: number): void {
    this.planFeatureService.getPlanFeaturesByPlanId(planId).subscribe(
      response => {
        this.planFeatures = response;

      },
      error => {
        this.planFeatures=[]
        console.error(`Error fetching plan features by plan ID ${planId}:`, error);
      }
    );
  }

  loadExams(id:number): void {
    this.getExamsByProviderId(id);
  }
  loadExamReservations(id:number): void {
    this.getExamReservationsByExamId(id);
  }
  loadPlan(id:number): void {
    this.getPlanByExamProviderId(id);
  }
  loadComplement(id:number): void {
    this.getComplementByExamReservationId(id);
  }
  loadProctor(id:number): void {
    this.getProctorByExamProviderId(id);
  }
  loadTestimonials(id:number): void {
    this.getTestimonialsByExamProviderId(id);
  }
  changeTestimonialStateToAccepted(testimonialId:number,examProviderId:number){
    this.testimonialService.updateTestimonialState(testimonialId,2).subscribe(
      response => {
        this.getTestimonialsByExamProviderId(examProviderId);

        console.log('Testimonial state updated successfully:', response);
      },
      error => {
        console.error('Error updating testimonial state:', error);
      }
    );
  }
  changeTestimonialStateToRejected(testimonialId:number,examProviderId:number){
    this.testimonialService.updateTestimonialState(testimonialId,3).subscribe(
      response => {
        this.getTestimonialsByExamProviderId(examProviderId);
        console.log('Testimonial state updated successfully:', response);
      },
      error => {
        console.error('Error updating testimonial state:', error);
      }
    );

  }


  updateFilter(event: any) {
    let val = event.target.value.toLowerCase();
    this.rows= CommonUtils.filterData(this.filterRows,val)
  }
  updateFilterExamReservations(event: any) {
    let val = event.target.value.toLowerCase();
    this.reservations= CommonUtils.filterData(this.reservationsFilter,val)
  }
  updateFilterTestimonials(event: any) {
    let val = event.target.value.toLowerCase();
    this.testimonials= CommonUtils.filterData(this.testimonialsFilter,val)
  }
  updateFilterExams(event: any) {
    let val = event.target.value.toLowerCase();
    this.exams= CommonUtils.filterData(this.examsFilter,val)
  }
  updateRow(row: FakeData) {
    console.log('Update:', row);
  }

  deleteRow(row: FakeData) {

  }

  viewPlanDetails(row: FakeData) {
    console.log('Plan Details:', row);
  }

  viewTestimonials(row: FakeData) {
    console.log('Testimonials:', row);
  }

  viewExams(row: FakeData) {
    console.log('Exams:', row);
  }


  protected readonly SortType = SortType;
}
