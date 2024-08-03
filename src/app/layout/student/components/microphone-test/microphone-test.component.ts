import { Component, OnInit } from '@angular/core';

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
  private silenceTimeout: any;
  private silenceDuration = 30000; // 30 seconds

  ngOnInit() {}

  startTest() {
    this.isTesting = true;
    this.errorMessage = '';
    this.noSoundDetected = false;
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
      this.analyser.fftSize = 256;
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
      this.source.connect(this.analyser);
      this.visualize();
    } catch (err:any) {
      this.errorMessage = 'Error accessing microphone: ' + err.message;
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
        if (this.dataArray[i] > 1) {
          soundDetected = true;
        }
      }

      averageVolume = averageVolume / this.dataArray.length;
      this.updateVolumeLevel(averageVolume);

      if (soundDetected) {
        this.resetSilenceTimeout();
      }

      this.noSoundDetected = !soundDetected;
    };

    draw();
  }

  updateVolumeLevel(volume: number) {
    if (this.noSoundDetected) {
      this.volumeLevel = 'no-sound';
    } else if (volume > 170) {
      this.volumeLevel = 'high-volume';
    } else if (volume > 85) {
      this.volumeLevel = 'medium-volume';
    } else {
      this.volumeLevel = 'low-volume';
    }
  }

  resetSilenceTimeout() {
    clearTimeout(this.silenceTimeout);
    this.noSoundDetected = false;
    this.silenceTimeout = setTimeout(() => {
      this.noSoundDetected = true;
      this.updateVolumeLevel(0);
    }, this.silenceDuration);
  }
}
