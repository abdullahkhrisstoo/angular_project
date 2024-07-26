import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../../../core/services/plan.service';
import { Plan } from '../../../../core/models/plan-model';
import { ApiResponse } from '../../../../core/utils/ApiResponse';
import { ExamProviderService } from '../../../../core/services/exam-provider.service';
import { Router } from '@angular/router';
import { DataSharedService } from '../../../../core/services/data-shared.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent implements OnInit {
  Plans: Plan[] = [];
  mostExpensivePlan?: Plan;

  constructor(
    private planService: PlanService,
    private examProviderService: ExamProviderService,
    private router: Router,
    private sharedPlanService: DataSharedService
  ) {}

  ngOnInit(): void {
    this.fetchAllPlansWithFeatures();
  }

  fetchAllPlansWithFeatures() {
    this.planService.GetAllPlanWithFeatures().subscribe(
      (response: ApiResponse<Plan[]>) => {
        if (response.status === 200) {
          this.Plans = response.data;
          this.mostExpensivePlan = this.Plans.reduce((prev, current) => {
            return prev.planPrice > current.planPrice ? prev : current;
          }, this.Plans[0]);
        }
      },
      (error) => {
        console.error('Fetch plans error:', error);
      }
    );
  }

  isMostExpensivePlan(plan: Plan): boolean {
    return this.mostExpensivePlan?.planPrice === plan.planPrice;
  }

  onBuyNow(plan: Plan) {
    this.sharedPlanService.selectAuthPlan(plan);
    
    this.router.navigate(['/auth/sign-up']);
  }
}
