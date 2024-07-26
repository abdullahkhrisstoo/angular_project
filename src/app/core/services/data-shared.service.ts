import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlanDto } from '../DTO/get-exam-provider-by-user-id-view-model';
import { Plan } from '../models/plan-model';

@Injectable({
  providedIn: 'root',
})
export class DataSharedService {
  constructor() {}
  private planSubject = new BehaviorSubject<PlanDto | null>(null);
  plan$ = this.planSubject.asObservable();

  setPlan(plan: PlanDto) {
    this.planSubject.next(plan);
  }
  getCurrentPlan(): PlanDto | null {
    return this.planSubject.getValue();
  }


  
  private selectedPlanSubject = new BehaviorSubject<Plan | null>(null);
  selectedPlan$ = this.selectedPlanSubject.asObservable();

  selectAuthPlan(plan: Plan) {
    this.selectedPlanSubject.next(plan);
  }
}

// The convention of appending a dollar sign ($)
// to the end of a variable name in JavaScript and TypeScript,
// particularly in the context of RxJS, is a naming convention to indicate that the variable is an observable stream.
// This helps developers quickly identify variables that represent observables and distinguish them from regular variables.
