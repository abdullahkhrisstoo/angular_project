import { Component } from '@angular/core';

@Component({
  selector: 'app-student-step-two',
  templateUrl: './student-step-two.component.html',
  styleUrls: ['./student-step-two.component.css']
})
export class StudentStepTwoComponent {
  preferredLanguage: string = '';

  languages = [
    'Arabic', 'Chinese Simplified', 'Chinese Traditional', 'English', 'French', 'German',
    'Indonesian', 'Italian', 'Japanese', 'Korean', 'Portuguese-Brazilian', 'Russian', 'Spanish-Modern'
  ];

  isSubmitted: boolean = false;

  onNext(): void {
    this.isSubmitted = true;
    if (this.preferredLanguage) {
      console.log('Next button clicked');
      // Handle the next step
    } else {
      console.log('Validation failed');
    }
  }

  onPrevious(): void {
    console.log('Previous button clicked');
    // Handle the previous step
  }
}
