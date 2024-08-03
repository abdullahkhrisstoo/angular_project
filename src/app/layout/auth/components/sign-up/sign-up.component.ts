import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { RegisterExamProviderDTO } from '../../../../core/DTO/register-exam-provider-dto';
import { error } from 'console';

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
  selectedFile: File | null = null;
  createExamProviderViewModel: CreateExamProviderDTO = {
    userId: 0,
    planId: 0,
    examProviderUniqueKey: ''
  };
  registerExamProviderForm: FormGroup;

  constructor(
    private formController: FormControllerService,
    private authService: AuthService,
    private toast: ToastMsgService,
    private examProviderApis: ExamProviderService,
    private sharedPlanService: DataSharedService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signUpForm = this.formController.createFormGroup({
      firstName: FIRST_NAME_CONTROL,
      lastName: LAST_NAME_CONTROL,
      email: EMAIL_CONTROL,
      phonenum: PHONE_CONTROL,
      password: PASSWORD_CONTROL,
      plan: PLAN_CONTROL,
    });

    this.registerExamProviderForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardHolderName: ['', Validators.required],
      cardCvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      cardExpireDate: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]]
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

 onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      alert('Please select a valid PDF file.');
    }
  }

  get cardNumber() {
    return this.registerExamProviderForm.get('cardNumber')!;
  }
  
  get cardHolderName() {
    return this.registerExamProviderForm.get('cardHolderName')!;
  }
  
  get cardCvv() {
    return this.registerExamProviderForm.get('cardCvv')!;
  }
  
  get cardExpireDate() {
    return this.registerExamProviderForm.get('cardExpireDate')!;
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


  onSubmit(): void {
    if (this.signUpForm.invalid || this.registerExamProviderForm.invalid) {
      return;
    }

    const accountDetails = this.signUpForm.value;
    const cardDetails = this.registerExamProviderForm.value;
    const planId = this.signUpForm.get('plan')?.value;
    const formData = new FormData();

    formData.append('CreateAccountViewModel.FirstName', accountDetails.firstName);
    formData.append('CreateAccountViewModel.LastName', accountDetails.lastName);
    formData.append('CreateAccountViewModel.Email', accountDetails.email);
    formData.append('CreateAccountViewModel.Phonenum', accountDetails.phonenum);
    formData.append('CreateAccountViewModel.Password', accountDetails.password);
    formData.append('CreateAccountViewModel.RoleId', '2');
    formData.append('PlanId', planId);
    formData.append('CardInfoDTO.CardNumber', cardDetails.cardNumber);
    formData.append('CardInfoDTO.CardHolderName', cardDetails.cardHolderName);
    formData.append('CardInfoDTO.CardCvv', cardDetails.cardCvv);
    formData.append('CardInfoDTO.CardExpireDate', cardDetails.cardExpireDate);
    if (this.selectedFile) {
      formData.append('CommercialRecord', this.selectedFile, this.selectedFile.name);
    }

    this.authService.registerExamProvider(formData).subscribe(
      response => {
        // Handle success
        console.log('Registration successful', response);
      },
      error => {
        // Handle error
        console.error('Registration error', error);
      }
    );
  }


}
