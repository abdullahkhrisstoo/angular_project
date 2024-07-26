import { Plan } from './../../../core/models/plan-model';
import { Response } from './../../../../../node_modules/@types/express-serve-static-core/index.d';
import { CurrentUserData } from './../../../core/models/current-user-data';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { ADMIN_ROLE, EXAM_PROVIDER_ROLE, PROCTOR_ROLE } from '../../../core/constants/app.constants';
import { ExamProviderService } from '../../../core/services/exam-provider.service';
import { GetExamProviderByUserIdDto, PlanDto } from '../../../core/DTO/get-exam-provider-by-user-id-view-model';
import { ApiResponse } from '../../../core/utils/ApiResponse';
import { DataSharedService } from '../../../core/services/data-shared.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  userRole!: number ;
  updatePassPath: string = '';
  examProviderData!:GetExamProviderByUserIdDto;
  userData: CurrentUserData | null = null;
  currentExamProviderPlan!:PlanDto;


  constructor(
    private cache:LocalStorageService,
    private examProviderCall:ExamProviderService,
    private planSharedService: DataSharedService

  ) {
    this.userData=cache.getItem(cache.USER_SESSION_KEY);

  }

  ngOnInit(): void {
    this.userRole=this.userData!.roleId!;
    this.loadExamProviderData();

  }

  loadExamProviderData() {

    this.examProviderCall.getExamProviderByUserId(this.userData?.userId??0) .subscribe(
      (response: ApiResponse<GetExamProviderByUserIdDto>) => {
      if (response.status === 200) {
        this.examProviderData=response.data;
        this.currentExamProviderPlan = response.data.plan;
        this.planSharedService.setPlan(this.currentExamProviderPlan);
      } else {
        console.error('Failed to load about data:', response.message);
      }
    });
  }

  isExamProvider(): boolean {
    console.log(this.userRole)
    return this.userRole === EXAM_PROVIDER_ROLE;
  }

  getFullName(): string {
    return `${this.userData?.firstName ?? ''} ${this.userData?.lastName ?? ''}`;
  }

  copyToken(): void {
    const token = this.userData?.token;

    if (token) {
      navigator.clipboard.writeText(token).then(() => {
        console.error('copy token done ');
      }).catch(err => {
        console.error('Failed to copy token: ', err);
      });
    } else {
      alert('No token available to copy.');
    }
  }
  setUpdatePassPath(): void {
    if (!this.userRole) {
      return;
    }

    switch (this.userRole) {
      case ADMIN_ROLE:
        this.updatePassPath = 'admin/profile/update-password';
        break;
      case PROCTOR_ROLE:
        this.updatePassPath = 'proctor/profile/update-password';
        break;
      case EXAM_PROVIDER_ROLE:
        this.updatePassPath = 'exam-provider/profile/update-password';
        break;
      default:
        console.warn('Unknown role:');
        break;
    }}
}
