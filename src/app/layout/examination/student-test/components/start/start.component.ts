import { Component, HostListener, OnInit } from '@angular/core';

import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Router } from '@angular/router';
import { WebrtcService } from '../../../../../core/services/webrtc.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit {


  private localVideo!: HTMLVideoElement;
  private localVideo_2!: HTMLVideoElement;
  isDisabled = false;
  constructor(private webrtc:WebrtcService,private route:Router, private spinner: NgxSpinnerService){}
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
   closeFullscreen(): void {
    const elem = document.documentElement as any;
    if (elem.exitFullscreen) {
      elem.exitFullscreen();
    } else if (elem.mozCancelFullScreen) { // Firefox
      elem.mozCancelFullScreen();
    } else if (elem.webkitExitFullscreen) { // Chrome, Safari, Opera
      elem.webkitExitFullscreen();
    } else if (elem.msExitFullscreen) { // IE/Edge
      elem.msExitFullscreen();
    }
  }
  async join(){

    this.webrtc.initializeConnection(()=>{
      this.spinner.hide('spinnerName');
       this.route.navigate(['/examination/student']);
    });
  await  this.webrtc.startLocalStream().then( async streams => {
      this.localVideo.srcObject = streams.localStream;
      this.localVideo_2.srcObject = streams.screenStream;
       if (!this.webrtc.PeerConnection) {

        this.webrtc.createPeerConnection();
      }
      await this.webrtc.startCall();
      this.openFullscreen();
      this.openFullscreen();
    }).catch(error => {
      alert("give me permission: " + error);
      console.error('Error starting local stream:', error);
    });

    this.openFullscreen();
    this.openFullscreen();
    this.webrtc.HubConnection.on('ReceiveRejected', async () => {
    this.closeFullscreen();
    alert("you are rejected, your information is worng")
    console.log("ReceiveRejected");

    });



    this.spinner.show('spinnerName', {
      type: 'timer',
      size: 'medium',
      bdColor:"#0053A64E",
       color:"#FFFFFF",
      fullScreen: true,

    });





     //setTimeout(()=>{this.enterFullScreen();},5000)



   }
   onPrevious() {
    console.log('Previous button clicked');
    // Implement previous button logic here
  }

  onNext() {
    console.log('Next button clicked');
    // Implement next button logic here
  }
}


