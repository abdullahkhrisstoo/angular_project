import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-step-one',
  templateUrl: './student-step-one.component.html',
  styleUrls: ['./student-step-one.component.css']
})
export class StudentStepOneComponent {
examName: string='';
  constructor(
    
    private router: Router
 
  ) {
    if(localStorage.getItem('exam')){

      this.examName=localStorage.getItem('exam')!;
    }
    
   }
  onNext(): void {
    this.router.navigate(['/student/step-2']);
    console.log('Next button clicked');
  }

  onPrevious(): void {
    console.log('Previous button clicked');
  }
}
