export interface TestimonialDTO {
  testimonialId: number;
  testimonialStateId?: number;
  testimonialState?: string;
  testimonialText?: string;
  createdAt?: Date;
  updatedAt?: Date;
  examProviderId?: number; 
}
