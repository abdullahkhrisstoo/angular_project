export interface UpdateExamInfoDTO {
  examId: number;
  examTitle?: string;
  examImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
  examProviderId?: number;
}
