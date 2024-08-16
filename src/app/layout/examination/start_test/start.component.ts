import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Router } from '@angular/router';
import { WebrtcService } from '../../../core/services/webrtc.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartTestComponent implements OnInit {


  private localVideo!: HTMLVideoElement;
  private localVideo_2!: HTMLVideoElement;

  constructor(private webrtc:WebrtcService,private route:Router){}
  async ngOnInit(): Promise<void> {
    this.localVideo = document.getElementById('localVideo') as HTMLVideoElement;
    this.localVideo_2 = document.getElementById('localVideo_2') as HTMLVideoElement;


  }
  private enterFullScreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }

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
  async join(){


    this.webrtc.initializeConnection(()=>{
        this.route.navigate(['/exam']);
    });
  await  this.webrtc.startLocalStream().then( async streams => {
      this.localVideo.srcObject = streams.localStream;
      this.localVideo_2.srcObject = streams.screenStream;

        this.webrtc.createPeerConnection();

      await this.webrtc.startCall();
    }).catch(error => {
      alert("give me permission: " + error);
      console.error('Error starting local stream:', error);
    });
  //  this.openFullscreen();
     //setTimeout(()=>{this.enterFullScreen();},5000)



   }

}


