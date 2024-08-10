import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { QuestionWithoutAnswerDTO } from '../../../../core/DTO/exam-without-answer-dto';

@Component({
  selector: 'app-examination-body',
  templateUrl: './examination-body.component.html',
  styleUrls: ['./examination-body.component.css']
})
export class ExaminationBodyComponent implements OnInit {

  @Input() question!: QuestionWithoutAnswerDTO;
  @Input() selectedQuestionId!: number;
  @Input() isLastQuestion!: boolean;

  @Output() prevQuestion = new EventEmitter<void>();
  @Output() nextQuestion = new EventEmitter<void>();
  @Output() submitExam = new EventEmitter<void>();

  ngOnInit() {}

  onPrevQuestion() {
    this.prevQuestion.emit();
  }

  onNextQuestion() {
    this.nextQuestion.emit();
  }

  onSubmitExam() {
    this.submitExam.emit();
  }
}
