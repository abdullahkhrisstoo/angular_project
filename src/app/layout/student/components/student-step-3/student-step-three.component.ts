import { Component } from '@angular/core';


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

  onNext(): void {
    this.isSubmitted = true;
    if (this.agreement1 && this.agreement2 && this.acknowledgment) {
      console.log('Next button clicked');
    } else {
      console.log('Validation failed');
    }
  }

  onPrevious(): void {
    console.log('Previous button clicked');
  }
}
