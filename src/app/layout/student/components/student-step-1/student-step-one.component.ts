import { Component } from '@angular/core';

@Component({
  selector: 'app-student-step-one',
  templateUrl: './student-step-one.component.html',
  styleUrls: ['./student-step-one.component.css']
})
export class StudentStepOneComponent {

  onNext(): void {
    console.log('Next button clicked');
  }

  onPrevious(): void {
    console.log('Previous button clicked');
  }
}
