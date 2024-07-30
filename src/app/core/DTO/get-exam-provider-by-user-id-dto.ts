export interface GetExamProviderByUserIdDto {
  examProviderId: number;
  examProviderUniqueKey: string;
  planId: number;
  userId: number;
  commercialRecordImg: string | null;
  image: string | null;
  plan: PlanDto;
}

export interface PlanDto {
  planId: number;
  planName: string;
  planDescription: string;
  planPrice: number;
  planFeatures: PlanFeatureDto[];
}

export interface PlanFeatureDto {
  planFeatureId: number;
  featuresName: string;
}
