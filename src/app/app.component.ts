// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from './core/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  spinnerVisible?: Observable<boolean> | null;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerVisible = this.spinnerService.spinnerState;
  }
}
