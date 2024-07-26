import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { CreateAccountViewModel } from '../../../../core/DTO/create-account-view-model';
import { ApiResponse } from '../../../../core/utils/ApiResponse';
import { ToastMsgService } from '../../../../core/services/toast.service';
import { APP_MESSAGES } from '../../../../core/constants/error-messages.constants';
import { CurrentUserData } from '../../../../core/models/current-user-data';
import { FormControllerService } from '../../../../core/services/form-controller.service';
import { EMAIL_CONTROL, FIRST_NAME_CONTROL, LAST_NAME_CONTROL, PASSWORD_CONTROL, PHONE_CONTROL, PLAN_CONTROL } from '../../../../core/constants/form-control.constant';
import { EXAM_PROVIDER_ROLE } from '../../../../core/constants/app.constants';
import { ExamProviderService } from '../../../../core/services/exam-provider.service';
import { Plan } from '../../../../core/models/plan-model';
import { Router } from '@angular/router';
import { DataSharedService } from '../../../../core/services/data-shared.service';
import {CreateExamProviderDTO} from "../../../../core/DTO/create-exam-provider-dto";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  AppMessages = APP_MESSAGES;
  plans: Plan[] = [];
  defaultPlan: Plan | undefined;
  createExamProviderViewModel: CreateExamProviderDTO = {
    userId: 0,
    planId: 0,
    examProviderUniqueKey: ''
  };

  constructor(
    private formController: FormControllerService,
    private authService: AuthService,
    private toast: ToastMsgService,
    private examProviderApis: ExamProviderService,
    private sharedPlanService: DataSharedService,
    private router: Router
  ) {
    this.signUpForm = this.formController.createFormGroup({
      firstName: FIRST_NAME_CONTROL,
      lastName: LAST_NAME_CONTROL,
      email: EMAIL_CONTROL,
      phonenum: PHONE_CONTROL,
      password: PASSWORD_CONTROL,
      plan: PLAN_CONTROL,
    });
  }

  ngOnInit(): void {
    this.getAllPlans();

  }

  register(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    const selectedPlanId = this.signUpForm.get('plan')?.value;
    if (!selectedPlanId && this.defaultPlan) {
      this.signUpForm.patchValue({ plan: this.defaultPlan.planId });
      this.examProviderApis.selectPlan(this.defaultPlan);
    }

    const user: CreateAccountViewModel = {
      ...this.signUpForm.value,
      roleId: EXAM_PROVIDER_ROLE
    };

    this.authService.register(user).subscribe(
      (response: ApiResponse<CurrentUserData>) => {
        if (response.status === 200) {
          this.createExamProvider(response.data.userId, response.data.lastName);
          this.signUpForm.reset();
        }
      },
      error => {
        this.toast.showError(this.AppMessages.CHECK_EMAIL_PASSWORD);
      }
    );
  }

  createExamProvider(userId: number, encToken: string): void {
    this.createExamProviderViewModel.userId = userId;
    this.createExamProviderViewModel.planId = this.signUpForm.get('plan')?.value;
    this.createExamProviderViewModel.examProviderUniqueKey = encToken;

    this.examProviderApis.createExamProvider(this.createExamProviderViewModel).subscribe(
      (response: ApiResponse<CreateExamProviderDTO>) => {
        this.router.navigate(['/auth/sign-in']);
      },
      error => {
        console.error('Error creating exam provider:', error);
      }
    );
  }

  updatePlan(): void {
    const selectedPlanId = this.signUpForm.get('plan')?.value;
    const selectedPlan = this.plans.find(plan => plan.planId === selectedPlanId);
    if (selectedPlan) {
      this.examProviderApis.selectPlan(selectedPlan);
    }
  }

  getAllPlans(): void {
    this.examProviderApis.fetchAllPlan().subscribe(
      (response: ApiResponse<Plan[]>) => {
        if (response.status === 200) {
          this.plans = response.data;
          if (this.plans.length > 0) {

            this.defaultPlan = this.plans[0];
            this.signUpForm.patchValue({ plan: this.defaultPlan.planId });
            this.examProviderApis.selectPlan(this.defaultPlan);

            this.sharedPlanService.selectedPlan$.subscribe(plan => {
              if (plan) {
                this.signUpForm.patchValue({ plan: plan.planId });

              }
            });

          }
        }
      },
      error => {
        console.error('Fetch plans error:', error);
      }
    );
  }
}
