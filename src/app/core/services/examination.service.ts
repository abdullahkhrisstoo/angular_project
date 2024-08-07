import { Injectable } from '@angular/core';
import { GenericApiHandlerService } from './api.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ApiResponseFromExamProvider, ExamWithoutAnswerDto, QuestionWithoutAnswerDTO } from '../DTO/exam-without-answer-dto';
import { API_ENDPOINTS } from '../constants/api.constants';

import { CorrectionAnswerOptionApiResponse, CorrectionAnswerOptionDTO } from '../DTO/correction-answer-option-dto';
import { StudentQuestionAnswerListDTO } from '../DTO/student-answer-option-dto';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {
  private currentExam!: ExamWithoutAnswerDto;
  private currentCorrectionExam!: CorrectionAnswerOptionDTO[];

  constructor(private apiHandler: GenericApiHandlerService) { }

  getExamWithoutAnswerCallingAPIs(): Observable<ApiResponseFromExamProvider> {
    const endpoint = `${API_ENDPOINTS.GET_EXAM_WITHOUT_ANSWER}`;
    return this.apiHandler.get<ApiResponseFromExamProvider>(endpoint);
  }

  fetchAndSetExam(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getExamWithoutAnswerCallingAPIs().subscribe(response => {
        if (response.success && response.data && response.data.length > 0) {
          this.setCurrentExam(response.data[0]);
          resolve();
        } else {
          reject('No exam data found in response.');
        }
      }, error => {
        reject('Error fetching exam data');
      });
    });
  }

  setCurrentExam(exam: ExamWithoutAnswerDto): void {
    this.currentExam = exam;
  }

  getCurrentExam(): ExamWithoutAnswerDto {
    return this.currentExam;
  }

  getTotalQuestions(): number | undefined {
    return this.currentExam ? this.currentExam.questions?.length : 0;
  }

  getQuestionById(id: number): QuestionWithoutAnswerDTO | null {
    return this.currentExam ? this.currentExam.questions?.find(q => q.questionId === id) || null : null;
  }

  calculateScoreCallingApi(answeredQuestions: StudentQuestionAnswerListDTO ): Observable<CorrectionAnswerOptionApiResponse> {
    const endpoint = `${API_ENDPOINTS.GET_CORRECTION_ANSWER}`;
    return this.apiHandler.post<CorrectionAnswerOptionApiResponse>(endpoint,answeredQuestions);

  }






}
