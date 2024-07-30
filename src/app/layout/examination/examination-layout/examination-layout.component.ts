import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Exam, Question } from '../../../core/DTO/examination-dto';
import { QuestionService } from '../../../core/services/question.service';
import { faShare, faUpload, faCreditCard, faUsers, faMicrophoneSlash, faMessage } from '@fortawesome/free-solid-svg-icons';

type IconType = 'microphone' | 'video' | 'upload' | 'creditCard' | 'users';

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
  showOverlay = true;

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
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
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

  toggleIcon(iconName: IconType) {
    this.activeIcons[iconName] = !this.activeIcons[iconName];
    if (iconName === 'video') {
      this.isChatVisible = !this.isChatVisible;
    }
  }
}
