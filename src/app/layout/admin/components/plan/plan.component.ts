import {Component, ViewEncapsulation} from '@angular/core';
import {ComplementService} from "../../../../core/services/complement.service";
import {CreateAboutDTO} from "../../../../core/DTO/create-about-us-view-model";
import {CreateComplementDTO} from "../../../../core/DTO/create-complement-dto";
import {UpdateComplementDTO} from "../../../../core/DTO/update-complement-dto";
import {ExamProviderService} from "../../../../core/services/exam-provider.service";
import {CreateExamProviderDTO} from "../../../../core/DTO/create-exam-provider-dto";
import {ExamInfoService} from "../../../../core/services/exam-info.service";
import {CreateExamInfoDTO} from "../../../../core/DTO/create-exam-info-dto";
import {UpdateExamInfoDTO} from "../../../../core/DTO/update-exam-info-dto";
import {CreatePlanDTO} from "../../../../core/DTO/create-plan-dto";
import {UpdatePlanDTO} from "../../../../core/DTO/update-plan-dto";
import {PlanService} from "../../../../core/services/plan.service";
import {PlanFeatureService} from "../../../../core/services/plan-feature.service";
import {CreatePlanFeatureDTO} from "../../../../core/DTO/create-plan-feature-dto";
import {UpdatePlanFeatureDTO} from "../../../../core/DTO/update-plan-feature-dto";
import {ExamReservationService} from "../../../../core/services/exam-reservation.service";
import {CreateExamReservationDTO} from "../../../../core/DTO/create-exam-reservation-dto";
import {UpdateExamReservationDTO} from "../../../../core/DTO/update-exam-reservation-dto";
import {TestimonialService} from "../../../../core/services/testimonial.service";
import {CreateTestimonialDTO} from "../../../../core/DTO/create-testimonial-dto";
import {ProctorService} from "../../../../core/services/proctor.service";
import {PlanFeatureDTO} from "../../../../core/DTO/plan-feature-dto";
import {PlanDTO} from "../../../../core/DTO/plan-dto";
import {SortType} from "@swimlane/ngx-datatable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css',
  encapsulation:ViewEncapsulation.None
})
export class PlanComponent {
  createPlanForm: FormGroup;
  createPlanFeatureForm: FormGroup;
  planFeatures: PlanFeatureDTO[] = [];
  planFeaturesFilter: PlanFeatureDTO[] = [];
  columnsPlanFeature = [
    { name: 'Feature Name', prop: 'featuresName' },
    { name: 'Created At', prop: 'createdAt' },

  ];

  planIdNow:number=1;
  planFeatureIdNow: number=1;
  plans: PlanDTO[] = [];
  plansFilter: PlanDTO[] = [];
  columnsPlan = [
    { name: 'Plan Name', prop: 'planName' },
    { name: 'Plan Description', prop: 'planDescription' },
    { name: 'Plan Price', prop: 'planPrice' },
    { name: 'Created At', prop: 'createdAt' },


  ];
  constructor(
    // private complementService: ComplementService
    //           ,private examProviderService:ExamProviderService,
    //           private  examService:ExamInfoService,
    private planService: PlanService,
    private planFeatureService: PlanFeatureService,
    // private examReservationService: ExamReservationService,
    // private testimonialService: TestimonialService,
    // private proctorService: ProctorService
    private fb: FormBuilder,
  ) {
    this.createPlanForm = this.fb.group({
      planName: ['', Validators.required],
      planDescription: ['', Validators.required],
      planPrice: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],

    });
    this.createPlanFeatureForm = this.fb.group({
      featuresName: ['', Validators.required],

    });
  }

  createPlan(): void {
    if (this.createPlanForm.valid) {
      const planData: CreatePlanDTO = this.createPlanForm.value;
      this.planService.createPlan(planData).subscribe(
        response => {
          this.createPlanForm.reset();
          console.log('Plan created successfully:', response);
           this.getAllPlans();
        },
        error => {
          console.error('Error creating plan:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  updatePlan(): void {
    if (this.createPlanForm.valid) {
      const planData: UpdatePlanDTO = this.createPlanForm.value;
      planData.planId=this.planIdNow;
      this.planService.updatePlan(planData).subscribe(
        response => {
          this.createPlanForm.reset();
          console.log('Plan updated successfully:', response);
          this.getAllPlans();
        },
        error => {
          console.error('Error updating plan:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  createPlanFeature(): void {

    if (this.createPlanFeatureForm.valid) {
      const planFeatureData: CreatePlanFeatureDTO = this.createPlanFeatureForm.value;
      planFeatureData.planId=this.planIdNow;
      console.log(planFeatureData)
      this.planFeatureService.createPlanFeature(planFeatureData).subscribe(
        response => {
          console.log('Plan feature created successfully:', response);

        },
        error => {
          console.error('Error creating plan feature:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  ngOnInit(): void {
    this.getAllPlans();
  }

  getAllPlans(): void {
    this.planService.getAllPlans().subscribe(
      response => {
        this.plans=response.data;
        this.plansFilter=response.data;
        console.log('All Plans:', response);
      },
      error => {
        console.error('Error fetching all plans:', error);
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
  loadPlanFeatures(id:number): void {
    this.changePlanIdNow(id)
    this.getPlanFeaturesByPlanId(id);
  }


  deletePlan() {
    this.planService.deletePlan(this.planIdNow).subscribe(
      response => {
        console.log(`Plan with ID ${this.planIdNow} deleted successfully.`);
        this.getAllPlans();
      },
      error => {
        console.error(`Error deleting plan with ID ${this.planIdNow}:`, error);
      }
    );

  }
  updatePlanFeatures() {
    if (this.createPlanFeatureForm.valid) {
      const planFeatureDTO: UpdatePlanFeatureDTO = this.createPlanFeatureForm.value;
      planFeatureDTO.planFeatureId=this.planFeatureIdNow;
      this.planFeatureService.updatePlanFeature(planFeatureDTO).subscribe(
        response => {
          this.createPlanFeatureForm.reset();
          console.log('Plan updated successfully:', response);
          if(planFeatureDTO.planId)
          this.getPlanFeaturesByPlanId(planFeatureDTO.planId);
        },
        error => {
          console.error('Error updating plan:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  deletePlanFeatures() {
    this.planFeatureService.deletePlanFeature(this.planFeatureIdNow).subscribe(
      response => {

        this.createPlanFeatureForm.reset();
        console.log('Plan updated successfully:', response);
          this.getPlanFeaturesByPlanId(this.planFeatureIdNow);
      },
      error => {
        console.error(`Error deleting plan with ID ${this.planIdNow}:`, error);
      }
    );

  }



  protected readonly SortType = SortType;

  changePlanIdNow(planIdNow: number) {
    this.planIdNow=planIdNow;

  }

  getPlanById(planId: number): void {
    this.planService.getPlanById(planId).subscribe(
      response =>{
        this.changePlanIdNow(planId);
        this.createPlanForm.reset();
        this.createPlanForm.patchValue({
          planName: response.planName,
          planDescription: response.planDescription,
          planPrice: response.planPrice
        });
        console.log(`Plan by ID ${planId}:`, response);
      },
      error => {
        console.error(`Error fetching plan by ID ${planId}:`, error);
      }
    );
  }

  getPlanFeatureById(planFeatureId: number): void {
    this.planFeatureService.getPlanFeatureById(planFeatureId).subscribe(
      response => {
        console.log(response)
        this.changePlanFeatureIdNow(planFeatureId);
        this.createPlanFeatureForm.reset();
        this.createPlanFeatureForm.patchValue({
          featuresName: response.featuresName
        });
        console.log(`Plan Feature by ID ${planFeatureId}:`, response);
      },
      error => {
        console.error(`Error fetching plan feature by ID ${planFeatureId}:`, error);
      }
    );
  }

  changePlanFeatureIdNow(planFeatureId: number) {
    this.planFeatureIdNow=planFeatureId;

  }

  resetCreatePlanForm() {
    this.createPlanForm.reset();
  }

  resetCreatePlanFeatureForm() {
    this.createPlanFeatureForm.reset();
  }

  filterPlans(){}
  filterPlanFeatures(){}

}

// //complement testing
// const newComplement: CreateComplementDTO = {
//   proctorDesc: 'Proctordeaa Description',
//   studentDesc: 'Studentasdfasdf Description',
//   examReservationId: 32
// };
//
// this.complementService.createComplement(newComplement).subscribe(
//   response => {
//     console.log('Complement created successfully:', response);
//   },
//   error => {
//     console.error('Error creating complement:', error);
//   }
// );
//
// const updateComplement: UpdateComplementDTO = {
//   complementId:23,
//   proctorDesc: 'Proctor Description1',
//   studentDesc: 'Student Description1',
//   examReservationId: 32
// };
//
// this.complementService.updateComplement(updateComplement).subscribe(
//   response => {
//     console.log('Complement created successfully:', response);
//   },
//   error => {
//     console.error('Error creating complement:', error);
//   }
// );
//
// this.complementService.getComplementById(23).subscribe(
//   response => {
//     console.log(response);
//   },
//   error => {
//     console.error('Error fetching complement by ExamReservationId:', error);
//   }
// );
// this.complementService.getComplementByExamReservationId(32).subscribe(
//   response => {
//     console.log(response);
//   },
//   error => {
//     console.error('Error fetching complement by ExamReservationId:', error);
//   }
// );
// this.complementService.getAllComplements().subscribe(
//   response => {
//     console.log(response);
//   },
//   error => {
//     console.error('Error fetching complement by ExamReservationId:', error);
//   }
// );

// //exam provider
// examProviderService.getAllExamProviders().subscribe(
//   response => {
//     console.log(response);
//   },
//   error => {
//     console.error('Error fetching complement by ExamReservationId:', error);
//   }
// );

// const newExamProvider: CreateExamProviderDTO = {
// examProviderUniqueKey:"aaa",
//   image:"aaa",
//   commercialRecordImg:"aa",
//   planId:9
// };
//
// this.examProviderService.createExamProvider(newExamProvider).subscribe(
//   response => {
//     console.log('ExamProvider created successfully:', response);
//   },
//   error => {
//     console.error('Error creating ExamProvider:', error);
//   }
// );

//exam info

//this.getExamsByProviderId(1);
//this.getExamById(1);
//this.createExam();
// this.getAllExams();
// this.updateExam();
// this.deleteExam(6);
//  this.getAllPlans();
//  this.getPlanByExamProviderId(21);
//  this.getPlanById(9);
//this.createPlan();
// this.updatePlan();
// this.deletePlan(9);
//  this.getAllPlanFeatures();
//  this.getPlanFeaturesByPlanId(6);
//  this.getPlanFeatureById(1);
//this.createPlanFeature();
// this.updatePlanFeature();
//this.deletePlanFeature(8);
// this.getAllExamReservations();
// this.getExamReservationsByExamId(1);
// this.getExamReservationById(1);
// this.createExamReservation();
// this.updateExamReservation();
// this.deleteExamReservation(1);
// this.getExamReservationsByExamId(2);
//this.getExamReservationById(32);
// this.getAllTestimonials();
//  this.getTestimonialsByExamProviderId(2);
//  this.getTestimonialById(1);
//this.createTestimonial();
// this.updateTestimonialState(1, 2);
// this.deleteTestimonial(1);
//    this.getProctorByExamProviderId(32);
//   }
//   getProctorByExamProviderId(examReservationId: number): void {
//     this.proctorService.getProctorByExamReservationId(examReservationId).subscribe(
//       response => {
//         console.log(`Proctor by Provider ID ${examReservationId}:`, response);
//       },
//       error => {
//         console.error(`Error fetching proctor by provider ID ${examReservationId}:`, error);
//       }
//     );
//   }
//   getAllExams(): void {
//     this.examService.getAllExams().subscribe(
//       response => {
//         console.log('All Exams:', response);
//       },
//       error => {
//         console.error('Error fetching all exams:', error);
//       }
//     );
//   }
//
//   getExamsByProviderId(providerId: number): void {
//     this.examService.getAllExamsByExamProviderId(providerId).subscribe(
//       response => {
//         console.log(`Exams by Provider ID ${providerId}:`, response);
//       },
//       error => {
//         console.error(`Error fetching exams by provider ID ${providerId}:`, error);
//       }
//     );
//   }
//
//   getExamById(examId: number): void {
//     this.examService.getExamById(examId).subscribe(
//       response => {
//         console.log(`Exam by ID ${examId}:`, response);
//       },
//       error => {
//         console.error(`Error fetching exam by ID ${examId}:`, error);
//       }
//     );
//   }
//
//   createExam(): void {
//     const newExam: CreateExamInfoDTO = {
//       examTitle: 'New Exam',
//       examImage: 'new-exam.jpg',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       examProviderId: 1
//     };
//
//     this.examService.createExam(newExam).subscribe(
//       response => {
//         console.log('Exam created successfully:', response);
//       },
//       error => {
//         console.error('Error creating exam:', error);
//       }
//     );
//   }
//
//   updateExam(): void {
//     const updatedExam: UpdateExamInfoDTO = {
//       examId:1,
//       examTitle: 'Updated Exam',
//       examImage: 'updated-exam.jpg',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       examProviderId: 1
//     };
//
//     this.examService.updateExam(updatedExam).subscribe(
//       response => {
//         console.log('Exam updated successfully:', response);
//       },
//       error => {
//         console.error('Error updating exam:', error);
//       }
//     );
//   }
//
//   deleteExam(examId: number): void {
//     this.examService.deleteExam(examId).subscribe(
//       response => {
//         console.log(`Exam with ID ${examId} deleted successfully.`);
//       },
//       error => {
//         console.error(`Error deleting exam with ID ${examId}:`, error);
//       }
//     );
//   }
//
//
//
//
// getAllPlans(): void {
//   this.planService.getAllPlans().subscribe(
//     response => {
//       console.log('All Plans:', response);
//     },
//     error => {
//       console.error('Error fetching all plans:', error);
//     }
//   );
// }
//
// getPlanByExamProviderId(providerId: number): void {
//   this.planService.getPlanByExamProviderId(providerId).subscribe(
//     response => {
//       console.log(`Plan by Provider ID ${providerId}:`, response);
//     },
//     error => {
//       console.error(`Error fetching plan by provider ID ${providerId}:`, error);
//     }
//   );
// }
//
// getPlanById(planId: number): void {
//   this.planService.getPlanById(planId).subscribe(
//     response => {
//       console.log(`Plan by ID ${planId}:`, response);
//     },
//     error => {
//       console.error(`Error fetching plan by ID ${planId}:`, error);
//     }
//   );
// }
//
// createPlan(): void {
//   const newPlan: CreatePlanDTO = {
//   planName: 'New Plan',
//   planDescription: 'Description of the new plan',
//   planPrice: 100
// };
//
// this.planService.createPlan(newPlan).subscribe(
//   response => {
//     console.log('Plan created successfully:', response);
//   },
//   error => {
//     console.error('Error creating plan:', error);
//   }
// );
// }
//
// updatePlan(): void {
//   const updatedPlan: UpdatePlanDTO = {
//   planId: 9,
//   planName: 'Updated Plan',
//   planDescription: 'Updated description',
//   planPrice: 150
// };
//
// this.planService.updatePlan(updatedPlan).subscribe(
//   response => {
//     console.log('Plan updated successfully:', response);
//   },
//   error => {
//     console.error('Error updating plan:', error);
//   }
// );
// }
//
// deletePlan(planId: number): void {
//   this.planService.deletePlan(planId).subscribe(
//     response => {
//       console.log(`Plan with ID ${planId} deleted successfully.`);
//     },
//     error => {
//       console.error(`Error deleting plan with ID ${planId}:`, error);
//     }
//   );
// }
//   getAllPlanFeatures(): void {
//     this.planFeatureService.getAllPlanFeatures().subscribe(
//       response => {
//         console.log('All Plan Features:', response);
//       },
//       error => {
//         console.error('Error fetching all plan features:', error);
//       }
//     );
//   }
//
//   getPlanFeaturesByPlanId(planId: number): void {
//     this.planFeatureService.getPlanFeaturesByPlanId(planId).subscribe(
//       response => {
//         console.log(`Plan Features by Plan ID ${planId}:`, response);
//       },
//       error => {
//         console.error(`Error fetching plan features by plan ID ${planId}:`, error);
//       }
//     );
//   }
//
//   getPlanFeatureById(planFeatureId: number): void {
//     this.planFeatureService.getPlanFeatureById(planFeatureId).subscribe(
//       response => {
//         console.log(`Plan Feature by ID ${planFeatureId}:`, response);
//       },
//       error => {
//         console.error(`Error fetching plan feature by ID ${planFeatureId}:`, error);
//       }
//     );
//   }
//
//   createPlanFeature(): void {
//     const newPlanFeature: CreatePlanFeatureDTO = {
//       featuresName: 'New Feature',
//       planId: 6
//     };
//
//     this.planFeatureService.createPlanFeature(newPlanFeature).subscribe(
//       response => {
//         console.log('Plan feature created successfully:', response);
//       },
//       error => {
//         console.error('Error creating plan feature:', error);
//       }
//     );
//   }
//
//   updatePlanFeature(): void {
//     const updatedPlanFeature: UpdatePlanFeatureDTO = {
//       planFeatureId: 1,
//       featuresName: 'Updated Feature',
//       planId: 6
//     };
//
//     this.planFeatureService.updatePlanFeature(updatedPlanFeature).subscribe(
//       response => {
//         console.log('Plan feature updated successfully:', response);
//       },
//       error => {
//         console.error('Error updating plan feature:', error);
//       }
//     );
//   }
//
//   deletePlanFeature(planFeatureId: number): void {
//     this.planFeatureService.deletePlanFeature(planFeatureId).subscribe(
//       response => {
//         console.log(`Plan feature with ID ${planFeatureId} deleted successfully.`);
//       },
//       error => {
//         console.error(`Error deleting plan feature with ID ${planFeatureId}:`, error);
//       }
//     );
//   }
//
//
//
//   // getAllExamReservations(): void {
//   //   this.examReservationService.get().subscribe(
//   //     response => {
//   //       console.log('All Exam Reservations:', response);
//   //     },
//   //     error => {
//   //       console.error('Error fetching all exam reservations:', error);
//   //     }
//   //   );
//   // }
//
//   getExamReservationsByExamId(examId: number): void {
//     this.examReservationService.getExamReservationsByExamId(examId).subscribe(
//       response => {
//         console.log(`Exam Reservations by Exam ID ${examId}:`, response);
//       },
//       error => {
//         console.error(`Error fetching exam reservations by exam ID ${examId}:`, error);
//       }
//     );
//   }
//
//   getExamReservationById(reservationId: number): void {
//     this.examReservationService.getExamReservationById(reservationId).subscribe(
//       response => {
//         console.log(`Exam Reservation by ID ${reservationId}:`, response);
//       },
//       error => {
//         console.error(`Error fetching exam reservation by ID ${reservationId}:`, error);
//       }
//     );
//   }
//
//   createExamReservation(): void {
//     const newExamReservation: CreateExamReservationDTO = {
//       studentTokenEmail: 'student@example.com',
//       startDate: new Date(),
//       endDate: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour later
//       proctorTokenEmail: 'proctor@example.com',
//       uniqueKey: 'unique-key',
//       userId: 220,
//       studentName: 'John Doe',
//       phone: '123-456-7890',
//       email: 'student@example.com',
//       examId: 2
//     };
//
//     this.examReservationService.createExamReservation(newExamReservation).subscribe(
//       response => {
//         console.log('Exam reservation created successfully:', response);
//       },
//       error => {
//         console.error('Error creating exam reservation:', error);
//       }
//     );
//   }
//   updateExamReservation(): void {
//     const updatedExamReservation: UpdateExamReservationDTO = {
//       examReservationId: 1,
//       studentTokenEmail: 'updated-student@example.com',
//       startDate: new Date(),
//       endDate: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // 2 hours later
//       proctorTokenEmail: 'updated-proctor@example.com',
//       uniqueKey: 'updated-unique-key',
//       userId: 220,
//       studentName: 'Jane Doe',
//       phone: '098-765-4321',
//       score: 90,
//       email: 'updated-student@example.com',
//       examId: 2
//     };
//
//     this.examReservationService.updateExamReservation(updatedExamReservation).subscribe(
//       response => {
//         console.log('Exam reservation updated successfully:', response);
//       },
//       error => {
//         console.error('Error updating exam reservation:', error);
//       }
//     );
//   }
// updateExamReservation(): void {
//   const updatedExamReservation: UpdateExamReservationDTO = {
//     examreservationId: 1,
//     examId: 1,
//     studentId: 1,
//     reservationDate: new Date(),
//     // other properties...
//   };
//
//   this.examReservationService.updateExamReservation(updatedExamReservation).subscribe(
//     response => {
//       console.log('Exam reservation updated successfully:', response);
//     },
//     error => {
//       console.error('Error updating exam reservation:', error);
//     }
//   );
// }
//
// deleteExamReservation(reservationId: number): void {
//   this.examReservationService.deleteExamReservation(reservationId).subscribe(
//     response => {
//       console.log(`Exam reservation with ID ${reservationId} deleted successfully.`);
//     },
//     error => {
//       console.error(`Error deleting exam reservation with ID ${reservationId}:`, error);
//     }
//   );
// }
//
// getAllTestimonials(): void {
//   this.testimonialService.getAllTestimonials().subscribe(
//     response => {
//       console.log('All Testimonials:', response);
//     },
//     error => {
//       console.error('Error fetching all testimonials:', error);
//     }
//   );
// }
//
// getTestimonialsByExamProviderId(providerId: number): void {
//   this.testimonialService.getTestimonialsByExamProviderId(providerId).subscribe(
//     response => {
//       console.log(`Testimonials by Provider ID ${providerId}:`, response);
//     },
//     error => {
//       console.error(`Error fetching testimonials by provider ID ${providerId}:`, error);
//     }
//   );
// }
//
// getTestimonialById(testimonialId: number): void {
//   this.testimonialService.getTestimonialById(testimonialId).subscribe(
//     response => {
//       console.log(`Testimonial by ID ${testimonialId}:`, response);
//     },
//     error => {
//       console.error(`Error fetching testimonial by ID ${testimonialId}:`, error);
//     }
//   );
// }
//
// createTestimonial(): void {
//   const newTestimonial: CreateTestimonialDTO = {
//     testimonialStateId:2,
//     examProviderId: 2,
//     testimonialText: 'Great experience!',
//
//   };
//
//   this.testimonialService.createTestimonial(newTestimonial).subscribe(
//     response => {
//       console.log('Testimonial created successfully:', response);
//     },
//     error => {
//       console.error('Error creating testimonial:', error);
//     }
//   );
// }
//
// updateTestimonialState(testimonialId: number, stateId: number): void {
//   this.testimonialService.updateTestimonialState(testimonialId, stateId).subscribe(
//     response => {
//       console.log('Testimonial state updated successfully:', response);
//     },
//     error => {
//       console.error('Error updating testimonial state:', error);
//     }
//   );
// }
//
// deleteTestimonial(testimonialId: number): void {
//   this.testimonialService.deleteTestimonial(testimonialId).subscribe(
//     response => {
//       console.log(`Testimonial with ID ${testimonialId} deleted successfully.`);
//     },
//     error => {
//       console.error(`Error deleting testimonial with ID ${testimonialId}:`, error);
//     }
//   );
// }
