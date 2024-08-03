import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-step-three',
  templateUrl: './student-step-three.component.html',
  styleUrls: ['./student-step-three.component.css']
})
export class StudentStepThreeComponent {
  agreement1: boolean | null = null;
  agreement2: boolean | null = null;
  acknowledgment: boolean | null = null;
  isSubmitted: boolean = false;

  constructor(private router: Router) {}
  onNext(): void {
    this.isSubmitted = true;
    if (this.agreement1 && this.agreement2 && this.acknowledgment) {
      console.log('Next button clicked');
      this.router.navigate(['/student/step-4']);
    } else {
      console.log('Validation failed');
    }
  }

  onPrevious(): void {
    this.router.navigate(['/student/step-2']);
    console.log('Previous button clicked');
  }
}
