import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {}
  
  onNext(): void {
    this.isSubmitted = true;
    if (this.preferredLanguage) {
      console.log('Next button clicked');
      this.router.navigate(['/student/step-3']);
    } else {
      console.log('Validation failed');
    }
  }

  onPrevious(): void {
    console.log('Previous button clicked');
    this.router.navigate(['/student/step-1']);
  }
}
