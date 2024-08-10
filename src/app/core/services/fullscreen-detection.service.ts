import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullscreenDetectionService {

  private fullscreenChangeSubject = new Subject<boolean>();
  fullscreenChange$ = this.fullscreenChangeSubject.asObservable();

  constructor(private ngZone: NgZone) {
    this.initFullscreenListener();
  }

  private initFullscreenListener() {
    document.addEventListener('fullscreenchange', () => {
      this.ngZone.run(() => {
        const isFullscreen = !!document.fullscreenElement;
        this.fullscreenChangeSubject.next(isFullscreen);
      });
    });
  }
}
