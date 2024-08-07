import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera-test',
  templateUrl: './camera-test.component.html',
  styleUrls: ['./camera-test.component.css']
})
export class CameraTestComponent implements OnInit {
  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  showWarning: boolean = false;

  constructor(  private router: Router,) { }

  ngOnInit(): void {
    this.startCamera();
  }

  onPrevious(){
    this.router.navigate(['./examination/student-test/mic-test']);
  }
onNext(){
  this.router.navigate(['./examination/student-test/iden-test']);
}
  isDisabled:boolean=false;
  async startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.nativeElement.srcObject = stream;
      this.showWarning = false;

    } catch (err) {
      console.error('Error accessing the camera: ', err);
      this.showWarning = true;
      this.isDisabled=true;
    }
  }
}
