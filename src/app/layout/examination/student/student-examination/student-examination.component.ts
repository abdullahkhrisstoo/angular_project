


import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faUpload, faCreditCard, faUsers, faMicrophoneSlash, faMessage } from '@fortawesome/free-solid-svg-icons';
import {  StudentAnswerDto, StudentQuestionAnswerListDTO } from '../../../../core/DTO/student-answer-option-dto';
import { ExamWithoutAnswerDto, QuestionWithoutAnswerDTO } from '../../../../core/DTO/exam-without-answer-dto';
import { ExaminationService } from '../../../../core/services/examination.service';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { formatTime } from '../../../../core/extensions/format-time';
import { THIRTY_SECONDS } from '../../../../core/constants/app.constants';

type IconType = 'microphone' | 'video' | 'upload' | 'creditCard' | 'users';

@Component({
  selector: 'app-examination-layout',
  templateUrl: './student-examination.component.html',
  styleUrls: [
    './student-examination.component.css',
  ],
})
export class StudentExaminationComponent implements OnInit {
  isLastTwentySeconds: boolean = false;
  hasUnansweredQuestions: boolean = false;
  answeredQuestions!: StudentQuestionAnswerListDTO;
  exam?: ExamWithoutAnswerDto;
  questions?: QuestionWithoutAnswerDTO[];
  selectedQuestionId?: number;
  question?: QuestionWithoutAnswerDTO;
  isLastQuestion?: boolean;
  remainingTime?: number;
  interval: any;
  faMicrophoneSlash = faMicrophoneSlash;
  faMessage = faMessage;
  faUpload = faUpload;
  faCreditCard = faCreditCard;
  faUsers = faUsers;
  activeIcons: { [key in IconType]: boolean } = {
    microphone: false,
    video: false,
    upload: false,
    creditCard: false,
    users: false
  };
  isChatVisible = false;
  showOverlay = false;

  warningSound!: HTMLAudioElement;

  constructor(private questionService: ExaminationService, private cache: LocalStorageService) {
    this.warningSound = new Audio('/sounds/10-minutes.mp3');

  }

  async ngOnInit() {
    await this.questionService.fetchAndSetExam("aa");
    this.exam = this.questionService.getCurrentExam();
    if (this.exam?.questions && this.exam.questions.length > 0) {
      this.questions = this.exam.questions;
      const savedAnswers = this.cache.getItem(this.cache.ANSWER_SAVED) as any[];
      if (Array.isArray(savedAnswers)) {
        this.questions.forEach(question => {
          const savedAnswer = savedAnswers.find(answer => answer.questionId === question.questionId);
          if (savedAnswer) {
            question.selectedAnswer = savedAnswer.selectedAnswer;
          }
        });
      }
      this.selectedQuestionId = this.questions[0].questionId;
      this.loadQuestion();

      // Retrieve remaining time from local storage or set default
      const savedTime = this.cache.getItem(this.cache.TIME_REMAINING) as string | null;
      this.remainingTime = savedTime ? parseInt(savedTime, 10) : this.exam.examDuration! * 60;
      this.startTimer();
    } else {
      console.error('No questions found in the exam.');
    }
    console.log(this.questions);
  }

  loadQuestion() {
    if (this.questions && this.selectedQuestionId !== undefined) {
      this.question = this.questions.find(q => q.questionId === this.selectedQuestionId) || undefined;
      this.isLastQuestion = this.selectedQuestionId === this.questions[this.questions.length - 1].questionId;
      console.log(`loadQuestion() ${this.question}`);
    }
  }

  onSelectQuestion(id: number) {
    this.storeData();
    this.selectedQuestionId = id;
    this.loadQuestion();
  }

  startExam() {
    this.showOverlay = false;
    this.openFullscreen();
  }

  openFullscreen() {
    const elem = document.documentElement as any;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }

  prevQuestion() {

    this.storeData();
    if (this.questions && this.selectedQuestionId !== undefined) {
      const currentIndex = this.questions.findIndex(q => q.questionId === this.selectedQuestionId);
      if (currentIndex > 0) {
        this.selectedQuestionId = this.questions[currentIndex - 1].questionId;
        this.loadQuestion();
      }
    }
  }

  nextQuestion() {

    this.storeData();
    if (this.questions && this.selectedQuestionId !== undefined) {
      const currentIndex = this.questions.findIndex(q => q.questionId === this.selectedQuestionId);
      if (currentIndex < this.questions.length - 1) {
        this.selectedQuestionId = this.questions[currentIndex + 1].questionId;
        this.loadQuestion();
      }
    }
  }





  submitExam(): void {
    this.storeData();

    const cachedData = this.cache.getItem<StudentAnswerDto[]>(this.cache.ANSWER_SAVED);
    if (cachedData) {
      if (!this.answeredQuestions) {
        this.answeredQuestions = { QuestionAnswers: [] };
      }
      this.answeredQuestions.QuestionAnswers = cachedData;
    } else {
      console.warn('No data found in cache.');
    }

    const unansweredQuestions = this.answeredQuestions.QuestionAnswers!.filter(question => question.selectedAnswer === null || question.selectedAnswer === undefined);
    this.hasUnansweredQuestions = unansweredQuestions.length > 0;

    if (this.hasUnansweredQuestions) {
      console.warn("Unanswered Questions:", unansweredQuestions);
    } else {
      this.questionService.calculateScoreCallingApi("aa",this.answeredQuestions ).subscribe({
        next: (response) => {
          console.log('Score:', response.data);
        },
        error: (error) => {
          console.error('Error submitting exam:', error);
        }
      });
    }
  }





  isQuestionUnanswered(question: QuestionWithoutAnswerDTO): boolean {
    return !question.selectedAnswer;
  }

  startTimer() {
    this.interval = setInterval(() => {

      if (this.remainingTime && this.remainingTime > 0) {
        if (this.remainingTime === THIRTY_SECONDS) {
          this.warningSound.play();
        }
        if (this.remainingTime <= THIRTY_SECONDS) {
          this.isLastTwentySeconds = true;
        }
        this.remainingTime--;
        this.cache.setItem(this.cache.TIME_REMAINING, this.remainingTime.toString());
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  get formattedTime(): string {
    return (
      (this.remainingTime !== undefined )&&
      (this.remainingTime !== null))
      ? formatTime(this.remainingTime)
      : '00:00:00';
  }

  toggleIcon(iconName: IconType) {
    this.activeIcons[iconName] = !this.activeIcons[iconName];
    if (iconName === 'video') {
      this.isChatVisible = !this.isChatVisible;
    }
  }

  // Store Data in local storage
  storeData() {
    const answeredQuestions = this.questions?.map(question => ({
      questionId: question.questionId,
      selectedAnswer: question.selectedAnswer
    }));
    if (answeredQuestions) {
      this.cache.setItem(this.cache.ANSWER_SAVED, answeredQuestions);
    }
  }
}



