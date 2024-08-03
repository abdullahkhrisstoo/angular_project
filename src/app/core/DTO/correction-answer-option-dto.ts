export interface CorrectionAnswerOptionApiResponse {
  success: boolean;
  data: QuestionDataDto[];
  message: string | null;
  errors: string[] | null;
}

export interface QuestionDataDto {
  questionOptions: CorrectionAnswerOptionDTO[];
}

export interface CorrectionAnswerOptionDTO {
  optionId: number;
  isCorrect: string; // "true" or "false"
}
