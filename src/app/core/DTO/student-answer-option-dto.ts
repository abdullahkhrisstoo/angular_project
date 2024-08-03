

export interface StudentAnswerDto {
  questionId?: number;
  selectedAnswer?: number;
}

export interface StudentQuestionAnswerListDTO {
  QuestionAnswers?: StudentAnswerDto[];
}
