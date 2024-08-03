export interface OptionWithoutAnswerDTO {
  optionId?: number;
  title?: string;
}

export interface QuestionWithoutAnswerDTO {
  questionDescription?: string;
  questionId?: number;
  // questionLevel?: string;
  // questionType?: string | null;
  examId?: number;
  options?: OptionWithoutAnswerDTO[];
  selectedAnswer?: string; //todo: this not from api, this define here, just to store the selectd answer
}

export interface ExamWithoutAnswerDto {
  examName?: string;
  examDuration?: number;
  examDescription?: string | null;
  price?: number | null;
  questions?: QuestionWithoutAnswerDTO[];
}

export interface ApiResponseFromExamProvider {
  success?: boolean;
  data?: ExamWithoutAnswerDto[];
  message?: string | null;
  errors?: string | null;
}
