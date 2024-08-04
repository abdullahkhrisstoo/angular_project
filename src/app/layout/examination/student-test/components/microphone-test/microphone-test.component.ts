import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-microphone-test',
  templateUrl: './microphone-test.component.html',
  styleUrls: ['./microphone-test.component.css']
})
export class MicrophoneTestComponent implements OnInit {
  isTesting = false;
  errorMessage = '';
  audioContext!: AudioContext;
  analyser!: AnalyserNode;
  dataArray!: Uint8Array;
  source!: MediaStreamAudioSourceNode;
  noSoundDetected = false;
  volumeLevel: string = 'no-sound';
  highVolumeReached = false;  // Add this property
  private silenceTimeout: any;
  private silenceDuration = 30000; // 30 seconds
constructor(  private router: Router){}
  ngOnInit() {}

  onPrevious(){

    this.router.navigate(['./examination/student-test/check']);

  }
onNext(){

  this.router.navigate(['./examination/student-test/cam-test']);
}
  startTest() {
    this.isTesting = true;
    this.errorMessage = '';
    this.noSoundDetected = false;
    this.highVolumeReached = false;  // Reset on start
    this.initMicrophone();
  }

  stopTest() {
    this.isTesting = false;
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close().catch(err => {
        console.error('Error closing AudioContext:', err);
      });
    }
    if (this.source && this.source.mediaStream) {
      this.source.mediaStream.getTracks().forEach(track => track.stop());
    }
    clearTimeout(this.silenceTimeout);
  }

  async initMicrophone() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioContext = new AudioContext();
      this.source = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 512;  // Increased fftSize for more detailed analysis
      this.analyser.smoothingTimeConstant = 0.1;  // Reduced smoothing for more immediate response
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
      this.source.connect(this.analyser);
      this.visualize();
    } catch (err) {
      this.errorMessage = 'Error accessing microphone: ';
      this.isTesting = false;
    }
  }

  visualize() {
    const draw = () => {
      if (!this.isTesting) return;
      requestAnimationFrame(draw);

      this.analyser.getByteFrequencyData(this.dataArray);

      let soundDetected = false;
      let averageVolume = 0;

      for (let i = 0; i < this.dataArray.length; i++) {
        averageVolume += this.dataArray[i];
        if (this.dataArray[i] > 1) { // threshold to determine if sound is detected
          soundDetected = true;
        }
      }

      averageVolume = averageVolume / this.dataArray.length;
      console.log('Data Array:', this.dataArray);
      console.log('Average Volume:', averageVolume);

      this.updateVolumeLevel(averageVolume);

      if (soundDetected) {
        this.resetSilenceTimeout();
      }

      this.noSoundDetected = !soundDetected;
    };

    draw();
  }

  updateVolumeLevel(volume: number) {
    console.log('Volume Level Before Update:', volume);
    if (this.noSoundDetected) {
      this.volumeLevel = 'no-sound';
    } else if (volume > 70) {  // Lowered threshold for high volume
      this.volumeLevel = 'high-volume';
      this.highVolumeReached = true;  // Set flag when high volume is reached
    } else if (volume > 30) {  // Lowered threshold for medium volume
      this.volumeLevel = 'medium-volume';
    } else {
      this.volumeLevel = 'low-volume';
    }
    console.log('Volume Level After Update:', this.volumeLevel);
  }

  resetSilenceTimeout() {
    clearTimeout(this.silenceTimeout);
    this.noSoundDetected = false;
    this.silenceTimeout = setTimeout(() => {
      this.noSoundDetected = true;
      this.updateVolumeLevel(0); // Update volume level to trigger color change
    }, this.silenceDuration);
  }
}