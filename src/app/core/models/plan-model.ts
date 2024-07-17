import { PlanFeature } from "./plan-features";

export interface Plan {
    planId: number;
    planName: string;
    planDescription: string;
    planPrice: number;
    createdAt: Date;
    updatedAt: Date;
    planFeatures: PlanFeature[];
}
