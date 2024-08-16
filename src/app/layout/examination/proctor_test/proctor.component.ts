import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastMsgService } from '../../../core/services/toast.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { FormBuilder } from '@angular/forms';
import { ComplementService } from '../../../core/services/complement.service';

@Component({
  selector: 'app-proctor',
  templateUrl: './proctor.component.html',
  styleUrl: './proctor.component.css'
})
export class ProctorComponent {

 //@ViewChild('chatMessages', { static: false }) chatMessages!: ElementRef;

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
      urls: "stun:stun.relay.metered.ca:80",
    },
    {
      urls: "turn:global.relay.metered.ca:80",
      username: "8b111c5a0cb6392f34e7edbd",
      credential: "QKz6WkI9XqQw7kez",
    },
    {
      urls: "turn:global.relay.metered.ca:80?transport=tcp",
      username: "8b111c5a0cb6392f34e7edbd",
      credential: "QKz6WkI9XqQw7kez",
    },
    {
      urls: "turn:global.relay.metered.ca:443",
      username: "8b111c5a0cb6392f34e7edbd",
      credential: "QKz6WkI9XqQw7kez",
    },
    {
      urls: "turns:global.relay.metered.ca:443?transport=tcp",
      username: "8b111c5a0cb6392f34e7edbd",
      credential: "QKz6WkI9XqQw7kez",
    },
  ],
  };

 private mediaRecorder!: MediaRecorder;
 private recordedChunks: Blob[] = [];
 private recording = false;
 public butColor:string='blue';
 public butColorCam:string='blue';


 private dataChannel!: RTCDataChannel;
 private isMicrophoneOn = true;

 private audioContext!: AudioContext;
 private gainNode!: GainNode;
 public chatMessage = '';
 public messages: string[] = [];

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
  // this.route.queryParams.subscribe((params) => {
  //   const token = params['token'];



  //   if (token) {
  //     console.log(token);
  //     const payload = jwtDecode(token);
  //     console.log(payload);

  //     const payloadJson = JSON.parse(JSON.stringify(payload));
  //     this.reservationNumber = payloadJson.ReservationId as number;
  //     this.examName = payloadJson.ExamName as string;

  //     localStorage.setItem("payload-proctor",JSON.stringify(payload));

  //    this.cache.setItem(this.cache.AUTH_TOKEN, token)
  //       // localStorage.setItem("auth-token",token);
  //     this.cache.setItem(this.cache.EXAM, this.examName)

  //       // localStorage.setItem("exam",exam);
  //       // const payloadJson=JSON.parse(JSON.stringify(payload));
  //     //  this.getStudentInfoById(payload.userId);

  //       // this.cache.setItem(this.cache.COMPANY, payloadJson.Company);
  //       this.cache.setItem(this.cache.USER_ID, payloadJson.UserId);
  //       this.cache.setItem(this.cache.ROLE_ID, payloadJson.RoleId);
  //       this.cache.setItem(this.cache.PAYLOAD, payload);
  //     this.router.navigate(['/examination/proctor']);
  //   } else if (localStorage.getItem('auth-token') == null) {
  //  //   this.router.navigate(['/home']);
  //   }
  // });


  // this.createComplementForm = this.fb.group({
  //   proctorDesc: ['', Validators.required],
  // });
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

 toggleMicrophone() {
   if(this.butColor=='blue')
   this.butColor='red';
   else {
     this.butColor='blue'
   }
   this.isMicrophoneOn = !this.isMicrophoneOn;
   this.localStream.getAudioTracks().forEach(track => {
     track.enabled = this.isMicrophoneOn;

   });
 }



 ngOnInit(): void {

   this.remoteVideo = document.getElementById('remoteVideo') as HTMLVideoElement;
   this.remoteVideo_2=document.getElementById('remoteVideo_2') as HTMLVideoElement;


   this.hubConnection = new HubConnectionBuilder()
     .withUrl('https://exam-guardian.geeksfreelancer.online/signalingHub')
     .build();
     this.hubConnection.start().catch(err => console.error('Error while starting connection: ' + err));

   this.hubConnection.on('ReceiveOffer', async (user, offer) => {
    this.Offer=offer;
    document.getElementById("but-open-conn")?.click();
});

   this.hubConnection.on('ReceiveIceCandidate', async (user, candidate) => {
       const iceCandidateInit: RTCIceCandidateInit = JSON.parse(candidate);
       const iceCandidate = new RTCIceCandidate(iceCandidateInit);
       await this.peerConnection.addIceCandidate(iceCandidate);

   });



   this.startLocalStream().then(() => {
     if (!this.peerConnection) {
       this.createPeerConnection();
     }

     this.toggleMicrophone();
     this.cdr.markForCheck();
   }).catch(error => {
     console.error('Error starting local stream:', error);
   });
 }



 setupDataChannel() {
   this.dataChannel.onmessage = (event) => {
     console.log(event.data);
     (document.getElementById("test") as HTMLInputElement).value=event.data;
     (document.getElementById("mess") as HTMLDivElement).innerHTML+=event.data;
     this.zone.run(() => {
       this.messages.push(event.data);
       this.cdr.markForCheck();
     });
     //this.scrollChatToBottom();
   };
 }

 sendMessage() {
   if (this.chatMessage.trim()) {
     this.dataChannel.send(this.chatMessage);
     this.messages.push(this.chatMessage);
     this.chatMessage = '';
   //  this.scrollChatToBottom();
   }
 }

 scrollChatToBottom() {
   setTimeout(() => {

   }, 0);
 }

 async startLocalStream() {
   try {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });


     this.audioContext = new AudioContext();
     this.gainNode = this.audioContext.createGain();
     this.gainNode.gain.value = 0; // Default gain value
     const microphoneSource = this.audioContext.createMediaStreamSource(this.localStream);
     microphoneSource.connect(this.gainNode);
     this.gainNode.connect(this.audioContext.destination);
   } catch (e) {
     console.error('Error accessing media devices.', e);
     throw e;
   }
 }


  public static count=0;
 createPeerConnection() {
   this.peerConnection = new RTCPeerConnection(this.ICE_SERVERS);
   this.dataChannel = this.peerConnection.createDataChannel('chat');
   this.setupDataChannel();
   this.peerConnection.ondatachannel = (event) => {
     this.dataChannel = event.channel;
     this.setupDataChannel();
   };


   this.remoteStream = new MediaStream();
   this.remoteVideo.srcObject = this.remoteStream;
   this.screenRemoteStream=new MediaStream();
   this.remoteVideo_2.srcObject=this.screenRemoteStream;
   this.peerConnection.onicecandidate = ({ candidate }) => {
     if (candidate) {
       console.log("candidate being sent");
       this.hubConnection.invoke('SendIceCandidate', this.id, JSON.stringify(candidate));
     }
   };
   this.peerConnection.ontrack = (event) => {
     console.log('ontrack event:', event);
     //event.streams[0].getTracks().forEach((track) => {
      // console.log('Adding track to remote stream:', track);
      ProctorComponent.count++;
       if(ProctorComponent.count!=3)
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
     this.localStream.getTracks().forEach(track => track.stop());
   }
   this.remoteVideo.srcObject = null;
 }


}
