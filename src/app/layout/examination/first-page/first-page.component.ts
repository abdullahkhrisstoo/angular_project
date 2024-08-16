import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrl: './first-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush // Add this line
})
export class FirstPageComponent implements OnInit{
  //@ViewChild('chatMessages', { static: false }) chatMessages!: ElementRef;
  private localVideo!: HTMLVideoElement;
  private localVideo_2!: HTMLVideoElement;
  private remoteVideo!: HTMLVideoElement;
  private remoteVideo_2!: HTMLVideoElement;
  private localStream!: MediaStream;
  private screenStreamN!: MediaStream;
  private remoteStream!: MediaStream;
  private screenRemoteStream!: MediaStream;
  protected peerConnection!: RTCPeerConnection;
  private hubConnection!: HubConnection;
  private id = Math.floor(Math.random() * 1000000).toString();
  private pendingIceCandidates: RTCIceCandidateInit[] = [];
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
  private isScreenSharing = false;
  private videoSender!: RTCRtpSender;
  public butColor:string='blue';
  public butColorCam:string='blue';
// In your component class
  private dataChannel!: RTCDataChannel;
  private isCameraOn = true;
  private isMicrophoneOn = true;
  toggleCamera() {
    if(this.butColorCam=='blue')
      this.butColorCam='red';
    else {
      this.butColorCam='blue'
    }
    this.isCameraOn = !this.isCameraOn;
    this.localStream.getVideoTracks().forEach(track => {
      track.enabled = this.isCameraOn;
    });
  }
  private audioContext!: AudioContext;
  private audioContext2!: AudioContext;
  private gainNode!: GainNode;
  private gainNode2!: GainNode;
  public chatMessage = '';
  public messages: string[] = [];
  constructor(private zone: NgZone,private cdr: ChangeDetectorRef) {}
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

  public showModal: boolean = false;
  public user: string='';
  private offer: any;

  ngOnInit(): void {
    this.localVideo = document.getElementById('localVideo') as HTMLVideoElement;

    this.remoteVideo = document.getElementById('remoteVideo') as HTMLVideoElement;
    this.localVideo_2=document.getElementById('localVideo_2') as HTMLVideoElement;
    this.remoteVideo_2=document.getElementById('remoteVideo_2') as HTMLVideoElement;
    this.localVideo.volume=0;
    this.localVideo_2.volume=0;
    this.localVideo.muted=true;
    this.localVideo_2.muted=true;
    this.remoteVideo.volume=0.5;
  //  this.remoteVideo.muted=true;
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://exam-guardian.geeksfreelancer.online/signalingHub')
      .build();

    this.hubConnection.on('ReceiveOffer', async (user, offer) => {
      this.user = user;
      this.offer = offer;
      this.showModal = true;
      alert("aaaaaaaaaaaaaaaa")
      if (confirm(`User ${user} is inviting you to a call. Do you want to join?`)) {
      const offerDesc: RTCSessionDescriptionInit = JSON.parse(offer);
      console.log("recive offer");
      console.log(offer);
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offerDesc));
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        await this.hubConnection.invoke('SendAnswer', this.id, JSON.stringify(answer));
      }
    });

    this.hubConnection.on('ReceiveAnswer', async (user, answer) => {
      const answerDesc: RTCSessionDescriptionInit = JSON.parse(answer);
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answerDesc));
      console.log("ReceiveAnswer");
      console.log(answer);
    });

    this.hubConnection.on('ReceiveIceCandidate', async (user, candidate) => {
        const iceCandidateInit: RTCIceCandidateInit = JSON.parse(candidate);
        const iceCandidate = new RTCIceCandidate(iceCandidateInit);
        await this.peerConnection.addIceCandidate(iceCandidate);

    });

    this.hubConnection.start().catch(err => console.error('Error while starting connection: ' + err));

    this.startLocalStream().then(() => {
      if (!this.peerConnection) {
        this.createPeerConnection();
      }
      this.toggleCamera();
      this.toggleMicrophone();
      this.cdr.markForCheck();
    }).catch(error => {
      console.error('Error starting local stream:', error);
    });
  }

  async startCall() {
    try {

      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      console.log("SendOffer", this.id);
      await this.hubConnection.invoke('SendOffer', this.id, JSON.stringify(offer));
    } catch (e) {
      console.error('Error accessing media devices or creating offer.', e);
    }
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
  private onMessageReceived(message: string) {
    console.log('Received message:', message);
  }
  async startLocalStream() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true,  audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      } });
      this.localVideo.srcObject = this.localStream;

      this.audioContext2 = new AudioContext();
      const remoteSource = this.audioContext2.createMediaStreamSource(this.localStream);

      // // Create and configure a lowpass filter
      // const lowpassFilter = this.audioContext2.createBiquadFilter();
      // lowpassFilter.type = 'lowpass';
      // lowpassFilter.frequency.value = 600; // Adjust as needed to filter out high-frequency noise

      // // Create and configure a highpass filter
      // const highpassFilter = this.audioContext2.createBiquadFilter();
      // highpassFilter.type = 'highpass';
      // highpassFilter.frequency.value = 300; // Adjust as needed to filter out low-frequency noise

      // Create and configure a gain node
      this.gainNode2= this.audioContext2.createGain();
      this.gainNode2.gain.value = 0; // Set gain value appropriately

      // Connect nodes: remoteSource -> highpass -> lowpass -> gain -> destination
      // remoteSource.connect(highpassFilter);
      // highpassFilter.connect(lowpassFilter);
      // lowpassFilter.connect(this.gainNode2);
      remoteSource.connect(this.gainNode2);
      this.gainNode2.connect(this.audioContext2.destination);
    } catch (e) {
      console.error('Error accessing media devices.', e);
      throw e;
    }
  }

  async shareScreen() {
    try {
      if (this.isScreenSharing) {
      } else {

        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });

        const screenTrack = screenStream.getVideoTracks()[0];
        this.localVideo.srcObject = screenStream;
        screenTrack.onended = async () => {

          this.localStream.getTracks().forEach(track => {
            if (track.kind === 'video') {
              this.videoSender.replaceTrack(track);
            }
          });
          this.localVideo.srcObject = this.localStream;
          this.isScreenSharing = false;
        };

        this.isScreenSharing = true;
      }
    } catch (error) {
      console.error('Error sharing screen:', error);
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

    this.localStream.getTracks().forEach(track => {
      {
        this.peerConnection.addTrack(track, this.localStream);
        console.log(track);
      }
    });
    // this.screenStreamN.getTracks().forEach(track => {
    //   this.peerConnection.addTrack(track, this.screenStreamN);
    // });
    this.remoteStream = new MediaStream();
    this.remoteVideo.srcObject = this.remoteStream;

 //   this.screenRemoteStream=new MediaStream();
   // this.remoteVideo_2.srcObject=this.screenRemoteStream;
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
      FirstPageComponent.count++;
      if(FirstPageComponent.count!=3)
        this.remoteStream.addTrack(event.track);
        else {
     //    this.screenRemoteStream.addTrack(event.track);
        }
     // });


  // Initialize AudioContext and add audio processing nodes
  this.audioContext = new AudioContext();
  const remoteSource = this.audioContext.createMediaStreamSource(this.remoteStream);

  // Create and configure a lowpass filter
  // const lowpassFilter = this.audioContext.createBiquadFilter();
  // lowpassFilter.type = 'lowpass';
  // lowpassFilter.frequency.value = 600; // Adjust as needed to filter out high-frequency noise

  // // Create and configure a highpass filter
  // const highpassFilter = this.audioContext.createBiquadFilter();
  // highpassFilter.type = 'highpass';
  // highpassFilter.frequency.value = 300; // Adjust as needed to filter out low-frequency noise

  // Create and configure a gain node
  this.gainNode = this.audioContext.createGain();
  this.gainNode.gain.value = 0; // Set gain value appropriately

  // Connect nodes: remoteSource -> highpass -> lowpass -> gain -> destination
  // // remoteSource.connect(highpassFilter);
  // // highpassFilter.connect(lowpassFilter);
  // // lowpassFilter.connect(this.gainNode);
  remoteSource.connect(this.gainNode);
  this.gainNode.connect(this.audioContext.destination);
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
        this.mediaRecorder = new MediaRecorder(this.remoteStream);
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
    this.localVideo.srcObject = null;
    this.remoteVideo.srcObject = null;
  }
}
