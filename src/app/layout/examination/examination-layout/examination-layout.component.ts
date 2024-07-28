import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { Exam, Question } from '../../../core/DTO/examination-dto';
import { QuestionService } from '../../../core/services/question.service';

@Component({
  selector: 'app-examination-layout',
  templateUrl: './examination-layout.component.html',
  styleUrls: [
    './examination-layout.component.css',
    '../../../../../public/dashboard-assets/dist/libs/plyr/dist/plyr.css',
    '../../../../../public/dashboard-assets/dist/css/tabler.min.css',
    '../../../../../public/dashboard-assets/dist/css/tabler-payments.min.css',
    '../../../../../public/dashboard-assets/dist/css/tabler-vendors.min.css',
    '../../../../../public/dashboard-assets/dist/css/demo.min.css',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ExaminationLayoutComponent implements OnInit {
  selectedQuestionId!: number;
  exam!: Exam;
  questions: Question[] = [];
  question!: Question;
  isLastQuestion!: boolean;
  remainingTime!: number;
  interval: any;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.exam = this.questionService.getExam();
    this.questions = this.exam.questions;
    this.selectedQuestionId = this.questions[0].id;
    this.loadQuestion();
    this.remainingTime = this.exam.duration_In_Minute! * 60;
    this.startTimer();
  }

  loadQuestion() {
    this.question = this.questions.find(q => q.id === this.selectedQuestionId)!;
    this.isLastQuestion = this.selectedQuestionId === this.questions[this.questions.length - 1].id;
  }

  onSelectQuestion(id: number) {
    this.selectedQuestionId = id;
    this.loadQuestion();
  }

  prevQuestion() {
    if (this.selectedQuestionId > 1) {
      this.selectedQuestionId--;
      this.loadQuestion();
    }
  }

  nextQuestion() {
    if (this.selectedQuestionId < this.questions.length) {
      this.selectedQuestionId++;
      this.loadQuestion();
    }
  }

  submitExam() {
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  get formattedTime(): string {
    const minutes: number = Math.floor(this.remainingTime / 60);
    const seconds: number = this.remainingTime % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
