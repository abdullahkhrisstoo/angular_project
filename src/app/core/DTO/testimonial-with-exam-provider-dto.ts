

export interface TestimonialWithExamProviderDTO {
  testimonialId: number;
  testimonialStateId?: number;
  testimonialState?: string;
  testimonialtext?: string;
  createdAt?: Date;
  updatedAt?: Date;
  examProviderId?: number;
  examProviderName?: string;
  examProviderImage?: string;
  examProviderOwnerName?: string;
}
