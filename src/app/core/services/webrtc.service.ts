// webrtc.service.ts
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { API_ENDPOINTS } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})


export class WebrtcService {
  private hubConnection!: HubConnection;
  private peerConnection!: RTCPeerConnection;
  private localStream!: MediaStream;
  private screenStream!: MediaStream;
  private remoteStream!: MediaStream;
  private dataChannel!: RTCDataChannel;
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

  constructor() {}

  initializeConnection(routeFunc:Function) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(API_ENDPOINTS.WEB_RTC_URL)
      .build();

    this.hubConnection
      .start()
      .catch((err) => console.error('Error while starting connection: ' + err));

    this.hubConnection.on('ReceiveAnswer', async (user,answer) => {
      const answerDesc: RTCSessionDescriptionInit = JSON.parse(answer);
      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(answerDesc)
      );

      routeFunc();
    });

    this.hubConnection.on('ReceiveIceCandidate', async (user,candidate) => {
      const iceCandidateInit: RTCIceCandidateInit = JSON.parse(candidate);
      const iceCandidate = new RTCIceCandidate(iceCandidateInit);
      await this.peerConnection.addIceCandidate(iceCandidate);
    });
  }

  async startLocalStream() {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });
    this.screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    return { localStream: this.localStream, screenStream: this.screenStream };
  }

  createPeerConnection() {
    this.peerConnection = new RTCPeerConnection(this.ICE_SERVERS);

    this.localStream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    this.screenStream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, this.screenStream);
    });

    this.remoteStream = new MediaStream();

    this.dataChannel = this.peerConnection.createDataChannel('chat');
    this.setupDataChannel();

    this.peerConnection.ondatachannel = (event) => {
      this.dataChannel = event.channel;
      this.setupDataChannel();
    };
    this.peerConnection.onicecandidate = ({ candidate }) => {
      if (candidate) {
        this.hubConnection.invoke('SendIceCandidate', this.id,JSON.stringify(candidate));
      }
    };

    this.peerConnection.ontrack = (event) => {
      this.remoteStream.addTrack(event.track);
      console.log('ontrack event: deaa', event);
    };

    this.peerConnection.oniceconnectionstatechange = () => {
      if (this.peerConnection.iceConnectionState === 'disconnected') {
        // Handle disconnection
      }
    };
  }

  async startCall() {
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    await this.hubConnection.invoke('SendOffer',this.id, JSON.stringify(offer));
  }

  messsge:string='';
  setupDataChannel() {
    this.dataChannel.onmessage = (event) => {
      console.log(event.data);

      this.messsge=event.data;

    };
  }


  get CurrentMessage(){

    return this.messsge;
  }
  sendMessage(message:string) {
    if (message.trim()) {
      this.dataChannel.send(message);
    }
  }

  endCall() {
    if (this.peerConnection) {
      this.peerConnection.close();
    }
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
      this.screenStream.getTracks().forEach((track) => track.stop());
    }
    this.remoteStream.getTracks().forEach((track) => track.stop());
  }


  get PeerConnection() {
    return this.peerConnection;
  }
  get LocalCameraStream() {
    return this.localStream;
  }
  get ShareScreenStream() {
    return this.screenStream;
  }
  get DataChannel() {
    return this.dataChannel;
  }
  get RemoteAudioStream() {
    return this.remoteStream;
  }
  get HubConnection() {
    return this.hubConnection;
  }
}
