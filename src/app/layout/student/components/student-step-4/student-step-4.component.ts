import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-step-4',
  templateUrl: './student-step-4.component.html',
  styleUrl: './student-step-4.component.css'
})
export class StudentStep4Component {
  preferredLanguage: string | null = null;
  isSubmitted: boolean = false;

  languages = ['English', 'Japanese','Arabic'];

  constructor(private router: Router) {}
  onNext(): void {
    this.isSubmitted = true;
    if (this.preferredLanguage) {
      this.router.navigate(['/student/step-5']);
      console.log('Next button clicked');
    } else {
      console.log('Validation failed');
    }
  }

  onPrevious(): void {
    this.router.navigate(['/student/step-3']);
    console.log('Previous button clicked');
  }
}
