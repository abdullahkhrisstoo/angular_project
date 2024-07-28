import { Component } from '@angular/core';

@Component({
  selector: 'app-student-step-4',
  templateUrl: './student-step-4.component.html',
  styleUrl: './student-step-4.component.css'
})
export class StudentStep4Component {
  preferredLanguage: string | null = null;
  isSubmitted: boolean = false;

  languages = ['English', 'Japanese','Arabic'];

  onNext(): void {
    this.isSubmitted = true;
    if (this.preferredLanguage) {
      console.log('Next button clicked');
    } else {
      console.log('Validation failed');
    }
  }

  onPrevious(): void {
    console.log('Previous button clicked');
  }
}
