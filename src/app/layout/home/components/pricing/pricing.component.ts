import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../../../core/services/plan.service';
import { Plan } from '../../../../core/models/plan-model';
import { ApiResponse } from '../../../../core/utils/ApiResponse';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent implements OnInit{
  Plans!: Plan[];
  mostExpensivePlan: Plan | undefined;
    constructor(private planService :PlanService){
  }
  ngOnInit(): void {
    this.fetchAllPlansWithFeatures();

  }
  fetchAllPlansWithFeatures(){
    this.planService.GetAllPlanWithFeatures().subscribe(
      (response: ApiResponse<Plan[]>) => {
        if (response.status === 200) {
          console.log(response);
          this.Plans = response.data;

          this.mostExpensivePlan = this.Plans.reduce((prev, current) => {
            return (prev.planPrice > current.planPrice) ? prev : current;
          }, this.Plans[0]); 

          console.log('Most expensive plan:', this.mostExpensivePlan);
        } 
      },
      error => {
        console.error('Login error:', error);
      }
    );
  }
  isMostExpensivePlan(plan: Plan): boolean | undefined {
    return this.mostExpensivePlan?.planPrice  === plan.planPrice;
  }
  }

  

