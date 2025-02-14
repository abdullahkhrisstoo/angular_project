import { ExamReservationPaymentDTO } from './../../../../core/DTO/exam-reservation-payment-dto';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  faUpload,
  faCreditCard,
  faUsers,
  faRecordVinyl,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import {
  StudentAnswerDto,
  StudentQuestionAnswerListDTO,
} from '../../../../core/DTO/student-answer-option-dto';
import {
  ExamWithoutAnswerDto,
  QuestionWithoutAnswerDTO,
} from '../../../../core/DTO/exam-without-answer-dto';
import { ExaminationService } from '../../../../core/services/examination.service';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { formatTime } from '../../../../core/extensions/format-time';
import { THIRTY_SECONDS } from '../../../../core/constants/app.constants';
import { WebrtcService } from '../../../../core/services/webrtc.service';
import { PlatformLocation } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateComplementDTO } from '../../../../core/DTO/update-complement-dto';
import { ComplementService } from '../../../../core/services/complement.service';
import { ApiResponse } from '../../../../core/utils/ApiResponse';
import { ToastrService } from 'ngx-toastr';
import { ToastMsgService } from '../../../../core/services/toast.service';
import { APP_MESSAGES } from '../../../../core/constants/error-messages.constants';
import { ExamReservationService } from '../../../../core/services/exam-reservation.service';
import { UpdateExamReservationDTO } from '../../../../core/DTO/update-exam-reservation-dto';
import { FullscreenDetectionService } from '../../../../core/services/fullscreen-detection.service';

type IconType = 'microphone' | 'chat' | 'camera';

@Component({
  selector: 'app-examination-layout',
  templateUrl: './student-examination.component.html',
  styleUrls: ['./student-examination.component.css'],
})
export class StudentExaminationComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  // todo: webrtc, signlR varibles
  // isFullscreen: boolean = false;
  updateExamReservationDTO!: UpdateExamReservationDTO;
  public butColor: string = 'blue';
  public butColorCam: string = 'blue';
  private isCameraOn = true;
  private isMicrophoneOn = true;
  public chatMessage = '';
  public messages: string[][] = [];
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('localVideo_2') localVideo_2!: ElementRef<HTMLVideoElement>;
  @ViewChild('localVideo_3')
  localVideo_3!: ElementRef<HTMLVideoElement>;



  public dataFromProctro = '';
  shareScreen!: MediaStream;
  // todo: exam variable
  private unsubscriber: Subject<void> = new Subject<void>();

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
  faMicrophoneSlash = faRecordVinyl;
  faMessage = faMessage;
  faUpload = faUpload;
  faCreditCard = faCreditCard;
  faUsers = faUsers;
  activeIcons: { [key in IconType]: boolean } = {
    microphone: false,
    chat: false,
    camera: false,
  };
  isChatVisible = false;
  showOverlay = false;

  warningSound!: HTMLAudioElement;
  isVideoToggled: boolean = false;
  isMicrophoneToggled!: boolean;
  remoteAudio!: HTMLAudioElement;

  @HostListener('document:fullscreenchange')
  @HostListener('document:mozfullscreenchange')
  @HostListener('document:webkitfullscreenchange')
  @HostListener('document:msfullscreenchange')
  handleFullscreenChange(): void {
    if (!this.isFullscreen()) {
      alert("You have exited fullscreen mode.");
    }
  }
  
  isFullscreen(): boolean {
    return !!(
      document.fullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).msFullscreenElement
    );
  }



  constructor(
    private questionService: ExaminationService,
    private cache: LocalStorageService,
    private webRtc: WebrtcService,
    private platformLocation: PlatformLocation,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private complainService: ComplementService,
    private toast: ToastMsgService,
    private fb: FormBuilder,
    private examReservationService: ExamReservationService,
    private zone: NgZone,
    private fullscreenDetectionService: FullscreenDetectionService
  ) {
    this.warningSound = new Audio('/sounds/10-minutes.mp3');

    history.pushState(null, '', location.href);
    this.platformLocation.onPopState(() => {
      console.log(history);
      history.pushState(null, '', location.href);

      // location.onPopState(() => {
      //this.router.navigateByUrl(‘/multicomponent’);
      //history.forward();
      // });
      this.updateExamReservationDTO = {
        examReservationId: 0,
        score: 0
      };
    });

    this.createComplementForm = this.fb.group({
      studentDesc: ['', Validators.required],
    });

    // this.fullscreenDetectionService.fullscreenChange$.subscribe(isFullscreen => {
    //   if (!isFullscreen) {
    //     alert('You have exited fullscreen mode!');
    //   }
    // });

  }

  createComplementForm!: FormGroup;
  AppMessages = APP_MESSAGES;
  isDisabled:boolean=true;
  updateComplemntByStudent() {
    const updateComplementDTO: UpdateComplementDTO =
      this.createComplementForm.value;

    const examerDTO = JSON.parse(localStorage.getItem('examerDTO')!);
    updateComplementDTO.examReservationId = examerDTO.ReservationId;

    this.complainService
      .updateComplementByStudent(updateComplementDTO)
      .subscribe(
        (response) => {
          console.log('response: ' + response.message);
          // localStorage.clear();
        },
        (error) => {
          console.error('API error:', error);
        }
      );
    //this.endCall();
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
  isStartExam: boolean = false;
  async ngOnInit() {
    history.pushState(null, '');

    fromEvent(window, 'popstate')
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((_) => {
        history.pushState(null, '');
        alert(`You can't make changes or go back at this time.`);
      });

    this.webRtc.HubConnection.on('ReciveFormComplaint', async () => {
      this.router.navigate(['examination/complaint']);
      //document.getElementById("but-modal-sim")?.click();
    });

    // todo: signlR and webRTC init
    this.remoteAudio = document.getElementById(
      'remoteAudio'
    ) as HTMLAudioElement;
    this.remoteAudio.srcObject = this.webRtc.RemoteAudioStream;
    console.warn(this.webRtc.RemoteAudioStream);

    this.webRtc.DataChannel.onmessage = (event) => {
      const message = event.data;
      console.log(message, 'from proctor');
      this.dataFromProctro = message.toString();

      this.zone.run(() => {
        this.messages.push([this.dataFromProctro, 'proctor']);
        this.cdr.markForCheck();
      });
    };
    this.shareScreen = this.webRtc.ShareScreenStream;


    this.webRtc.HubConnection.on('ReceiveEnableStartExam', () => {
      this.isDisabled=false;
    });




    if (this.shareScreen != null && this.localVideo != null) {
      // this.startExam();
    }
  }

  ngAfterViewInit(): void {
    if (this.isStartExam === false) {
      this.startLocalVideo();
    }
  }

  startLocalVideo(): void {
    this.localVideo.nativeElement.srcObject = this.webRtc.LocalCameraStream;
    this.localVideo_2.nativeElement.srcObject = this.webRtc.ShareScreenStream;
    this.localVideo_3.nativeElement.srcObject = this.webRtc.LocalCameraStream;

    this.localVideo.nativeElement.volume = 0;
    this.localVideo_2.nativeElement.volume = 0;
    this.localVideo.nativeElement.muted = true;
    this.localVideo_2.nativeElement.muted = true;
    this.localVideo_3.nativeElement.volume = 0;
    this.localVideo_3.nativeElement.muted = true;
  }
  async startExam() {
    try {
      await this.questionService.fetchAndSetExam();
      this.exam = this.questionService.getCurrentExam();

      if (this.exam?.questions && this.exam.questions.length > 0) {
        this.questions = this.exam.questions;

        const savedAnswers =
          (this.cache.getItem(this.cache.ANSWER_SAVED) as any[]) || [];
        if (Array.isArray(savedAnswers)) {
          this.questions.forEach((question) => {
            const savedAnswer = savedAnswers.find(
              (answer) => answer.questionId === question.questionId
            );
            if (savedAnswer) {
              question.selectedAnswer = savedAnswer.selectedAnswer;
            }
          });
        }

        // Set the selected question ID and load the question
        this.selectedQuestionId = this.questions[0].questionId;
        this.loadQuestion();

        // Retrieve remaining time from local storage or set default
        const savedTime = this.cache.getItem(this.cache.TIME_REMAINING) as
          | string
          | null;
        this.remainingTime = savedTime
          ? parseInt(savedTime, 10)
          : (this.exam.examDuration || 0) * 60;
        this.isStartExam = true;

        // Start the timer
        this.startTimer();
      } else {
        console.error('No questions found in the exam.');
      }

      // Log the questions to verify
      console.log(this.questions);
    } catch (error) {
      this.isStartExam = false;
      // Handle any errors that occur during the execution of startExam
      console.error('An error occurred while starting the exam:', error);
    }
  }

  loadQuestion() {
    if (this.questions && this.selectedQuestionId !== undefined) {
      this.question =
        this.questions.find((q) => q.questionId === this.selectedQuestionId) ||
        undefined;
      this.isLastQuestion =
        this.selectedQuestionId ===
        this.questions[this.questions.length - 1].questionId;
      console.log(`loadQuestion() ${this.question}`);
    }
  }

  onSelectQuestion(id: number) {
    this.storeData();
    this.selectedQuestionId = id;
    this.loadQuestion();
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
      const currentIndex = this.questions.findIndex(
        (q) => q.questionId === this.selectedQuestionId
      );
      if (currentIndex > 0) {
        this.selectedQuestionId = this.questions[currentIndex - 1].questionId;
        this.loadQuestion();
      }
    }
  }

  nextQuestion() {
    this.storeData();
    if (this.questions && this.selectedQuestionId !== undefined) {
      const currentIndex = this.questions.findIndex(
        (q) => q.questionId === this.selectedQuestionId
      );
      if (currentIndex < this.questions.length - 1) {
        this.selectedQuestionId = this.questions[currentIndex + 1].questionId;
        this.loadQuestion();
      }
    }
  }

  submitExam(): void {
    this.storeData();

    const cachedData = this.cache.getItem<StudentAnswerDto[]>(
      this.cache.ANSWER_SAVED
    );
    if (cachedData) {
      if (!this.answeredQuestions) {
        this.answeredQuestions = { QuestionAnswers: [] };
      }
      this.answeredQuestions.QuestionAnswers = cachedData;
    } else {
      console.warn('No data found in cache.');
    }

    const unansweredQuestions = this.answeredQuestions.QuestionAnswers!.filter(
      (question) =>
        question.selectedAnswer === null ||
        question.selectedAnswer === undefined
    );
    this.hasUnansweredQuestions = unansweredQuestions.length > 0;

    if (this.hasUnansweredQuestions) {
      console.warn('Unanswered Questions:', unansweredQuestions);
    } else {
this.questionService
  .calculateScoreCallingApi(this.answeredQuestions)
  .subscribe({
    next: (response) => {
      console.log('Score:', response.data);
      if (response.data !== null && response.data !== undefined) {
        this.cache.setItem(this.cache.STUDENT_SCORE, response.data.mark);
        this.cache.setItem(
          this.cache.NUMBER_OF_QUESTIONS,
          this.questions!.length
        );
        let score = response.data.mark;
        let examerDTO = localStorage.getItem('examerDTO');
        if (examerDTO) {
          let examerData = JSON.parse(examerDTO);
          let reservationId = examerData.ReservationId as number;

          if (!this.updateExamReservationDTO) {
            this.updateExamReservationDTO = {
              examReservationId: reservationId,
              score: score,
            };
          } else {
            this.updateExamReservationDTO.examReservationId = reservationId;
            this.updateExamReservationDTO.score = score;
          }
          console.log("abood: "+reservationId);
          this.storeScore();

          this.router.navigate(['/examination/score']);
          this.webRtc.endCall();
        } else {
          console.error('examerDTO not found in localStorage');
        }
        console.warn("this.updateExamReservationDTO: ", this.updateExamReservationDTO);
      }
    },
    error: (error) => {
      console.error('Error submitting exam:', error);
    },
  });


    }
  }

  storeScore() {
    this.examReservationService
      .updateExamReservation(this.updateExamReservationDTO!)
      .subscribe(
        (response: ApiResponse<any>) => {
          if (response.status === 200) {
            console.log('UpdatePassword successful:', response);
          }
        },
        (error) => {
          console.error('UpdatePassword error:', error);
        }
      );
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
        this.cache.setItem(
          this.cache.TIME_REMAINING,
          this.remainingTime.toString()
        );
      } else {
        clearInterval(this.interval);
        this.submitExam();
      }
    }, 1000);
  }

  get formattedTime(): string {
    return this.remainingTime !== undefined && this.remainingTime !== null
      ? formatTime(this.remainingTime)
      : '00:00:00';
  }

  toggleVideo() {
    this.activeIcons['camera'] = !this.activeIcons['camera'];

    this.isVideoToggled = !this.isVideoToggled;
  }

  toggleChat() {
    this.activeIcons['chat'] = !this.activeIcons['chat'];

    this.isChatVisible = !this.isChatVisible;
  }

  // Store Data in local storage
  storeData() {
    const answeredQuestions = this.questions?.map((question) => ({
      questionId: question.questionId,
      selectedAnswer: question.selectedAnswer,
    }));
    if (answeredQuestions) {
      this.cache.setItem(this.cache.ANSWER_SAVED, answeredQuestions);
    }
  }

  // todo: signlR , web rtc

  toggleCamera() {
    if (this.butColorCam == 'blue') this.butColorCam = 'red';
    else {
      this.butColorCam = 'blue';
    }
    this.isCameraOn = !this.isCameraOn;
    this.webRtc.LocalCameraStream.getVideoTracks().forEach((track) => {
      track.enabled = this.isCameraOn;
    });
  }

  sendMessage() {
    this.webRtc.sendMessage(this.chatMessage);
    this.messages.push([this.chatMessage, 'student']);
    this.chatMessage = '';
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
  toggleMicrophone() {
    this.activeIcons['microphone'] = !this.activeIcons['microphone'];

    this.isMicrophoneOn = !this.isMicrophoneOn;
    this.webRtc.ShareScreenStream.getAudioTracks().forEach((track) => {
      track.enabled = this.isMicrophoneOn;
    });
  }
}
