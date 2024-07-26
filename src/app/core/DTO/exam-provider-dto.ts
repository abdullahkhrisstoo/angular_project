export interface ExamProviderDTO {
  examProviderId: number;
  examProviderUniqueKey?: string;
  planId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  examProviderName?: string;
  userId?: number;
  commercialRecordImg?: string;
  image?: string;
  state?: string;
}
