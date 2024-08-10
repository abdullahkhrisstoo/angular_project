import {Component, ViewEncapsulation} from '@angular/core';
import {ComplementDTO} from "../../../../core/DTO/complement-dto";
import {ExamInfoDTO} from "../../../../core/DTO/exam-info-dto.model";
import {ExamReservationDTO} from "../../../../core/DTO/exam-reservation-dto";
import {TestimonialDTO} from "../../../../core/DTO/testimonial-dto";
import {ComplementService} from "../../../../core/services/complement.service";
import {ExamProviderService} from "../../../../core/services/exam-provider.service";
import {ExamInfoService} from "../../../../core/services/exam-info.service";
import {PlanService} from "../../../../core/services/plan.service";
import {PlanFeatureService} from "../../../../core/services/plan-feature.service";
import {ExamReservationService} from "../../../../core/services/exam-reservation.service";
import {TestimonialService} from "../../../../core/services/testimonial.service";
import {ProctorService} from "../../../../core/services/proctor.service";
import {SortType} from '@swimlane/ngx-datatable';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreatePlanDTO} from "../../../../core/DTO/create-plan-dto";
import {CreateTestimonialDTO} from "../../../../core/DTO/create-testimonial-dto";

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css',
  encapsulation:ViewEncapsulation.None
})
export class TestimonialComponent {

  createTestimonialForm: FormGroup;
  testimonials: TestimonialDTO[] = [];
  columnsTestimonial = [
    {name: 'Text', prop: 'testimonialText', sortable: true},
    {name: 'State', prop: 'testimonialState', sortable: true},
    {name: 'Created At', prop: 'createdAt', sortable: true},
    {name: 'Updated At', prop: 'updatedAt', sortable: true},
  ];

  constructor(private complementService: ComplementService
    , private examProviderService: ExamProviderService,
              private testimonialService: TestimonialService ,
              private fb: FormBuilder,
) {
  this.createTestimonialForm = this.fb.group({
    testimonialText: ['', Validators.required],

  });
  }
   examProviderId!:number;
  ngOnInit(): void {

    let examProviderID = localStorage.getItem('examProviderId');
    if (examProviderID){
       this.examProviderId=Number.parseInt(examProviderID);
       this.getTestimonialsByExamProviderId(Number.parseInt(examProviderID));
    }
  }
  getTestimonialsByExamProviderId(providerId: number): void {
    this.testimonialService.getTestimonialsByExamProviderId(providerId).subscribe(
      response => {
        this.testimonials = response;
        console.log(`Testimonials by Provider ID ${providerId}:`, response);
      },
      error => {
        this.testimonials = [];
        console.error(`Error fetching testimonials by provider ID ${providerId}:`, error);
      }
    );
  }
  updateFilter(event: any) {

  }
  protected readonly SortType = SortType;


  createTestimonial() {
    if (this.createTestimonialForm.valid) {
      const createTestimonialDTO: CreateTestimonialDTO = this.createTestimonialForm.value;
      createTestimonialDTO.examProviderId=this.examProviderId;
      this.testimonialService.createTestimonial(createTestimonialDTO).subscribe(
        response => {
          this.createTestimonialForm.reset();
          console.log('Plan created successfully:', response);
          let examProviderID = localStorage.getItem('examProviderId');
          if (examProviderID)
            this.getTestimonialsByExamProviderId(Number.parseInt(examProviderID));
        },
        error => {
          console.error('Error creating plan:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
