import { ComplementService } from './../../../../core/services/complement.service';
import { Complement } from './../../../../core/models/complement';
import {
  AfterViewChecked,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  faUpload,
  faCreditCard,
  faShareSquare,
  faMicrophoneSlash,
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
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Init } from 'v8';
import { Router, ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateComplementDTO } from '../../../../core/DTO/update-complement-dto';
import { GenericApiHandlerService } from '../../../../core/services/api.service';
import { ApiResponse } from '../../../../core/utils/ApiResponse';
import { ToastMsgService } from '../../../../core/services/toast.service';
import { APP_MESSAGES } from '../../../../core/constants/error-messages.constants';
import { API_ENDPOINTS } from '../../../../core/constants/api.constants';

type IconType = 'microphone' | 'chat' | 'shareScreen';

@Component({
  selector: 'app-proctor-examination',
  templateUrl: './proctor-examination.component.html',
  styleUrl: './proctor-examination.component.css',
})
export class ProctorExaminationComponent implements OnInit {

  createComplementForm!: FormGroup;
  AppMessages = APP_MESSAGES;
  isExamStarted = false;

 async toggleExam() {


    if(this.isExamStarted===false){
      this.isExamStarted=true;
      await this.hubConnection.invoke('EnableStartExam');

    }


  }
  updateComplemntByProctor() {

    const updateComplementDTO: UpdateComplementDTO = this.createComplementForm.value;
    // let


    updateComplementDTO.examReservationId=this.reservationNumber;

    this.complementService.updateComplementByProctor(updateComplementDTO).subscribe(
      async (response) => {
      console.log("response: "+response);

        // if (response.status === 200) {

        // } else {
        //   console.error('Update failed:', response.message);
        // }
        //this.endCall();
        await this.hubConnection.invoke('SendFormComplaintToUser');
        this.endCall();
        this.router.navigate(['**']);
      },
      error => {
        console.error('API error:', error);
      }
    );

  }

  // TODO: signlR & web RTC variable






  private remoteVideo!: HTMLVideoElement;
  private remoteVideo_2!: HTMLVideoElement;
  private localStream!: MediaStream;
  private remoteStream!: MediaStream;
  private screenRemoteStream!: MediaStream;
  protected peerConnection!: RTCPeerConnection;
  private hubConnection!: HubConnection;
  private id = Math.floor(Math.random() * 1000000).toString();
  private readonly ICE_SERVERS = {
    iceServers: [
      {
        urls: ['stun:stun1.1.google.com:19302'],
      },
      {
        urls: 'turn:numb.viagenie.ca', 
        credential: 'muazkh',
        username: 'webrtc@live.com'
      },
    ],
  };

  private mediaRecorder!: MediaRecorder;
  private recordedChunks: Blob[] = [];
  private recording = false;
  public butColor: string = 'blue';
  public butColorCam: string = 'blue';

  private dataChannel!: RTCDataChannel;
  private isMicrophoneOn = true;

  private audioContext!: AudioContext;
  private gainNode!: GainNode;
  public chatMessage = '';
  public messages: string[][] = [];
  public static count = 0;
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  // TODO: End Variable
  // todo* fotter icon

  faMicrophoneSlash = faMicrophoneSlash;
  faMessage = faMessage;
  faUpload = faUpload;
  faCreditCard = faCreditCard;
  faShareSquare = faShareSquare;
  activeIcons: { [key in IconType]: boolean } = {
    microphone: true,
    chat: false,
    shareScreen: false,
  };
  isChatVisible = false;
  isFullscreen = false;
  isSmallContainer = false;
  activeVideo: string | null = null;

  examName: string = '';
  reservationNumber: number = 0;

  constructor(
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private complementService: ComplementService,
    private fb: FormBuilder,
    private toast: ToastMsgService,
    private cache:LocalStorageService

  ) {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];



      if (token) {
        console.log(token);
        const payload = jwtDecode(token);
        console.log(payload);

        const payloadJson = JSON.parse(JSON.stringify(payload));
        this.reservationNumber = payloadJson.ReservationId as number;
        this.examName = payloadJson.ExamName as string;

        localStorage.setItem("payload-proctor",JSON.stringify(payload));

       this.cache.setItem(this.cache.AUTH_TOKEN, token)
          // localStorage.setItem("auth-token",token);
        this.cache.setItem(this.cache.EXAM, this.examName)

          // localStorage.setItem("exam",exam);
          // const payloadJson=JSON.parse(JSON.stringify(payload));
        //  this.getStudentInfoById(payload.userId);

          // this.cache.setItem(this.cache.COMPANY, payloadJson.Company);
          this.cache.setItem(this.cache.USER_ID, payloadJson.UserId);
          this.cache.setItem(this.cache.ROLE_ID, payloadJson.RoleId);
          this.cache.setItem(this.cache.PAYLOAD, payload);
        this.router.navigate(['/examination/proctor']);
      } else if (localStorage.getItem('auth-token') == null) {
     //   this.router.navigate(['/home']);
      }
    });


    this.createComplementForm = this.fb.group({
      proctorDesc: ['', Validators.required],
    });
  }

  Offer:string='';

  async rejectOffer() {
    await this.hubConnection.invoke('SendRejected');
  }
  async acceptOffer() {
          const offerDesc: RTCSessionDescriptionInit = JSON.parse(this.Offer);
          console.log('recive offer');
          console.log(this.Offer);
          await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offerDesc));
          const answer = await this.peerConnection.createAnswer();
          await this.peerConnection.setLocalDescription(answer);
          await this.hubConnection.invoke('SendAnswer',this.id,JSON.stringify(answer));
  }






  ngOnInit(): void {
    this.remoteVideo = document.getElementById(
      'remoteVideo'
    ) as HTMLVideoElement;
    this.remoteVideo_2 = document.getElementById(
      'remoteVideo_2'
    ) as HTMLVideoElement;
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(API_ENDPOINTS.WEB_RTC_URL)
      .build();
    this.hubConnection
      .start()
      .catch((err) => console.error('Error while starting connection: ' + err));

    this.hubConnection.on('ReceiveOffer', async (user, offer) => {
      // if (
      //   confirm(`User ${user} is inviting you to a call. Do you want to join?`)
      // ) {
        this.Offer=offer;
        document.getElementById("but-open-conn")?.click();


      }
    //  else {
    //   await this.hubConnection.invoke('SendRejected');
    //  }


    );

    this.hubConnection.on('ReceiveIceCandidate', async (user, candidate) => {
      const iceCandidateInit: RTCIceCandidateInit = JSON.parse(candidate);
      const iceCandidate = new RTCIceCandidate(iceCandidateInit);
      await this.peerConnection.addIceCandidate(iceCandidate);
    });

    this.startLocalStream()
      .then(() => {
        if (!this.peerConnection) {
          this.createPeerConnection();
        }

        this.toggleMicrophone();
        this.cdr.markForCheck();
      })
      .catch((error) => {
        console.error('Error starting local stream:', error);
      });
  }

  toggleChat() {
    this.activeIcons['chat'] = !this.activeIcons['chat'];
    this.isChatVisible = !this.isChatVisible;
  }

  // TODO: start methods

  toggleMicrophone() {
    this.activeIcons['microphone'] = !this.activeIcons['microphone'];
    this.isMicrophoneOn = !this.isMicrophoneOn;
    console.warn(this.isMicrophoneOn);
    this.localStream.getAudioTracks().forEach((track) => {
      track.enabled = this.isMicrophoneOn;
    });
  }

  setupDataChannel() {
    this.dataChannel.onmessage = (event) => {
      console.log(event.data);
      this.zone.run(() => {
        this.messages.push([event.data.toString(), 'student']);
        this.cdr.markForCheck();
      });
      // this.scrollToBottom();
    };
  }

  sendMessage() {
    if (this.chatMessage.trim()) {
      this.dataChannel.send(this.chatMessage);
      this.messages.push([this.chatMessage, 'proctor']);
      this.chatMessage = '';
      // this.scrollToBottom();
    }
  }

  async startLocalStream() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      this.audioContext = new AudioContext();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = 0; // Default gain value
      const microphoneSource = this.audioContext.createMediaStreamSource(
        this.localStream
      );
      microphoneSource.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
    } catch (e) {
      console.error('Error accessing media devices.', e);
      throw e;
    }
  }

  createPeerConnection() {
    this.peerConnection = new RTCPeerConnection(this.ICE_SERVERS);
    this.dataChannel = this.peerConnection.createDataChannel('chat');
    this.setupDataChannel();
    this.peerConnection.ondatachannel = (event) => {
      this.dataChannel = event.channel;
      this.setupDataChannel();
    };
    this.localStream.getTracks().forEach((track) => {
      {
        this.peerConnection.addTrack(track, this.localStream);
        console.log(track);
      }
    });

    this.remoteStream = new MediaStream();
    this.remoteVideo.srcObject = this.remoteStream;
    this.screenRemoteStream = new MediaStream();
    this.remoteVideo_2.srcObject = this.screenRemoteStream;
    this.peerConnection.onicecandidate = ({ candidate }) => {
      if (candidate) {
        console.log('candidate being sent');
        this.hubConnection.invoke(
          'SendIceCandidate',
          this.id,
          JSON.stringify(candidate)
        );
      }
    };
    this.peerConnection.ontrack = (event) => {
      console.log('ontrack event:', event);
      //event.streams[0].getTracks().forEach((track) => {
      // console.log('Adding track to remote stream:', track);
      ProctorExaminationComponent.count++;
      if (ProctorExaminationComponent.count != 3)
        this.remoteStream.addTrack(event.track);
      else {
        this.screenRemoteStream.addTrack(event.track);
      }
      // });
    };
    this.peerConnection.oniceconnectionstatechange = () => {
      if (this.peerConnection.iceConnectionState === 'disconnected') {
        this.endCall();
      }
    };
  }

  async toggleRecording() {
    this.activeIcons['shareScreen'] = !this.activeIcons['shareScreen'];
    if (!this.recording) {
      try {
        this.recordedChunks = [];
        this.mediaRecorder = new MediaRecorder(this.screenRemoteStream);
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          }
        };
        this.mediaRecorder.onstop = async () => {
          const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = 'meeting_record.webm';
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 100);
          this.recordedChunks = [];
        };
        this.mediaRecorder.start();
        this.recording = true;
      } catch (e) {
        console.error('Error starting recording:', e);
      }
    } else {
      this.mediaRecorder.stop();
      this.recording = false;
    }
  }

  endCall() {
    if (this.peerConnection) {
      this.peerConnection.close();
    }
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
    }
    this.remoteVideo.srcObject = null;
  }
  // todo* design methods
  toggleExpand(videoId: string) {
    if (this.isFullscreen && this.activeVideo === videoId) {
      // Restore the current video
      this.isFullscreen = false;
      this.isSmallContainer = false;
      this.activeVideo = null;
    } else {
      // Set the active video and enable fullscreen
      this.isFullscreen = true;
      this.isSmallContainer = true; // Ensure the other video is small
      this.activeVideo = videoId;
    }
  }
  resetAll(event: Event) {
    event.stopPropagation(); // Prevent event from propagating to the video container
    this.isFullscreen = false;
    this.isSmallContainer = false;
    this.activeVideo = null;
  }
  // TODO: end methods

  // ngAfterViewChecked() {
  //   this.scrollToBottom();
  // }

  private scrollToBottom(): void {
    const container = this.chatContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }
}
